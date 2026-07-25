import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Coupon, CustomerInfo } from '../types';
import { PRODUCTS } from '../data/products';
import { COUPONS } from '../data/coupons';
import { FREE_SHIPPING_LIMIT, SHIPPING_COST } from '../data/categories';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  compareList: string[];
  orders: Order[];
  activeCoupon: Coupon | null;
  toast: ToastMessage | null;
  quickViewProduct: Product | null;
  isAdvisorOpen: boolean;
  isCompareModalOpen: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Cart actions
  addToCart: (product: Product, qty?: number) => void;
  updateCartQty: (productId: string, qty: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;

  // Totals
  subtotal: number;
  discount: number;
  shipping: number;
  grandTotal: number;

  // Wishlist & Compare
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;

  // Coupons
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Orders
  placeOrder: (customer: CustomerInfo, paymentMethod: 'card' | 'havale', shippingMethod: 'standart' | 'hizli') => Order;

  // Modals & UI
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  setQuickViewProduct: (product: Product | null) => void;
  setIsAdvisorOpen: (open: boolean) => void;
  setIsCompareModalOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LS_CART = 'mobidolap_v2_cart';
const LS_WISHLIST = 'mobidolap_v2_wishlist';
const LS_ORDERS = 'mobidolap_v2_orders';
const LS_COUPON = 'mobidolap_v2_coupon';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LS_CART);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((item: { id: string; qty: number }) => {
          const p = PRODUCTS.find((p) => p.id === item.id);
          return p ? { product: p, qty: item.qty } : null;
        }).filter(Boolean);
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LS_WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LS_ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem(LS_COUPON);
      return saved && COUPONS[saved] ? COUPONS[saved] : null;
    } catch {
      return null;
    }
  });

  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist state
  useEffect(() => {
    const compact = cart.map((c) => ({ id: c.product.id, qty: c.qty }));
    localStorage.setItem(LS_CART, JSON.stringify(compact));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LS_WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(LS_ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (activeCoupon) {
      localStorage.setItem(LS_COUPON, activeCoupon.code);
    } else {
      localStorage.removeItem(LS_COUPON);
    }
  }, [activeCoupon]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3200);
  };

  const addToCart = (product: Product, qty: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].qty + qty;
        if (newQty > product.stock) {
          showToast(`Stok sınırına ulaşıldı (Maksimum ${product.stock} adet)`, 'error');
          return prev;
        }
        updated[existingIndex].qty = newQty;
        return updated;
      } else {
        return [...prev, { product, qty: Math.min(qty, product.stock) }];
      }
    });
    showToast(`${product.name} sepete eklendi`, 'success');
  };

  const updateCartQty = (productId: string, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) => {
        if (item.product.id === productId) {
          const validQty = Math.min(qty, item.product.stock);
          return { ...item, qty: validQty };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Ürün sepetten çıkarıldı', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setActiveCoupon(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Price computations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  let discount = 0;
  if (activeCoupon) {
    if (activeCoupon.type === 'percent') {
      discount = subtotal * (activeCoupon.value / 100);
    } else if (activeCoupon.type === 'amount') {
      discount = Math.min(activeCoupon.value, subtotal);
    }
  }

  let shipping = 0;
  if (subtotal > 0) {
    if (activeCoupon?.type === 'shipping') {
      shipping = 0;
    } else {
      shipping = subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_COST;
    }
  }

  const grandTotal = Math.max(0, subtotal - discount) + shipping;

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Favorilerden çıkarıldı', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Favorilere eklendi ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const toggleCompare = (productId: string) => {
    setCompareList((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Karşılaştırmadan çıkarıldı', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        if (prev.length >= 4) {
          showToast('En fazla 4 ürünü karşılaştırabilirsiniz', 'error');
          return prev;
        }
        showToast('Karşılaştırma listesine eklendi', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInCompare = (productId: string) => compareList.includes(productId);
  const clearCompare = () => setCompareList([]);

  const applyCoupon = (code: string) => {
    const formatted = code.trim().toUpperCase();
    const coupon = COUPONS[formatted];
    if (!coupon) {
      showToast('Geçersiz kupon kodu', 'error');
      return false;
    }
    if (coupon.minSpend && subtotal < coupon.minSpend) {
      showToast(`Bu kupon en az ${coupon.minSpend} TL alışverişte geçerlidir`, 'error');
      return false;
    }
    setActiveCoupon(coupon);
    showToast(`"${coupon.label}" uygulandı!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    showToast('Kupon kaldırıldı', 'info');
  };

  const placeOrder = (
    customer: CustomerInfo,
    paymentMethod: 'card' | 'havale',
    shippingMethod: 'standart' | 'hizli'
  ) => {
    const finalShipping = shippingMethod === 'hizli' ? 89.9 : shipping;
    const finalTotal = Math.max(0, subtotal - discount) + finalShipping;

    const newOrder: Order = {
      no: 'MD' + Date.now().toString().slice(-8),
      date: new Date().toISOString(),
      customer,
      items: cart.map((c) => ({
        id: c.product.id,
        name: c.product.name,
        price: c.product.price,
        qty: c.qty,
        brand: c.product.brand,
        cat: c.product.cat,
      })),
      subtotal,
      discount,
      shipping: finalShipping,
      total: finalTotal,
      couponCode: activeCoupon?.code || null,
      paymentMethod,
      shippingMethod,
      status: 'Sipariş Alındı',
      trackingNumber: 'TR' + Math.floor(100000000 + Math.random() * 900000000),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        compareList,
        orders,
        activeCoupon,
        toast,
        quickViewProduct,
        isAdvisorOpen,
        isCompareModalOpen,
        searchQuery,
        setSearchQuery,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        discount,
        shipping,
        grandTotal,
        toggleWishlist,
        isInWishlist,
        toggleCompare,
        isInCompare,
        clearCompare,
        applyCoupon,
        removeCoupon,
        placeOrder,
        showToast,
        setQuickViewProduct,
        setIsAdvisorOpen,
        setIsCompareModalOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
