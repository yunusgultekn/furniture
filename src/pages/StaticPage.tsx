import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  Headphones,
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ChevronUp,
  Send,
} from 'lucide-react';

interface StaticPageProps {
  slug: string;
}

export const StaticPage: React.FC<StaticPageProps> = ({ slug }) => {
  const { showToast } = useStore();

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Mesajınız başarıyla iletildi, en kısa sürede dönüş yapacağız.', 'success');
    setContactName('');
    setContactEmail('');
    setContactMsg('');
  };

  const faqs = [
    {
      q: 'Satılan ürünler orijinal ve garantili mi?',
      a: 'Evet, MobiDolap bünyesinde satılan tüm Blum, Hettich, Häfele ve Samet ürünleri %100 orijinal olup resmi distribütör garantilidir. Tüm siparişleriniz e-Fatura ile teslim edilir.',
    },
    {
      q: 'Çekmece rayı siparişi verirken ölçüyü nasıl almalıyım?',
      a: 'Dolabınızın iç net derinliğini ölçün. Örneğin iç derinlik 460 mm ise, 450 mm uzunluğunda ray seçmelisiniz. Sayfamızdaki Akıllı Ray Sihirbazını kullanarak da doğru ürünü bulabilirsiniz.',
    },
    {
      q: 'Kargo ne zaman teslim edilir?',
      a: 'Hafta içi saat 15:00a kadar verilen siparişler aynı gün kargoya verilir. Standart teslimat süresi 1-3 iş günüdür.',
    },
    {
      q: 'İade ve değişim koşulları nelerdir?',
      a: 'Teslimat tarihinden itibaren 14 gün içinde, ürün ambalajı bozulmamış ve kullanılmamış ise ücretsiz iade hakkınızı kullanabilirsiniz.',
    },
    {
      q: 'Kuruşlu ve yüksek adetli toptan alımlarda indirim var mı?',
      a: 'Mobilyacı ustalarımız ve mimarlarımız için toptan alım fiyat listemiz mevcuttur. Müşteri hizmetlerimizden özel teklif alabilirsiniz.',
    },
  ];

  if (slug === 'hakkimizda') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">
            Hakkımızda & Kalite Politikamız
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm max-w-xl mx-auto">
            MobiDolap, mobilyanın görünmeyen ama en çok yük taşıyan kalbi olan donanım parçalarında
            uzmanlaşmış e-ticaret markasıdır.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed">
          <p>
            2015 yılında mobilya aksesuarları sektöründe faaliyete geçen şirketimiz, dünya markaları
            Blum, Hettich ve Häfele ürünlerini son kullanıcıya ve ustalara en hızlı şekilde
            ulaştırmayı amaçlamaktadır.
          </p>
          <p>
            Müşterilerimize yalnızca ürün satmıyor; doğru ray derinliği hesabı, kapak menteşe açıları
            ve elektrik aksamı gerektirmeyen LED çözümleri konusunda da teknik rehberlik sunuyoruz.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-stone-100">
            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto font-bold">
                <ShieldCheck size={20} />
              </div>
              <strong className="block text-stone-900 font-bold text-xs">%100 Orijinallik</strong>
              <p className="text-[11px] text-stone-500">
                Sahte veya taklit ürün barındırmayan lisanslı tedarik
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto font-bold">
                <Truck size={20} />
              </div>
              <strong className="block text-stone-900 font-bold text-xs">Aynı Gün Kargo</strong>
              <p className="text-[11px] text-stone-500">
                Özel ambalajlama ile kargoda hasarsız teslimat
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto font-bold">
                <Headphones size={20} />
              </div>
              <strong className="block text-stone-900 font-bold text-xs">Usta Desteği</strong>
              <p className="text-[11px] text-stone-500">
                Montaj çizimleri ve teknik danışmanlık
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'iletisim') {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">
            Bizimle İletişime Geçin
          </h1>
          <p className="text-stone-500 text-xs sm:text-sm">
            Sorularınız, teknik çizim danışmanlığınız veya siparişleriniz için buradayız.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Info Card */}
          <div className="bg-stone-900 text-white p-8 rounded-3xl border border-stone-800 space-y-6 shadow-xl">
            <h2 className="text-xl font-bold font-serif text-amber-400">Merkez Ofis & Depo</h2>

            <div className="space-y-4 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Adres:</strong>
                  <span>İkitelli OSB, Mobilyacılar Sanayi Sitesi, 5. Blok No:24, Başakşehir / İstanbul</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-amber-500 shrink-0" />
                <div>
                  <strong className="block text-white">Telefon:</strong>
                  <span>0212 000 00 00 / 0532 000 00 00</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} className="text-amber-500 shrink-0" />
                <div>
                  <strong className="block text-white">E-Posta:</strong>
                  <span>destek@mobidolap.example</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock size={18} className="text-amber-500 shrink-0" />
                <div>
                  <strong className="block text-white">Çalışma Saatleri:</strong>
                  <span>Hafta İçi 09:00 - 18:00 • Cumartesi 09:00 - 14:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleContactSubmit}
            className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm space-y-4"
          >
            <h2 className="text-lg font-bold text-stone-900">Bize Mesaj İletin</h2>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Adınız Soyadınız*</label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-amber-600 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">E-Posta Adresiniz*</label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-amber-600 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Mesajınız*</label>
              <textarea
                required
                rows={4}
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                placeholder="Montaj, fiyat teklifi veya kargo hakkında merak ettikleriniz..."
                className="w-full p-3 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-amber-600 font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-stone-900 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow transition-colors"
            >
              <Send size={15} />
              <span>Gönder</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (slug === 'kargo') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        <h1 className="text-3xl font-bold font-serif text-stone-900">
          Kargo, Teslimat & İade Koşulları
        </h1>

        <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Truck className="text-amber-700" size={20} /> Kargo ve Teslimat
            </h2>
            <p>
              750 TL ve üzeri tüm siparişlerinizde kargo <strong>ÜCRETSİZDİR</strong>. 750 TL altı
              siparişlerde sabit kargo ücreti 49,90 TL'dir. Siparişleriniz anlaşmalı kargo firmaları
              ile adrese teslim edilir.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-stone-100">
            <h2 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <ShieldCheck className="text-amber-700" size={20} /> 14 Gün İade Hakkı
            </h2>
            <p>
              Satın aldığınız ürünü, teslim aldığınız günden itibaren 14 gün içerisinde orijinal
              ambalajını bozmadan ve faturasıyla birlikte ücretsiz iade edebilirsiniz. İade kargo
              kodu almak için müşteri hizmetlerimizle iletişime geçmeniz yeterlidir.
            </p>
          </section>
        </div>
      </div>
    );
  }

  // Default: SSS Accordion
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">
          Sıkça Sorulan Sorular (SSS)
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm">
          Dolap aksesuarları, ray montajı ve sipariş süreçleri hakkında en merak edilenler.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openFaqIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left font-bold text-stone-900 text-xs sm:text-sm flex items-center justify-between gap-4 hover:bg-stone-50"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3 bg-stone-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
