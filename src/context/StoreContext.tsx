import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, Coupon, CustomerInfo, UserAccount, CmsSettings, StaffRole } from '../types';
import { PRODUCTS } from '../data/products';
import { COUPONS } from '../data/coupons';
import { FREE_SHIPPING_LIMIT, SHIPPING_COST } from '../data/categories';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const DEFAULT_USERS: UserAccount[] = [
  {
    id: 'usr_1',
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@gmail.com',
    phone: '0532 111 22 33',
    city: 'İstanbul',
    role: 'Müşteri',
    totalOrders: 4,
    totalSpent: 3850,
    registeredDate: '2025-11-12',
    isBlocked: false,
  },
  {
    id: 'usr_2',
    name: 'Zeynep Kaya',
    email: 'zeynep.k@hotmail.com',
    phone: '0555 444 55 66',
    city: 'Ankara',
    role: 'Müşteri',
    totalOrders: 2,
    totalSpent: 1240,
    registeredDate: '2026-01-20',
    isBlocked: false,
  },
  {
    id: 'usr_3',
    name: 'Mustafa Demir (Dekorasyon)',
    email: 'mustafa@demirmobilya.com',
    phone: '0542 987 65 43',
    city: 'İzmir',
    role: 'Admin',
    totalOrders: 12,
    totalSpent: 24500,
    registeredDate: '2025-08-01',
    isBlocked: false,
  },
  {
    id: 'usr_4',
    name: 'Selin Arslan',
    email: 'selin.arslan@outlook.com',
    phone: '0507 333 22 11',
    city: 'Bursa',
    role: 'Stok Yöneticisi',
    totalOrders: 1,
    totalSpent: 450,
    registeredDate: '2026-02-14',
    isBlocked: false,
  },
];

const DEFAULT_CMS: CmsSettings = {
  heroTitle: 'Mobilya Aksesuarında Profesyonel Çözüm Ortağınız',
  heroSubtitle: 'Çekmece rayları, gizli menteşeler, alüminyum kulplar ve akıllı dolap sistemlerinde en geniş ürün yelpazesi.',
  announcementText: '1.500 TL ve Üzeri Siparişlerinizde Kargo Ücretsiz! Aynı Gün Hızlı Teslimat.',
  isAnnouncementActive: true,
  freeShippingLimit: 1500,
  supportPhone: '0850 888 00 99',
  whatsappPhone: '905551234567',
  bannerNotice: '%100 Yerli ve İthal Orijinal Marka Garantisi',
};

