import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ProductImage } from './ProductImage';
import { StarRating } from './StarRating';
import { Heart, ShoppingCart, Eye, ArrowLeftRight, Check } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface ProductCardProps {
  product: Product;
  onNavigateProduct?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNavigateProduct,
}) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    setQuickViewProduct,
  } = useStore();

  const isFav = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const categoryName = CATEGORIES.find((c) => c.slug === product.cat)?.name || product.cat;

  const discountPercent = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateProduct) {
      onNavigateProduct(product.id);
    } else {
      window.location.hash = `#/urun/${product.id}`;
    }
  };

  return (
    <div className="group relative flex flex-col bg-white border border-stone-200/80 rounded-2xl overflow-hidden hover:shadow-xl hover:border-stone-300 transition-all duration-300 transform hover:-translate-y-1">
      {/* Product Image & Badges Container */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" onClick={handleClick}>
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
          {product.badge === 'İndirim' && discountPercent > 0 && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide text-white bg-rose-600 shadow-sm">
              %{discountPercent} İNDİRİM
            </span>
          )}
          {product.badge === 'Yeni' && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide text-white bg-emerald-600 shadow-sm">
              YENİ
            </span>
          )}
          {product.badge === 'Çok Satan' && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide text-white bg-amber-600 shadow-sm">
              ÇOK SATAN
            </span>
          )}
        </div>

        {/* Quick Action Overlay Buttons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm backdrop-blur-md ${
              isFav
                ? 'bg-rose-50 text-rose-600 border border-rose-200 scale-105'
                : 'bg-white/90 text-stone-600 hover:text-rose-600 hover:bg-white border border-stone-200'
            }`}
            title={isFav ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
          >
            <Heart size={18} className={isFav ? 'fill-current' : ''} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product.id);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm backdrop-blur-md ${
              isCompared
                ? 'bg-amber-50 text-amber-700 border border-amber-300'
                : 'bg-white/90 text-stone-600 hover:text-amber-700 hover:bg-white border border-stone-200'
            }`}
            title="Karşılaştır"
          >
            <ArrowLeftRight size={16} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-9 h-9 rounded-full bg-white/90 text-stone-600 hover:text-stone-900 hover:bg-white border border-stone-200 flex items-center justify-center shadow-sm backdrop-blur-md transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transform translate-x-0 sm:translate-x-2 sm:group-hover:translate-x-0"
            title="Hızlı Bakış"
          >
            <Eye size={17} />
          </button>
        </div>

        {/* Render Vector Product Artwork */}
        <ProductImage product={product} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>

      {/* Body Content */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-stone-400">
          <span>{categoryName}</span>
          <span className="text-stone-500 font-bold">{product.brand}</span>
        </div>

        <h3 className="font-semibold text-stone-900 text-xs sm:text-sm leading-snug line-clamp-2 min-h-[2.25rem] sm:min-h-[2.5rem] group-hover:text-amber-800 transition-colors">
          <a href={`#/urun/${product.id}`} onClick={handleClick}>
            {product.name}
          </a>
        </h3>

        {/* Ratings & Specs */}
        <div className="flex items-center justify-between my-0.5">
          <StarRating rating={product.rating} reviewsCount={product.reviews} />
          <span className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded font-medium truncate max-w-[80px]">
            {product.color}
          </span>
        </div>

        {/* Footer: Price & Add to Cart */}
        <div className="mt-auto pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            {product.oldPrice && (
              <span className="text-[11px] text-stone-400 line-through">
                {product.oldPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
              </span>
            )}
            <span className="text-sm sm:text-base font-extrabold text-stone-900 tracking-tight truncate">
              {product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-stone-900 hover:bg-amber-700 text-white text-xs font-semibold transition-all duration-200 active:scale-95 shadow-sm shrink-0"
          >
            <ShoppingCart size={15} />
            <span>Ekle</span>
          </button>
        </div>
      </div>
    </div>
  );
};
