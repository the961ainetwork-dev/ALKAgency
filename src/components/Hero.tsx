import React from 'react';
import { Sparkles, ArrowRight, BarChart3, Target, Award, CheckSquare, Zap } from 'lucide-react';

interface HeroProps {
  onGraderClick: () => void;
}

export default function Hero({ onGraderClick }: HeroProps) {
  return (
    <div id="webfx-hero-container" className="relative overflow-hidden bg-gradient-to-br from-white to-slate-100 py-16 lg:py-24 border-b border-slate-200">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-orange-100/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Explainer Text (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-100 text-[#000000]">
              <Award className="h-4 w-4 text-[#ff8c00]" />
              <span className="text-xs font-mono font-bold tracking-wide">Rated #1 Digital Agency globally</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black text-[#000000] tracking-tight leading-[1.1]">
              Your Revenue Growth Partner in the <span className="text-[#ff8c00]">AI Era</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg font-sans max-w-2xl leading-relaxed">
              Move from marketing that reports click metrics to marketing that reports <span className="text-slate-900 font-bold">direct revenue impact</span>. Driven by expert digital strategies and powered by our proprietary <span className="text-[#000000] font-semibold font-mono">MarketingCloudFX</span> engine.
            </p>

            {/* Micro-bullet high points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-2.5 items-start">
                <CheckSquare className="h-4 w-4 text-[#000000] mt-1 shrink-0" />
                <span className="text-xs text-slate-700 font-medium">Over $10 Billion client revenue processed</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <CheckSquare className="h-4 w-4 text-[#000000] mt-1 shrink-0" />
                <span className="text-xs text-slate-700 font-medium font-sans">Custom integration with popular sales CRM tools</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <CheckSquare className="h-4 w-4 text-[#000000] mt-1 shrink-0" />
                <span className="text-xs text-slate-700 font-medium font-sans">500+ in-house technical marketing experts</span>
              </div>
              <div className="flex gap-2.5 items-start">
                <CheckSquare className="h-4 w-4 text-[#000000] mt-1 shrink-0" />
                <span className="text-xs text-slate-700 font-medium font-sans">Live ROI calculations and absolute performance guarantees</span>
              </div>
            </div>

            {/* CTA action block */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onGraderClick}
                className="cursor-pointer text-center font-sans font-bold text-sm text-white bg-[#000000] hover:bg-[#222222] px-8 py-4 rounded-md shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Launch MarketingCloudFX Console</span>
                <ArrowRight id="cta-icon" className="h-4 w-4" />
              </button>
              
              <div className="border border-slate-200 rounded-xl px-5 py-3 bg-white shadow-sm text-left shrink-0">
                <div className="text-slate-400 text-[10px] font-mono leading-none font-bold uppercase">CLIENT VISIBILITY LIFT</div>
                <div className="text-[#000000] text-lg font-black font-mono mt-1">+785% ROI Growth</div>
              </div>
            </div>
          </div>

          {/* Graphical Mock Indicator (Right) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-video lg:aspect-square w-full rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-2xl">
              {/* Blurred abstract photo overlay from Picsum to simulate analytical panel */}
              <img
                src="https://picsum.photos/seed/analytics/800/800?blur=10"
                alt="Alkhawarizmi Analytics Dashboard Flow"
                className="absolute inset-0 object-cover w-full h-full opacity-25 mix-blend-luminosity"
                referrerPolicy="no-referrer"
              />

              {/* Graphical Overlays - HTML elements pretending to be cards */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-slate-50/50 p-6 flex flex-col justify-between">
                
                {/* Simulated Floating Agency Card */}
                <div className="flex justify-between items-start gap-4">
                  <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-md backdrop-blur-sm">
                    <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">Clutch Leaderboard</span>
                    <span className="text-xs font-sans font-bold text-slate-800 block mt-0.5">🏆 Alkhawarizmi Rating: 4.9/5</span>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-md backdrop-blur-sm text-right">
                    <span className="text-[9px] font-mono text-slate-400 block font-bold">TOTAL EXPERTS</span>
                    <span className="text-xs font-mono font-bold text-green-600">500+ Active</span>
                  </div>
                </div>

                {/* Dashboard Metrics display */}
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1 font-bold">
                        <Zap className="h-3 w-3 text-[#ff8c00] animate-pulse" strokeWidth={3} />
                        <span>Proprietary Tech suite</span>
                      </span>
                      <span className="text-[9px] font-mono text-[#000000] font-bold">MarketingCloudFX</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-sans font-bold text-slate-800">
                        <span>Keyword Lift Factor</span>
                        <span className="text-green-600 font-mono font-bold">+184% YoY</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#000000] to-[#ff8c00] rounded-full w-[84%]" />
                      </div>
                      <p className="text-[10px] text-slate-500 font-sans">Integrated tracking engine measures exact pipeline contract values.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
