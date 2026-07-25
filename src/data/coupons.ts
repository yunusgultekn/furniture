import { Coupon } from '../types';

export const COUPONS: Record<string, Coupon> = {
  MOBIDOLAP10: {
    code: 'MOBIDOLAP10',
    type: 'percent',
    value: 10,
    label: '%10 İndirim',
  },
  KARGO0: {
    code: 'KARGO0',
    type: 'shipping',
    value: 0,
    label: 'Ücretsiz Kargo',
  },
  HOSGELDIN50: {
    code: 'HOSGELDIN50',
    type: 'amount',
    value: 50,
    label: '50 TL Hoş Geldin İndirimi',
    minSpend: 500,
  },
  BLUMVIP: {
    code: 'BLUMVIP',
    type: 'percent',
    value: 15,
    label: '%15 VIP Özel İndirimi',
    minSpend: 1000,
  },
};
