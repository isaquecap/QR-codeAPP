export interface QRCodeConfig {
  value: string;
  fgColor: string;
  bgColor: string;
  size: number;
  level: 'L' | 'M' | 'Q' | 'H';
  includeMargin: boolean;
  imageSettings?: {
    src: string;
    height: number;
    width: number;
    excavate: boolean;
  };
}

export interface QRTemplate {
  id: string;
  name: string;
  fgColor: string;
  bgColor: string;
  category: 'classic' | 'vibrant' | 'dark' | 'soft';
}

export interface AIStyleResponse {
  fgColor: string;
  bgColor: string;
  reasoning?: string;
}
