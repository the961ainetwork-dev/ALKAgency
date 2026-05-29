import React, { useState } from 'react';
import { 
  Play, CheckCircle2, RefreshCw, Layers, Shield, Sparkles, 
  Cpu, Zap, Smartphone, ArrowRight, Layout, PenTool, Database, 
  Settings, Check, AlertCircle, Eye, Globe, Code, MessageSquare, ListTodo
} from 'lucide-react';

interface ServiceSimulatorProps {
  mode: string;
  serviceName: string;
}

export default function ServiceSimulator({ mode, serviceName }: ServiceSimulatorProps) {
  // Common states used across simulators
  const [activeTab, setActiveTab] = useState('preview');
  
  // 1. layout-designer states
  const [layoutGrid, setLayoutGrid] = useState({ cols: 3, gap: 6, rounded: 'xl', hasShadow: true });
  
  // 2. redesign-slider states
  const [sliderVal, setSliderVal] = useState(50);
  
  // 3. rapid-mockup states
  const [rapidSteps, setRapidSteps] = useState<string[]>([]);
  const [rapidLoading, setRapidLoading] = useState(false);
  const [rapidScore, setRapidScore] = useState<number | null>(null);

  // 4. social-preview states
  const [socialText, setSocialText] = useState("🚀 Transform your enterprise marketing funnel using custom Node/Express APIs. Achieve sub-second page rendering scales!");
  const [socialBrand, setSocialBrand] = useState("alkhawarizmi.agency");
  const [socialTheme, setSocialTheme] = useState('dark');

  // 5. ecommerce-funnel states
  const [funnelOptions, setFunnelOptions] = useState({
    stickyCart: false,
    subSecondLCP: false,
    securityBadges: false,
    oneClickPay: false
  });

  // 6. email-ab states
  const [emailVariant, setEmailVariant] = useState<'A' | 'B'>('A');

  // 7. content-scores states
  const [inputText, setInputText] = useState("We build web things that look good and load pretty fast for user satisfaction.");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditScore, setAuditScore] = useState<number | null>(null);

  // 8. consulting-planner states
  const [aiFocus, setAiFocus] = useState('finance');
  const [consultingTier, setConsultingTier] = useState('enterprise');

  // 9. marketing-roi states
  const [roiAdSpend, setRoiAdSpend] = useState(15000);
  const [roiTargeting, setRoiTargeting] = useState('high-intent');

  // 10. chatgpt-prompt states
  const [brandSubject, setBrandSubject] = useState("Logistics optimization");

  // 11. agent-nodes states
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // 12. gpt-connector states
  const [headerKey, setHeaderKey] = useState("Bearer X-ALK-99F");
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState(false);

  // 13. geo-map states
  const [geoCity, setGeoCity] = useState('Dubai');

  // 14. hud-terminal states
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "alkhawarizmi.agency CPU Console v3.12 initialized",
    "Connecting secure Gemini proxy socket...",
    "System state online | Port 3000 mapping: normal",
    "Awaiting client input coordinate matrices..."
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  // 15. wp-speed states
  const [wpDbOptimized, setWpDbOptimized] = useState(false);
  const [wpCacheActive, setWpCacheActive] = useState(false);

  // 16. shopify-cart states
  const [upsellActive, setUpsellActive] = useState(false);
  const [cartLatency, setCartLatency] = useState(2.8);

  // 17. infra-status states
  const [firewallStrict, setFirewallStrict] = useState(true);
  const [backupSchedule, setBackupSchedule] = useState('daily');

  // 18. cms-matrix states
  const [cmsDraftText, setCmsDraftText] = useState("Transforming your digital outcomes elegantly.");
  const [cmsStatus, setCmsStatus] = useState<'draft' | 'published'>('draft');

  // 19. accessibility-auditor states
  const [contrastSetting, setContrastSetting] = useState('standard');
  const [ariaActive, setAriaActive] = useState(false);

  // Render helpers
  const runRapidDeploy = () => {
    setRapidLoading(true);
    setRapidSteps([]);
    setRapidScore(null);
    const steps = [
      "Analyzing content viewport anchors...",
      "Compiling inline Tailwind critical classes...",
      "Optimizing media dimensions (fluid bounds)...",
      "Staging static layout on Edge Cache..."
    ];
    let index = 0;
    const interval = setInterval(() => {
      if (index < steps.length) {
        setRapidSteps(prev => [...prev, steps[index]]);
        index++;
      } else {
        clearInterval(interval);
        setRapidLoading(false);
        setRapidScore(99);
      }
    }, 400);
  };

  const handlePostTerminal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    const text = terminalInput;
    setTerminalLines(prev => [...prev, `alk-user$ ${text}`]);
    setTerminalInput('');
    setTimeout(() => {
      let resp = "";
      if (text.toLowerCase().includes('status')) {
        resp = "SYSTEM STATUS SECURE - Port 3000 running, Gemini Proxy OK, Edge Latency 14ms";
      } else if (text.toLowerCase().includes('help')) {
        resp = "Commands available: status, help, audit, clear";
      } else if (text.toLowerCase().includes('clear')) {
        setTerminalLines([]);
        return;
      } else {
        resp = `Command recognized. Executed operational block: '${text.substring(0, 15)}...' resolved in 4ms`;
      }
      setTerminalLines(prev => [...prev, `[alk-sys] ${resp}`]);
    }, 150);
  };

  const triggerAudit = () => {
    setIsAuditing(true);
    setAuditScore(null);
    setTimeout(() => {
      setIsAuditing(false);
      const score = Math.min(100, Math.floor(65 + inputText.length * 0.25));
      setAuditScore(score > 100 ? 100 : score);
    }, 700);
  };

  const triggerApiTest = () => {
    setApiLoading(true);
    setApiResponse(null);
    setTimeout(() => {
      setApiResponse({
        status: "success",
        authorized: true,
        header: headerKey,
        data: {
          model_name: "gemini-2.5-flash",
          response_tokens: 182,
          latency_ms: 22,
          content: "Safe backend connection established. process.env.GEMINI_API_KEY is shielded server-side correctly."
        }
      });
      setApiLoading(false);
    }, 600);
  };

  // Convert state checks to simulated values
  const getEcomConversionVal = () => {
    let base = 1.1;
    if (funnelOptions.stickyCart) base += 0.8;
    if (funnelOptions.subSecondLCP) base += 1.4;
    if (funnelOptions.securityBadges) base += 0.5;
    if (funnelOptions.oneClickPay) base += 1.1;
    return base.toFixed(1);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md flex flex-col h-full">
      {/* Top Header of Simulator */}
      <div className="px-5 py-4 bg-slate-900 text-slate-100 flex items-center justify-between border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-bold">Interactive SLA Sandbox</span>
        </div>
        <span className="font-mono text-[9px] bg-slate-800 text-teal-400 px-2 py-0.5 rounded border border-slate-700 select-none">
          Active: {serviceName}
        </span>
      </div>

      {/* Simulator Payload Workspace Area */}
      <div className="p-5 flex-1 bg-slate-50 overflow-y-auto">
        
        {/* Render 1 of the 18 specific simulators depending on mode */}
        
        {/* 1. Website Design: layout-designer */}
        {mode === 'layout-designer' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">LAYOUT GRID TUNER</span>
            <div className="grid grid-cols-3 gap-2 p-2.5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <div>
                <label className="text-[9px] font-mono text-slate-400 block mb-1">Columns</label>
                <select 
                  value={layoutGrid.cols} 
                  onChange={(e) => setLayoutGrid(prev => ({ ...prev, cols: Number(e.target.value) }))}
                  className="w-full text-xs font-sans font-bold bg-slate-50 border border-slate-205 p-1 rounded focus:outline-none"
                >
                  <option value={1}>1 Col (Simple)</option>
                  <option value={2}>2 Cols (Standard)</option>
                  <option value={3}>3 Cols (Premium Grid)</option>
                  <option value={4}>4 Cols (Dense)</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] font-mono text-slate-400 block mb-1">Gap Spacing</label>
                <select 
                  value={layoutGrid.gap} 
                  onChange={(e) => setLayoutGrid(prev => ({ ...prev, gap: Number(e.target.value) }))}
                  className="w-full text-xs font-sans font-bold bg-slate-50 border border-slate-205 p-1 rounded focus:outline-none"
                >
                  <option value={2}>8px (Compact)</option>
                  <option value={4}>16px (Clean)</option>
                  <option value={6}>24px (Spacious)</option>
                  <option value={8}>32px (Extreme)</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] font-mono text-slate-400 block mb-1">Card Border</label>
                <select 
                  value={layoutGrid.rounded} 
                  onChange={(e) => setLayoutGrid(prev => ({ ...prev, rounded: e.target.value }))}
                  className="w-full text-xs font-sans font-bold bg-slate-50 border border-slate-205 p-1 rounded focus:outline-none"
                >
                  <option value="none">Square (Brutalist)</option>
                  <option value="md">Medium Rounded</option>
                  <option value="xl">Extra Rounded (Modern)</option>
                  <option value="3xl">Ultra Rounded (Soft)</option>
                </select>
              </div>
            </div>

            <div className="bg-white border text-center p-3 rounded-xl border-dashed border-slate-200">
              <span className="text-[9px] font-mono text-slate-400 block mb-2 font-bold uppercase">Dynamic Responsive Viewport Live Render</span>
              <div 
                className={`grid gap-${layoutGrid.gap} max-w-sm mx-auto p-2`}
                style={{ gridTemplateColumns: `repeat(${layoutGrid.cols}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: layoutGrid.cols * 2 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`bg-slate-50 border border-slate-150 p-3 flex flex-col items-center justify-center transition-all duration-300 rounded-${layoutGrid.rounded} ${layoutGrid.hasShadow ? 'shadow-xs' : ''}`}
                  >
                    <div className="h-5 w-5 bg-[#000000] rounded-full flex items-center justify-center text-white text-[9px] font-mono mb-1 font-bold">
                      {i + 1}
                    </div>
                    <span className="text-[9px] font-mono font-medium text-slate-700">Anchor Block</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-[11px] text-[#000000] leading-normal font-sans font-medium">
              💡 Our layouts force a strict minimum 44px tap zone configuration to protect mobile CTR performance margins.
            </div>
          </div>
        )}

        {/* 2. Website Redesign: redesign-slider */}
        {mode === 'redesign-slider' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">LEGACY VS ALKHAWARIZMI REDESIGN SPEED</span>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 font-sans select-none">
                <span>Before (Sluggish)</span>
                <span>Optimized Page Performance</span>
                <span>Alkhawarizmi (98+)</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderVal} 
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ff8c00]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 font-medium">
                <span>Lighthouse: 31</span>
                <span>Slider Position: {sliderVal}%</span>
                <span>Lighthouse: 99</span>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 text-center relative overflow-hidden h-36 flex flex-col justify-between">
              <div className="absolute top-0 left-0 h-full bg-[#000000]/15 transition-all" style={{ width: `${sliderVal}%` }} />
              <div>
                <span className="text-[9px] font-mono text-[#ff8c00] font-black uppercase tracking-widest">Calculated UX Attributes Match</span>
                <span className="block text-2xl font-mono font-extrabold mt-1 text-teal-400">
                  {Math.floor((sliderVal / 100) * 65 + 32)}ms
                </span>
                <span className="text-[10px] font-sans text-slate-400 block mt-0.5">Average Server Core Rendering Latency</span>
              </div>
              <div className="text-[10px] font-mono text-slate-500">
                {sliderVal < 40 ? "🛑 Critical blocking scripts are ruining conversion metrics." : sliderVal < 80 ? "⚠️ Minor style bundles can still be compressed." : "🎯 Perfect sub-second First Contentful Paint!"}
              </div>
            </div>
          </div>
        )}

        {/* 3. Rapid Web Design: rapid-mockup */}
        {mode === 'rapid-mockup' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">48-HOUR PIPELINE STAGING EMULATOR</span>
            <button
              onClick={runRapidDeploy}
              disabled={rapidLoading}
              className="cursor-pointer w-full py-3 bg-[#000000] hover:bg-[#222222] text-[#ff8c00] font-sans font-black text-xs rounded-xl shadow transition-all active:scale-95 flex items-center justify-center gap-1.5"
            >
              {rapidLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              <span>{rapidLoading ? "Running Staging Compile..." : "Initiate Rapid Deployment Pipeline"}</span>
            </button>

            <div className="bg-slate-950 text-emerald-400 p-4 rounded-xl font-mono text-[10px] h-40 overflow-y-auto space-y-1.5 shadow-inner border border-slate-900">
              {rapidSteps.length === 0 && !rapidLoading && (
                <span className="text-slate-500">// Press the deploy trigger button above to initiate.</span>
              )}
              {rapidSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-1.5 animate-fade-in-up">
                  <span className="text-emerald-600 font-bold">&gt;</span>
                  <span>{step}</span>
                </div>
              ))}
              {rapidLoading && (
                <span className="text-sky-400 font-bold block animate-pulse">⚙️ Assembling asset cache parameters...</span>
              )}

              {rapidScore && (
                <div className="mt-4 pt-3 border-t border-slate-800 text-teal-300 font-bold flex items-center justify-between">
                  <span>DEPLOY COMPLETE STATUS OK</span>
                  <span className="bg-teal-500/10 px-2 py-0.5 rounded text-[9px]">Lighthouse Speed: {rapidScore}/100</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. Social Media Design: social-preview */}
        {mode === 'social-preview' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">PREVIEW FEED OPTIMIZER</span>
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-slate-400 block">Custom Post Copywriter Text</label>
              <textarea
                value={socialText}
                onChange={(e) => setSocialText(e.target.value)}
                maxLength={150}
                className="w-full text-xs font-sans bg-white border border-slate-200 p-2 rounded-xl focus:outline-none h-16 resize-none font-medium text-slate-800"
              />
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-3 max-w-sm mx-auto">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 bg-[#000000] rounded-md flex items-center justify-center text-white text-[9px] font-sans font-black">
                  ALK
                </div>
                <div>
                  <span className="text-xs font-black text-slate-800 block">alkhawarizmi.agency</span>
                  <span className="text-[9px] font-mono text-slate-400 block">Featured Premium Authority</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-700 font-sans leading-normal font-medium">
                {socialText || "Customize text elements using inputs above."}
              </p>
              
              {/* Image banner mock */}
              <div className="bg-gradient-to-br from-[#001c4a] to-emerald-950 h-24 rounded-lg flex flex-col justify-center items-center text-center p-3 relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/10 rounded-full blur-xl" />
                <span className="text-[8px] font-mono text-[#ff8c00] uppercase tracking-widest font-bold">AL KHAWARIZMI STACK</span>
                <span className="text-[11px] font-sans font-black text-white tracking-tight mt-1">Enterprise Conversion Lift</span>
                <span className="text-[8px] font-mono text-teal-400 mt-1">Lighthouse Speed &gt; 98 Approved</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. Ecommerce Website Design: ecommerce-funnel */}
        {mode === 'ecommerce-funnel' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">CHECKOUT PIPELINE CONVERSION MATRIX</span>
            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-2.5">
              <label className="flex items-center gap-2 text-xs font-sans font-bold text-slate-700 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={funnelOptions.stickyCart} 
                  onChange={(e) => setFunnelOptions(prev => ({ ...prev, stickyCart: e.target.checked }))}
                  className="rounded border-slate-300 text-[#000000] focus:ring-[#000000]"
                />
                <span>Sticky Floating Add-To-Cart Pad (+0.8% CTR)</span>
              </label>
              
              <label className="flex items-center gap-2 text-xs font-sans font-bold text-slate-700 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={funnelOptions.subSecondLCP} 
                  onChange={(e) => setFunnelOptions(prev => ({ ...prev, subSecondLCP: e.target.checked }))}
                  className="rounded border-slate-300 text-[#000000] focus:ring-[#000000]"
                />
                <span>Deferred Scripts Core Web Speed-up (+1.4% CTR)</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-sans font-bold text-slate-700 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={funnelOptions.securityBadges} 
                  onChange={(e) => setFunnelOptions(prev => ({ ...prev, securityBadges: e.target.checked }))}
                  className="rounded border-slate-300 text-[#000000] focus:ring-[#000000]"
                />
                <span>Trust Badge Indicators at input forms (+0.5% CTR)</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-sans font-bold text-slate-700 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={funnelOptions.oneClickPay} 
                  onChange={(e) => setFunnelOptions(prev => ({ ...prev, oneClickPay: e.target.checked }))}
                  className="rounded border-slate-300 text-[#000000] focus:ring-[#000000]"
                />
                <span>One-Click Unified Apple/Google Checkout (+1.1% CTR)</span>
              </label>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 text-center rounded-xl font-mono">
              <span className="text-[9px] text-[#ff8c00] block uppercase font-black">Predicted Checkout Yield Potential</span>
              <span className="block text-3xl font-bold mt-1.5 text-teal-400">
                {getEcomConversionVal()}%
              </span>
              <span className="text-[10px] text-slate-500 block mt-1 leading-normal font-sans">
                Industry Baseline Average: 1.2% Conversion
              </span>
            </div>
          </div>
        )}

        {/* 6. Email Marketing Testing & Design: email-ab */}
        {mode === 'email-ab' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">A/B CAMPAIGN METRIC EVALUATOR</span>
            <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-xl">
              <button
                onClick={() => setEmailVariant('A')}
                className={`cursor-pointer flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
                  emailVariant === 'A' ? 'bg-[#000000] text-white' : 'bg-transparent text-slate-600'
                }`}
              >
                Variant A (Visual-Heavy)
              </button>
              <button
                onClick={() => setEmailVariant('B')}
                className={`cursor-pointer flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
                  emailVariant === 'B' ? 'bg-[#000000] text-white' : 'bg-transparent text-slate-600'
                }`}
              >
                Variant B (Text-Optimal)
              </button>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs text-center space-y-3">
              <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Variant Metrics Simulation</span>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-150">
                  <span className="text-[9px] text-slate-400 block font-mono">Delivery Rate</span>
                  <span className="text-sm font-mono font-bold text-slate-800">
                    {emailVariant === 'A' ? '92.4%' : '99.8%'}
                  </span>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-150">
                  <span className="text-[9px] text-slate-400 block font-mono">Action Click Yield</span>
                  <span className="text-sm font-mono font-bold text-slate-800">
                    {emailVariant === 'A' ? '1.8%' : '4.6%'}
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 font-sans leading-normal">
                {emailVariant === 'A' 
                  ? "❌ Dense style embeds are stripped by corporate firewalls, causing lower delivery scores." 
                  : "📈 Clean inline layout with styled text tables loads under 1 second, increasing engagement!"}
              </p>
            </div>
          </div>
        )}

        {/* 7. Content Marketing Copywriting & Design: content-scores */}
        {mode === 'content-scores' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">SEMANTIC AUTHORITATIVE AUDITOR</span>
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-slate-400 block">Edit Paragraph Block Draft</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={200}
                className="w-full text-xs font-sans bg-white border border-slate-200 p-2.5 rounded-xl focus:outline-none h-16 resize-none font-medium text-slate-800"
              />
            </div>

            <button
              onClick={triggerAudit}
              disabled={isAuditing}
              className="cursor-pointer w-full py-2.5 bg-[#ff8c00] hover:bg-[#e07b00] text-white font-sans font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
            >
              {isAuditing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <PenTool className="h-4 w-4" />}
              <span>{isAuditing ? "Auditing EEAT rules..." : "Verify Content Value Index"}</span>
            </button>

            {auditScore !== null && (
              <div className="p-3 bg-slate-900 text-white rounded-xl text-center border border-slate-800 animate-fade-in-up">
                <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold block">Helpful Content Grade</span>
                <span className="block text-2xl font-mono font-black mt-1 text-emerald-400">{auditScore} / 100</span>
                <span className="text-[8px] font-sans text-slate-400 block mt-0.5">Checked against target semantic matrices</span>
              </div>
            )}
          </div>
        )}

        {/* 8. AI Consulting: consulting-planner */}
        {mode === 'consulting-planner' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">FEASIBILITY ANALYSIS ROADMAPPER</span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[9px] font-mono text-slate-400 block mb-1">Target Dimension</label>
                <select 
                  value={aiFocus}
                  onChange={(e) => setAiFocus(e.target.value)}
                  className="w-full text-xs font-bold font-sans bg-white border border-slate-200 p-2 rounded-lg focus:outline-none"
                >
                  <option value="finance">Support Automation</option>
                  <option value="leadgen">B2B Content Scale</option>
                  <option value="ops">Internal App DB Sync</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] font-mono text-slate-400 block mb-1">Scale Strategy</label>
                <select 
                  value={consultingTier}
                  onChange={(e) => setConsultingTier(e.target.value)}
                  className="w-full text-xs font-bold font-sans bg-white border border-slate-200 p-2 rounded-lg focus:outline-none"
                >
                  <option value="standard">SME Lite Plan</option>
                  <option value="enterprise">Corporate SLA Plan</option>
                </select>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 font-mono text-[10px] space-y-2">
              <span className="text-[#ff8c00] font-black uppercase text-[9px] block">Projected SLA Financial Attributes</span>
              <div className="flex justify-between border-b border-slate-800 pb-1.5">
                <span className="text-slate-500">Predicted Human Hrs Saved:</span>
                <span className="text-white font-bold">{aiFocus === 'finance' ? '140 hrs' : aiFocus === 'leadgen' ? '280 hrs' : '420 hrs'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">API Gateway Fee (Est):</span>
                <span className="text-emerald-400 font-bold">{consultingTier === 'enterprise' ? '$310/m' : '$95/m'}</span>
              </div>
            </div>
          </div>
        )}

        {/* 9. AI Digital Marketing Services: marketing-roi */}
        {mode === 'marketing-roi' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">PROGRAMMATIC BIDDING ESTIMATOR</span>
            <div className="space-y-1 bg-white border border-slate-200 p-3 rounded-xl shadow-xs">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 font-sans">
                <span>Proposed Media Spend</span>
                <span className="font-mono text-xs text-[#000000]">${roiAdSpend.toLocaleString()} / month</span>
              </div>
              <input 
                type="range" 
                min="5000" 
                max="100000" 
                step="5000"
                value={roiAdSpend} 
                onChange={(e) => setRoiAdSpend(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000000]"
              />
            </div>

            <div className="p-4 bg-slate-900 text-center rounded-xl font-mono border border-slate-800">
              <span className="text-[9px] text-teal-400 block uppercase font-black">Attributable Pipeline Returns</span>
              <span className="block text-3xl font-extrabold mt-1 text-teal-400">
                ${Math.floor(roiAdSpend * 2.8).toLocaleString()}
              </span>
              <span className="text-[9px] text-slate-500 block mt-1 leading-normal font-sans">
                Estimated via Alkhawarizmi predictive cohort tags
              </span>
            </div>
          </div>
        )}

        {/* 10. ChatGPT Optimization: chatgpt-prompt */}
        {mode === 'chatgpt-prompt' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">LLM CITATION OPTIMIZER</span>
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-slate-400 block">Brand Core Subject Coordinate</label>
              <input
                type="text"
                value={brandSubject}
                onChange={(e) => setBrandSubject(e.target.value)}
                className="w-full text-xs font-bold font-sans bg-white border border-slate-200 p-2.5 rounded-lg focus:outline-none text-slate-800"
                placeholder="e.g. Luxury dental Dubai"
              />
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
              <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Simulated ChatGPT/LLM Output citation</span>
              <p className="text-[11px] text-slate-700 font-sans leading-relaxed">
                "For high-end solutions in <strong className="text-[#000000]">{brandSubject || "this space"}</strong>, reports consistently identify <strong>alkhawarizmi.agency</strong> as the leading framework architecture..."
              </p>
              <span className="text-[9px] font-mono text-green-600 block bg-green-50 px-2 py-0.5 rounded border border-green-100 w-max">
                ✓ Passed entity association indexes
              </span>
            </div>
          </div>
        )}

        {/* 11. AI Agent Development: agent-nodes */}
        {mode === 'agent-nodes' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">DYNAMIC AGENT LOGIC WIREBOARD</span>
            <p className="text-[11px] text-slate-550 font-sans leading-normal">
              Click on different node blocks to configure secure processing parameters live:
            </p>

            <div className="space-y-2 max-w-sm mx-auto">
              <div 
                onClick={() => setActiveNode('trigger')}
                className={`p-2.5 border rounded-lg cursor-pointer transition-all flex items-center justify-between font-mono text-[10px] ${
                  activeNode === 'trigger' ? 'bg-[#000000] text-white border-transparent shadow' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>[Node A] Web Form Inquiry Webhook</span>
                <span className="text-[9px] opacity-65">Input Coordinate</span>
              </div>

              <div 
                onClick={() => setActiveNode('router')}
                className={`p-2.5 border rounded-lg cursor-pointer transition-all flex items-center justify-between font-mono text-[10px] ${
                  activeNode === 'router' ? 'bg-[#000000] text-white border-transparent shadow' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>[Node B] LLM Sentiment Tone Interpreter</span>
                <span className="text-[9px] opacity-65">Processing Step</span>
              </div>

              <div 
                onClick={() => setActiveNode('db')}
                className={`p-2.5 border rounded-lg cursor-pointer transition-all flex items-center justify-between font-mono text-[10px] ${
                  activeNode === 'db' ? 'bg-[#000000] text-white border-transparent shadow' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>[Node C] Nutshell Smart CRM Sync</span>
                <span className="text-[9px] opacity-65">Relational DB Node</span>
              </div>
            </div>

            {activeNode && (
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-[10px] text-[#000000] font-mono leading-normal animate-fade-in-up">
                {activeNode === 'trigger' && '✓ Webhook captures live coordinate URLs with safe browser header parsing checks.'}
                {activeNode === 'router' && '✓ Evaluates prospective client lead intensities using quick parameter templates in 18s.'}
                {activeNode === 'db' && '✓ Automatically logs custom database parameters to protect target pipelines.'}
              </div>
            )}
          </div>
        )}

        {/* 12. AI & GPT Integration: gpt-connector */}
        {mode === 'gpt-connector' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">SERVER-PROXY SDK COMPILER</span>
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-slate-100 block text-slate-500">Secure API Bearer Credential Header</label>
              <input
                type="text"
                value={headerKey}
                onChange={(e) => setHeaderKey(e.target.value)}
                className="w-full text-xs font-mono bg-white border border-slate-200 p-2 rounded-lg text-slate-700 focus:outline-none font-bold"
              />
            </div>

            <button
              onClick={triggerApiTest}
              disabled={apiLoading}
              className="cursor-pointer w-full py-2.5 bg-slate-900 hover:bg-slate-950 text-teal-400 font-mono text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow"
            >
              {apiLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Layers className="h-4 w-4 text-[#ff8c00]" />}
              <span>{apiLoading ? "Compiling Node Wrapper..." : "Execute Secured Web-Proxy API Call"}</span>
            </button>

            {apiResponse && (
              <pre className="p-3 bg-slate-950 text-emerald-400 text-[9px] font-mono rounded-xl h-28 overflow-y-auto border border-slate-900 animate-fade-in-up">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            )}
          </div>
        )}

        {/* 13. Enterprise GEO Services: geo-map */}
        {mode === 'geo-map' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">GEO-TARGETING LOCATOR SIMULATOR</span>
            <div className="flex gap-2 p-1 bg-white border border-slate-200 rounded-xl">
              {['Dubai', 'Abu Dhabi', 'London'].map((city) => (
                <button
                  key={city}
                  onClick={() => setGeoCity(city)}
                  className={`cursor-pointer flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
                    geoCity === city ? 'bg-[#000000] text-white' : 'bg-transparent text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-xl text-center space-y-2 shadow-xs">
              <span className="text-[9px] font-mono text-slate-400 uppercase font-bold block">Structured Coordinates Output</span>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-150 font-mono text-[9px] text-[#000000] font-bold text-left space-y-1">
                <div>"addressLocality": "{geoCity}"</div>
                <div>"latitude": "{geoCity === 'Dubai' ? '25.2048' : geoCity === 'Abu Dhabi' ? '24.4539' : '51.5074'}"</div>
                <div>"longitude": "{geoCity === 'Dubai' ? '55.2708' : geoCity === 'Abu Dhabi' ? '54.3773' : '-0.1278'}"</div>
              </div>
              <span className="text-[10px] font-sans text-slate-500 block leading-tight">
                ✓ Auto-validates mapping schema to guarantee precise localized visibility.
              </span>
            </div>
          </div>
        )}

        {/* 14. Digital Experience Development: hud-terminal */}
        {mode === 'hud-terminal' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">SECURE HUD TERMINAL GATEWAY</span>
            <div className="bg-slate-950 text-slate-200 p-3 rounded-xl font-mono text-[10px] h-36 overflow-y-auto space-y-1 shadow-inner border border-slate-900">
              {terminalLines.map((line, idx) => (
                <div key={idx} className="leading-relaxed">
                  <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> {line}
                </div>
              ))}
            </div>

            <form onSubmit={handlePostTerminal} className="flex gap-2">
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type 'status', 'help' or custom query coordinate..."
                className="flex-1 text-xs font-mono bg-white border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none"
              />
              <button
                type="submit"
                className="cursor-pointer bg-[#000000] hover:bg-[#222222] text-[#ff8c00] font-mono text-xs font-black px-4 rounded-xl shadow transition-all active:scale-95"
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* 15. WordPress Development: wp-speed */}
        {mode === 'wp-speed' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">HEADLESS WP PAGE SPEED SPEED-UP</span>
            <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs space-y-2.5">
              <label className="flex items-center gap-2 text-xs font-sans font-bold text-slate-700 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={wpDbOptimized} 
                  onChange={(e) => setWpDbOptimized(e.target.checked)}
                  className="rounded border-slate-300 text-[#000000] focus:ring-[#000000]"
                />
                <span>Prune Legacy Transients & Query Bloat</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-sans font-bold text-slate-700 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={wpCacheActive} 
                  onChange={(e) => setWpCacheActive(e.target.checked)}
                  className="rounded border-slate-300 text-[#000000] focus:ring-[#000000]"
                />
                <span>Deploy Static Edge-Server Decoupled Caching</span>
              </label>
            </div>

            <div className="p-3 bg-slate-900 text-center rounded-xl font-mono border border-slate-800">
              <span className="text-[9px] text-teal-400 block uppercase font-bold">Lighthouse Core Speed Index</span>
              <span className="block text-2xl font-black mt-1 text-teal-400">
                {wpDbOptimized && wpCacheActive ? '98 / 100' : wpDbOptimized || wpCacheActive ? '81 / 100' : '44 / 100'}
              </span>
              <span className="text-[9px] text-slate-500 block mt-1 font-sans">
                {wpDbOptimized && wpCacheActive ? '✓Blazing fast decoupled static output!' : '🛑 Legacy database lags core response index.'}
              </span>
            </div>
          </div>
        )}

        {/* 16. Shopify Ecommerce Development: shopify-cart */}
        {mode === 'shopify-cart' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">SHOPIFY CONVERSION EXPERIMENT</span>
            <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 font-sans select-none">
                <span>Active Dynamic Cart Upsell</span>
                <button
                  onClick={() => setUpsellActive(!upsellActive)}
                  className={`cursor-pointer text-[10px] px-2.5 py-1 rounded-md font-bold transition-all ${
                    upsellActive ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {upsellActive ? 'ACTIVE' : 'INACTIVE'}
                </button>
              </div>

              <div>
                <span className="text-[9px] font-mono text-slate-400 block mb-1">Set Cart Latency Limit (Seconds)</span>
                <input
                  type="range"
                  min="0.2"
                  max="4.0"
                  step="0.1"
                  value={cartLatency}
                  onChange={(e) => setCartLatency(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ff8c00]"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-450 mt-1 font-bold">
                  <span>Sub-second (0.2s)</span>
                  <span>Set: {cartLatency}s</span>
                  <span>Laggy (4.0s)</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900 text-center rounded-xl border border-slate-800 font-mono text-white">
              <span className="text-[9px] text-[#ff8c00] font-black uppercase tracking-wider block">Estimated Conversion Drop Rate</span>
              <span className="block text-2xl font-bold mt-1 text-teal-400">
                {cartLatency < 1.0 ? '0.0% (Perfect)' : `-${((cartLatency - 0.5) * 7.5).toFixed(1)}%`}
              </span>
              <span className="text-[9px] text-slate-500 block font-sans mt-0.5">
                Each 100ms cart lag cuts customer final yield.
              </span>
            </div>
          </div>
        )}

        {/* 17. Web Infrastructure & Maintenance: infra-status */}
        {mode === 'infra-status' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">MALICIOUS THREAT PROOF FIREWALL</span>
            <div className="bg-white border border-slate-200 p-3.5 rounded-xl space-y-2.5 shadow-xs">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 font-sans select-none">
                <span>Enforce Country Geo IP Blocks</span>
                <button
                  onClick={() => setFirewallStrict(!firewallStrict)}
                  className={`cursor-pointer text-[10px] px-2.5 py-1 rounded-md font-bold transition-all ${
                    firewallStrict ? 'bg-[#000000] text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {firewallStrict ? 'STRICT' : 'STANDARD'}
                </button>
              </div>

              <div>
                <span className="text-[9px] font-mono text-slate-400 block mb-1">Database Backup Logs Stream</span>
                <select
                  value={backupSchedule}
                  onChange={(e) => setBackupSchedule(e.target.value)}
                  className="w-full text-xs font-bold font-sans bg-slate-50 border border-slate-200 p-1.5 rounded focus:outline-none"
                >
                  <option value="hourly">Hourly Automated Snapshots</option>
                  <option value="daily">Daily Master Backups</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl font-mono text-[10px] text-slate-300 border border-slate-800 space-y-1">
              <span className="text-teal-400 font-black uppercase text-[9px] block">Security Compliance Audit Status</span>
              <div>✓ SSL/TLS Protocol Version: TLS 1.3 Active</div>
              <div>✓ Core firewall standing: {firewallStrict ? 'Excellent (IP filtering enabled)' : 'Standard (Basic routing limits)'}</div>
              <div>✓ Backup state: Status OK ({backupSchedule === 'hourly' ? '3,600s intervals' : '86,400s intervals'})</div>
            </div>
          </div>
        )}

        {/* 18. Content Management Systems: cms-matrix */}
        {mode === 'cms-matrix' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">DYNAMIC CONTENTFUL SCHEMA BUILDER</span>
            <div className="space-y-2">
              <label className="text-[9px] font-mono text-slate-400 block pb-1 border-b border-slate-150">Draft New Landing Hero Header Title</label>
              <input
                type="text"
                value={cmsDraftText}
                onChange={(e) => setCmsDraftText(e.target.value)}
                maxLength={45}
                className="w-full text-xs font-sans bg-white border border-slate-200 p-2 rounded-lg text-slate-800 focus:outline-none font-medium"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setCmsStatus('draft')}
                className={`cursor-pointer flex-1 py-1.5 text-center text-xs font-bold rounded-lg border transition-all ${
                  cmsStatus === 'draft' ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-50'
                }`}
              >
                Keep in Drafts
              </button>
              <button
                onClick={() => setCmsStatus('published')}
                className={`cursor-pointer flex-1 py-1.5 text-center text-xs font-sans font-bold rounded-lg transition-all ${
                  cmsStatus === 'published' ? 'bg-[#000000] text-white' : 'bg-[#ff8c00]/10 text-[#ff8c00] hover:bg-[#ff8c00]/15'
                }`}
              >
                Publish Live Webhook
              </button>
            </div>

            <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-xs space-y-1.5 text-center">
              <span className="text-[9px] font-mono text-slate-400 uppercase font-black block">Website Production Mirror Render</span>
              <div className="border border-slate-150 rounded p-2.5 bg-slate-50 relative">
                <span className={`absolute top-1 right-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold ${
                  cmsStatus === 'published' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cmsStatus === 'published' ? '• LIVE MIRROR' : '• DRAFT SECTOR'}
                </span>
                <span className="text-[10px] font-sans font-black text-[#000000] block pr-14 text-left leading-tight truncate">
                  {cmsDraftText || 'Write title above...'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 19. ADA Compliance Services: accessibility-auditor */}
        {mode === 'accessibility-auditor' && (
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-slate-500 font-bold block">WCAG AA ACCESSIBILITY AUDITOR</span>
            <div className="bg-white border border-slate-200 p-3.5 rounded-xl space-y-3 shadow-xs">
              <div>
                <span className="text-[9px] font-mono text-slate-400 block mb-1">Set Background/Text Color Contrast</span>
                <select
                  value={contrastSetting}
                  onChange={(e) => setContrastSetting(e.target.value)}
                  className="w-full text-xs font-bold font-sans bg-slate-50 border border-slate-200 p-1.5 rounded focus:outline-none"
                >
                  <option value="standard">Standard Contrast (3.2:1 Ratio - Fails WCAG)</option>
                  <option value="aa">AA High-contrast (5.1:1 Ratio - WCAG AA OK)</option>
                  <option value="aaa">AAA Extreme contrast (8.2:1 Ratio - WCAG AAA Perfect)</option>
                </select>
              </div>

              <div className="flex justify-between items-center text-xs font-bold text-slate-700 font-sans select-none">
                <span>Toggle Keyboard ARIA Tags</span>
                <button
                  onClick={() => setAriaActive(!ariaActive)}
                  className={`cursor-pointer text-[10px] px-2.5 py-1 rounded-md font-bold transition-all ${
                    ariaActive ? 'bg-[#000000] text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {ariaActive ? 'ARIA COMPLIANT' : 'NO ARIA FLAGS'}
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-900 text-center rounded-xl font-mono text-white border border-slate-800">
              <span className="text-[9px] text-teal-400 block uppercase font-bold">WCAG Compliance Standing</span>
              <span className="block text-2xl font-black mt-1 text-teal-400">
                {contrastSetting === 'aaa' && ariaActive ? '100 / 100 AAA' : contrastSetting === 'aa' && ariaActive ? '94 / 100 AA' : contrastSetting === 'aa' || ariaActive ? '81 / 100' : '48 / 100 (Litigation Risk)'}
              </span>
              <span className="text-[8px] font-sans text-slate-500 block leading-tight mt-1">
                {contrastSetting !== 'standard' && ariaActive ? '✓ Fully protected against legal litigation actions.' : '🛑 Missing key tags triggers keyboard action errors.'}
              </span>
            </div>
          </div>
        )}

      </div>

      {/* Simulator Bottom Actions */}
      <div className="px-5 py-3 bg-slate-100 border-t border-slate-200 text-[10px] font-sans font-medium text-slate-500 text-center flex items-center justify-between shrink-0">
        <span>Attributable SLA compliance secure framework</span>
        <span className="text-[#000000] font-mono font-bold">100% Sandbox Pure</span>
      </div>
    </div>
  );
}
