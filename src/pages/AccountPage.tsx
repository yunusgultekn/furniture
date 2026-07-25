import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  User,
  Package,
  MapPin,
  Heart,
  Headphones,
  CheckCircle2,
  Clock,
  Truck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { orders, wishlist } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'address' | 'support'>('orders');
  const [expandedOrderNo, setExpandedOrderNo] = useState<string | null>(null);

  const toggleOrderExpand = (no: string) => {
    setExpandedOrderNo(expandedOrderNo === no ? null : no);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* User Header Banner */}
      <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-3xl border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-2xl border border-amber-500/30">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif">Müşteri Hesabı</h1>
            <p className="text-xs text-stone-400">myunus.3438@gmail.com • Üye No: #MD-9042</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="bg-stone-800 px-4 py-2 rounded-xl border border-stone-700 text-stone-300">
            Sipariş Sayısı: <strong className="text-white font-bold">{orders.length}</strong>
          </div>
          <div className="bg-stone-800 px-4 py-2 rounded-xl border border-stone-700 text-stone-300">
            Favoriler: <strong className="text-amber-400 font-bold">{wishlist.length}</strong>
          </div>
        </div>
      </div>

      {/* Account Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 bg-white rounded-3xl p-4 border border-stone-200 shadow-sm space-y-1">
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full p-3 rounded-2xl font-bold text-xs flex items-center gap-3 transition-colors ${
              activeTab === 'orders'
                ? 'bg-stone-900 text-white shadow'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Package size={18} />
            <span>Siparişlerim ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('address')}
            className={`w-full p-3 rounded-2xl font-bold text-xs flex items-center gap-3 transition-colors ${
              activeTab === 'address'
                ? 'bg-stone-900 text-white shadow'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <MapPin size={18} />
            <span>Teslimat Adreslerim</span>
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`w-full p-3 rounded-2xl font-bold text-xs flex items-center gap-3 transition-colors ${
              activeTab === 'support'
                ? 'bg-stone-900 text-white shadow'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <Headphones size={18} />
            <span>Canlı Destek & Talepler</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm min-h-[400px]">
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold font-serif text-stone-900">Sipariş Geçmişim</h2>

              {orders.length === 0 ? (
                <div className="py-16 text-center space-y-3 text-stone-500">
                  <Package size={40} className="mx-auto text-stone-300" />
                  <p className="text-xs">Henüz verilmiş bir siparişiniz bulunmuyor.</p>
                  <a
                    href="#/urunler"
                    className="inline-block px-5 py-2 bg-stone-900 text-white font-bold text-xs rounded-xl"
                  >
                    Alışverişe Başla
                  </a>
                </div>
              ) : (
                <div className="space-y-4 divide-y divide-stone-100">
                  {orders.map((o) => {
                    const isExpanded = expandedOrderNo === o.no;
                    return (
                      <div key={o.no} className="pt-4 first:pt-0 space-y-3">
                        <div
                          onClick={() => toggleOrderExpand(o.no)}
                          className="p-4 bg-stone-50 hover:bg-stone-100 rounded-2xl border border-stone-200 cursor-pointer flex flex-wrap items-center justify-between gap-4 transition-colors"
                        >
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-extrabold text-stone-900 text-xs">
                                #{o.no}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                                {o.status}
                              </span>
                            </div>
                            <div className="text-[11px] text-stone-500">
                              Tarih:{' '}
                              {new Date(o.date).toLocaleDateString('tr-TR', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-extrabold text-stone-900 text-sm">
                              {o.total.toLocaleString('tr-TR')} ₺
                            </span>
                            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </div>
                        </div>

                        {/* Expanded details */}
                        {isExpanded && (
                          <div className="p-4 bg-white rounded-2xl border border-stone-200 text-xs space-y-3 animate-in fade-in duration-200">
                            <div className="font-bold text-stone-900">Sipariş Edilen Ürünler:</div>
                            <div className="space-y-2 divide-y divide-stone-100">
                              {o.items.map((item) => (
                                <div
                                  key={item.id}
                                  className="pt-2 flex justify-between items-center"
                                >
                                  <div>
                                    <span className="font-bold text-stone-800">{item.name}</span>
                                    <span className="text-stone-400 block text-[10px]">
                                      {item.qty} adet x {item.price.toLocaleString('tr-TR')} ₺
                                    </span>
                                  </div>
                                  <span className="font-bold text-stone-900">
                                    {(item.price * item.qty).toLocaleString('tr-TR')} ₺
                                  </span>
                                </div>
                              ))}
                            </div>

                            <div className="pt-3 border-t border-stone-200 text-[11px] text-stone-600 space-y-1">
                              <div>
                                <strong>Teslimat Adresi:</strong> {o.customer.address},{' '}
                                {o.customer.city}
                              </div>
                              <div>
                                <strong>Kargo Takip No:</strong> {o.trackingNumber || 'TR89421034'}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'address' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-serif text-stone-900">Kayıtlı Adreslerim</h2>
              <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-2 text-xs">
                <div className="font-bold text-stone-900 text-sm">Ev / İş Adresi</div>
                <div className="text-stone-600">Mobilyacılar Sanayi Sitesi, 5. Blok No:24</div>
                <div className="text-stone-600">Başakşehir / İstanbul</div>
                <div className="text-stone-500 font-bold">Tel: 0532 000 00 00</div>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold font-serif text-stone-900">Teknik Destek & İade</h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                Dolap montajı, ray ölçüsü uyumsuzluğu veya kargo durumları için 7/24 müşteri
                temsilcilerimizle iletişime geçebilirsiniz.
              </p>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
                Çağrı Merkezi: 0212 000 00 00 (Hafta içi 09:00 - 18:00)
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
