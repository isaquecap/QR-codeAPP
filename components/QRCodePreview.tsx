import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QRCodeConfig } from '../types';
import { Download, Share2, FileDown } from 'lucide-react';

interface QRCodePreviewProps {
  config: QRCodeConfig;
}

const QRCodePreview: React.FC<QRCodePreviewProps> = ({ config }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = (format: 'png' | 'jpg') => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (canvas) {
      const image = canvas.toDataURL(`image/${format}`);
      const link = document.createElement('a');
      link.href = image;
      link.download = `qrcode-${Date.now()}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8">
      <div className="relative group perspective-1000">
        {/* Decorative backdrop */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
        
        {/* Main Canvas Container */}
        <div 
          ref={canvasRef}
          className="relative bg-white p-6 rounded-xl shadow-2xl transition-transform duration-300 transform group-hover:scale-[1.02]"
          style={{ backgroundColor: config.bgColor }} // Ensure the padding matches bg
        >
          <QRCodeCanvas
            value={config.value}
            size={config.size}
            fgColor={config.fgColor}
            bgColor={config.bgColor}
            level={config.level}
            includeMargin={config.includeMargin}
            imageSettings={config.imageSettings}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full max-w-sm">
        <button
          onClick={() => downloadQRCode('png')}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-blue-900/20"
        >
          <Download size={18} />
          <span>Download PNG</span>
        </button>
        <button
          onClick={() => downloadQRCode('jpg')}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-200 font-semibold rounded-lg transition-colors border border-slate-600"
        >
          <FileDown size={18} />
          <span>Download JPG</span>
        </button>
      </div>

      <div className="text-center">
        <p className="text-slate-500 text-sm">
          High resolution output. No watermarks.
        </p>
      </div>
    </div>
  );
};

export default QRCodePreview;
