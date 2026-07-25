import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductImage } from './ProductImage';
import { StarRating } from './StarRating';
import { X, ShoppingCart, Trash2, ArrowLeftRight } from 'lucide-react';

export const CompareModal: React.FC = () => {
  const {
    isCompareModalOpen,
    setIsCompareModalOpen,
    compareList,
    products,
    toggleCompare,
    clearCompare,
    addToCart,
  } = useStore();

  if (!isCompareModalOpen) return null;

  const compareProducts = compareList
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg font-bold text-stone-900 font-serif">
              Aksesuar & Donanım Karşılaştırma ({compareProducts.length}/4)
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {compareProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1"
              >
                <Trash2 size={14} /> Temizle
              </button>
            )}
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-600 flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {compareProducts.length === 0 ? (
            <div className="py-12 sm:py-16 text-center space-y-3">
              <ArrowLeftRight size={40} className="mx-auto text-stone-300" />
              <h3 className="font-bold text-stone-800 text-base">Karşılaştırma listeniz boş</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Ürün kartlarındaki <ArrowLeftRight size={12} className="inline" /> ikonuna tıklayarak
                4 ürüne kadar teknik özellikleri kıyaslayabilirsiniz.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto pb-4">
              <table className="w-full text-left border-collapse text-xs min-w-[500px]">
                <thead>
                  <tr>
                    <th className="p-3 bg-stone-100 text-stone-500 font-bold w-28 sm:w-40 rounded-l-xl shrink-0 sticky left-0 z-10 shadow-sm">
                      Özellik
                    </th>
                    {compareProducts.map((p) => (
                      <th key={p!.id} className="p-3 min-w-[170px] sm:min-w-[200px] border-l border-stone-200">
                        <div className="relative group">
                          <button
                            onClick={() => toggleCompare(p!.id)}
                            className="absolute -top-1 -right-1 p-1 text-stone-400 hover:text-rose-600 z-10"
                            title="Kaldır"
                          >
                            <X size={16} />
                          </button>
                          <div className="w-full h-24 sm:h-28 bg-stone-100 rounded-xl overflow-hidden mb-2">
                            <ProductImage product={p!} className="w-full h-full object-cover" />
                          </div>
                          <div className="font-bold text-stone-900 line-clamp-2 text-xs">{p!.name}</div>
                          <div className="text-amber-800 font-extrabold text-xs sm:text-sm mt-1">
                            {p!.price.toLocaleString('tr-TR')} ₺
                          </div>
                          <button
                            onClick={() => addToCart(p!, 1)}
                            className="w-full mt-2 py-1.5 bg-stone-900 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1 text-[11px]"
                          >
                            <ShoppingCart size={12} /> Sepete Ekle
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="p-3 font-bold text-stone-600 bg-stone-50 sticky left-0 z-10 shadow-sm">Marka</td>
                    {compareProducts.map((p) => (
                      <td key={p!.id} className="p-3 border-l border-stone-100 font-semibold">
                        {p!.brand}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-600 bg-stone-50 sticky left-0 z-10 shadow-sm">Kategori</td>
                    {compareProducts.map((p) => (
                      <td key={p!.id} className="p-3 border-l border-stone-100 uppercase text-[10px]">
                        {p!.cat}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-600 bg-stone-50 sticky left-0 z-10 shadow-sm">Puan</td>
                    {compareProducts.map((p) => (
                      <td key={p!.id} className="p-3 border-l border-stone-100">
                        <StarRating rating={p!.rating} reviewsCount={p!.reviews} />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-600 bg-stone-50 sticky left-0 z-10 shadow-sm">Renk / Kaplama</td>
                    {compareProducts.map((p) => (
                      <td key={p!.id} className="p-3 border-l border-stone-100">
                        {p!.color}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-600 bg-stone-50 sticky left-0 z-10 shadow-sm">Stok</td>
                    {compareProducts.map((p) => (
                      <td key={p!.id} className="p-3 border-l border-stone-100 text-emerald-700 font-bold">
                        {p!.stock} Adet
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-stone-600 bg-stone-50 sticky left-0 z-10 shadow-sm">Garanti</td>
                    {compareProducts.map((p) => (
                      <td key={p!.id} className="p-3 border-l border-stone-100">
                        {p!.warrantyYears || 2} Yıl
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
