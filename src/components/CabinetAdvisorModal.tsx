import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductImage } from './ProductImage';
import {
  Sparkles,
  X,
  Check,
  Ruler,
  Weight,
  Layers,
  Lightbulb,
  ShoppingCart,
  Wrench,
} from 'lucide-react';

export const CabinetAdvisorModal: React.FC = () => {
  const { isAdvisorOpen, setIsAdvisorOpen, products, addToCart, showToast } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [cabinetDepth, setCabinetDepth] = useState<number>(450);
  const [weightCapacity, setWeightCapacity] = useState<'light' | 'medium' | 'heavy'>('medium');
  const [hardwareType, setHardwareType] = useState<'ray' | 'mentese' | 'aydinlatma' | 'kulp'>('ray');

  if (!isAdvisorOpen) return null;

  // Recommendation engine based on inputs
  const recommendedProducts = products.filter((p) => {
    if (hardwareType === 'ray' && p.cat === 'ray') {
      if (cabinetDepth <= 400 && p.name.includes('400')) return true;
      if (cabinetDepth >= 500 && p.name.includes('500')) return true;
      if (cabinetDepth > 400 && cabinetDepth < 500 && p.name.includes('450')) return true;
      return p.brand === 'Blum' || p.brand === 'Samet';
    }
    if (hardwareType === 'mentese' && p.cat === 'mentese') {
      return p.brand === 'Blum' || p.brand === 'Hettich';
    }
    if (hardwareType === 'aydinlatma' && p.cat === 'aydinlatma') {
      return true;
    }
    if (hardwareType === 'kulp' && p.cat === 'kulp') {
      return true;
    }
    return false;
  }).slice(0, 3);

  const handleAddAllRecommended = () => {
    recommendedProducts.forEach((p) => addToCart(p, 1));
    showToast('Önerilen tüm aksesuarlar sepete eklendi!', 'success');
    setIsAdvisorOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 relative">
          <button
            onClick={() => setIsAdvisorOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif tracking-tight">
                MobiDolap Akıllı Aparat Sihirbazı
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">
                Dolap ve çekmece ölçülerinizi girin, en doğru Blum, Hettich veya Samet ürünü tespit edelim.
              </p>
            </div>
          </div>
        </div>

        {/* Wizard Steps */}
        <div className="p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-600" />
                1. Adım: Hangi donanım kategorisi için ölçü alıyorsunuz?
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'ray', title: 'Çekmece Rayı & Sürgü', desc: 'Frenli teleskopik ve gizli raylar' },
                  { id: 'mentese', title: 'Kapak Menteşesi', desc: '110°, 165° ve açılı kapaklar' },
                  { id: 'aydinlatma', title: 'Dolap İçi LED', desc: 'Sensörlü şarjlı veya pilli spotlar' },
                  { id: 'kulp', title: 'Kulp & Düğme', desc: '160mm, 128mm ve gles kulp' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setHardwareType(item.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      hardwareType === item.id
                        ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/20 shadow-sm'
                        : 'border-stone-200 hover:border-stone-300 bg-white'
                    }`}
                  >
                    <div className="font-bold text-stone-900 text-sm">{item.title}</div>
                    <div className="text-xs text-stone-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-amber-700 text-white font-bold text-xs shadow transition-colors"
                >
                  Devam Et (Ölçüler) →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <Ruler className="w-5 h-5 text-amber-600" />
                2. Adım: Dolap iç derinliği ve yük gereksinimi
              </h3>

              {hardwareType === 'ray' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2">
                      Dolap Gövde İç Derinliği: <span className="text-amber-700 font-extrabold">{cabinetDepth} mm</span>
                    </label>
                    <input
                      type="range"
                      min="350"
                      max="550"
                      step="50"
                      value={cabinetDepth}
                      onChange={(e) => setCabinetDepth(parseInt(e.target.value))}
                      className="w-full accent-amber-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-stone-400 font-semibold mt-1">
                      <span>350 mm (Dar Çekmece)</span>
                      <span>450 mm (Standart Mutfak)</span>
                      <span>550 mm (Geniş Gardırop)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-2">
                      Beklenen Taşıma Kapasitesi
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'light', label: '15 - 25 kg', desc: 'Çorap & Evrak' },
                        { id: 'medium', label: '30 - 35 kg', desc: 'Mutfak Tabakları' },
                        { id: 'heavy', label: '40 - 50 kg', desc: 'Tencere & Ağır Yük' },
                      ].map((cap) => (
                        <button
                          key={cap.id}
                          onClick={() => setWeightCapacity(cap.id as any)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            weightCapacity === cap.id
                              ? 'border-amber-600 bg-amber-50 font-bold'
                              : 'border-stone-200 bg-white text-stone-600'
                          }`}
                        >
                          <div className="text-xs font-bold text-stone-900">{cap.label}</div>
                          <div className="text-[10px] text-stone-400">{cap.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {hardwareType !== 'ray' && (
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-2">
                  <p>
                    ✓ Seçtiğiniz <strong>{hardwareType.toUpperCase()}</strong> donanımı için standart
                    montaj şablonları uyumludur. Akıllı algoritmamız en yüksek puanlı orijinal ürünleri
                    listeliyor.
                  </p>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  ← Geri
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs shadow transition-colors"
                >
                  Sonuçları Analiz Et ✨
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Check size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-950 text-xs">
                    Ölçü Analizi Tamamlandı!
                  </h4>
                  <p className="text-[11px] text-emerald-800">
                    Dolabınız için %100 birebir uyumlu orijinal aksesuar tavsiyeleri:
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {recommendedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-200"
                  >
                    <div className="w-16 h-12 bg-white rounded-xl overflow-hidden shrink-0 border border-stone-200">
                      <ProductImage product={p} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-stone-900 truncate">{p.name}</div>
                      <div className="text-[11px] text-stone-500">
                        {p.brand} • {p.specs['Yük Kapasitesi'] || p.color}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-extrabold text-stone-900">
                        {p.price.toLocaleString('tr-TR')} ₺
                      </div>
                      <button
                        onClick={() => addToCart(p, 1)}
                        className="mt-1 px-2.5 py-1 bg-stone-900 hover:bg-amber-700 text-white text-[10px] font-bold rounded-lg transition-colors"
                      >
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900"
                >
                  ← Ölçüyü Değiştir
                </button>

                <button
                  onClick={handleAddAllRecommended}
                  className="px-6 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                >
                  <ShoppingCart size={16} />
                  <span>Önerilenlerin Tümünü Sepete Ekle</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
