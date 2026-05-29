import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Zap, Target, MousePointer, HelpCircle, Cpu, Layers, DollarSign, Award, ChevronDown } from 'lucide-react';

export default function ServiceEstimator() {
  const [activeTab, setActiveTab] = useState<'omniseo' | 'revmarketing' | 'uxai' | 'platform'>('omniseo');
  const [budget, setBudget] = useState(3500); // monthly budget for SEO/PPC or total for design
  const [uxaiScope, setUxaiScope] = useState<'standard' | 'gemini' | 'enterprise'>('gemini');
  const [platformScope, setPlatformScope] = useState<'starter' | 'growth' | 'enterprise'>('growth');

  // Interactive estimates logic
  const calculateOmniSEO = (value: number) => {
    const searchClicks = Math.floor(value * 3.6);
    const backlinks = Math.floor(value / 140);
    const keywordsTracked = Math.floor(value / 8);
    const expectedLeads = Math.floor(searchClicks * 0.052);
    return { searchClicks, backlinks, keywordsTracked, expectedLeads };
  };

  const calculateRevMarketing = (value: number) => {
    const clicks = Math.floor(value / 1.55);
    const crMultiplier = "4.8x average";
    const programmaticBids = Math.floor(value * 12);
    const pipelineRevenueInbound = Math.floor(value * 3.8);
    return { clicks, crMultiplier, programmaticBids, pipelineRevenueInbound };
  };

  const getUxAiFeatures = (scope: 'standard' | 'gemini' | 'enterprise') => {
    switch(scope) {
      case 'standard':
        return {
          price: 7500,
          vitalsTarget: "Score 95+",
          headline: "Standard UX Overhaul & Speed Tuning",
          features: [
            "Full viewport mobile breakpoint corrections",
            "Eliminating render-blocking legacy scripts",
            "Responsive layout tap target sizing adjustment",
            "Continuous tracking of localized JSON-LD schema setups"
          ],
          conversionBoost: "+35% relative lift"
        };
      case 'gemini':
        return {
          price: 18000,
          vitalsTarget: "Score 98+",
          headline: "Gemini Conversational Chatbot & Live Tuning",
          features: [
            "Tailoring server-side custom conversational AI interfaces",
            "Setup of Google GenAI SDK with lazy-evaluated endpoints",
            "Integration with in-house static CRM leads registry",
            "ContentGeniusFX automatic SEO copywriting pipeline"
          ],
          conversionBoost: "+114% relative lift"
        };
      case 'enterprise':
        return {
          price: 35000,
          vitalsTarget: "Score 99+",
          headline: "Full-Scale Custom Enterprise AI & Headless Portal",
          features: [
            "Headless high-performance SSR framework (Vite/Node)",
            "Dynamic predictive search and intent matrices mapping",
            "Personalized landing experiences driven by live behavioral data",
            "Comprehensive safety, moderation safeguards, & security parameters"
          ],
          conversionBoost: "+240% relative lift"
        };
    }
  };

  const getPlatformFeatures = (scope: 'starter' | 'growth' | 'enterprise') => {
    switch(scope) {
      case 'starter':
        return {
          price: 1200,
          headline: "MarketingCloudFX Starter Engine",
          features: [
            "Includes unified call and event tracking analytics",
            "3 standard sales representatives in pipeline manager",
            "Maximum 5,000 email lead nurture triggers per month",
            "General WebFX traffic coordinate charts"
          ],
          roiFactor: "2.1x standard ROI"
        };
      case 'growth':
        return {
          price: 2900,
          headline: "MarketingCloudFX Growth Pro Suite",
          features: [
            "Continuous custom attribution loops sync'd with Nutshell CRM",
            "Up to 25 active company representatives in CRM pipeline",
            "Dynamic phone call pool numbers routing to target keywords",
            "Detailed search positioning graphs comparing competitor authority margins"
          ],
          roiFactor: "4.5x average ROI"
        };
      case 'enterprise':
        return {
          price: 6800,
          headline: "Omnichannel Full-Stack Enterprise Platform",
          features: [
            "Ultimate CRM systems synchronization (Salesforce, HubSpot, etc.)",
            "Infinite active seats across entire company hierarchies",
            "Unlimited dynamic telephone recording numbers & transcripts",
            "Continuous automated copywriting (ContentGeniusFX) & Local SEO widgets"
          ],
          roiFactor: "8.4x enterprise ROI"
        };
    }
  };

  const seoData = calculateOmniSEO(budget);
  const revData = calculateRevMarketing(budget);
  const uxData = getUxAiFeatures(uxaiScope);
  const platformData = getPlatformFeatures(platformScope);

  return (
    <div id="services-estimator-section" className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
      <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="border-b border-slate-200 pb-6 mb-8">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#ff8c00] font-bold inline-block mb-3">
          AL KHAWARIZMI MARKETING CALCULATOR
        </span>
        <h3 className="text-2xl font-sans font-black text-[#000000] tracking-tight">
          Explore Our Active Service Lines & Generate Instant Forecasts
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          Select our premium modern service tracks below, adjust budgets/scopes, and view custom deliverables plus predicted growth margins.
        </p>
      </div>

      {/* Modern 4-Tab Navigation */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 border-b border-slate-200 pb-6 mb-8">
        <button
          onClick={() => { setActiveTab('omniseo'); setBudget(3500); }}
          className={`cursor-pointer px-4 py-3.5 rounded-xl font-sans text-xs lg:text-sm font-extrabold transition-all text-left flex items-center justify-between border ${
            activeTab === 'omniseo'
              ? 'bg-[#000000] text-white border-[#000000] shadow-md shadow-[#000000]/15'
              : 'bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <span>🔍 OmniSEO® & Lead Gen</span>
          {activeTab === 'omniseo' && <span className="h-2 w-2 bg-[#ff8c00] rounded-full animate-ping" />}
        </button>
        <button
          onClick={() => { setActiveTab('revmarketing'); setBudget(4500); }}
          className={`cursor-pointer px-4 py-3.5 rounded-xl font-sans text-xs lg:text-sm font-extrabold transition-all text-left flex items-center justify-between border ${
            activeTab === 'revmarketing'
              ? 'bg-[#000000] text-white border-[#000000] shadow-md shadow-[#000000]/15'
              : 'bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <span>🎯 Revenue Marketing & CRO</span>
          {activeTab === 'revmarketing' && <span className="h-2 w-2 bg-[#ff8c00] rounded-full animate-ping" />}
        </button>
        <button
          onClick={() => { setActiveTab('uxai'); }}
          className={`cursor-pointer px-4 py-3.5 rounded-xl font-sans text-xs lg:text-sm font-extrabold transition-all text-left flex items-center justify-between border ${
            activeTab === 'uxai'
              ? 'bg-[#000000] text-white border-[#000000] shadow-md shadow-[#000000]/15'
              : 'bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <span>💻 UX & AI Services</span>
          {activeTab === 'uxai' && <span className="h-2 w-2 bg-[#ff8c00] rounded-full animate-ping" />}
        </button>
        <button
          onClick={() => { setActiveTab('platform'); }}
          className={`cursor-pointer px-4 py-3.5 rounded-xl font-sans text-xs lg:text-sm font-extrabold transition-all text-left flex items-center justify-between border ${
            activeTab === 'platform'
              ? 'bg-[#000000] text-white border-[#000000] shadow-md shadow-[#000000]/15'
              : 'bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <span>⚡ Revenue Platform (MCFX)</span>
          {activeTab === 'platform' && <span className="h-2 w-2 bg-[#ff8c00] rounded-full animate-ping" />}
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'omniseo' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in-up">
          {/* Slider controls */}
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-inner">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-slate-800 font-sans">Monthly Growth Budget</span>
                <span className="text-2xl font-mono font-black text-[#000000]">${budget.toLocaleString()}/mo</span>
              </div>
              <input
                type="range"
                min="1500"
                max="15000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000000] focus:outline-none"
              />
              <div className="flex justify-between text-xs font-mono text-slate-550 mt-2 font-semibold">
                <span>$1,500</span>
                <span>$8,000</span>
                <span>$15,000+</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 font-bold">Standard OmniSEO® Deliverables</h4>
              <ul className="space-y-3 font-sans">
                <li className="flex items-start gap-3 text-xs text-slate-700 font-medium">
                  <ShieldCheck className="h-5 w-5 text-green-600 shrink-0 mt-0.5 animate-pulse" />
                  <span>Interactive keyword tracking synced with local viewport organic strengths.</span>
                </li>
                <li className="flex items-start gap-3 text-xs text-slate-700 font-medium">
                  <ShieldCheck className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Authority editorial placement links driving domain search index values.</span>
                </li>
                <li className="flex items-start gap-3 text-xs text-slate-700 font-medium">
                  <ShieldCheck className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Continuous metadata refinement & localized schema markup templates.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Outputs */}
          <div className="bg-slate-50 p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4 font-bold">PREDICTED MONTHLY VALUE LIFT</h4>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-500 text-[9px] font-mono block uppercase">Organic Search Clicks</span>
                <span className="text-xl font-bold font-mono text-[#000000]">+{seoData.searchClicks.toLocaleString()}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-500 text-[9px] font-mono block uppercase">Backlinks Secured</span>
                <span className="text-xl font-bold font-mono text-[#000000]">{seoData.backlinks} / mo</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-500 text-[9px] font-mono block uppercase">Keywords Tracked</span>
                <span className="text-xl font-bold font-mono text-[#000000]">{seoData.keywordsTracked} positions</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-550 text-[9px] font-mono block uppercase">Expected Leads Inbound</span>
                <span className="text-xl font-bold font-mono text-green-600">~{seoData.expectedLeads} / mo</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-orange-50/75 border border-orange-200/50">
              <div className="flex gap-3">
                <Target className="h-5 w-5 text-[#ff8c00] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-sans font-bold text-slate-900">The OmniSEO® Edge</h5>
                  <p className="text-slate-600 text-[11px] mt-1 leading-relaxed font-sans">
                    OmniSEO compiles organic metrics, search click ratios, and direct phone tracking pipelines into an omnichannel view that validates search ROI immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'revmarketing' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in-up">
          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-inner">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-slate-800 font-sans">Monthly Media & CRO Spend</span>
                <span className="text-2xl font-mono font-black text-[#000000]">${budget.toLocaleString()}/mo</span>
              </div>
              <input
                type="range"
                min="2000"
                max="20000"
                step="500"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000000] focus:outline-none"
              />
              <div className="flex justify-between text-xs font-mono text-slate-550 mt-2 font-semibold">
                <span>$2,000</span>
                <span>$11,000</span>
                <span>$20,000+</span>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 font-bold">Revenue Marketing Scope</h4>
              <ul className="space-y-3 font-sans">
                <li className="flex items-start gap-3 text-xs text-slate-700 font-medium">
                  <ShieldCheck className="h-5 w-5 text-[#ff8c00] shrink-0 mt-0.5" />
                  <span>Google, Bing and Meta display-target paid advertising management setup.</span>
                </li>
                <li className="flex items-start gap-3 text-xs text-slate-700 font-medium">
                  <ShieldCheck className="h-5 w-5 text-[#ff8c00] shrink-0 mt-0.5 animate-pulse" />
                  <span>A/B user testing on landing pages to target absolute conversions limits.</span>
                </li>
                <li className="flex items-start gap-3 text-xs text-slate-700 font-medium">
                  <ShieldCheck className="h-5 w-5 text-[#ff8c00] shrink-0 mt-0.5" />
                  <span>Automated workflow email tracking capturing lost carts or unsubmitted inquiries.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Estimates */}
          <div className="bg-slate-50 p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4 font-bold">PREDICTED AD REVENUE METRICS</h4>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-500 text-[9px] font-mono block uppercase">Ad clicks driven</span>
                <span className="text-xl font-bold font-mono text-[#000000]">~{revData.clicks.toLocaleString()} / mo</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-500 text-[9px] font-mono block uppercase">Conversion Conversion</span>
                <span className="text-xl font-bold font-mono text-[#ff8c00]">{revData.crMultiplier}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-500 text-[9px] font-mono block uppercase">Programmatic Placements</span>
                <span className="text-xl font-bold font-mono text-[#000000]">{revData.programmaticBids.toLocaleString()} impressions</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-550 text-[9px] font-mono block uppercase font-bold">Gained pipeline value</span>
                <span className="text-xl font-bold font-mono text-green-600">${revData.pipelineRevenueInbound.toLocaleString()} value/mo</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/50">
              <div className="flex gap-3">
                <MousePointer className="h-5 w-5 text-[#000000] shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-sans font-bold text-slate-900">The CRO Standard</h5>
                  <p className="text-slate-600 text-[11px] mt-1 leading-relaxed font-sans">
                    By combining strategic media spend optimization with landing page design, we drive down qualified acquisition costs up to 40% compared to traditional standalone agencies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'uxai' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in-up">
          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-widest text-[#000000] font-black">Choose UX & AI Project Scale</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setUxaiScope('standard')}
                  className={`cursor-pointer p-4 rounded-xl text-xs font-bold border font-sans text-center transition-all ${
                    uxaiScope === 'standard'
                      ? 'bg-[#000000] text-white border-[#000000] shadow-md'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <span className="block text-sm mb-1 font-extrabold uppercase">UX Redesign</span>
                  <span className="font-mono">$7,500</span>
                </button>
                <button
                  onClick={() => setUxaiScope('gemini')}
                  className={`cursor-pointer p-4 rounded-xl text-xs font-bold border font-sans text-center transition-all ${
                    uxaiScope === 'gemini'
                      ? 'bg-[#000000] text-white border-[#000000] shadow-md'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <span className="block text-sm mb-1 font-extrabold uppercase">Gemini AI bot</span>
                  <span className="font-mono">$18,000</span>
                </button>
                <button
                  onClick={() => setUxaiScope('enterprise')}
                  className={`cursor-pointer p-4 rounded-xl text-xs font-bold border font-sans text-center transition-all ${
                    uxaiScope === 'enterprise'
                      ? 'bg-[#000000] text-white border-[#000000] shadow-md'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <span className="block text-sm mb-1 font-extrabold uppercase">SSR Portal</span>
                  <span className="font-mono">$35,000</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 font-semibold">Technical Deliveries Guarantees</h4>
              <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                Our UX developers rewrite modern UI pathways with reactive hydration, secure state models and server-side APIs to ensure page loading metrics scale seamlessly.
              </p>
            </div>
          </div>

          {/* Estimates */}
          <div className="bg-slate-50 p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">ESTIMATED LAUNCH BUDGET</h4>
              <span className="text-2xl font-mono font-black text-[#ff8c00]">${uxData.price.toLocaleString()}</span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-550 text-[9px] font-mono block uppercase">Project Deliverable Target</span>
                <span className="text-sm font-bold block mt-1 font-sans text-[#000000]">{uxData.headline}</span>
                <span className="text-[10px] text-slate-500 block mt-1 font-mono">Performance vitals objective: {uxData.vitalsTarget}</span>
              </div>

              <div>
                <span className="text-slate-500 text-[9px] font-mono block mb-2 font-semibold">CUSTOM CODE SERVICES COMPILING:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {uxData.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5 min-w-0">
                      <div className="h-1.5 w-1.5 bg-slate-500 rounded-full shrink-0 animate-pulse" />
                      <span className="text-[11px] text-slate-700 font-sans truncate font-medium" title={feat}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-250 p-4 rounded-xl flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 font-sans">Predicted conversions acceleration:</span>
                <span className="text-sm font-bold font-mono text-green-600">{uxData.conversionBoost}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'platform' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fade-in-up">
          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-mono uppercase tracking-widest text-[#000000] font-black">Choose proprietary platform subscription</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPlatformScope('starter')}
                  className={`cursor-pointer p-4 rounded-xl text-xs font-bold border font-sans text-center transition-all ${
                    platformScope === 'starter'
                      ? 'bg-[#000000] text-white border-[#000000] shadow-md'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <span className="block text-sm mb-1 font-extrabold uppercase">Starter Suite</span>
                  <span className="font-mono">$1,200/mo</span>
                </button>
                <button
                  onClick={() => setPlatformScope('growth')}
                  className={`cursor-pointer p-4 rounded-xl text-xs font-bold border font-sans text-center transition-all ${
                    platformScope === 'growth'
                      ? 'bg-[#000000] text-white border-[#000000] shadow-md'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <span className="block text-sm mb-1 font-extrabold uppercase">Growth Pro</span>
                  <span className="font-mono">$2,900/mo</span>
                </button>
                <button
                  onClick={() => setPlatformScope('enterprise')}
                  className={`cursor-pointer p-4 rounded-xl text-xs font-bold border font-sans text-center transition-all ${
                    platformScope === 'enterprise'
                      ? 'bg-[#000000] text-white border-[#000000] shadow-md'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <span className="block text-sm mb-1 font-extrabold uppercase">Enterprise IP</span>
                  <span className="font-mono">$6,800/mo</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 font-semibold">Integrations Guarantee</h4>
              <p className="text-xs text-slate-655 leading-relaxed font-sans font-medium">
                Our database systems sync telemetry records directly to Nutshell CRM, dynamic caller logs, and mail drip triggers for instant strategic transparency.
              </p>
            </div>
          </div>

          {/* Estimates */}
          <div className="bg-slate-50 p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">ESTIMATED DYNAMIC PRICING</h4>
              <span className="text-2xl font-mono font-black text-[#ff8c00]">${platformData.price.toLocaleString()} / mo</span>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-slate-550 text-[9px] font-mono block uppercase">Service Infrastructure</span>
                <span className="text-sm font-bold block mt-1 font-sans text-[#000000]">{platformData.headline}</span>
              </div>

              <div>
                <span className="text-slate-500 text-[9px] font-mono block mb-2 font-semibold">PLATFORM ARCHITECTURE LICENSES:</span>
                <div className="space-y-1.5">
                  {platformData.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 bg-[#ff8c00] rounded-full shrink-0 animate-pulse" />
                      <span className="text-[11px] text-slate-700 font-sans font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center justify-between shadow-sm">
                <span className="text-xs font-bold text-slate-805 font-sans">Attributable ROI factor:</span>
                <span className="text-sm font-bold font-mono text-blue-600">{platformData.roiFactor}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
