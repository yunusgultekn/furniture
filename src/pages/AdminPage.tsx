import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, CategorySlug, ProductBadge, Order, Coupon, UserAccount, StaffRole } from '../types';
import { CATEGORIES } from '../data/categories';
import {
  Package,
  Boxes,
  ShoppingBag,
  Users,
  BarChart3,
  Ticket,
  FileText,
  ShieldAlert,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Download,
  Save,
  Truck,
  Phone,
  MessageSquare,
  Lock,
  Unlock,
  Eye,
  Settings,
  Sparkles,
  Layers,
  ArrowUpRight,
  TrendingUp,
} from 'lucide-react';

type AdminTab =
  | 'products'
  | 'stock'
  | 'orders'
  | 'users'
  | 'reports'
  | 'coupons'
  | 'cms'
  | 'roles';

export const AdminPage: React.FC = () => {
  const {
    products,
    orders,
    couponsList,
    usersList,
    cmsSettings,
    staffRoles,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStock,
    updateOrderStatus,
    toggleUserBlock,
    addUser,
    addCoupon,
    deleteCoupon,
    toggleCouponActive,
    updateCmsSettings,
    updateStaffRolePermissions,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<AdminTab>('products');

  // Product Management Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodForm, setProdForm] = useState<{
    name: string;
    brand: string;
    cat: CategorySlug;
    price: number;
    oldPrice: number | undefined;
    color: string;
    badge: ProductBadge;
    stock: number;
    desc: string;
    material: string;
    warrantyYears: number;
  }>({
    name: '',
    brand: 'Samet',
    cat: 'ray',
    price: 190,
    oldPrice: 220,
    color: 'Çelik / Galvaniz',
    badge: 'Yeni',
    stock: 50,
    desc: 'MobiDolap yüksek kaliteli mobilya aksesuar ürünü.',
    material: 'Paslanmaz Çelik',
    warrantyYears: 2,
  });

  const [prodSearch, setProdSearch] = useState('');
  const [stockSearch, setStockSearch] = useState('');
  const [stockFilter, setStockFilter] = useState<'all' | 'critical' | 'low' | 'out'>('all');

  // Order Details Modal
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // User Add Modal State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'İstanbul',
    role: 'Müşteri' as UserAccount['role'],
  });

  // Coupon Add Modal State
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [newCouponForm, setNewCouponForm] = useState<Coupon>({
    code: '',
    type: 'percent',
    value: 10,
    label: 'Özel İndirim',
    minSpend: 500,
  });

  // CMS Form State
  const [cmsForm, setCmsForm] = useState(cmsSettings);

  // Open Edit Product Modal
  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProdForm({
      name: p.name,
      brand: p.brand,
      cat: p.cat,
      price: p.price,
      oldPrice: p.oldPrice || undefined,
      color: p.color,
      badge: p.badge || null,
      stock: p.stock,
      desc: p.desc,
      material: p.material || 'Paslanmaz Çelik',
      warrantyYears: p.warrantyYears || 2,
    });
    setIsProductModalOpen(true);
  };

  // Save Product Submit
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodForm.name.trim()) return;

    if (editingProductId) {
      updateProduct(editingProductId, prodForm);
    } else {
      addProduct({
        ...prodForm,
        rating: 4.8,
        reviews: 1,
        specs: {
          TaşımaKapasitesi: '35 kg',
          KapanmaMekanizması: 'Frenli Soft-Close',
        },
      });
    }
    setIsProductModalOpen(false);
    setEditingProductId(null);
  };

  // Filtered Products
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(prodSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(prodSearch.toLowerCase()) ||
      p.cat.toLowerCase().includes(prodSearch.toLowerCase())
  );

  // Stock tracking products
  const stockProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(stockSearch.toLowerCase()) ||
      p.brand.toLowerCase().includes(stockSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (stockFilter === 'critical') return p.stock <= 5 && p.stock > 0;
    if (stockFilter === 'low') return p.stock <= 15;
    if (stockFilter === 'out') return p.stock === 0;
    return true;
  });

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-stone-900 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-stone-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-stone-950">
              Yönetici Paneli v2.5
            </span>
            <span className="text-stone-400 text-xs">MobiDolap Admin Engine</span>
          </div>
          <h1 className="text-2xl font-black font-serif tracking-tight">
            Mağaza ve Stok Yönetim Merkezi
          </h1>
          <p className="text-stone-400 text-xs max-w-2xl">
            Tüm ürünlerinizi, stok hareketlerini, müşteri siparişlerini ve site içeriklerini tek ekrandan yönetin.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#/"
            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors flex items-center gap-2 border border-stone-700"
          >
            <Eye size={15} /> Mağazayı İncele
          </a>
        </div>
      </div>

      {/* Main Admin Navigation Tabs (Matched from requested screens) */}
      <div className="flex overflow-x-auto bg-white p-1.5 rounded-2xl border border-stone-200 shadow-sm gap-1 scrollbar-none">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
            activeTab === 'products'
              ? 'bg-stone-900 text-white shadow'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Package size={16} />
          <span>Ürün Yönetimi</span>
        </button>

        <button
          onClick={() => setActiveTab('stock')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
            activeTab === 'stock'
              ? 'bg-stone-900 text-white shadow'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Boxes size={16} />
          <span>Stok Takibi</span>
          {lowStockCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold">
              {lowStockCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
            activeTab === 'orders'
              ? 'bg-stone-900 text-white shadow'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <ShoppingBag size={16} />
          <span>Sipariş Yönetimi</span>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-600 text-white text-[10px] font-extrabold">
            {orders.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
            activeTab === 'users'
              ? 'bg-stone-900 text-white shadow'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Users size={16} />
          <span>Müşteri & Kullanıcı</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
            activeTab === 'reports'
              ? 'bg-stone-900 text-white shadow'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <BarChart3 size={16} />
          <span>Raporlama Modülü</span>
        </button>

        <button
          onClick={() => setActiveTab('coupons')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
            activeTab === 'coupons'
              ? 'bg-stone-900 text-white shadow'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Ticket size={16} />
          <span>Kampanya & Kupon</span>
        </button>

        <button
          onClick={() => setActiveTab('cms')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
            activeTab === 'cms'
              ? 'bg-stone-900 text-white shadow'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <FileText size={16} />
          <span>İçerik Yönetimi (CMS)</span>
        </button>

        <button
          onClick={() => setActiveTab('roles')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
            activeTab === 'roles'
              ? 'bg-stone-900 text-white shadow'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <ShieldAlert size={16} />
          <span>Yetki & Rol Yönetimi</span>
        </button>
      </div>

      {/* TAB 1: ÜRÜN YÖNETİM EKRANI */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-stone-200 shadow-sm">
            <div className="relative flex-1 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Ürün adı, marka veya kategori ara..."
                value={prodSearch}
                onChange={(e) => setProdSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:bg-white focus:outline-none focus:border-stone-900"
              />
              <Search className="absolute left-3 top-3 text-stone-400 w-4 h-4" />
            </div>

            <button
              onClick={() => {
                setEditingProductId(null);
                setProdForm({
                  name: '',
                  brand: 'Samet',
                  cat: 'ray',
                  price: 250,
                  oldPrice: 290,
                  color: 'Çelik / Galvaniz',
                  badge: 'Yeni',
                  stock: 50,
                  desc: 'Kaliteli mobilya aksesuar ürünü.',
                  material: 'Paslanmaz Çelik',
                  warrantyYears: 2,
                });
                setIsProductModalOpen(true);
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow"
            >
              <Plus size={16} />
              <span>Yeni Ürün Ekle</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-100 text-stone-600 font-bold border-b border-stone-200">
                    <th className="p-4">Ürün Adı</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Marka</th>
                    <th className="p-4">Fiyat</th>
                    <th className="p-4">Stok</th>
                    <th className="p-4">Etiket</th>
                    <th className="p-4 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-4 font-bold text-stone-900">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center font-black text-stone-400 text-xs shrink-0">
                            {p.brand.slice(0, 2)}
                          </div>
                          <div>
                            <div className="line-clamp-1">{p.name}</div>
                            <div className="text-[10px] text-stone-400 font-normal">
                              Renk: {p.color}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 uppercase text-[10px] font-bold text-stone-500">
                        {p.cat}
                      </td>
                      <td className="p-4 font-semibold text-stone-800">{p.brand}</td>
                      <td className="p-4 font-extrabold text-amber-900">
                        {p.price.toLocaleString('tr-TR')} ₺
                      </td>
                      <td className="p-4 font-bold">
                        <span
                          className={`px-2 py-1 rounded-md text-[10px] ${
                            p.stock <= 5
                              ? 'bg-rose-100 text-rose-800'
                              : p.stock <= 15
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {p.stock} Adet
                        </span>
                      </td>
                      <td className="p-4">
                        {p.badge ? (
                          <span className="px-2 py-0.5 bg-amber-700 text-white font-bold text-[10px] rounded-full">
                            {p.badge}
                          </span>
                        ) : (
                          <span className="text-stone-300">-</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                            title="Düzenle"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`"${p.name}" ürününü silmek istediğinize emin misiniz?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold"
                            title="Sil"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STOK TAKİP EKRANI */}
      {activeTab === 'stock' && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-stone-400 uppercase">Tüm Ürünler</div>
                <div className="text-2xl font-black text-stone-900 mt-1">{products.length}</div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-700">
                <Boxes size={20} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-rose-500 uppercase">Kritik Stok (≤5)</div>
                <div className="text-2xl font-black text-rose-600 mt-1">
                  {products.filter((p) => p.stock <= 5 && p.stock > 0).length}
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                <AlertTriangle size={20} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-amber-600 uppercase">Azalan Stok (≤15)</div>
                <div className="text-2xl font-black text-amber-700 mt-1">
                  {products.filter((p) => p.stock <= 15).length}
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Package size={20} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-[11px] font-bold text-stone-400 uppercase">Tükenen Ürünler</div>
                <div className="text-2xl font-black text-stone-900 mt-1">
                  {products.filter((p) => p.stock === 0).length}
                </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400">
                <XCircle size={20} />
              </div>
            </div>
          </div>

          {/* Stock Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-stone-200 shadow-sm">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Stok aramak için yazın..."
                value={stockSearch}
                onChange={(e) => setStockSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs focus:bg-white focus:outline-none"
              />
              <Search className="absolute left-3 top-3 text-stone-400 w-4 h-4" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              <button
                onClick={() => setStockFilter('all')}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
                  stockFilter === 'all'
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                Tüm Ürünler
              </button>
              <button
                onClick={() => setStockFilter('critical')}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
                  stockFilter === 'critical'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                Kritik Stok
              </button>
              <button
                onClick={() => setStockFilter('out')}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap ${
                  stockFilter === 'out'
                    ? 'bg-stone-800 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                Stokta Yok
              </button>
            </div>
          </div>

          {/* Stock Table */}
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-100 text-stone-600 font-bold border-b border-stone-200">
                    <th className="p-4">Ürün Adı</th>
                    <th className="p-4">Marka</th>
                    <th className="p-4">Mevcut Stok</th>
                    <th className="p-4">Stok Durumu</th>
                    <th className="p-4 text-center">Hızlı Stok Güncelleme</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {stockProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-4 font-bold text-stone-900">{p.name}</td>
                      <td className="p-4 font-semibold text-stone-600">{p.brand}</td>
                      <td className="p-4 font-black text-amber-900 text-sm">{p.stock} Adet</td>
                      <td className="p-4">
                        {p.stock === 0 ? (
                          <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                            Tükendi
                          </span>
                        ) : p.stock <= 5 ? (
                          <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                            Kritik Stok
                          </span>
                        ) : p.stock <= 15 ? (
                          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                            Azalan Stok
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            Yeterli
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => updateProductStock(p.id, p.stock - 1)}
                            className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold flex items-center justify-center text-sm"
                            title="-1 Eksilt"
                          >
                            -
                          </button>
                          <button
                            onClick={() => updateProductStock(p.id, p.stock + 5)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px]"
                          >
                            +5 Ekle
                          </button>
                          <button
                            onClick={() => updateProductStock(p.id, p.stock + 20)}
                            className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-[11px]"
                          >
                            +20 Ekle
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SİPARİŞ YÖNETİMİ */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
              <h3 className="font-bold text-stone-900 text-sm">Gelen Tüm Müşteri Siparişleri</h3>
              <span className="text-xs font-semibold text-stone-500">
                Toplam {orders.length} Sipariş
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="p-12 text-center text-stone-400 text-xs">
                Henüz sistemde verilmiş sipariş bulunmuyor.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-100 text-stone-600 font-bold border-b border-stone-200">
                      <th className="p-4">Sipariş No</th>
                      <th className="p-4">Müşteri</th>
                      <th className="p-4">Tarih</th>
                      <th className="p-4">Ödeme</th>
                      <th className="p-4">Tutar</th>
                      <th className="p-4">Sipariş Durumu</th>
                      <th className="p-4 text-right">Detay / Kargo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.map((o) => (
                      <tr key={o.no} className="hover:bg-stone-50 transition-colors">
                        <td className="p-4 font-mono font-bold text-stone-900">{o.no}</td>
                        <td className="p-4">
                          <div className="font-bold text-stone-900">{o.customer.name}</div>
                          <div className="text-[10px] text-stone-400">{o.customer.phone}</div>
                        </td>
                        <td className="p-4 text-stone-500 font-mono text-[11px]">
                          {new Date(o.date).toLocaleDateString('tr-TR')}
                        </td>
                        <td className="p-4 uppercase font-bold text-[10px] text-stone-600">
                          {o.paymentMethod === 'card' ? 'Kredi Kartı' : 'Havale / EFT'}
                        </td>
                        <td className="p-4 font-black text-amber-900">
                          {o.total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                        </td>
                        <td className="p-4">
                          <select
                            value={o.status}
                            onChange={(e) =>
                              updateOrderStatus(o.no, e.target.value as Order['status'])
                            }
                            className="px-2.5 py-1 rounded-xl bg-stone-100 border border-stone-200 text-[11px] font-bold text-stone-800 focus:outline-none focus:border-amber-700"
                          >
                            <option value="Sipariş Alındı">Sipariş Alındı</option>
                            <option value="Hazırlanıyor">Hazırlanıyor</option>
                            <option value="Kargoda">Kargoda</option>
                            <option value="Teslim Edildi">Teslim Edildi</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedOrder(o)}
                            className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-amber-800 text-white font-bold text-[11px] transition-colors"
                          >
                            İncele
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: KULLANICI VE MÜŞTERİ YÖNETİMİ */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-stone-200 shadow-sm">
            <h3 className="font-bold text-stone-900 text-sm">Kullanıcı & Müşteri Listesi</h3>
            <button
              onClick={() => setIsUserModalOpen(true)}
              className="px-4 py-2 bg-stone-900 hover:bg-amber-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Plus size={15} /> Yeni Kullanıcı
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-100 text-stone-600 font-bold border-b border-stone-200">
                    <th className="p-4">Ad Soyad</th>
                    <th className="p-4">E-posta & Telefon</th>
                    <th className="p-4">Şehir</th>
                    <th className="p-4">Rol</th>
                    <th className="p-4">Sipariş Sayısı</th>
                    <th className="p-4">Toplam Harcama</th>
                    <th className="p-4">Durum</th>
                    <th className="p-4 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-4 font-bold text-stone-900">{u.name}</td>
                      <td className="p-4">
                        <div>{u.email}</div>
                        <div className="text-[10px] text-stone-400 font-mono">{u.phone}</div>
                      </td>
                      <td className="p-4 font-medium text-stone-600">{u.city}</td>
                      <td className="p-4 font-bold text-stone-800">
                        <span className="px-2 py-0.5 rounded bg-stone-100 text-[10px]">
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-stone-700">{u.totalOrders} Sipariş</td>
                      <td className="p-4 font-black text-amber-900">
                        {u.totalSpent.toLocaleString('tr-TR')} ₺
                      </td>
                      <td className="p-4">
                        {u.isBlocked ? (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                            Engellendi
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            Aktif
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => toggleUserBlock(u.id)}
                          className={`px-3 py-1 rounded-xl text-[10px] font-bold transition-colors ${
                            u.isBlocked
                              ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                              : 'bg-rose-100 hover:bg-rose-200 text-rose-800'
                          }`}
                        >
                          {u.isBlocked ? 'Engeli Kaldır' : 'Engelle'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: RAPORLAMA MODÜLÜ */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          {/* Executive KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-gradient-to-br from-stone-900 to-stone-800 text-white rounded-3xl shadow">
              <div className="text-xs font-medium text-stone-400 uppercase">Toplam Ciro</div>
              <div className="text-2xl font-black text-amber-400 mt-2">
                {totalRevenue.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
              </div>
              <div className="text-[10px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
                <TrendingUp size={12} /> +%18.4 Geçen Ay
              </div>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-3xl shadow-sm">
              <div className="text-xs font-bold text-stone-400 uppercase">Toplam Sipariş</div>
              <div className="text-2xl font-black text-stone-900 mt-2">{totalOrdersCount}</div>
              <div className="text-[10px] text-stone-500 font-medium mt-1">Tamamlanan işlem</div>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-3xl shadow-sm">
              <div className="text-xs font-bold text-stone-400 uppercase">Ortalama Sepet</div>
              <div className="text-2xl font-black text-stone-900 mt-2">
                {avgOrderValue.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
              </div>
              <div className="text-[10px] text-amber-800 font-bold mt-1">Yüksek Sadakat Oranı</div>
            </div>

            <div className="p-5 bg-white border border-stone-200 rounded-3xl shadow-sm">
              <div className="text-xs font-bold text-stone-400 uppercase">Aktif Ürün Çeşidi</div>
              <div className="text-2xl font-black text-stone-900 mt-2">{products.length}</div>
              <div className="text-[10px] text-stone-500 mt-1">10 Ana Kategori</div>
            </div>
          </div>

          {/* Category Sales Distribution */}
          <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-stone-900 text-sm">Kategoriye Göre Satış Dağılımı</h3>
              <button
                onClick={() => showToast('Satış raporu CSV olarak indirildi', 'success')}
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5"
              >
                <Download size={14} /> Rapor İndir
              </button>
            </div>

            <div className="space-y-3">
              {CATEGORIES.slice(0, 5).map((cat, idx) => {
                const percentages = [42, 28, 15, 10, 5];
                const pct = percentages[idx];
                return (
                  <div key={cat.slug} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-stone-800">{cat.name}</span>
                      <span className="text-amber-900">%{pct}</span>
                    </div>
                    <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-800 h-full rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: KAMPANYA, KUPON VE İNDİRİM YÖNETİMİ */}
      {activeTab === 'coupons' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-stone-200 shadow-sm">
            <h3 className="font-bold text-stone-900 text-sm">Aktif İndirim Kuponları</h3>
            <button
              onClick={() => setIsCouponModalOpen(true)}
              className="px-4 py-2 bg-stone-900 hover:bg-amber-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Plus size={15} /> Yeni Kupon Oluştur
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {couponsList.map((c) => (
              <div
                key={c.code}
                className="p-5 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-amber-900 text-base bg-amber-50 px-3 py-1 rounded-xl border border-amber-200">
                    {c.code}
                  </span>
                  <button
                    onClick={() => deleteCoupon(c.code)}
                    className="p-1 text-stone-400 hover:text-rose-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="text-xs font-bold text-stone-800">{c.label}</div>
                <div className="text-[11px] text-stone-500">
                  {c.type === 'percent' && `%${c.value} Yüzde İndirim`}
                  {c.type === 'amount' && `${c.value} TL Sabit Tutar İndirimi`}
                  {c.type === 'shipping' && 'Ücretsiz Kargo Fırsatı'}
                  {c.minSpend && ` • Alt limit: ${c.minSpend} TL`}
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => toggleCouponActive(c.code)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      c.active !== false
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {c.active !== false ? 'Aktif Kupon' : 'Pasif'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: İÇERİK YÖNETİMİ (CMS) */}
      {activeTab === 'cms' && (
        <div className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="font-bold text-stone-900 text-base">Site Metinleri & Banner Ayarları</h3>
            <button
              onClick={() => updateCmsSettings(cmsForm)}
              className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow"
            >
              <Save size={15} /> Değişiklikleri Kaydet
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-2">
              <label className="font-bold text-stone-700">Anasayfa Ana Başlık (Hero Title)</label>
              <input
                type="text"
                value={cmsForm.heroTitle}
                onChange={(e) => setCmsForm({ ...cmsForm, heroTitle: e.target.value })}
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-stone-700">Anasayfa Alt Başlık (Hero Subtitle)</label>
              <textarea
                rows={2}
                value={cmsForm.heroSubtitle}
                onChange={(e) => setCmsForm({ ...cmsForm, heroSubtitle: e.target.value })}
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-stone-700">Üst Duyuru Bandı Metni (Announcement Bar)</label>
              <input
                type="text"
                value={cmsForm.announcementText}
                onChange={(e) => setCmsForm({ ...cmsForm, announcementText: e.target.value })}
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-stone-700">Ücretsiz Kargo Limiti (TL)</label>
              <input
                type="number"
                value={cmsForm.freeShippingLimit}
                onChange={(e) => setCmsForm({ ...cmsForm, freeShippingLimit: Number(e.target.value) })}
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white font-bold text-amber-900"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-stone-700">Müşteri Destek Telefonu</label>
              <input
                type="text"
                value={cmsForm.supportPhone}
                onChange={(e) => setCmsForm({ ...cmsForm, supportPhone: e.target.value })}
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="font-bold text-stone-700">WhatsApp Destek Numarası</label>
              <input
                type="text"
                value={cmsForm.whatsappPhone}
                onChange={(e) => setCmsForm({ ...cmsForm, whatsappPhone: e.target.value })}
                className="w-full p-3 rounded-xl bg-stone-50 border border-stone-200 focus:bg-white font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: YETKİ VE ROL YÖNETİMİ */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 font-medium">
            Personel hesaplarına atanabilecek erişim yetkilerini buradan özelleştirebilirsiniz.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {staffRoles.map((role) => (
              <div
                key={role.id}
                className="p-6 bg-white rounded-3xl border border-stone-200 shadow-sm space-y-4"
              >
                <div>
                  <h4 className="font-bold text-stone-900 text-base">{role.name}</h4>
                  <p className="text-stone-500 text-xs mt-0.5">{role.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                  <div className="font-bold text-stone-700 mb-2">Erişim Yetkileri:</div>
                  {Object.entries({
                    canManageProducts: 'Ürün Yönetimi',
                    canManageStock: 'Stok Yönetimi',
                    canManageOrders: 'Sipariş Yönetimi',
                    canManageUsers: 'Kullanıcı Yönetimi',
                    canManageCoupons: 'Kampanya & Kupon',
                    canManageCMS: 'İçerik Yönetimi (CMS)',
                    canViewReports: 'Raporlama Modülü',
                  }).map(([key, label]) => {
                    const isChecked = role.permissions[key as keyof StaffRole['permissions']];
                    return (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            const newPerms = {
                              ...role.permissions,
                              [key]: e.target.checked,
                            };
                            updateStaffRolePermissions(role.id, newPerms);
                          }}
                          className="rounded border-stone-300 text-amber-800 focus:ring-amber-500"
                        />
                        <span className="text-stone-700">{label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-stone-900 text-base font-serif">
                {editingProductId ? 'Ürün Bilgilerini Düzenle' : 'Yeni Ürün Kaydı'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-900"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-stone-700">Ürün Adı</label>
                <input
                  type="text"
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-stone-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700">Marka</label>
                  <input
                    type="text"
                    required
                    value={prodForm.brand}
                    onChange={(e) => setProdForm({ ...prodForm, brand: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-stone-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700">Kategori</label>
                  <select
                    value={prodForm.cat}
                    onChange={(e) =>
                      setProdForm({ ...prodForm, cat: e.target.value as CategorySlug })
                    }
                    className="w-full mt-1 p-2.5 rounded-xl border border-stone-200 bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-stone-700">Satış Fiyatı (TL)</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-stone-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700">Eski Fiyat (TL)</label>
                  <input
                    type="number"
                    value={prodForm.oldPrice || ''}
                    onChange={(e) =>
                      setProdForm({
                        ...prodForm,
                        oldPrice: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full mt-1 p-2.5 rounded-xl border border-stone-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700">Stok Miktarı</label>
                  <input
                    type="number"
                    required
                    value={prodForm.stock}
                    onChange={(e) => setProdForm({ ...prodForm, stock: Number(e.target.value) })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-stone-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700">Ürün Açıklaması</label>
                <textarea
                  rows={3}
                  value={prodForm.desc}
                  onChange={(e) => setProdForm({ ...prodForm, desc: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-stone-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-bold text-stone-900 text-base font-serif">
                  Sipariş Detayı: {selectedOrder.no}
                </h3>
                <div className="text-[11px] text-stone-400 font-mono">
                  {new Date(selectedOrder.date).toLocaleString('tr-TR')}
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-900"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <div className="font-bold text-stone-900">Müşteri Bilgileri</div>
                <div>{selectedOrder.customer.name}</div>
                <div>{selectedOrder.customer.phone} • {selectedOrder.customer.email}</div>
                <div>{selectedOrder.customer.address}, {selectedOrder.customer.city}</div>
              </div>

              <div className="font-bold text-stone-900">Sipariş Edilen Ürünler:</div>
              <div className="divide-y divide-stone-100 max-h-40 overflow-y-auto">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-stone-900">{item.name}</div>
                      <div className="text-[10px] text-stone-400">{item.brand} • {item.qty} adet</div>
                    </div>
                    <div className="font-bold text-amber-900">
                      {(item.price * item.qty).toLocaleString('tr-TR')} ₺
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-100 flex justify-between font-black text-sm text-stone-900">
                <span>Toplam Tutar:</span>
                <span className="text-amber-900">{selectedOrder.total.toLocaleString('tr-TR')} ₺</span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-stone-100">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-stone-900 text-white font-bold text-xs rounded-xl"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Add Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <h3 className="font-bold text-stone-900 text-base font-serif">Yeni Kullanıcı Kaydı</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newUserForm.name || !newUserForm.email) return;
                addUser({
                  ...newUserForm,
                  totalOrders: 0,
                  totalSpent: 0,
                  isBlocked: false,
                });
                setIsUserModalOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-bold text-stone-700">Ad Soyad</label>
                <input
                  type="text"
                  required
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700">E-posta</label>
                <input
                  type="email"
                  required
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-stone-200"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700">Telefon</label>
                <input
                  type="text"
                  required
                  value={newUserForm.phone}
                  onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-stone-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 font-bold rounded-xl"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 text-white font-bold rounded-xl"
                >
                  Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Add Modal */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <h3 className="font-bold text-stone-900 text-base font-serif">Yeni İndirim Kuponu</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newCouponForm.code) return;
                addCoupon(newCouponForm);
                setIsCouponModalOpen(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="font-bold text-stone-700">Kupon Kodu (Örn: BAHAR20)</label>
                <input
                  type="text"
                  required
                  value={newCouponForm.code}
                  onChange={(e) => setNewCouponForm({ ...newCouponForm, code: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-stone-200 uppercase font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700">Açıklama / Etiket</label>
                <input
                  type="text"
                  required
                  value={newCouponForm.label}
                  onChange={(e) => setNewCouponForm({ ...newCouponForm, label: e.target.value })}
                  className="w-full mt-1 p-2.5 rounded-xl border border-stone-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700">İndirim Tipi</label>
                  <select
                    value={newCouponForm.type}
                    onChange={(e) =>
                      setNewCouponForm({
                        ...newCouponForm,
                        type: e.target.value as Coupon['type'],
                      })
                    }
                    className="w-full mt-1 p-2.5 rounded-xl border border-stone-200 bg-white"
                  >
                    <option value="percent">Yüzde (%) İndirim</option>
                    <option value="amount">Sabit Tutar (TL)</option>
                    <option value="shipping">Ücretsiz Kargo</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-stone-700">Değer</label>
                  <input
                    type="number"
                    required
                    value={newCouponForm.value}
                    onChange={(e) =>
                      setNewCouponForm({ ...newCouponForm, value: Number(e.target.value) })
                    }
                    className="w-full mt-1 p-2.5 rounded-xl border border-stone-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 font-bold rounded-xl"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-800 text-white font-bold rounded-xl"
                >
                  Kuponu Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
