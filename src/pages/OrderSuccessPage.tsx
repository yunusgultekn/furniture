import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Truck, Package, Clock, Download, ArrowRight } from 'lucide-react';

interface OrderSuccessPageProps {
  orderNo: string;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ orderNo }) => {
  const { orders, showToast } = useStore();

  const order = orders.find((o) => o.no === orderNo) || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900">Sipariş Bulunamadı</h2>
        <a href="#/" className="inline-block px-6 py-2.5 bg-stone-900 text-white font-bold text-xs rounded-xl">
          Anasayfaya Dön
        </a>
      </div>
    );
  }

  const handleDownloadInvoice = () => {
    showToast(`e-Fatura (#${order.no}) indirildi!`, 'success');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      {/* Top Success Badge */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xl ring-8 ring-emerald-50">
          <CheckCircle2 size={44} />
        </div>
        <h1 className="text-3xl font-bold font-serif text-stone-900">Siparişiniz Alındı!</h1>
        <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
          Teşekkür ederiz <strong className="text-stone-900">{order.customer.name}</strong>. Siparişiniz
          hazırlanmaya başlandı. Onay e-postası <strong>{order.customer.email}</strong> adresine
          iletildi.
        </p>
      </div>

      {/* Order Status Timeline Tracker */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
        <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
          Sipariş Durum Takibi
        </h3>

        <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
          <div className="space-y-1">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 size={16} />
            </div>
            <span className="text-emerald-800 block">Sipariş Alındı</span>
          </div>

          <div className="space-y-1">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto ring-4 ring-amber-100">
              <Clock size={16} />
            </div>
            <span className="text-amber-800 block">Hazırlanıyor</span>
          </div>

          <div className="space-y-1 opacity-40">
            <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mx-auto">
              <Truck size={16} />
            </div>
            <span className="text-stone-500 block">Kargoda</span>
          </div>

          <div className="space-y-1 opacity-40">
            <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mx-auto">
              <Package size={16} />
            </div>
            <span className="text-stone-500 block">Teslim Edildi</span>
          </div>
        </div>
      </div>

      {/* Detailed Order Receipt Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 block">
              Sipariş Numarası
            </span>
            <span className="font-mono font-extrabold text-stone-900 text-base">#{order.no}</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Tarih</span>
            <span className="text-xs font-bold text-stone-800">
              {new Date(order.date).toLocaleDateString('tr-TR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        {/* Shipping address details */}
        <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-1">
          <strong className="text-stone-900 block">Teslimat Adresi:</strong>
          <div className="text-stone-600">{order.customer.address}</div>
          <div className="text-stone-600 font-semibold">
            {order.customer.district} / {order.customer.city} • {order.customer.phone}
          </div>
          {order.trackingNumber && (
            <div className="pt-2 text-amber-800 font-mono font-bold">
              Kargo Takip Kodu: {order.trackingNumber}
            </div>
          )}
        </div>

        {/* Itemized List */}
        <div className="space-y-3 divide-y divide-stone-100 text-xs">
          {order.items.map((item) => (
            <div key={item.id} className="pt-2 flex items-center justify-between">
              <div>
                <span className="font-bold text-stone-900">{item.name}</span>
                <span className="text-stone-400 block text-[11px]">
                  {item.qty} adet x {item.price.toLocaleString('tr-TR')} ₺
                </span>
              </div>
              <span className="font-bold text-stone-900">
                {(item.price * item.qty).toLocaleString('tr-TR')} ₺
              </span>
            </div>
          ))}
        </div>

        {/* Total Pricing */}
        <div className="border-t border-stone-200 pt-4 space-y-2 text-xs">
          <div className="flex justify-between text-stone-500">
            <span>Ara Toplam</span>
            <span>{order.subtotal.toLocaleString('tr-TR')} ₺</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-700 font-semibold">
              <span>İndirim</span>
              <span>- {order.discount.toLocaleString('tr-TR')} ₺</span>
            </div>
          )}
          <div className="flex justify-between text-stone-500">
            <span>Kargo</span>
            <span>{order.shipping === 0 ? 'ÜCRETSİZ' : `${order.shipping} ₺`}</span>
          </div>
          <div className="flex justify-between items-baseline pt-2 border-t border-stone-100 font-bold text-sm text-stone-900">
            <span>Toplam Tutar</span>
            <span className="text-xl font-extrabold text-amber-800 font-serif">
              {order.total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-100">
          <button
            onClick={handleDownloadInvoice}
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
          >
            <Download size={15} /> e-Faturayı İndir
          </button>

          <a
            href="#/urunler"
            className="px-6 py-2.5 bg-stone-900 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-colors"
          >
            <span>Alışverişe Devam Et</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
};
