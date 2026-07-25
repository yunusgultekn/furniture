import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    slug: 'cekmece',
    name: 'Çekmeceler',
    icon: 'Layers',
    desc: 'Metal ve ahşap hazır çekmece kutuları',
    colors: ['#9c6549', '#c48f6f'],
  },
  {
    slug: 'ray',
    name: 'Çekmece Rayları',
    icon: 'Sliders',
    desc: 'Frenli, tam açılım ve teleskopik raylar',
    colors: ['#566571', '#8494a1'],
  },
  {
    slug: 'kulp',
    name: 'Kulplar & Düğmeler',
    icon: 'GripHorizontal',
    desc: 'Dolap kapağı kulpları ve düğmeleri',
    colors: ['#96762f', '#c2a052'],
  },
  {
    slug: 'mentese',
    name: 'Menteşeler',
    icon: 'DoorOpen',
    desc: 'Frenli, gizli ve açılı menteşeler',
    colors: ['#4f5d6b', '#7c8b99'],
  },
  {
    slug: 'ayak',
    name: 'Dolap Ayakları',
    icon: 'Columns',
    desc: 'Ayarlanabilir plastik ve metal ayaklar',
    colors: ['#464b4f', '#6f767c'],
  },
  {
    slug: 'raf',
    name: 'Raf Taşıyıcılar',
    icon: 'Grid',
    desc: 'Raf pimleri, taşıyıcılar ve konsollar',
    colors: ['#67704e', '#98a06f'],
  },
  {
    slug: 'aski',
    name: 'Askı & Ray Sistemleri',
    icon: 'Shirt',
    desc: 'Gardırop askı boruları ve aparatları',
    colors: ['#7a6360', '#a68c88'],
  },
  {
    slug: 'kilit',
    name: 'Kilitler & Güvenlik',
    icon: 'Lock',
    desc: 'Dolap ve çekmece kilit sistemleri',
    colors: ['#5f4a58', '#8a6f83'],
  },
  {
    slug: 'baglanti',
    name: 'Bağlantı Elemanları',
    icon: 'Wrench',
    desc: 'Vidalar, dübeller, minifiksler',
    colors: ['#525c66', '#828d99'],
  },
  {
    slug: 'aydinlatma',
    name: 'Dolap İçi Aydınlatma',
    icon: 'Lightbulb',
    desc: 'Sensörlü LED çubuk ve spotlar',
    colors: ['#b28a34', '#e3b85a'],
  },
];

export const BRANDS = [
  'Blum',
  'Hettich',
  'Häfele',
  'Samet',
  'Starax',
  'Kama',
  'MepaMobilya',
];

export const FREE_SHIPPING_LIMIT = 750;
export const SHIPPING_COST = 49.9;
