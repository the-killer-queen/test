import { Monitor, Moon, Sun } from 'lucide-react';

export const icons = [
  'DollarSign',
  'CreditCard',
  'Percent',
  'Calculator',
  'Receipt',
  'Truck',
  'HandCoins',
  'Banknote',
  'Coins',
  'PiggyBank',
  'Wallet',
  'TrendingUp',
  'FileText',
  'ShoppingCart',
  'Package',
  'Car',
  'Plane',
  'Home',
  'Zap',
  'Wifi',
  'Phone',
  'Shield',
  'Award',
  'Gift',
  'Tag',
  'Users',
  'Clock',
  'Calendar',
];

export const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
];

export const themes = [
  {
    id: 'light',
    name: 'Light',
    description: 'Clean and bright interface',
    icon: Sun,
    preview: 'bg-neutral-50 border-neutral-50',
    colors: ['bg-neutral-200', 'bg-neutral-300', 'bg-neutral-400'],
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Easy on the eyes',
    icon: Moon,
    preview: 'bg-neutral-700 border-neutral-600',
    colors: ['bg-neutral-800', 'bg-neutral-900', 'bg-neutral-950'],
  },
  {
    id: 'system',
    name: 'System',
    description: 'Follows your device settings',
    icon: Monitor,
    preview:
      'bg-gradient-to-br from-neutral-400 to-neutral-900 border-neutral-500',
    colors: ['bg-neutral-300', 'bg-neutral-500', 'bg-neutral-900'],
  },
];
