import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomerInfo } from '../types';
import {
  ShieldCheck,
  CreditCard,
  Building2,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, discount, shipping, grandTotal, placeOrder } = useStore();

  const [customer, setCustomer] = useState<CustomerInfo>({
    name: 'Yunus Emre',
    email: 'myunus.3438@gmail.com',
    phone: '05320000000',
    city: 'İstanbul',
    district: 'Başakşehir',
    address: 'Mobilyacılar Sanayi Sitesi, 5. Blok No:24',
    orderNote: '',
  });

  const [shippingMethod, setShippingMethod] = useState<'standart' | 'hizli'>('standart');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'havale'>('card');

  // Credit card visual form inputs
  const [cardName, setCardName] = useState('YUNUS EMRE');
  const [cardNumber, setCardNumber] = useState('4543 8900 1234 5678');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  // Terms and modal state
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);

  if (cart.length === 0) {
    window.location.hash = '#/sepet';
    return null;
  }

  const handleFormatCardNumber = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleFormatExp = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExp(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExp(raw);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeOrder(customer, paymentMethod, shippingMethod);
    window.location.hash = `#/siparis/${order.no}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
          <Lock size={20} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
            Güvenli Ödeme & Teslimat
          </h1>
          <p className="text-xs text-stone-500">256-bit SSL ile uçtan uca şifrelenmiştir.</p>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Address Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-extrabold text-xs flex items-center justify-center">
                1
              </span>
              <h2 className="font-bold text-stone-900 text-base">Teslimat & Fatura Adresi</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Ad Soyad*</label>
                <input
                  type="text"
                  required
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-600 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">E-Posta Adresi*</label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-600 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Telefon Numarası*</label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-600 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">İl / Şehir*</label>
                <input
                  type="text"
                  required
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-600 font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-bold text-stone-700 mb-1">Açık Adres*</label>
                <textarea
                  required
                  rows={2}
                  value={customer.address}
                  onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-600 font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Options */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-extrabold text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="font-bold text-stone-900 text-base">Kargo Yöntemi</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  shippingMethod === 'standart'
                    ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-500/20'
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'standart'}
                    onChange={() => setShippingMethod('standart')}
                    className="accent-amber-600"
                  />
                  <div>
                    <div className="font-bold text-stone-900 text-xs">Standart Kargo</div>
                    <div className="text-[11px] text-stone-500">2-4 İş Günü İçi Teslimat</div>
                  </div>
                </div>
                <span className="font-bold text-xs text-stone-900">
                  {shipping === 0 ? 'Ücretsiz' : `${shipping} ₺`}
                </span>
              </label>

              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  shippingMethod === 'hizli'
                    ? 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-500/20'
                    : 'border-stone-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'hizli'}
                    onChange={() => setShippingMethod('hizli')}
                    className="accent-amber-600"
                  />
                  <div>
                    <div className="font-bold text-stone-900 text-xs">Hızlı Kargo (Aynı Gün)</div>
                    <div className="text-[11px] text-stone-500">1 İş Günü Teslimat</div>
                  </div>
                </div>
                <span className="font-bold text-xs text-stone-900">89,90 ₺</span>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Options */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
              <span className="w-7 h-7 rounded-full bg-stone-900 text-white font-extrabold text-xs flex items-center justify-center">
                3
              </span>
              <h2 className="font-bold text-stone-900 text-base">Ödeme Yöntemi</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-amber-600 bg-amber-50 text-amber-950 shadow'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <CreditCard size={18} />
                <span>Kredi / Banka Kartı</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('havale')}
                className={`p-4 rounded-2xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'havale'
                    ? 'border-amber-600 bg-amber-50 text-amber-950 shadow'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                <Building2 size={18} />
                <span>Havale / EFT (%3 İndirim)</span>
              </button>
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Visual Credit Card Preview */}
                <div className="max-w-sm mx-auto p-6 rounded-3xl bg-gradient-to-tr from-stone-900 via-stone-800 to-amber-900 text-white shadow-xl space-y-6 border border-stone-700">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold tracking-widest text-amber-400">
                      MobiDolap Card
                    </span>
                    <CreditCard size={28} className="text-amber-400" />
                  </div>

                  <div className="font-mono text-lg tracking-wider text-stone-100 font-bold">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>

                  <div className="flex justify-between text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-stone-400 block">KART SAHİBİ</span>
                      <span className="font-bold tracking-wider">{cardName || 'AD SOYAD'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 block">SON KUL.</span>
                      <span className="font-bold tracking-wider">{cardExp || 'AA/YY'}</span>
                    </div>
                  </div>
                </div>

                {/* Credit Card Inputs */}
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="col-span-2">
                    <label className="block font-bold text-stone-700 mb-1">
                      Kart Üzerindeki İsim*
                    </label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      placeholder="AD SOYAD"
                      className="w-full p-3 rounded-xl border border-stone-200 uppercase font-semibold"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block font-bold text-stone-700 mb-1">Kart Numarası*</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => handleFormatCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      className="w-full p-3 rounded-xl border border-stone-200 font-mono font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">
                      Son Kullanma Tarihi*
                    </label>
                    <input
                      type="text"
                      required
                      value={cardExp}
                      onChange={(e) => handleFormatExp(e.target.value)}
                      placeholder="AA/YY"
                      className="w-full p-3 rounded-xl border border-stone-200 font-mono font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">CVV Güvenlik Kodu*</label>
                    <input
                      type="password"
                      required
                      maxLength={3}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      placeholder="888"
                      className="w-full p-3 rounded-xl border border-stone-200 font-mono font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'havale' && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-3">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <Info size={16} className="shrink-0" />
                  <span>Havale / EFT Hesap Bilgilerimiz</span>
                </div>
                <p className="text-stone-600">
                  Siparişinizi tamamladıktan sonra tutarı aşağıdaki IBAN hesabımıza 2 saat içinde
                  gönderiniz:
                </p>
                <div className="p-3.5 bg-white rounded-xl border border-stone-200 font-mono text-xs space-y-1">
                  <div className="text-stone-500 font-sans text-[11px]">Banka: Garanti BBVA</div>
                  <div className="text-stone-500 font-sans text-[11px]">Alıcı: MobiDolap A.Ş.</div>
                  <div className="text-amber-800 font-bold break-all pt-1">
                    IBAN: TR90 0006 2000 0000 1234 5678 90
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* KVKK & Distance Sales Agreement Checkbox */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 text-xs space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 rounded border-stone-300 text-amber-700 focus:ring-amber-500 shrink-0"
              />
              <span className="text-stone-600 leading-snug">
                <button
                  type="button"
                  onClick={() => setIsContractModalOpen(true)}
                  className="font-bold text-amber-900 underline hover:text-amber-700 inline"
                >
                  Mesafeli Satış Sözleşmesi
                </button>
                'ni ve KVKK Aydınlatma Metni'ni okudum, kabul ediyorum.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!termsAccepted}
            className="w-full py-4 bg-stone-900 hover:bg-amber-700 disabled:opacity-50 disabled:hover:bg-stone-900 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-all"
          >
            <span>Siparişi Onayla & Tamamla ({grandTotal.toLocaleString('tr-TR')} ₺)</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Right Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4 sticky top-24">
            <h3 className="font-bold text-stone-900 text-base font-serif pb-3 border-b border-stone-100">
              Sipariş İçeriği ({cart.length} Kalem)
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-stone-100">
              {cart.map(({ product, qty }) => (
                <div key={product.id} className="pt-2 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="font-bold text-amber-800">{qty}×</span>
                    <span className="text-stone-800 font-semibold truncate">{product.name}</span>
                  </div>
                  <span className="font-extrabold text-stone-900 whitespace-nowrap">
                    {(product.price * qty).toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs border-t border-stone-100 pt-4">
              <div className="flex justify-between text-stone-500">
                <span>Ara Toplam</span>
                <span className="font-bold text-stone-900">{subtotal.toLocaleString('tr-TR')} ₺</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>İndirim</span>
                  <span>- {discount.toLocaleString('tr-TR')} ₺</span>
                </div>
              )}
              <div className="flex justify-between text-stone-500">
                <span>Kargo</span>
                <span className="font-bold text-stone-900">
                  {shipping === 0 ? 'ÜCRETSİZ' : `${shipping} ₺`}
                </span>
              </div>
              <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-bold text-stone-900 text-sm">Toplam Ödenecek</span>
                <span className="text-2xl font-black text-amber-800 font-serif">
                  {grandTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Mesafeli Satış Sözleşmesi Modal */}
      {isContractModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-stone-900 text-base font-serif">
                Mesafeli Satış Sözleşmesi & Ön Bilgilendirme Formu
              </h3>
              <button
                onClick={() => setIsContractModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-900"
              >
                ✕
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-3 text-xs text-stone-600 leading-relaxed pr-2">
              <p>
                <strong>MADDE 1 - TARAFLAR:</strong> İşbu sözleşme, MobiDolap A.Ş. (Satıcı) ile
                siparişi gerçekleştiren Alıcı arasında aşağıda belirtilen hükümler çerçevesinde
                elektronik ortamda akdedilmiştir.
              </p>
              <p>
                <strong>MADDE 2 - KONU:</strong> İşbu sözleşmenin konusu, Alıcı’nın Satıcı’ya ait
                web sitesinden elektronik ortamda siparişini yaptığı mobilya aksesuarı ürünlerinin
                satışı ve teslimi ile ilgili olarak Tüketicinin Korunması Hakkında Kanun ve Mesafeli
                Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin
                belirlenmesidir.
              </p>
              <p>
                <strong>MADDE 3 - CAYMA HAKKI:</strong> Alıcı, hiçbir hukuki ve cezai sorumluluk
                üstlenmeksizin ve hiçbir gerekçe göstermeksizin teslimat tarihinden itibaren 14 gün
                içinde cayma hakkını kullanabilir.
              </p>
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-100">
              <button
                onClick={() => {
                  setTermsAccepted(true);
                  setIsContractModalOpen(false);
                }}
                className="px-6 py-2.5 bg-stone-900 hover:bg-amber-700 text-white font-bold text-xs rounded-xl"
              >
                Okudum, Anladım & Onaylıyorum
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
