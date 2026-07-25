import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, FREE_SHIPPING_LIMIT } from '../data/categories';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Truck,
  HelpCircle,
  PhoneCall,
  Sparkles,
  ArrowLeftRight,
  Layers,
  Sliders,
  GripHorizontal,
  DoorOpen,
  Columns,
  Grid,
  Shirt,
  Lock,
  Wrench,
  Lightbulb,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  cekmece: <Layers size={18} />,
  ray: <Sliders size={18} />,
  kulp: <GripHorizontal size={18} />,
  mentese: <DoorOpen size={18} />,
  ayak: <Columns size={18} />,
  raf: <Grid size={18} />,
  aski: <Shirt size={18} />,
  kilit: <Lock size={18} />,
  baglanti: <Wrench size={18} />,
  aydinlatma: <Lightbulb size={18} />,
};

interface HeaderProps {
  currentPath: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPath }) => {
  const {
    cartCount,
    wishlist,
    compareList,
    products,
    setIsAdvisorOpen,
    setIsCompareModalOpen,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Detect scroll to make header sticky & shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside search listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products for instant live search dropdown
  const filteredSuggestions = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLocaleLowerCase('tr').includes(searchQuery.toLocaleLowerCase('tr')) ||
            p.brand.toLocaleLowerCase('tr').includes(searchQuery.toLocaleLowerCase('tr')) ||
            p.cat.toLocaleLowerCase('tr').includes(searchQuery.toLocaleLowerCase('tr'))
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.hash = `#/arama/${encodeURIComponent(searchQuery.trim())}`;
      setIsSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200">
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <Truck className="w-4 h-4 text-amber-500" />
            <span>
              <strong className="text-white">{FREE_SHIPPING_LIMIT} TL</strong> ve üzeri
              siparişlerde <span className="text-emerald-400 font-bold">ÜCRETSİZ KARGO</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-stone-400">
            <a href="#/sayfa/kargo" className="hover:text-white transition-colors flex items-center gap-1">
              <Truck size={13} /> Kargo & İade
            </a>
            <a href="#/sayfa/sss" className="hover:text-white transition-colors flex items-center gap-1">
              <HelpCircle size={13} /> SSS
            </a>
            <a href="#/sayfa/iletisim" className="hover:text-white transition-colors flex items-center gap-1">
              <PhoneCall size={13} /> Destek Hattı
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div
        className={`bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            aria-label="Menüyü Aç"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Brand Logo */}
          <a href="#/" className="flex items-center gap-2 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-stone-900 text-amber-500 flex items-center justify-center font-black text-lg sm:text-xl shadow-md group-hover:scale-105 transition-transform">
              ◨
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-stone-900 font-serif">
                Mobi<span className="text-amber-700">Dolap</span>
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-stone-400 hidden sm:block">
                Dolap & Aparat Uzmanı
              </span>
            </div>
          </a>

          {/* Search Bar with Live Search (Desktop) */}
          <div ref={searchRef} className="relative flex-1 max-w-xl mx-2 hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Çekmece rayı, kulp, menteşe, LED veya marka ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-24 py-2.5 rounded-full bg-stone-100 border border-stone-200 text-sm focus:bg-white focus:outline-none focus:border-amber-600 focus:ring-4 focus:ring-amber-100 transition-all"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-stone-400" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-stone-900 hover:bg-amber-700 text-white text-xs font-semibold rounded-full transition-colors"
              >
                Ara
              </button>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {isSearchFocused && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2 text-[11px] font-bold uppercase tracking-wider text-stone-400 px-4 pt-3">
                  Önerilen Ürünler
                </div>
                <div className="divide-y divide-stone-100">
                  {filteredSuggestions.map((item) => (
                    <a
                      key={item.id}
                      href={`#/urun/${item.id}`}
                      onClick={() => setIsSearchFocused(false)}
                      className="flex items-center gap-3 p-3 hover:bg-amber-50/60 transition-colors"
                    >
                      <div className="w-10 h-10 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                        <div className="w-full h-full flex items-center justify-center font-bold text-xs text-stone-500">
                          {item.brand}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-stone-900 truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {item.brand} • {item.color}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-stone-900 whitespace-nowrap">
                        {item.price.toLocaleString('tr-TR')} ₺
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* AI Advisor Trigger */}
            <button
              onClick={() => setIsAdvisorOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100/80 font-semibold text-xs transition-all shadow-sm"
              title="Akıllı Dolap Danışmanı"
            >
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>Ray & Aparat Sihirbazı</span>
            </button>

            {/* Compare Drawer Trigger */}
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="relative p-2 sm:p-2.5 text-stone-700 hover:text-amber-800 hover:bg-amber-50 rounded-xl transition-colors"
              title="Karşılaştırma Listesi"
            >
              <ArrowLeftRight size={19} />
              {compareList.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <a
              href="#/favoriler"
              className="relative p-2 sm:p-2.5 text-stone-700 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              title="Favorilerim"
            >
              <Heart size={19} />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </a>

            {/* Account */}
            <a
              href="#/hesabim"
              className="p-2 sm:p-2.5 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-colors hidden sm:flex"
              title="Hesabım"
            >
              <User size={19} />
            </a>

            {/* Admin Panel Quick Access */}
            <a
              href="#/admin"
              className="px-2.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-amber-400 border border-amber-500/30 rounded-xl transition-all hidden xl:flex items-center gap-1.5 font-bold text-[11px] shadow-sm"
              title="Admin Paneli"
            >
              <ShieldCheck size={14} className="text-amber-400" />
              <span>Admin</span>
            </a>

            {/* Cart Button */}
            <a
              href="#/sepet"
              className="flex items-center gap-1.5 px-2.5 sm:pl-3 sm:pr-4 py-2 rounded-xl bg-stone-900 text-white hover:bg-amber-800 font-semibold text-xs transition-all shadow-sm"
            >
              <div className="relative">
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-500 text-stone-950 font-extrabold text-[10px] flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">Sepetim</span>
            </a>
          </div>
        </div>

        {/* Mobile Search Input with Live Search Dropdown */}
        <div className="px-3 pb-3 sm:hidden relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Aksesuar, kulp veya ray ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full pl-8 pr-4 py-2 rounded-xl bg-stone-100 text-xs border border-stone-200 focus:outline-none focus:border-amber-600"
            />
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-stone-400" />
          </form>

          {isSearchFocused && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-3 right-3 mt-1 bg-white rounded-2xl shadow-xl border border-stone-200 overflow-hidden z-50 animate-in fade-in duration-200">
              <div className="p-2 text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3 pt-2">
                Arama Sonuçları
              </div>
              <div className="divide-y divide-stone-100 max-h-56 overflow-y-auto">
                {filteredSuggestions.map((item) => (
                  <a
                    key={item.id}
                    href={`#/urun/${item.id}`}
                    onClick={() => setIsSearchFocused(false)}
                    className="flex items-center gap-2.5 p-2.5 hover:bg-amber-50/60 transition-colors"
                  >
                    <div className="w-8 h-8 bg-stone-100 rounded-md overflow-hidden shrink-0 flex items-center justify-center font-bold text-[10px] text-stone-500">
                      {item.brand}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-stone-900 truncate">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-stone-400">
                        {item.brand} • {item.color}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-amber-900 shrink-0">
                      {item.price.toLocaleString('tr-TR')} ₺
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Categories Navigation Bar */}
      <nav className="bg-stone-50 border-t border-stone-200/60 hidden lg:block overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 py-1">
          <a
            href="#/urunler"
            className={`flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
              currentPath === '#/urunler'
                ? 'bg-stone-900 text-white'
                : 'text-stone-800 hover:bg-stone-200/70'
            }`}
          >
            <Menu size={15} />
            <span>Tüm Ürünler</span>
          </a>

          <div className="h-4 w-px bg-stone-300 mx-1" />

          {CATEGORIES.map((cat) => {
            const isActive = currentPath === `#/kategori/${cat.slug}`;
            return (
              <a
                key={cat.slug}
                href={`#/kategori/${cat.slug}`}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-100 text-amber-900 font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                <span className="text-stone-500">
                  {CATEGORY_ICON_MAP[cat.slug] || <Layers size={16} />}
                </span>
                <span>{cat.name}</span>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex">
          <div className="w-4/5 max-w-sm bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
              <div className="flex items-center gap-2 font-serif font-bold text-lg">
                <span className="text-amber-500">◨</span> MobiDolap
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-stone-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 bg-amber-50 border-b border-amber-200/80">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAdvisorOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-amber-700 text-white font-bold text-xs rounded-xl shadow"
              >
                <Sparkles size={16} />
                <span>Ray & Aparat Sihirbazı</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100">
              <div className="pb-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                  Kategoriler
                </div>
                <a
                  href="#/urunler"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-2 text-sm font-semibold text-stone-800 hover:bg-stone-100 rounded-lg"
                >
                  <span className="flex items-center gap-2.5">
                    <Menu size={16} /> Tüm Ürün Kataloğu
                  </span>
                  <ChevronRight size={16} className="text-stone-400" />
                </a>

                {CATEGORIES.map((cat) => (
                  <a
                    key={cat.slug}
                    href={`#/kategori/${cat.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-2 text-sm text-stone-700 hover:bg-stone-100 rounded-lg"
                  >
                    <span className="flex items-center gap-2.5">
                      {CATEGORY_ICON_MAP[cat.slug] || <Layers size={16} />}
                      {cat.name}
                    </span>
                    <ChevronRight size={16} className="text-stone-400" />
                  </a>
                ))}
              </div>

              <div className="pt-3 flex flex-col gap-1">
                <a
                  href="#/hesabim"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2.5 px-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg flex items-center gap-2"
                >
                  <User size={18} /> Hesabım / Siparişlerim
                </a>
                <a
                  href="#/favoriler"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2.5 px-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg flex items-center gap-2"
                >
                  <Heart size={18} /> Favorilerim ({wishlist.length})
                </a>
                <a
                  href="#/sayfa/hakkimizda"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2.5 px-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-lg flex items-center gap-2"
                >
                  <ShieldCheck size={18} /> Hakkımızda & Garanti
                </a>
              </div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
