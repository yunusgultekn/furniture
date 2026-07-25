import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsAppButton: React.FC = () => {
  const { cmsSettings } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const phone = cmsSettings.whatsappPhone || '905551234567';

  const quickPrompts = [
    'Çekmece rayı için ölçü alma konusunda yardıma ihtiyacım var.',
    'Dolap kapağım için doğru menteşeyi nasıl seçebilirim?',
    'MobiDolap kargo süreci ve teslimat hakkında bilgi almak istiyorum.',
    'Özel ölçülü alüminyum kulp siparişi verebilir miyim?',
  ];

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;
    const encoded = encodeURIComponent(textToSend.trim());
    const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encoded}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-20 md:bottom-6 right-5 z-40 flex flex-col items-end">
        {/* Chat Popup Box */}
        {isOpen && (
          <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
            {/* Header */}
            <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-700 border-2 border-emerald-400 flex items-center justify-center font-bold text-sm">
                    MD
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-emerald-800 rounded-full" />
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">MobiDolap Canlı Destek</h4>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-200">
                    <CheckCircle2 size={12} className="text-emerald-300" />
                    <span>Çevrimiçi • Yanıt süresi ~2 dk</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-700/50 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 bg-stone-50 space-y-3 text-xs">
              <div className="bg-white p-3 rounded-2xl border border-stone-200 text-stone-700 shadow-sm leading-relaxed space-y-1">
                <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-600" />
                  Merhaba! Size nasıl yardımcı olabiliriz?
                </p>
                <p className="text-stone-500 text-[11px]">
                  Mobilya rayı, menteşe, kulp seçimi veya teknik detaylar için uzmanımıza hemen yazabilirsiniz:
                </p>
              </div>

              {/* Quick Questions */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-1">
                  Hızlı Soru Kalıpları
                </div>
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left p-2.5 bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 rounded-xl border border-stone-200 hover:border-emerald-300 transition-all font-medium text-[11px] shadow-2xs flex items-center justify-between group"
                  >
                    <span>{prompt}</span>
                    <Send size={12} className="text-stone-400 group-hover:text-emerald-600 shrink-0 ml-1" />
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="pt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Mesajınızı yazın..."
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSend(customMsg);
                    }}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                  <button
                    onClick={() => handleSend(customMsg)}
                    className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl flex items-center justify-center shadow transition-colors"
                  >
                    <Send size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Circle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center gap-2 px-3.5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-95"
          title="WhatsApp Canlı Destek"
        >
          <div className="relative flex items-center justify-center">
            <MessageCircle size={22} className="animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-300 border-2 border-emerald-600" />
          </div>
          <span className="font-bold text-xs pr-1 hidden sm:inline">WhatsApp Destek</span>
        </button>
      </div>
    </>
  );
};
