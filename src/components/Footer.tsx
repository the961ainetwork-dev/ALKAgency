import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, HelpCircle, Heart } from 'lucide-react';

interface FooterProps {
  onPageChange?: (page: 'home' | 'omniseo' | 'revmarketing' | 'uxai' | 'platform' | 'quote' | 'knowledgebase' | 'seminars') => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const handlePageNavigation = (page: 'home' | 'omniseo' | 'revmarketing' | 'uxai' | 'platform' | 'quote' | 'knowledgebase' | 'seminars') => {
    if (onPageChange) {
      onPageChange(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="webfx-footer" className="bg-white border-t border-slate-200 py-12 text-slate-600 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand block */}
          <div className="space-y-4">
            <span 
              onClick={() => handlePageNavigation('home')}
              className="font-sans font-extrabold text-2xl tracking-tight text-[#000000] cursor-pointer"
            >
              alkhawarizmi<span className="text-[#ff8c00]">.agency</span>
            </span>
            <p className="text-xs text-slate-550 leading-relaxed">
              We connect expert Alkhawarizmi AI execution, data, and digital strategy to generate attributable ROI for enterprise and mid-market growth businesses.
            </p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#ff8c00] shrink-0" />
                <span>Dubai, UAE & Global (Headquarters)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#ff8c00] shrink-0" />
                <span>+971 4 123 4567</span>
              </div>
            </div>
          </div>

          {/* Platforms */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold text-[#000000] uppercase tracking-wider">REVENUE PLATFORMS</h5>
            <ul className="text-xs space-y-2 font-sans font-medium text-slate-600">
              <li 
                onClick={() => handlePageNavigation('platform')}
                className="hover:text-[#ff8c00] transition-colors cursor-pointer"
              >
                MarketingCloudFX Engine™
              </li>
              <li 
                onClick={() => handlePageNavigation('platform')}
                className="hover:text-[#ff8c00] transition-colors cursor-pointer"
              >
                Nutshell Pipeline CRM™
              </li>
              <li 
                onClick={() => handlePageNavigation('uxai')}
                className="hover:text-[#ff8c00] transition-colors cursor-pointer"
              >
                ContentGeniusFX® AI Writer
              </li>
              <li 
                onClick={() => handlePageNavigation('omniseo')}
                className="hover:text-[#ff8c00] transition-colors cursor-pointer"
              >
                LocalSEO FX Reviews Platform
              </li>
              <li 
                onClick={() => handlePageNavigation('knowledgebase')}
                className="hover:text-[#ff8c00] text-[#ff8c00] font-bold transition-colors cursor-pointer flex items-center gap-1 mt-1"
              >
                <span>Enterprise Knowledge Base 📚</span>
              </li>
              <li 
                onClick={() => handlePageNavigation('seminars')}
                className="hover:text-[#ff8c00] text-[#ff8c00] font-bold transition-colors cursor-pointer flex items-center gap-1 mt-1 font-mono tracking-wider"
              >
                <span>B2B SEMINAR LABS 📽️</span>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h5 className="text-xs font-mono font-bold text-[#000000] uppercase tracking-wider">CORE SERVICES</h5>
            <ul className="text-xs space-y-2 font-sans font-medium text-slate-700">
              <li 
                onClick={() => handlePageNavigation('omniseo')}
                className="hover:text-[#ff8c00] transition-colors cursor-pointer font-bold"
              >
                OmniSEO® & Lead Generation
              </li>
              <li 
                onClick={() => handlePageNavigation('revmarketing')}
                className="hover:text-[#ff8c00] transition-colors cursor-pointer font-bold"
              >
                Revenue Marketing & CRO
              </li>
              <li 
                onClick={() => handlePageNavigation('uxai')}
                className="hover:text-[#ff8c00] transition-colors cursor-pointer font-bold"
              >
                UX & AI Services
              </li>
              <li 
                onClick={() => handlePageNavigation('platform')}
                className="hover:text-[#ff8c00] transition-colors cursor-pointer font-bold"
              >
                Revenue Platform Suite
              </li>
              <li 
                onClick={() => handlePageNavigation('quote')}
                className="hover:text-[#ff8c00] transition-colors cursor-pointer font-extrabold text-[#ff8c00] flex items-center gap-1"
              >
                <span>Free Quote Estimator 🔥</span>
              </li>
            </ul>
          </div>

          {/* Ratings and Badges */}
          <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm col-span-1">
            <h5 className="text-xs font-mono font-bold text-[#000000] uppercase tracking-wider">CLUTCH & G2 BADGES</h5>
            <p className="text-[11px] leading-relaxed text-slate-600">
              Ranked #1 for Digital Agencies globally in lead generation and organic visibility audits, with 10M+ leads generated.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-800 font-bold mt-1">
              <span>★ 4.9 G2 Verified</span>
              <span className="text-slate-300">|</span>
              <span>1,020+ Clients</span>
            </div>
          </div>
        </div>

        {/* Copy Disclaimer */}
        <div className="border-t border-slate-200 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <div className="flex items-center gap-1.5 font-sans">
            <span>© {new Date().getFullYear()} alkhawarizmi.agency Platform. Powered securely by Gemini-3.5-Flash on custom server channels.</span>
          </div>
          <div className="flex items-center gap-4 font-sans font-medium">
            <span className="hover:text-slate-800 cursor-pointer">Privacy & Cookie Settings</span>
            <span className="hover:text-slate-800 cursor-pointer font-bold text-[#ff8c00]">Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
