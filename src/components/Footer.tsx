import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { useStore } from '../context/StoreContext';
import {
  Lock,
  Truck,
  ShieldCheck,
  Headphones,
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      showToast('Bültene abone olundu! İndirim kodunuz e-posta adresinize gönderildi.', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-400 text-sm mt-20 border-t border-stone-800">
      {/* Top Value Proposition Grid */}
      <div className="border-b border-stone-800 bg-stone-950/40 py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-stone-900/60 border border-stone-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Hızlı & Güvenli Kargo</h4>
              <p className="text-xs text-stone-400 mt-0.5">750 TL üzeri siparişlerde kargo bedava</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-stone-900/60 border border-stone-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">%100 Orijinal Ürün</h4>
              <p className="text-xs text-stone-400 mt-0.5">Blum, Hettich, Häfele garantili</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-stone-900/60 border border-stone-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Headphones size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Teknik Destek</h4>
              <p className="text-xs text-stone-400 mt-0.5">Uzman ekibimizle montaj danışmanlığı</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-stone-900/60 border border-stone-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Lock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">256-bit SSL Güvenlik</h4>
              <p className="text-xs text-stone-400 mt-0.5">Kredi kartı ve havale ödemelerinde tam koruma</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Company Column */}
        <div className="lg:col-span-2 space-y-4">
          <a href="#/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-stone-800 text-amber-500 flex items-center justify-center font-black text-xl">
              ◨
            </div>
            <span className="font-bold text-2xl text-white font-serif tracking-tight">
              Mobi<span className="text-amber-500">Dolap</span>
            </span>
          </a>

          <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
            MobiDolap, dolap içi mekanizmalar, gizli frenli raylar, menteşeler, kulplar ve dolap içi
            aydınlatma aparatlarında Türkiye'nin lider e-ticaret platformudur. Orijinal kalitede
            profesyonel çözümler sunar.
          </p>

          <div className="space-y-2 text-xs text-stone-300 pt-2">
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-amber-500" />
              <span>İkitelli OSB, Mobilyacılar Sanayi Sitesi 5. Blok No:24, İstanbul</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={15} className="text-amber-500" />
              <span>0212 000 00 00</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={15} className="text-amber-500" />
              <span>destek@mobidolap.example</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-amber-500" />
              <span>Pzt - Cmt: 09:00 - 18:00</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3">
            <a href="#" className="w-9 h-9 rounded-xl bg-stone-800 text-stone-300 hover:text-white hover:bg-amber-600 flex items-center justify-center transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-stone-800 text-stone-300 hover:text-white hover:bg-amber-600 flex items-center justify-center transition-colors">
              <Instagram size={18} />
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-stone-800 text-stone-300 hover:text-white hover:bg-amber-600 flex items-center justify-center transition-colors">
              <Youtube size={18} />
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-stone-800 text-stone-300 hover:text-white hover:bg-amber-600 flex items-center justify-center transition-colors">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Categories Column */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-base tracking-wide">Öne Çıkan Kategoriler</h4>
          <ul className="space-y-2 text-xs">
            {CATEGORIES.slice(0, 7).map((c) => (
              <li key={c.slug}>
                <a href={`#/kategori/${c.slug}`} className="hover:text-amber-400 transition-colors">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Corporate & Support Links */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-base tracking-wide">Kurumsal & Destek</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#/sayfa/hakkimizda" className="hover:text-amber-400 transition-colors">
                Hakkımızda & Vizyon
              </a>
            </li>
            <li>
              <a href="#/sayfa/kargo" className="hover:text-amber-400 transition-colors">
                Kargo & İade Şartları
              </a>
            </li>
            <li>
              <a href="#/sayfa/sss" className="hover:text-amber-400 transition-colors">
                Sıkça Sorulan Sorular
              </a>
            </li>
            <li>
              <a href="#/sayfa/iletisim" className="hover:text-amber-400 transition-colors">
                İletişim & Konum
              </a>
            </li>
            <li>
              <a href="#/hesabim" className="hover:text-amber-400 transition-colors">
                Sipariş Takibi
              </a>
            </li>
            <li>
              <a href="#/favoriler" className="hover:text-amber-400 transition-colors">
                Favori Listem
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-base tracking-wide">E-Bülten Ayrıcalığı</h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Yeni ürün katalogları, stok güncellemeleri ve kişiye özel kuponlar için abone olun.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 text-white placeholder-stone-500 border border-stone-700 text-xs focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors flex items-center justify-center"
              >
                <Send size={14} />
              </button>
            </div>
            <span className="text-[10px] text-stone-500 block">
              Dilediğiniz zaman tek tıkla üyelikten çıkabilirsiniz.
            </span>
          </form>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-stone-800 py-6 px-4 bg-stone-950/80 text-stone-500 text-xs text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} MobiDolap A.Ş. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <span>Gizlilik Politikası</span>
            <span>Kullanım Koşulları</span>
            <span>KVKK Aydınlatma Metni</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
