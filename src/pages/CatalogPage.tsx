import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';
import { CategorySlug, ProductBadge } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductImage } from '../components/ProductImage';
import { StarRating } from '../components/StarRating';
import {
  SlidersHorizontal,
  X,
  Grid,
  List,
  ChevronRight,
  Search,
  ShoppingCart,
  Heart,
  RotateCcw,
} from 'lucide-react';

interface CatalogPageProps {
  categorySlug?: CategorySlug | null;
  searchQuery?: string;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  categorySlug,
  searchQuery,
}) => {
  const { products, addToCart, toggleWishlist, isInWishlist } = useStore();

  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedBadge, setSelectedBadge] = useState<ProductBadge | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<
    'featured' | 'price-asc' | 'price-desc' | 'rating' | 'new'
  >('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Derive title & Category Object
  const currentCategory = categorySlug
    ? CATEGORIES.find((c) => c.slug === categorySlug)
    : null;

  const pageTitle = currentCategory
    ? currentCategory.name
    : searchQuery
    ? `“${searchQuery}” için Arama Sonuçları`
    : 'Tüm Ürün Kataloğu';

  // Base pool of items before specific sidebar filters
  const basePool = useMemo(() => {
    let pool = [...products];

    if (categorySlug) {
      pool = pool.filter((p) => p.cat === categorySlug);
    }

    if (searchQuery) {
      const q = searchQuery.toLocaleLowerCase('tr');
      pool = pool.filter(
        (p) =>
          p.name.toLocaleLowerCase('tr').includes(q) ||
          p.brand.toLocaleLowerCase('tr').includes(q) ||
          p.color.toLocaleLowerCase('tr').includes(q) ||
          p.desc.toLocaleLowerCase('tr').includes(q)
      );
    }

    return pool;
  }, [products, categorySlug, searchQuery]);

  // Unique brands in current pool
  const availableBrands = useMemo(() => {
    return Array.from(new Set(basePool.map((p) => p.brand))).sort();
  }, [basePool]);

  // Max price in base pool
  const maxPoolPrice = useMemo(() => {
    if (!basePool.length) return 1000;
    return Math.ceil(Math.max(...basePool.map((p) => p.price)) / 50) * 50;
  }, [basePool]);

  // Filtered & Sorted items
  const filteredProducts = useMemo(() => {
    let list = [...basePool];

    if (selectedBrands.length > 0) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedBadge) {
      list = list.filter((p) => p.badge === selectedBadge);
    }

    if (maxPrice < maxPoolPrice) {
      list = list.filter((p) => p.price <= maxPrice);
    }

    if (inStockOnly) {
      list = list.filter((p) => p.stock > 0);
    }

    // Sort
    switch (sortOption) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'new':
        list.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
        break;
      default:
        break;
    }

    return list;
  }, [basePool, selectedBrands, selectedBadge, maxPrice, maxPoolPrice, inStockOnly, sortOption]);

  // Pagination
  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleBrandFilter = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedBadge(null);
    setMaxPrice(maxPoolPrice);
    setInStockOnly(false);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
        <a href="#/" className="hover:text-amber-800 transition-colors">
          Anasayfa
        </a>
        <ChevronRight size={12} />
        {currentCategory ? (
          <>
            <a href="#/urunler" className="hover:text-amber-800 transition-colors">
              Tüm Ürünler
            </a>
            <ChevronRight size={12} />
            <span className="text-stone-900 font-bold">{currentCategory.name}</span>
          </>
        ) : (
          <span className="text-stone-900 font-bold">{pageTitle}</span>
        )}
      </nav>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            {pageTitle}
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Toplam <strong className="text-stone-900">{filteredProducts.length}</strong> ürün
            listeleniyor.
          </p>
        </div>

        {/* Tools Bar */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="lg:hidden px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <SlidersHorizontal size={16} />
            <span>Filtreler</span>
          </button>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow text-stone-900' : 'text-stone-400'
              }`}
              title="Izgara Görünümü"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white shadow text-stone-900' : 'text-stone-400'
              }`}
              title="Liste Görünümü"
            >
              <List size={16} />
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="hidden sm:inline font-medium">Sırala:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-900 focus:outline-none focus:border-amber-600 cursor-pointer"
            >
              <option value="featured">Öne Çıkanlar</option>
              <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
              <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
              <option value="rating">Müşteri Puanı</option>
              <option value="new">En Yeniler</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(selectedBrands.length > 0 || selectedBadge || inStockOnly) && (
        <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
          <span className="text-stone-500 font-medium">Aktif Filtreler:</span>
          {selectedBrands.map((b) => (
            <span
              key={b}
              className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-semibold flex items-center gap-1.5"
            >
              Marka: {b}
              <button onClick={() => toggleBrandFilter(b)} className="hover:text-rose-600">
                <X size={12} />
              </button>
            </span>
          ))}
          {selectedBadge && (
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-semibold flex items-center gap-1.5">
              Etiket: {selectedBadge}
              <button onClick={() => setSelectedBadge(null)} className="hover:text-rose-600">
                <X size={12} />
              </button>
            </span>
          )}
          {inStockOnly && (
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-semibold flex items-center gap-1.5">
              Sadece Stoktakiler
              <button onClick={() => setInStockOnly(false)} className="hover:text-rose-600">
                <X size={12} />
              </button>
            </span>
          )}
          <button
            onClick={clearFilters}
            className="text-amber-800 hover:underline font-bold text-xs ml-2"
          >
            Tümünü Temizle
          </button>
        </div>
      )}

      {/* Main Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters Component */}
        <aside
          className={`fixed lg:relative inset-0 z-40 lg:z-auto bg-stone-900/60 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-4 lg:p-0 transition-all ${
            isMobileFilterOpen ? 'flex justify-start' : 'hidden lg:block'
          }`}
        >
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm w-full max-w-xs lg:max-w-none space-y-6 max-h-[85vh] lg:max-h-none overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-amber-700" />
                Filtrele
              </h3>
              <button
                onClick={clearFilters}
                className="text-xs text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1"
              >
                <RotateCcw size={12} /> Temizle
              </button>
            </div>

            {/* Category Quick Links */}
            {!categorySlug && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Kategoriler
                </h4>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <a
                      key={cat.slug}
                      href={`#/kategori/${cat.slug}`}
                      className="block text-xs text-stone-700 hover:text-amber-800 font-medium py-1 px-2 hover:bg-stone-50 rounded-lg transition-colors"
                    >
                      {cat.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Brand Filter */}
            {availableBrands.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Marka
                </h4>
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {availableBrands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2 text-xs text-stone-700 font-medium cursor-pointer hover:text-stone-900"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrandFilter(brand)}
                        className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 accent-amber-600"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price Slider */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-400 uppercase tracking-wider">
                  Maksimum Fiyat
                </span>
                <span className="font-extrabold text-amber-800">{maxPrice} ₺</span>
              </div>
              <input
                type="range"
                min="50"
                max={maxPoolPrice}
                step="20"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>50 ₺</span>
                <span>{maxPoolPrice} ₺</span>
              </div>
            </div>

            {/* Badges Filter */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                Fırsat Etiketi
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'İndirim', label: 'İndirimli' },
                  { id: 'Yeni', label: 'Yeni Ürün' },
                  { id: 'Çok Satan', label: 'Çok Satan' },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setSelectedBadge(selectedBadge === b.id ? null : (b.id as any));
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      selectedBadge === b.id
                        ? 'bg-amber-800 text-white border-amber-800'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pt-2 border-t border-stone-100">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-stone-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => {
                    setInStockOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4 accent-amber-600"
                />
                <span>Sadece Stokta Olanlar</span>
              </label>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="lg:hidden w-full py-2.5 bg-stone-900 text-white font-bold text-xs rounded-xl mt-4"
            >
              Filtreleri Uygula
            </button>
          </div>
        </aside>

        {/* Product Results */}
        <main className="lg:col-span-3 space-y-8">
          {paginatedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 border border-stone-200 text-center space-y-4">
              <Search className="w-12 h-12 mx-auto text-stone-300" />
              <h3 className="font-bold text-stone-900 text-lg">Ürün Bulunamadı</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Seçtiğiniz filtre kriterlerine uygun ürün bulunamadı. Filtreleri temizleyerek tekrar
                deneyebilirsiniz.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-amber-700 transition-colors"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginatedProducts.map((product) => {
                const isFav = isInWishlist(product.id);
                return (
                  <div
                    key={product.id}
                    className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-6 hover:shadow-lg transition-all"
                  >
                    <div className="w-full sm:w-40 aspect-[4/3] bg-stone-100 rounded-xl overflow-hidden shrink-0">
                      <ProductImage product={product} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 space-y-1.5 min-w-0">
                      <div className="text-[10px] uppercase font-bold text-amber-800">
                        {product.brand} • {product.color}
                      </div>
                      <h3 className="font-bold text-stone-900 text-sm hover:text-amber-800">
                        <a href={`#/urun/${product.id}`}>{product.name}</a>
                      </h3>
                      <StarRating rating={product.rating} reviewsCount={product.reviews} />
                      <p className="text-xs text-stone-500 line-clamp-2">{product.desc}</p>
                    </div>

                    <div className="sm:text-right flex sm:flex-col justify-between items-end gap-3 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-stone-100">
                      <div>
                        {product.oldPrice && (
                          <span className="text-xs text-stone-400 line-through block">
                            {product.oldPrice.toLocaleString('tr-TR')} ₺
                          </span>
                        )}
                        <span className="text-lg font-extrabold text-stone-900">
                          {product.price.toLocaleString('tr-TR')} ₺
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`p-2.5 rounded-xl border ${
                            isFav ? 'bg-rose-50 text-rose-600' : 'bg-stone-50 text-stone-600'
                          }`}
                        >
                          <Heart size={16} className={isFav ? 'fill-current' : ''} />
                        </button>
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="px-4 py-2 bg-stone-900 hover:bg-amber-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
                        >
                          <ShoppingCart size={15} /> Sepete Ekle
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-10 h-10 rounded-xl font-bold text-xs transition-colors ${
                    currentPage === page
                      ? 'bg-stone-900 text-white shadow'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
