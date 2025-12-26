import { QRTemplate } from './types';

export const DEFAULT_QR_CONFIG = {
  value: 'https://example.com',
  fgColor: '#000000',
  bgColor: '#ffffff',
  size: 300,
  level: 'H' as const,
  includeMargin: true,
};

export const QR_TEMPLATES: QRTemplate[] = [
  { id: 'classic', name: 'Classic', fgColor: '#000000', bgColor: '#FFFFFF', category: 'classic' },
  { id: 'slate', name: 'Slate', fgColor: '#334155', bgColor: '#F1F5F9', category: 'classic' },
  { id: 'blueprint', name: 'Blueprint', fgColor: '#FFFFFF', bgColor: '#2563EB', category: 'vibrant' },
  { id: 'sunset', name: 'Sunset', fgColor: '#7C3AED', bgColor: '#FFEDD5', category: 'vibrant' },
  { id: 'forest', name: 'Forest', fgColor: '#064E3B', bgColor: '#ECFDF5', category: 'soft' },
  { id: 'cherry', name: 'Cherry', fgColor: '#9F1239', bgColor: '#FFF1F2', category: 'soft' },
  { id: 'night', name: 'Midnight', fgColor: '#38BDF8', bgColor: '#0F172A', category: 'dark' },
  { id: 'matrix', name: 'Matrix', fgColor: '#22C55E', bgColor: '#000000', category: 'dark' },
  { id: 'gold', name: 'Luxury', fgColor: '#92400E', bgColor: '#FEF3C7', category: 'classic' },
  { id: 'candy', name: 'Candy', fgColor: '#DB2777', bgColor: '#FCE7F3', category: 'vibrant' },
];

export const ERROR_CORRECTION_LEVELS = [
  { value: 'L', label: 'Low (7%)' },
  { value: 'M', label: 'Medium (15%)' },
  { value: 'Q', label: 'Quartile (25%)' },
  { value: 'H', label: 'High (30%)' },
];
