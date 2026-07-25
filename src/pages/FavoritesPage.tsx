import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { wishlist, products, addToCart, showToast } = useStore();

  const favProducts = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const handleAddAllToCart = () => {
    favProducts.forEach((p) => addToCart(p!, 1));
    showToast('Tüm favori ürünler sepete eklendi!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 flex items-center gap-3">
            <Heart size={28} className="text-rose-600 fill-current" />
            <span>Favorilerim ({favProducts.length})</span>
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Beğendiğiniz donanım ve aksesuarları buradan takip edebilirsiniz.
          </p>
        </div>

        {favProducts.length > 0 && (
          <button
            onClick={handleAddAllToCart}
            className="px-5 py-2.5 bg-stone-900 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow transition-colors"
          >
            <ShoppingCart size={16} />
            <span>Tümünü Sepete Ekle</span>
          </button>
        )}
      </div>

      {favProducts.length === 0 ? (
        <div className="max-w-md mx-auto py-16 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
            <Heart size={36} />
          </div>
          <h2 className="text-xl font-bold text-stone-900 font-serif">Henüz Favoriniz Yok</h2>
          <p className="text-xs text-stone-500">
            Ürün kartlarındaki kalp butonuna basarak beğendiğiniz ürünleri buraya ekleyebilirsiniz.
          </p>
          <a
            href="#/urunler"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 text-white font-bold text-xs rounded-xl hover:bg-amber-700 transition-colors"
          >
            <span>Ürünleri İncele</span>
            <ArrowRight size={16} />
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favProducts.map((product) => (
            <ProductCard key={product!.id} product={product!} />
          ))}
        </div>
      )}
    </div>
  );
};
