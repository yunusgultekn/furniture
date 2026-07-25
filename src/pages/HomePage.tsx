import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, BRANDS, FREE_SHIPPING_LIMIT } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { ProductImage } from '../components/ProductImage';
import {
  Sparkles,
  ArrowRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Flame,
  Tag,
  ChevronRight,
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
} from 'lucide-react';

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  cekmece: <Layers size={28} />,
  ray: <Sliders size={28} />,
  kulp: <GripHorizontal size={28} />,
  mentese: <DoorOpen size={28} />,
  ayak: <Columns size={28} />,
  raf: <Grid size={28} />,
  aski: <Shirt size={28} />,
  kilit: <Lock size={28} />,
  baglanti: <Wrench size={28} />,
  aydinlatma: <Lightbulb size={28} />,
};

export const HomePage: React.FC = () => {
  const { products, setIsAdvisorOpen } = useStore();

  const bestSellers = products.filter((p) => p.badge === 'Çok Satan').slice(0, 4);
  const deals = products.filter((p) => p.badge === 'İndirim').slice(0, 4);
  const newArrivals = products.filter((p) => p.badge === 'Yeni' || p.new).slice(0, 4);

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/70 via-stone-50 to-amber-100/30 text-stone-900 rounded-3xl mx-4 lg:mx-8 my-4 border border-stone-200/90 shadow-xl shadow-stone-200/50">
        {/* Subtle Background Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-stone-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300/80 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles size={14} className="text-amber-700 animate-spin" />
              <span>Dolap & Aparat Uzmanı</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif leading-[1.15] tracking-tight text-stone-900">
              Dolabınızın her parçası <br />
              <em className="italic text-amber-800 font-serif not-italic">tek adreste.</em>
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
              Çekmeceden menteşeye, gizli frenli raydan kulpa, dolap ayaklarından sensörlü LED
              aydınlatmaya kadar orijinal Blum, Hettich ve Samet aksesuarları. Hızlı kargo, 2 yıl
              garanti.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#/urunler"
                className="px-6 py-3.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-700/20 transition-all hover:-translate-y-0.5"
              >
                <span>Alışverişe Başla</span>
                <ArrowRight size={16} />
              </a>

              <button
                onClick={() => setIsAdvisorOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all hover:-translate-y-0.5"
              >
                <Sparkles size={16} className="text-amber-700" />
                <span>Ray & Ölçü Sihirbazı</span>
              </button>
            </div>

            {/* Quick Stats Banner */}
            <div className="pt-8 grid grid-cols-3 gap-6 border-t border-stone-200/90 text-stone-600">
              <div>
                <strong className="block text-xl sm:text-2xl font-serif text-amber-900 font-black">
                  {products.length}+
                </strong>
                <span className="text-[11px] text-stone-500 font-medium">Ürün Çeşidi</span>
              </div>
              <div>
                <strong className="block text-xl sm:text-2xl font-serif text-amber-900 font-black">
                  {BRANDS.length}
                </strong>
                <span className="text-[11px] text-stone-500 font-medium">Global Marka</span>
              </div>
              <div>
                <strong className="block text-xl sm:text-2xl font-serif text-amber-900 font-black">
                  2 Yıl
                </strong>
                <span className="text-[11px] text-stone-500 font-medium">Birebir Garanti</span>
              </div>
            </div>
          </div>

          {/* Right Showcase Cards Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm">
              <div className="bg-white/95 border border-stone-200/90 rounded-3xl p-4 shadow-xl shadow-stone-300/40 backdrop-blur-md transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[4/3] rounded-2xl bg-stone-100 overflow-hidden relative mb-3">
                  <ProductImage product={products[0]} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-amber-700 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    Öne Çıkan Set
                  </span>
                </div>

                <div className="px-2">
                  <div className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                    {products[0].brand}
                  </div>
                  <h3 className="font-bold text-stone-900 text-sm truncate">{products[0].name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-amber-800 font-extrabold text-lg">
                      {products[0].price.toLocaleString('tr-TR')} ₺
                    </span>
                    <a
                      href={`#/urun/${products[0].id}`}
                      className="px-3.5 py-1.5 bg-stone-900 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                    >
                      İncele
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating secondary chip card */}
              <div className="hidden sm:flex absolute -bottom-6 -left-8 bg-white text-stone-900 p-3.5 rounded-2xl shadow-xl border border-stone-200 items-center gap-3 animate-bounce duration-1000">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                  <Truck size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold">{FREE_SHIPPING_LIMIT} TL Üzeri</div>
                  <div className="text-[10px] text-emerald-700 font-bold">Kargo Ücretsiz</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Strip */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">Ücretsiz Kargo</h4>
              <p className="text-xs text-stone-500">{FREE_SHIPPING_LIMIT} TL ve üzeri siparişlerde</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">Kolay İade</h4>
              <p className="text-xs text-stone-500">14 gün içinde koşulsuz iade</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">2 Yıl Birebir Garanti</h4>
              <p className="text-xs text-stone-500">Tüm mekanik parçalarda geçerli</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stone-200 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Headphones size={24} />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-sm">Uzman Danışmanlık</h4>
              <p className="text-xs text-stone-500">Montaj ve ölçü desteği hattı</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              Kategoriler
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              Ne Arıyorsunuz?
            </h2>
          </div>

          <a
            href="#/urunler"
            className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 group"
          >
            <span>Tüm Kataloğu Gör</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.cat === cat.slug).length;
            return (
              <a
                key={cat.slug}
                href={`#/kategori/${cat.slug}`}
                className="group p-5 bg-white border border-stone-200 rounded-2xl flex flex-col justify-between hover:border-amber-500 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:bg-amber-700 group-hover:text-white transition-colors">
                  {CATEGORY_ICON_MAP[cat.slug] || <Layers size={24} />}
                </div>

                <div>
                  <h3 className="font-bold text-stone-900 text-sm group-hover:text-amber-800 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-1 line-clamp-1">{cat.desc}</p>
                  <span className="inline-block mt-3 text-[10px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                    {count} Ürün
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Promo Banner Strips */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative rounded-3xl bg-gradient-to-br from-rose-50 via-amber-50/40 to-white text-stone-900 p-8 overflow-hidden shadow-lg border border-rose-200/80 flex flex-col justify-between min-h-[220px]">
          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold uppercase tracking-wider border border-rose-200 shadow-sm">
              <Flame size={12} className="text-rose-600" /> Sezon Fırsatı
            </span>
            <h3 className="text-2xl font-bold font-serif leading-snug text-stone-900">
              Çekmece Raylarında <br />
              <span className="text-rose-700 font-extrabold">%25'e Varan Özel İndirim</span>
            </h3>
          </div>

          <div className="pt-6 relative z-10">
            <a
              href="#/kategori/ray"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl transition-colors shadow-md"
            >
              <span>Rayları İncele</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="relative rounded-3xl bg-gradient-to-br from-amber-100/80 via-stone-50 to-amber-50 text-stone-900 p-8 overflow-hidden shadow-lg border border-amber-200/90 flex flex-col justify-between min-h-[220px]">
          <div className="relative z-10 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200/80 text-amber-950 text-[11px] font-bold uppercase tracking-wider border border-amber-300/80 shadow-sm">
              <Sparkles size={12} className="text-amber-700" /> Yeni Nesil Aydınlatma
            </span>
            <h3 className="text-2xl font-bold font-serif leading-snug text-stone-900">
              Sensörlü Şarjlı LED <br />
              <span className="text-amber-800 font-extrabold">Dolap İçi Işık Çözümleri</span>
            </h3>
          </div>

          <div className="pt-6 relative z-10">
            <a
              href="#/kategori/aydinlatma"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-extrabold text-xs rounded-xl transition-colors shadow-md"
            >
              <span>Aydınlatmaları İncele</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1 mb-1">
              <Flame size={14} /> En Çok Tercih Edilenler
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              Çok Satan Ürünler
            </h2>
          </div>

          <a
            href="#/urunler"
            className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            <span>Tümünü Gör</span>
            <ChevronRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Special Deals */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1 mb-1">
              <Tag size={14} /> İndirimli Fiyatlar
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              Fırsat Ürünleri
            </h2>
          </div>

          <a
            href="#/urunler"
            className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            <span>Tümünü Gör</span>
            <ChevronRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Brand Partners Marquee */}
      <section className="bg-stone-100 border-y border-stone-200 py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400">
            Resmi Yetkili Distribütörlüklerimiz
          </span>
        </div>

        <div className="flex justify-around items-center gap-8 max-w-6xl mx-auto flex-wrap px-4">
          {BRANDS.map((brand) => (
            <div
              key={brand}
              className="text-stone-400 hover:text-stone-800 font-serif font-black text-xl sm:text-2xl tracking-wider transition-colors cursor-default"
            >
              {brand}
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1 mb-1">
              <Sparkles size={14} /> Yeni Katalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              Yeni Gelen Ürünler
            </h2>
          </div>

          <a
            href="#/urunler"
            className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1"
          >
            <span>Tümünü Gör</span>
            <ChevronRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};
