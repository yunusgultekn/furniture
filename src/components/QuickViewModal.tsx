import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductImage } from './ProductImage';
import { StarRating } from './StarRating';
import { X, ShoppingCart, Heart, Shield, Check, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } =
    useStore();
  const [qty, setQty] = useState(1);

  if (!quickViewProduct) return null;

  const isFav = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, qty);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Container */}
          <div className="bg-stone-100 p-8 flex items-center justify-center relative">
            <ProductImage product={quickViewProduct} className="max-h-72 object-contain" />
            <div className="absolute bottom-4 left-4 text-xs font-bold bg-white/90 backdrop-blur px-3 py-1 rounded-full text-stone-700 shadow-sm">
              Kod: {quickViewProduct.id}
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-700">
                <span>{quickViewProduct.brand}</span>
                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Stokta ({quickViewProduct.stock} Adet)
                </span>
              </div>

              <h2 className="text-xl font-bold text-stone-900 mt-2 leading-snug">
                {quickViewProduct.name}
              </h2>

              <div className="my-3">
                <StarRating rating={quickViewProduct.rating} reviewsCount={quickViewProduct.reviews} />
              </div>

              <div className="flex items-baseline gap-3 my-4">
                <span className="text-2xl font-black text-stone-900">
                  {quickViewProduct.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                </span>
                {quickViewProduct.oldPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {quickViewProduct.oldPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                  </span>
                )}
                <span className="text-xs text-stone-500 font-normal">KDV Dahil</span>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                {quickViewProduct.desc}
              </p>

              {/* Specs Chips */}
              <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-stone-50 p-2 rounded-lg">
                  <span className="text-stone-400 block text-[10px]">Renk / Kaplama</span>
                  <strong className="text-stone-800">{quickViewProduct.color}</strong>
                </div>
                <div className="bg-stone-50 p-2 rounded-lg">
                  <span className="text-stone-400 block text-[10px]">Garanti Süresi</span>
                  <strong className="text-stone-800">{quickViewProduct.warrantyYears || 2} Yıl Garanti</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 mt-6 border-t border-stone-100 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-stone-200 rounded-xl overflow-hidden bg-stone-50">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-200 font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-bold text-stone-900 min-w-[2.5rem] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(Math.min(quickViewProduct.stock, qty + 1))}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-200 font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-stone-900 hover:bg-amber-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow transition-all"
                >
                  <ShoppingCart size={16} />
                  <span>Sepete Ekle ({quickViewProduct.price * qty} ₺)</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isFav
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Heart size={18} className={isFav ? 'fill-current' : ''} />
                </button>
              </div>

              <a
                href={`#/urun/${quickViewProduct.id}`}
                onClick={() => setQuickViewProduct(null)}
                className="text-center text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center justify-center gap-1 pt-1"
              >
                <span>Tüm Detayları Gör & İncelemeleri Oku</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
