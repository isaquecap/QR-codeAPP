import React, { useState, useCallback } from 'react';
import { QrCode, Wand2, Link as LinkIcon, Image as ImageIcon, Trash2, Sliders } from 'lucide-react';
import { DEFAULT_QR_CONFIG, ERROR_CORRECTION_LEVELS } from './constants';
import { QRCodeConfig, QRTemplate } from './types';
import TemplateGallery from './components/TemplateGallery';
import QRCodePreview from './components/QRCodePreview';
import { suggestQRStyle } from './services/geminiService';

export default function App() {
  const [config, setConfig] = useState<QRCodeConfig>(DEFAULT_QR_CONFIG);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');
  const [customLogoUrl, setCustomLogoUrl] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setConfig({ ...config, value: e.target.value });
  };

  const applyTemplate = (template: QRTemplate) => {
    setConfig((prev) => ({
      ...prev,
      fgColor: template.fgColor,
      bgColor: template.bgColor,
    }));
  };

  const handleAiStyle = async () => {
    if (!config.value) return;
    setIsAiLoading(true);
    const result = await suggestQRStyle(config.value);
    setIsAiLoading(false);

    if (result) {
      setConfig((prev) => ({
        ...prev,
        fgColor: result.fgColor,
        bgColor: result.bgColor,
      }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const result = evt.target?.result as string;
        setCustomLogoUrl(result);
        setConfig(prev => ({
          ...prev,
          imageSettings: {
            src: result,
            height: prev.size * 0.2, // Default 20% size
            width: prev.size * 0.2,
            excavate: true,
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setCustomLogoUrl('');
    setConfig(prev => {
      const { imageSettings, ...rest } = prev;
      return rest;
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar Controls */}
      <div className="w-full md:w-[480px] bg-slate-900 border-r border-slate-800 flex flex-col h-screen overflow-y-auto z-10 shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-600/20">
              <QrCode className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              BEST-QRgenerator
            </h1>
          </div>
          <p className="text-slate-400 text-sm">Create stunning AI-powered QR codes instantly.</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${
              activeTab === 'content'
                ? 'text-blue-400 border-b-2 border-blue-500 bg-slate-800/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            Content & Data
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${
              activeTab === 'style'
                ? 'text-blue-400 border-b-2 border-blue-500 bg-slate-800/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
            }`}
          >
            Design & Style
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-8 pb-20">
          
          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* URL Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <LinkIcon size={16} className="text-blue-500" />
                  Destination URL
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={config.value}
                    onChange={handleInputChange}
                    placeholder="https://your-website.com"
                    className="w-full bg-slate-800 border-2 border-slate-700 text-white rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-500"
                  />
                  {config.value.length > 0 && (
                     <button 
                        onClick={() => setConfig({...config, value: ''})}
                        className="absolute right-3 top-3.5 text-slate-500 hover:text-slate-300"
                     >
                       <span className="sr-only">Clear</span>
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                     </button>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAiStyle}
                    disabled={isAiLoading || !config.value}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-900/20"
                  >
                    {isAiLoading ? (
                       <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    ) : (
                      <Wand2 size={16} />
                    )}
                    {isAiLoading ? 'Analyzing...' : 'Auto-Style with AI'}
                  </button>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Tip: Use the AI button to automatically generate a color palette that matches your link's vibe.
                </p>
              </div>

              {/* Logo Upload */}
              <div className="space-y-3 pt-4 border-t border-slate-800">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <ImageIcon size={16} className="text-purple-500" />
                  Logo Overlay
                </label>
                
                {!customLogoUrl ? (
                  <div className="relative group cursor-pointer border-2 border-dashed border-slate-700 rounded-xl hover:border-blue-500 hover:bg-slate-800/50 transition-all p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-blue-400">
                      <ImageIcon size={24} />
                      <span className="text-sm">Click to upload logo</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4 bg-slate-800 p-3 rounded-xl border border-slate-700">
                    <img 
                      src={customLogoUrl} 
                      alt="Logo preview" 
                      className="w-12 h-12 object-contain bg-white/5 rounded-lg p-1"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-200 truncate">Logo Uploaded</p>
                      <p className="text-xs text-slate-500">Overlay applied to center</p>
                    </div>
                    <button
                      onClick={removeLogo}
                      className="p-2 text-red-400 hover:bg-red-950/30 rounded-lg transition-colors"
                      title="Remove logo"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'style' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              
              {/* Templates */}
              <TemplateGallery 
                currentFg={config.fgColor} 
                currentBg={config.bgColor} 
                onSelect={applyTemplate} 
              />

              {/* Advanced Colors */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                 <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider flex items-center gap-2">
                   <Sliders size={14} />
                   Custom Colors
                 </h3>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-xs text-slate-400">Foreground</label>
                     <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-lg border border-slate-700">
                       <input 
                          type="color" 
                          value={config.fgColor}
                          onChange={(e) => setConfig({...config, fgColor: e.target.value})}
                          className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0"
                       />
                       <span className="text-xs font-mono text-slate-300">{config.fgColor}</span>
                     </div>
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs text-slate-400">Background</label>
                     <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-lg border border-slate-700">
                       <input 
                          type="color" 
                          value={config.bgColor}
                          onChange={(e) => setConfig({...config, bgColor: e.target.value})}
                          className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0"
                       />
                       <span className="text-xs font-mono text-slate-300">{config.bgColor}</span>
                     </div>
                   </div>
                 </div>
              </div>

              {/* Technical Settings */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Settings</h3>
                
                <div className="space-y-3">
                   <label className="text-sm text-slate-300">Error Correction</label>
                   <div className="grid grid-cols-4 gap-2">
                      {ERROR_CORRECTION_LEVELS.map(level => (
                        <button
                          key={level.value}
                          onClick={() => setConfig({...config, level: level.value as any})}
                          className={`py-2 text-xs font-medium rounded-lg border transition-colors ${
                            config.level === level.value 
                            ? 'bg-blue-600 border-blue-600 text-white' 
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                          }`}
                        >
                          {level.value}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <label className="text-sm text-slate-300">Include Margin</label>
                  <button
                    onClick={() => setConfig({...config, includeMargin: !config.includeMargin})}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      config.includeMargin ? 'bg-blue-600' : 'bg-slate-700'
                    }`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      config.includeMargin ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="mt-auto p-4 border-t border-slate-800 text-center text-xs text-slate-600">
          © 2025 Isaque Capra. All rights reserved.
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 bg-black/40 backdrop-blur-sm relative overflow-hidden flex flex-col">
        
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: 'radial-gradient(#4b5563 1px, transparent 1px)', 
               backgroundSize: '24px 24px' 
             }}>
        </div>

        <div className="relative z-10 flex-1 p-8">
           <QRCodePreview config={config} />
        </div>
      </div>
    </div>
  );
}
