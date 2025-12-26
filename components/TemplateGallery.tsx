import React from 'react';
import { QR_TEMPLATES } from '../constants';
import { QRTemplate } from '../types';
import { Check } from 'lucide-react';

interface TemplateGalleryProps {
  currentFg: string;
  currentBg: string;
  onSelect: (template: QRTemplate) => void;
}

const TemplateGallery: React.FC<TemplateGalleryProps> = ({ currentFg, currentBg, onSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Templates</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {QR_TEMPLATES.map((t) => {
          const isActive = t.fgColor === currentFg && t.bgColor === currentBg;
          return (
            <button
              key={t.id}
              onClick={() => onSelect(t)}
              className={`group relative flex flex-col items-center p-2 rounded-xl border-2 transition-all duration-200 ${
                isActive
                  ? 'border-blue-500 bg-slate-800 shadow-lg shadow-blue-500/10'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-700'
              }`}
            >
              <div
                className="w-8 h-8 rounded-lg shadow-sm mb-2 border border-slate-600/20"
                style={{ backgroundColor: t.bgColor }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: t.fgColor }} />
                </div>
              </div>
              <span className={`text-xs font-medium ${isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-300'}`}>
                {t.name}
              </span>
              {isActive && (
                <div className="absolute top-1 right-1">
                  <div className="bg-blue-500 rounded-full p-0.5">
                    <Check size={8} className="text-white" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateGallery;
