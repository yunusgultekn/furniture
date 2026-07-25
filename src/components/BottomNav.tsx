import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Home,
  Grid,
  Sparkles,
  Heart,
  User,
  ShoppingCart,
} from 'lucide-react';

interface BottomNavProps {
  currentPath: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentPath }) => {
  const { cartCount, wishlist, setIsAdvisorOpen } = useStore();

  const routePath = currentPath.replace(/^#/, '') || '/';
  const isHome = routePath === '/' || routePath === '';
  const isCatalog = routePath.startsWith('/urunler') || routePath.startsWith('/kategori');
  const isFavs = routePath.startsWith('/favoriler');
  const isCart = routePath.startsWith('/sepet');
  const isAccount = routePath.startsWith('/hesabim');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-lg md:hidden">
      <div className="grid grid-cols-5 h-15 items-center px-1">
        {/* Home */}
        <a
          href="#/"
          className={`flex flex-col items-center justify-center py-1 gap-0.5 transition-colors ${
            isHome ? 'text-amber-800 font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Home size={19} className={isHome ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] tracking-tight">Anasayfa</span>
        </a>

        {/* Catalog */}
        <a
          href="#/urunler"
          className={`flex flex-col items-center justify-center py-1 gap-0.5 transition-colors ${
            isCatalog ? 'text-amber-800 font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <Grid size={19} className={isCatalog ? 'stroke-[2.5]' : ''} />
          <span className="text-[10px] tracking-tight">Katalog</span>
        </a>

        {/* Wizard AI Advisor */}
        <button
          onClick={() => setIsAdvisorOpen(true)}
          className="flex flex-col items-center justify-center py-1 gap-0.5 text-amber-700 hover:text-amber-900 transition-colors relative"
        >
          <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center -mt-3 shadow-md">
            <Sparkles size={16} className="text-amber-800 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-amber-900">Sihirbaz</span>
        </button>

        {/* Wishlist */}
        <a
          href="#/favoriler"
          className={`flex flex-col items-center justify-center py-1 gap-0.5 transition-colors relative ${
            isFavs ? 'text-rose-700 font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <div className="relative">
            <Heart size={19} className={isFavs ? 'fill-rose-700 stroke-rose-700' : ''} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose-600 text-white text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Favoriler</span>
        </a>

        {/* Cart / Account */}
        <a
          href="#/sepet"
          className={`flex flex-col items-center justify-center py-1 gap-0.5 transition-colors relative ${
            isCart ? 'text-amber-800 font-bold' : 'text-stone-500 hover:text-stone-900'
          }`}
        >
          <div className="relative">
            <ShoppingCart size={19} className={isCart ? 'stroke-[2.5]' : ''} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-600 text-white text-[9px] font-extrabold w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Sepetim</span>
        </a>
      </div>
    </nav>
  );
};
