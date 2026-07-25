import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FREE_SHIPPING_LIMIT, CATEGORIES } from '../data/categories';
import { ProductImage } from '../components/ProductImage';
import {
  Trash2,
  ShoppingCart,
  ArrowRight,
  ArrowLeft,
  Truck,
  Tag,
  ShieldCheck,
  Check,
  Percent,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartCount,
    updateCartQty,
    removeFromCart,
    subtotal,
    discount,
    shipping,
    grandTotal,
    activeCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_LIMIT - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_LIMIT) * 100);

  const handleApplyCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCodeInput.trim()) {
      applyCoupon(couponCodeInput.trim());
      setCouponCodeInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
          <ShoppingCart size={36} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-serif text-stone-900">Sepetiniz Boş</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Sepetinizde henüz bir ürün bulunmuyor. İhtiyacınız olan ray, menteşe ve kulpları hemen
            keşfedin.
          </p>
        </div>
        <a
          href="#/urunler"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
        >
          <span>Alışverişe Başla</span>
          <ArrowRight size={16} />
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
        Alışveriş Sepeti ({cartCount} Ürün)
      </h1>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-amber-950">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-700" />
            {remainingForFreeShipping === 0 ? (
              <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                <Check size={14} /> Tebrikler! Ücretsiz kargo hakkı kazandınız.
              </span>
            ) : (
              <span>
                Ücretsiz kargo için <strong className="text-stone-900">{remainingForFreeShipping.toLocaleString('tr-TR')} ₺</strong> değerinde ürün ekleyin!
              </span>
            )}
          </span>
          <span>{freeShippingProgress.toFixed(0)}%</span>
        </div>

        <div className="w-full h-2.5 bg-amber-200/60 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-700 rounded-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden divide-y divide-stone-100 shadow-sm">
            {cart.map(({ product, qty }) => {
              const categoryName =
                CATEGORIES.find((c) => c.slug === product.cat)?.name || product.cat;

              return (
                <div
                  key={product.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 hover:bg-stone-50/50 transition-colors"
                >
                  <div className="w-24 h-20 bg-stone-100 rounded-2xl overflow-hidden shrink-0 border border-stone-200">
                    <ProductImage product={product} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 space-y-1 min-w-0 text-center sm:text-left">
                    <div className="text-[10px] font-bold uppercase text-amber-800">
                      {categoryName} • {product.brand}
                    </div>
                    <h3 className="font-bold text-stone-900 text-sm truncate">
                      <a href={`#/urun/${product.id}`} className="hover:text-amber-800">
                        {product.name}
                      </a>
                    </h3>
                    <div className="text-xs text-stone-500">
                      Birim Fiyat: {product.price.toLocaleString('tr-TR')} ₺
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                    <button
                      onClick={() => updateCartQty(product.id, qty - 1)}
                      className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-bold text-stone-900 min-w-[2rem] text-center">
                      {qty}
                    </span>
                    <button
                      onClick={() => updateCartQty(product.id, qty + 1)}
                      className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>

                  {/* Total Line Price */}
                  <div className="text-right min-w-[100px]">
                    <span className="font-extrabold text-stone-900 text-sm block">
                      {(product.price * qty).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Ürünü Sil"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-2">
            <a
              href="#/urunler"
              className="text-xs font-bold text-stone-700 hover:text-stone-950 flex items-center gap-1.5"
            >
              <ArrowLeft size={16} />
              <span>Alışverişe Devam Et</span>
            </a>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6 sticky top-24">
            <h2 className="font-bold text-stone-900 text-lg font-serif pb-3 border-b border-stone-100">
              Sipariş Özeti
            </h2>

            {/* Coupon Code Section */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-700 flex items-center gap-1.5">
                <Tag size={14} className="text-amber-700" />
                <span>İndirim Kuponu</span>
              </label>

              {activeCoupon ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Percent size={14} className="text-emerald-700" />
                    <span className="font-bold text-emerald-950">
                      {activeCoupon.code} ({activeCoupon.label})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] font-bold text-rose-600 hover:underline"
                  >
                    Kaldır
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCouponSubmit} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Kupon Kodu (Örn: MOBIDOLAP10)"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:border-amber-600 uppercase font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 text-white font-bold text-xs rounded-xl hover:bg-amber-700 transition-colors"
                  >
                    Uygula
                  </button>
                </form>
              )}

              <p className="text-[10px] text-stone-400">
                Denenebilir kuponlar: <strong>MOBIDOLAP10</strong>, <strong>HOSGELDIN50</strong>,{' '}
                <strong>KARGO0</strong>
              </p>
            </div>

            {/* Subtotal, Shipping, Discount Calculations */}
            <div className="space-y-3 text-xs border-t border-stone-100 pt-4">
              <div className="flex justify-between text-stone-600">
                <span>Ara Toplam</span>
                <span className="font-bold text-stone-900">
                  {subtotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Kupon İndirimi</span>
                  <span>
                    - {discount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                  </span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <span>Kargo Bedeli</span>
                <span className="font-bold text-stone-900">
                  {shipping === 0 ? (
                    <span className="text-emerald-700 font-extrabold">ÜCRETSİZ</span>
                  ) : (
                    `${shipping.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                <span className="text-sm font-bold text-stone-900">Genel Toplam</span>
                <span className="text-2xl font-black text-amber-800 font-serif">
                  {grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                </span>
              </div>
            </div>

            <a
              href="#/odeme"
              className="w-full py-4 bg-stone-900 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Ödemeye Geç</span>
              <ArrowRight size={18} />
            </a>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 font-medium">
              <ShieldCheck size={14} className="text-amber-700" />
              <span>256-Bit SSL Şifreli Güvenli Ödeme</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
