import React, { useState, useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { QuickViewModal } from './components/QuickViewModal';
import { CabinetAdvisorModal } from './components/CabinetAdvisorModal';
import { CompareModal } from './components/CompareModal';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AccountPage } from './pages/AccountPage';
import { StaticPage } from './pages/StaticPage';
import { AdminPage } from './pages/AdminPage';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CategorySlug } from './types';

function MainApp() {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Parse Hash Route
  const routePath = currentHash.replace(/^#/, '') || '/';
  const parts = routePath.split('/').filter(Boolean);
  const [segment, argument] = parts;

  const renderContent = () => {
    switch (segment) {
      case undefined:
      case '':
        return <HomePage />;

      case 'urunler':
        return <CatalogPage />;

      case 'kategori':
        return <CatalogPage categorySlug={argument as CategorySlug} />;

      case 'arama':
        return <CatalogPage searchQuery={decodeURIComponent(argument || '')} />;

      case 'urun':
        return <ProductDetailPage productId={argument} />;

      case 'sepet':
        return <CartPage />;

      case 'odeme':
        return <CheckoutPage />;

      case 'siparis':
        return <OrderSuccessPage orderNo={argument} />;

      case 'favoriler':
        return <FavoritesPage />;

      case 'hesabim':
        return <AccountPage />;

      case 'sayfa':
        return <StaticPage slug={argument || 'hakkimizda'} />;

      case 'admin':
        return <AdminPage />;

      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f5f0] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      <Header currentPath={currentHash} />
      <main className="flex-1 pb-16 md:pb-0">{renderContent()}</main>
      <Footer />
      <BottomNav currentPath={currentHash} />

      {/* Global Floating Modals & Support */}
      <WhatsAppButton />
      <QuickViewModal />
      <CabinetAdvisorModal />
      <CompareModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