const DEFAULT_ROLES: StaffRole[] = [
  {
    id: 'role_admin',
    name: 'Süper Admin',
    description: 'Tüm modüllere ve ayarlara tam erişim yetkisi.',
    permissions: {
      canManageProducts: true,
      canManageStock: true,
      canManageOrders: true,
      canManageUsers: true,
      canManageCoupons: true,
      canManageCMS: true,
      canViewReports: true,
    },
  },
  {
    id: 'role_stock',
    name: 'Depo & Stok Sorumlusu',
    description: 'Ürün stok takibi ve sipariş kargo durumlarını güncelleme.',
    permissions: {
      canManageProducts: true,
      canManageStock: true,
      canManageOrders: true,
      canManageUsers: false,
      canManageCoupons: false,
      canManageCMS: false,
      canViewReports: true,
    },
  },
  {
    id: 'role_support',
    name: 'Müşteri Temsilcisi',
    description: 'Sipariş detaylarını inceleme ve müşteri hesaplarını destekleme.',
    permissions: {
      canManageProducts: false,
      canManageStock: false,
      canManageOrders: true,
      canManageUsers: true,
      canManageCoupons: false,
      canManageCMS: false,
      canViewReports: false,
    },
  },
];

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  compareList: string[];
  orders: Order[];
  couponsList: Coupon[];
  usersList: UserAccount[];
  cmsSettings: CmsSettings;
  staffRoles: StaffRole[];
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

  // Admin Actions
  addProduct: (newProd: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateProductStock: (id: string, newStock: number) => void;
  updateOrderStatus: (orderNo: string, status: Order['status'], trackingNumber?: string) => void;
  toggleUserBlock: (userId: string) => void;
  addUser: (user: Omit<UserAccount, 'id' | 'registeredDate'>) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  toggleCouponActive: (code: string) => void;
  updateCmsSettings: (newSettings: Partial<CmsSettings>) => void;
  updateStaffRolePermissions: (roleId: string, permissions: StaffRole['permissions']) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LS_PRODUCTS = 'mobidolap_v2_products';
const LS_CART = 'mobidolap_v2_cart';
const LS_WISHLIST = 'mobidolap_v2_wishlist';
const LS_ORDERS = 'mobidolap_v2_orders';
const LS_COUPONS = 'mobidolap_v2_coupons_list';
const LS_USERS = 'mobidolap_v2_users';
const LS_CMS = 'mobidolap_v2_cms';
const LS_ROLES = 'mobidolap_v2_roles';
const LS_ACTIVE_COUPON = 'mobidolap_v2_active_coupon';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LS_PRODUCTS);
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  const [couponsList, setCouponsList] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem(LS_COUPONS);
      return saved ? JSON.parse(saved) : Object.values(COUPONS).map((c) => ({ ...c, active: true }));
    } catch {
      return Object.values(COUPONS).map((c) => ({ ...c, active: true }));
    }
  });

  const [usersList, setUsersList] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem(LS_USERS);
      return saved ? JSON.parse(saved) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  const [cmsSettings, setCmsSettings] = useState<CmsSettings>(() => {
    try {
      const saved = localStorage.getItem(LS_CMS);
      return saved ? JSON.parse(saved) : DEFAULT_CMS;
    } catch {
      return DEFAULT_CMS;
    }
  });

  const [staffRoles, setStaffRoles] = useState<StaffRole[]>(() => {
    try {
      const saved = localStorage.getItem(LS_ROLES);
      return saved ? JSON.parse(saved) : DEFAULT_ROLES;
    } catch {
      return DEFAULT_ROLES;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LS_CART);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed
          .map((item: { id: string; qty: number }) => {
            const p = PRODUCTS.find((p) => p.id === item.id);
            return p ? { product: p, qty: item.qty } : null;
          })
          .filter(Boolean);
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
      const saved = localStorage.getItem(LS_ACTIVE_COUPON);
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

  // Persist states to local storage
  useEffect(() => {
    localStorage.setItem(LS_PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(LS_COUPONS, JSON.stringify(couponsList));
  }, [couponsList]);

  useEffect(() => {
    localStorage.setItem(LS_USERS, JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    localStorage.setItem(LS_CMS, JSON.stringify(cmsSettings));
  }, [cmsSettings]);

  useEffect(() => {
    localStorage.setItem(LS_ROLES, JSON.stringify(staffRoles));
  }, [staffRoles]);

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
      localStorage.setItem(LS_ACTIVE_COUPON, activeCoupon.code);
    } else {
      localStorage.removeItem(LS_ACTIVE_COUPON);
    }
  }, [activeCoupon]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3200);
  };

  // Admin Actions
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = 'p_' + Date.now();
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);
    showToast(`"${product.name}" sisteme eklendi`, 'success');
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    showToast('Ürün bilgileri güncellendi', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Ürün sistemden silindi', 'info');
  };

  const updateProductStock = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, newStock) } : p))
    );
    showToast('Stok miktarı güncellendi', 'success');
  };

  const updateOrderStatus = (orderNo: string, status: Order['status'], trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.no === orderNo
          ? {
              ...o,
              status,
              trackingNumber: trackingNumber !== undefined ? trackingNumber : o.trackingNumber,
            }
          : o
      )
    );
    showToast(`Sipariş (${orderNo}) durumu "${status}" olarak güncellendi`, 'success');
  };

  const toggleUserBlock = (userId: string) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = !u.isBlocked;
          showToast(newStatus ? `${u.name} engellendi` : `${u.name} engeli kaldırıldı`, newStatus ? 'error' : 'success');
          return { ...u, isBlocked: newStatus };
        }
        return u;
      })
    );
  };

  const addUser = (user: Omit<UserAccount, 'id' | 'registeredDate'>) => {
    const id = 'usr_' + Date.now();
    const registeredDate = new Date().toISOString().split('T')[0];
    const newUser: UserAccount = { ...user, id, registeredDate };
    setUsersList((prev) => [newUser, ...prev]);
    showToast(`${newUser.name} kullanıcı listesine eklendi`, 'success');
  };

  const addCoupon = (coupon: Coupon) => {
    const formattedCode = coupon.code.trim().toUpperCase();
    setCouponsList((prev) => [...prev.filter((c) => c.code !== formattedCode), { ...coupon, code: formattedCode, active: true }]);
    showToast(`Kupon (${formattedCode}) oluşturuldu`, 'success');
  };

  const deleteCoupon = (code: string) => {
    setCouponsList((prev) => prev.filter((c) => c.code !== code));
    showToast(`Kupon (${code}) silindi`, 'info');
  };

  const toggleCouponActive = (code: string) => {
    setCouponsList((prev) =>
      prev.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
    showToast('Kupon durumu değiştirildi', 'info');
  };

  const updateCmsSettings = (newSettings: Partial<CmsSettings>) => {
    setCmsSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('CMS site içerikleri güncellendi', 'success');
  };

  const updateStaffRolePermissions = (roleId: string, permissions: StaffRole['permissions']) => {
    setStaffRoles((prev) =>
      prev.map((r) => (r.id === roleId ? { ...r, permissions } : r))
    );
    showToast('Rol yetkileri güncellendi', 'success');
  };

  // User Store Cart Actions
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
      shipping = subtotal >= cmsSettings.freeShippingLimit ? 0 : SHIPPING_COST;
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
    const coupon = couponsList.find((c) => c.code === formatted && c.active !== false);
    if (!coupon) {
      showToast('Geçersiz veya süresi dolmuş kupon kodu', 'error');
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
        couponsList,
        usersList,
        cmsSettings,
        staffRoles,
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
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductStock,
        updateOrderStatus,
        toggleUserBlock,
        addUser,
        addCoupon,
        deleteCoupon,
        toggleCouponActive,
        updateCmsSettings,
        updateStaffRolePermissions,
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

