export type CategorySlug =
  | 'cekmece'
  | 'ray'
  | 'kulp'
  | 'mentese'
  | 'ayak'
  | 'raf'
  | 'aski'
  | 'kilit'
  | 'baglanti'
  | 'aydinlatma';

export interface Category {
  slug: CategorySlug;
  name: string;
  icon: string; // Lucide icon name or identifier
  desc: string;
  count?: number;
  featuredImg?: string;
  colors: [string, string];
}

export type ProductBadge = 'İndirim' | 'Yeni' | 'Çok Satan' | 'Fırsat' | null;

export interface ProductSpecs {
  [key: string]: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  cat: CategorySlug;
  price: number;
  oldPrice?: number | null;
  color: string;
  badge?: ProductBadge;
  new?: boolean;
  stock: number;
  rating: number;
  reviews: number;
  specs: ProductSpecs;
  desc: string;
  material?: string;
  mountingType?: string;
  warrantyYears?: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export interface Coupon {
  code: string;
  type: 'percent' | 'amount' | 'shipping';
  value: number;
  label: string;
  minSpend?: number;
  active?: boolean;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: 'Müşteri' | 'Admin' | 'Editör' | 'Stok Yöneticisi';
  totalOrders: number;
  totalSpent: number;
  registeredDate: string;
  isBlocked: boolean;
}

export interface CmsSettings {
  heroTitle: string;
  heroSubtitle: string;
  announcementText: string;
  isAnnouncementActive: boolean;
  freeShippingLimit: number;
  supportPhone: string;
  whatsappPhone: string;
  bannerNotice: string;
}

export interface StaffPermission {
  canManageProducts: boolean;
  canManageStock: boolean;
  canManageOrders: boolean;
  canManageUsers: boolean;
  canManageCoupons: boolean;
  canManageCMS: boolean;
  canViewReports: boolean;
}

export interface StaffRole {
  id: string;
  name: string;
  description: string;
  permissions: StaffPermission;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  city: string;
  district?: string;
  address: string;
  orderNote?: string;
}

export interface Order {
  no: string;
  date: string;
  customer: CustomerInfo;
  items: Array<{
    id: string;
    name: string;
    price: number;
    qty: number;
    brand: string;
    cat: CategorySlug;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode?: string | null;
  paymentMethod: 'card' | 'havale';
  shippingMethod: 'standart' | 'hizli';
  status: 'Sipariş Alındı' | 'Hazırlanıyor' | 'Kargoda' | 'Teslim Edildi';
  trackingNumber?: string;
}

export interface FilterState {
  cat: CategorySlug | null;
  query: string;
  brands: string[];
  maxPrice: number | null;
  minPrice: number | null;
  badge: ProductBadge | null;
  inStockOnly: boolean;
  sort: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'new';
  page: number;
}
