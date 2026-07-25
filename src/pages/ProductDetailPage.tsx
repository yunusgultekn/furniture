import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import { MOCK_REVIEWS } from '../data/products';
import { ProductImage } from '../components/ProductImage';
import { StarRating } from '../components/StarRating';
import { ProductCard } from '../components/ProductCard';
import {
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  ArrowLeftRight,
  Ruler,
  Star,
  MessageSquare,
  Wrench,
  Share2,
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    isInCompare,
    showToast,
  } = useStore();

  const product = products.find((p) => p.id === productId);

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'guide' | 'reviews'>('desc');
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Bundle product for "Frequently Bought Together"
  const complementaryProduct = products.find(
    (p) => p.cat === product.cat && p.id !== product.id
  ) || products.find((p) => p.id !== product.id);

  // Review submission state
  const [reviewsList, setReviewsList] = useState(
    MOCK_REVIEWS.filter((r) => r.productId === productId || productId === 'P001')
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-900 font-serif">Ürün Bulunamadı</h2>
        <p className="text-xs text-stone-500">Aradığınız ürün mevcut değil veya kaldırılmış olabilir.</p>
        <a
          href="#/urunler"
          className="inline-block px-6 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl"
        >
          Kataloğa Dön
        </a>
      </div>
    );
  }

  const isFav = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const category = CATEGORIES.find((c) => c.slug === product.cat);
  const relatedProducts = products.filter((p) => p.cat === product.cat && p.id !== product.id).slice(0, 4);

  const discountPercent = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewName && newReviewComment) {
      const createdReview = {
        id: 'R' + Date.now(),
        productId: product.id,
        userName: newReviewName,
        rating: newReviewRating,
        date: 'Bugün',
        comment: newReviewComment,
        verifiedPurchase: true,
      };
      setReviewsList([createdReview, ...reviewsList]);
      showToast('Yorumunuz başarıyla gönderildi, teşekkürler!', 'success');
      setIsReviewModalOpen(false);
      setNewReviewName('');
      setNewReviewComment('');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Ürün bağlantısı panoya kopyalandı!', 'info');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <a href="#/" className="hover:text-amber-800">
          Anasayfa
        </a>
        <ChevronRight size={12} />
        <a href="#/urunler" className="hover:text-amber-800">
          Tüm Ürünler
        </a>
        <ChevronRight size={12} />
        <a href={`#/kategori/${product.cat}`} className="hover:text-amber-800">
          {category?.name || product.cat}
        </a>
        <ChevronRight size={12} />
        <span className="text-stone-900 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* PDP Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div 
            onClick={() => setIsLightboxOpen(true)}
            className="relative aspect-[4/3] bg-stone-100 rounded-3xl overflow-hidden border border-stone-200 shadow-sm cursor-zoom-in group"
          >
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white bg-amber-700 shadow">
                {product.badge}
              </span>
            )}
            <ProductImage product={product} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-3 py-1.5 rounded-full bg-white/90 text-stone-900 font-bold text-xs shadow-md backdrop-blur-sm">
                Büyütmek İçin Tıklayın
              </span>
            </div>
          </div>

          {/* Thumbnail Selectors */}
          <div className="flex gap-3">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setSelectedThumbIndex(idx)}
                className={`w-20 aspect-[4/3] rounded-xl overflow-hidden border-2 bg-stone-100 transition-all ${
                  selectedThumbIndex === idx
                    ? 'border-amber-600 ring-2 ring-amber-500/20'
                    : 'border-stone-200 opacity-70 hover:opacity-100'
                }`}
              >
                <ProductImage product={product} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Information & Buy Box */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80">
                {product.brand}
              </span>
              <span className="text-xs text-stone-400 font-medium">Ürün Kodu: {product.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 leading-snug">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 pt-1">
              <StarRating rating={product.rating} reviewsCount={product.reviews} size={16} />
              <span className="text-stone-300">|</span>
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <Check size={14} /> Stokta Var ({product.stock} Adet)
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-stone-900 tracking-tight">
                {product.price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-base text-stone-400 line-through">
                    {product.oldPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-rose-700 bg-rose-100">
                    %{discountPercent} İndirim
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-stone-500 font-medium">
              KDV Dahil • 750 TL ve Üzeri Ücretsiz Kargo
            </p>
          </div>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{product.desc}</p>

          {/* Key Attributes */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white border border-stone-200 rounded-xl">
              <span className="text-stone-400 text-[10px] block uppercase font-bold">
                Renk / Kaplama
              </span>
              <span className="font-bold text-stone-800">{product.color}</span>
            </div>
            <div className="p-3 bg-white border border-stone-200 rounded-xl">
              <span className="text-stone-400 text-[10px] block uppercase font-bold">
                Garanti Süresi
              </span>
              <span className="font-bold text-stone-800">
                {product.warrantyYears || 2} Yıl Resmi Garanti
              </span>
            </div>
          </div>

          {/* Quantity & Purchase Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center gap-2 flex-1">
                {/* Quantity Selector */}
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-stone-50 h-12">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 text-stone-600 hover:bg-stone-200 font-bold text-sm h-full"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={qty}
                    onChange={(e) =>
                      setQty(
                        Math.max(
                          1,
                          Math.min(product.stock, parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className="w-10 text-center text-xs font-bold bg-transparent focus:outline-none"
                  />
                  <button
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    className="px-3 text-stone-600 hover:bg-stone-200 font-bold text-sm h-full"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(product, qty)}
                  className="flex-1 h-12 px-4 sm:px-6 rounded-xl bg-stone-900 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                >
                  <ShoppingCart size={18} />
                  <span>Sepete Ekle ({(product.price * qty).toLocaleString('tr-TR')} ₺)</span>
                </button>
              </div>

              {/* Action Icons Bar */}
              <div className="grid grid-cols-3 sm:flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`h-11 sm:h-12 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition-colors ${
                    isFav
                      ? 'bg-rose-50 text-rose-600 border-rose-200 font-bold'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                  }`}
                  title="Favorilere Ekle"
                >
                  <Heart size={18} className={isFav ? 'fill-current' : ''} />
                  <span className="text-[11px] font-semibold sm:hidden">Favori</span>
                </button>

                <button
                  onClick={() => toggleCompare(product.id)}
                  className={`h-11 sm:h-12 px-3 rounded-xl border flex items-center justify-center gap-1.5 transition-colors ${
                    isCompared
                      ? 'bg-amber-50 text-amber-700 border-amber-300 font-bold'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                  }`}
                  title="Karşılaştır"
                >
                  <ArrowLeftRight size={18} />
                  <span className="text-[11px] font-semibold sm:hidden">Kıyasla</span>
                </button>

                <button
                  onClick={handleShare}
                  className="h-11 sm:h-12 px-3 rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 flex items-center justify-center gap-1.5 transition-colors"
                  title="Paylaş"
                >
                  <Share2 size={18} />
                  <span className="text-[11px] font-semibold sm:hidden">Paylaş</span>
                </button>
              </div>
            </div>
          </div>

          {/* Perks Bar */}
          <div className="pt-4 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px] text-stone-600 font-medium">
            <div className="flex items-center gap-2 bg-stone-50 sm:bg-transparent p-2 sm:p-0 rounded-xl">
              <Truck size={16} className="text-amber-700 shrink-0" />
              <span>1 İş Gününde Kargo</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-50 sm:bg-transparent p-2 sm:p-0 rounded-xl">
              <ShieldCheck size={16} className="text-amber-700 shrink-0" />
              <span>%100 Orijinal Ürün</span>
            </div>
            <div className="flex items-center gap-2 bg-stone-50 sm:bg-transparent p-2 sm:p-0 rounded-xl">
              <RotateCcw size={16} className="text-amber-700 shrink-0" />
              <span>14 Gün Kolay İade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together Bundle Deal */}
      {complementaryProduct && (
        <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-700 text-white">
              Paket Fırsatı
            </span>
            <h3 className="font-bold text-stone-900 text-sm sm:text-base font-serif">
              Birlikte Sık Alınan Tamamlayıcı Ürün
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Product 1 */}
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-2xl border border-stone-200 shrink-0">
                <div className="w-12 h-12 bg-stone-100 rounded-xl overflow-hidden shrink-0">
                  <ProductImage product={product} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-stone-900 line-clamp-1">{product.name}</div>
                  <div className="text-amber-800 font-bold">{product.price.toLocaleString('tr-TR')} ₺</div>
                </div>
              </div>

              <span className="font-extrabold text-stone-400 text-lg">+</span>

              {/* Product 2 */}
              <div className="flex items-center gap-2 bg-white p-2.5 rounded-2xl border border-stone-200 shrink-0">
                <div className="w-12 h-12 bg-stone-100 rounded-xl overflow-hidden shrink-0">
                  <ProductImage product={complementaryProduct} className="w-full h-full object-cover" />
                </div>
                <div className="text-xs">
                  <div className="font-bold text-stone-900 line-clamp-1">{complementaryProduct.name}</div>
                  <div className="text-amber-800 font-bold">{complementaryProduct.price.toLocaleString('tr-TR')} ₺</div>
                </div>
              </div>
            </div>

            {/* Bundle Buy Action */}
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-amber-200">
              <div className="text-left sm:text-right">
                <div className="text-[10px] text-stone-500 line-through">
                  {(product.price + complementaryProduct.price).toLocaleString('tr-TR')} ₺
                </div>
                <div className="text-base font-extrabold text-amber-900">
                  {((product.price + complementaryProduct.price) * 0.9).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                </div>
                <div className="text-[10px] font-bold text-emerald-700">%10 Paket İndirimi</div>
              </div>

              <button
                onClick={() => {
                  addToCart(product, 1);
                  addToCart(complementaryProduct, 1);
                  showToast('Paket ürünlerinin ikisi de sepete eklendi!', 'success');
                }}
                className="px-5 py-3 bg-stone-900 hover:bg-amber-800 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all shrink-0"
              >
                <ShoppingCart size={16} />
                <span>2'sini Birlikte Ekle</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs Section */}
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="flex border-b border-stone-200 bg-stone-50 overflow-x-auto">
          {[
            { id: 'desc', label: 'Ürün Açıklaması' },
            { id: 'specs', label: 'Teknik Özellikler' },
            { id: 'guide', label: 'Montaj & Ölçü Rehberi' },
            { id: 'reviews', label: `Değerlendirmeler (${reviewsList.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 text-xs font-bold transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-amber-700 text-amber-900 bg-white'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-8">
          {activeTab === 'desc' && (
            <div className="space-y-4 text-stone-700 text-xs sm:text-sm leading-relaxed max-w-4xl">
              <p>{product.desc}</p>
              <p>
                Bu ürün <strong>{product.brand}</strong> yüksek kalite standartlarında üretilmiş olup,
                mobilyanızın kullanım ömrünü uzatır ve günlük kullanım konforunuzu artırır.
              </p>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 mt-4">
                <h4 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                  Neden Orijinal {product.brand} Donanımı?
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-stone-600">
                  <li>Yüksek mukavemetli alaşım ve korozyona dayanıklı yüzey kaplaması</li>
                  <li>Sessiz ve pürüzsüz mekanik çalışma testi (100.000+ açma/kapama garantisi)</li>
                  <li>Uluslararası standartlarda montaj şablonu ve delik eksenleri</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <table className="w-full text-xs text-left border-collapse">
                <tbody className="divide-y divide-stone-200">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <tr key={key}>
                      <td className="py-3 px-4 font-bold text-stone-500 bg-stone-50 w-1/3">
                        {key}
                      </td>
                      <td className="py-3 px-4 font-semibold text-stone-900">{val}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-3 px-4 font-bold text-stone-500 bg-stone-50">Marka</td>
                    <td className="py-3 px-4 font-semibold text-stone-900">{product.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-stone-500 bg-stone-50">Ürün Kodu</td>
                    <td className="py-3 px-4 font-semibold text-stone-900">{product.id}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs">
                <Ruler className="w-6 h-6 text-amber-700 shrink-0" />
                <div>
                  <strong>Montaj İpucu:</strong> Çekmece rayı siparişi vermeden önce dolabınızın iç net
                  derinliğini metre ile ölçün.
                </div>
              </div>

              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-3 text-xs text-stone-700">
                <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <Wrench size={16} className="text-amber-700" /> Montaj Şeması & Adımları
                </h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Gövde iç yan duvarındaki delik eksenlerini şablona göre işaretleyin.</li>
                  <li>Ray veya menteşe tabanını M4 vidalarla sabitleyin.</li>
                  <li>Çekmece veya kapağı yuvaya oturtup klipsin "tık" sesini duyun.</li>
                  <li>Eksantrik ayar vidaları ile kapak aralık simetrisini tamamlayın.</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-200">
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-extrabold text-stone-900 font-serif">
                    {product.rating.toFixed(1)}
                  </div>
                  <div>
                    <StarRating rating={product.rating} showText={false} size={18} />
                    <span className="text-xs text-stone-500 block mt-1">
                      {reviewsList.length} gerçek müşteri değerlendirmesi
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow"
                >
                  <MessageSquare size={16} /> Değerlendirme Yap
                </button>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900 text-xs">{rev.userName}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                            Doğrulanmış Alıcı
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-400">{rev.date}</span>
                    </div>

                    <StarRating rating={rev.rating} showText={false} size={13} />
                    <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <h3 className="font-bold text-stone-900 text-base">Ürün Değerlendirmesi Yap</h3>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Puanınız</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform"
                    >
                      <Star
                        size={24}
                        className={star <= newReviewRating ? 'fill-current' : 'text-stone-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Adınız Soyadınız*</label>
                <input
                  type="text"
                  required
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="Örn: Ahmet Y."
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Yorumunuz*</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Ürün kalitesi, montaj kolaylığı ve kargo hızı hakkındaki görüşleriniz..."
                  className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 text-stone-600 font-bold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 text-white font-bold rounded-xl hover:bg-amber-700"
                >
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-stone-200">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
            Benzer & Tamamlayıcı Ürünler
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Image Preview Modal */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-4xl max-h-[85vh] w-full bg-white rounded-3xl p-3 overflow-hidden shadow-2xl flex items-center justify-center border border-stone-200"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-900 hover:bg-amber-700 text-white font-bold flex items-center justify-center shadow-lg transition-colors"
            >
              ✕
            </button>
            <ProductImage product={product} className="max-h-[80vh] w-auto object-contain rounded-2xl" />
          </div>
        </div>
      )}
    </div>
  );
};
