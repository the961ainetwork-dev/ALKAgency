import React, { useState } from 'react';
import { 
  Cpu, RefreshCw, ArrowRight, Zap, CheckCircle, Check, 
  AlertCircle, Sparkles, Code, ArrowLeft, PenTool, Layout, 
  Share2, ShoppingBag, Mail, Brain, TrendingUp, MessageSquare, 
  Bot, Layers, Globe, Settings, Terminal, Database, ShieldAlert, 
  Monitor, ChevronRight, FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UX_AI_CATEGORIES, SubserviceDetail, ServiceCategory } from '../data/uxaiServices';
import ServiceSimulator from '../components/ServiceSimulator';

interface UxAiPageProps {
  onGraderClick: () => void;
  onServicesClick: () => void;
}

const TEMPLATE_RESPONSES: Record<string, { title: string; desc: string; keywords: string[] }> = {
  realestate: {
    title: "Luxury Penthouses for Sale in Dubai | Executive Residences",
    desc: "Discover award-winning luxury penthouses featuring high-fidelity architectural designs, breathtaking skyline viewports, and custom private pools. Positioned perfectly on the canal. Synchronize a private viewing with our specialists.",
    keywords: ["Dubai luxury penthouses", "residences for sale", "skyline views", "investment properties"]
  },
  medical: {
    title: "Elite Pediatric Dental Care & Surgery | Family Dentistry Services",
    desc: "Experience pain-free pediatric dentistry utilizing clean advanced sedation technology and child-friendly clinical viewports. Secure a same-day screening appointment mapping localized health insurance coverage instantly.",
    keywords: ["pediatric dental care", "family dentist clinic", "painless tooth surgery", "dental insurance Dubai"]
  },
  ecommerce: {
    title: "Artisanal Single-Origin Coffee Beans | Organic Dark Roast Blend",
    desc: "Shop ethically sourced organic coffee beans roasted locally in micro-batches to maximize flavor density. Includes swift 48-hour climate-controlled delivery tracking indices and easy, secure Shopify cartridge integration.",
    keywords: ["single origin coffee beans", "organic dark roast", "roastery online shop", "ethically sourced coffee"]
  }
};

export default function UxAiPage({ onGraderClick, onServicesClick }: UxAiPageProps) {
  const [selectedSubserviceId, setSelectedSubserviceId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'design' | 'ai' | 'development'>('all');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Original playground states
  const [optimizerSlider, setOptimizerSlider] = useState<number>(45); // lighthouse score
  const [optimizedCopySector, setOptimizedCopySector] = useState<string>('realestate');
  const [isPlayingWithAi, setIsPlayingWithAi] = useState(false);

  // Dynamic values depending on slider
  const getLighthouseMetrics = (val: number) => {
    const perf = Math.min(100, Math.floor(val * 1.05));
    const access = Math.min(100, Math.floor(val + 15));
    const seo = Math.min(100, Math.floor(val + 35));
    const speedIndex = (7.8 - (val / 100) * 6.2).toFixed(1) + "s";
    return { perf, access, seo, speedIndex };
  };

  const metrics = getLighthouseMetrics(optimizerSlider);

  const handleRewrite = (sector: string) => {
    setIsPlayingWithAi(true);
    setTimeout(() => {
      setOptimizedCopySector(sector);
      setIsPlayingWithAi(false);
    }, 750);
  };

  const activeResponse = TEMPLATE_RESPONSES[optimizedCopySector];

  // Icon dynamic rendering helper
  const renderLucideIcon = (name: string, className = "h-5 w-5") => {
    switch (name) {
      case 'Layout': return <Layout className={className} />;
      case 'RefreshCw': return <RefreshCw className={className} />;
      case 'Zap': return <Zap className={className} />;
      case 'Share2': return <Share2 className={className} />;
      case 'ShoppingBag': return <ShoppingBag className={className} />;
      case 'Mail': return <Mail className={className} />;
      case 'PenTool': return <PenTool className={className} />;
      case 'Brain': return <Brain className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'MessageSquare': return <MessageSquare className={className} />;
      case 'Bot': return <Bot className={className} />;
      case 'Layers': return <Layers className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'Code': return <Code className={className} />;
      case 'Settings': return <Settings className={className} />;
      case 'Terminal': return <Terminal className={className} />;
      case 'Database': return <Database className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'Cpu': return <Cpu className={className} />;
      case 'Monitor': return <Monitor className={className} />;
      default: return <Cpu className={className} />;
    }
  };

  // Find currently selected subservice if any
  const allSubservices = UX_AI_CATEGORIES.flatMap(cat => cat.items.map(item => ({ ...item, categoryKey: cat.key, categoryTitle: cat.title })));
  const currentSubservice = allSubservices.find(sub => sub.id === selectedSubserviceId);

  const triggerBookAccess = (name: string) => {
    setSuccessToast(`SLA Assessment request logged successfully for ${name}! Our team will generate coordinate deliverables maps in 24 hours.`);
    setTimeout(() => {
      setSuccessToast(null);
    }, 4500);
  };

  return (
    <div id="ux-ai-page" className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans select-none">
      
      {/* Toast Alert Notification */}
      <AnimatePresence>
        {successToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4"
          >
            <div className="bg-[#000000] text-white p-4 rounded-2xl shadow-2xl border border-teal-500/30 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-teal-400 shrink-0 mt-0.5 animate-bounce" />
              <div className="flex-1 text-xs">
                <span className="font-bold text-teal-400 block mb-0.5">AL KHAWARIZMI SECURE LOGGER</span>
                <p className="font-medium text-slate-200">{successToast}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#001c4a] via-[#000000] to-teal-950 text-white py-14 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-2 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl text-none pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-mono text-[#ff8c00] font-bold">
                <Cpu className="h-4 w-4 text-teal-400 animate-spin" />
                <span>MULTIPLE-PILLAR CRO & AI SUITE</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-none text-white">
                UX Design Fuses with <span className="text-teal-450 text-teal-400">Custom AI®</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Most agencies build pretty websites. Alkhawarizmi engineers sub-second visual architectures, custom AI pipelines, and accessible secure frameworks that lift organic traffic conversion yields dynamically.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={onGraderClick}
                  className="cursor-pointer bg-[#ff8c00] hover:bg-[#e07b00] text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                  Analyze My Page Speed
                </button>
                <button
                  onClick={onServicesClick}
                  className="cursor-pointer bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all text-center"
                >
                  Interactive SLA Estimates
                </button>
              </div>

              {/* Stats benchmarks */}
              <div className="grid grid-cols-3 gap-6 pt-5 border-t border-white/10 max-w-lg">
                <div>
                  <span className="block text-xl sm:text-2xl font-mono font-black text-teal-400">&gt; 98 / 100</span>
                  <span className="block text-[10px] text-slate-400 mt-1 font-medium">Lighthouse Speed KPI</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-mono font-black text-white">+114%</span>
                  <span className="block text-[10px] text-slate-400 mt-1 font-medium">Average conversion lift</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-mono font-black text-white">100% Secure</span>
                  <span className="block text-[10px] text-slate-400 mt-1 font-medium">Fully sandboxed API keys</span>
                </div>
              </div>
            </div>

            {/* Right Side: Quick Status Dashboard */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <span className="text-[9px] font-mono tracking-widest text-[#ff8c00] uppercase font-bold block">ACTIVE CORE COORDINATES</span>
                <h3 className="text-lg font-bold text-white mt-1 font-sans">18 Enterprise Solutions Active</h3>
                <p className="text-slate-400 text-[11px] mt-1">Select any service pathway below to trigger its deep interactive landing subpage and SLA pricing simulator workspace.</p>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-teal-300 space-y-1">
                <span className="text-slate-555 text-slate-500">// Safe server-side lazy SDK initialization</span>
                <div>
                  <span className="text-pink-400">const</span> AI_SDK = <span className="text-pink-400">new</span> GoogleGenAI(&#123;
                </div>
                <div className="pl-4">
                  apiKey: process.env.GEMINI_KEY
                </div>
                <div>&#125;);</div>
              </div>

              <div className="text-center p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-[10px] text-teal-450 text-teal-450 font-sans font-medium">
                💡 Node/Express proxy ensures your third-party API keys remain strictly hidden from modern browsers.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Primary Page Workflow Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          
          {/* Subpage detail view if active */}
          {selectedSubserviceId && currentSubservice ? (
            <motion.div
              key="subpage-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Back button and Bradcrumbs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                <button
                  onClick={() => setSelectedSubserviceId(null)}
                  className="cursor-pointer inline-flex items-center gap-2 hover:bg-slate-50 border border-slate-222 border-slate-200 hover:text-slate-900 text-slate-600 px-4 py-2 text-xs font-bold rounded-xl transition-all w-max font-sans select-none"
                >
                  <ArrowLeft className="h-4 w-4 text-[#ff8c00]" />
                  <span>Return to UX & AI Hub</span>
                </button>
                <div className="text-[10px] font-mono text-slate-400 font-semibold select-all">
                  UX-AI-PORTAL / {currentSubservice.categoryTitle.toUpperCase()} / {currentSubservice.name.toUpperCase()}
                </div>
              </div>

              {/* Main Subpage layout grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left details panel (cols 7) */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                  
                  {/* Title block */}
                  <div className="space-y-3 pb-5 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="p-3 bg-blue-50 rounded-xl border border-blue-100/50 text-[#000000] shadow-sm">
                        {renderLucideIcon(currentSubservice.iconName, "h-6 w-6")}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff8c00] font-black">{currentSubservice.categoryTitle} Portfolio Service</span>
                        <h2 className="text-2xl sm:text-3xl font-sans font-black text-[#000000] tracking-tight">{currentSubservice.name}</h2>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed font-sans">{currentSubservice.longDesc}</p>
                  </div>

                  {/* Core Metrics strip */}
                  <div className="grid grid-cols-3 gap-4">
                    {currentSubservice.metrics.map((m, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                        <span className="text-[9px] font-mono text-slate-400 uppercase font-black block">{m.label}</span>
                        <span className="text-lg sm:text-xl font-mono font-black text-slate-800 mt-1 block">
                          {m.value}{m.suffix}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables section */}
                  <div className="space-y-3.5">
                    <h4 className="text-xs font-mono text-slate-950 uppercase tracking-widest font-black">Project Deliverables & Milestones</h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {currentSubservice.deliverables.map((deliv, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start p-3 bg-slate-50 border border-slate-150 rounded-xl">
                          <CheckCircle className="h-4.5 w-4.5 text-teal-600 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-700 font-sans font-medium">{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA Block inside sub-page */}
                  <div className="bg-gradient-to-br from-[#001c4a] to-[#000000] p-5 sm:p-6 rounded-2xl text-white relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="space-y-1.5 text-center sm:text-left">
                      <span className="text-[9px] font-mono text-teal-400 uppercase font-bold">ALKHAWARIZMI AGENCY SLA SYSTEM</span>
                      <h4 className="text-sm sm:text-base font-bold font-sans">Ready to estimate your target outcome?</h4>
                      <p className="text-[10px] text-slate-300">Unlock fully managed performance targets with money-back outcomes.</p>
                    </div>
                    <button
                      onClick={() => triggerBookAccess(currentSubservice.name)}
                      className="cursor-pointer bg-[#ff8c00] hover:bg-[#e07b00] text-white text-xs font-black font-sans px-5 py-3 rounded-xl shadow-lg transition-all active:scale-95 shrink-0"
                    >
                      Retrieve Live Quote
                    </button>
                  </div>

                </div>

                {/* Right interactive sandbox panel (cols 5) */}
                <div className="lg:col-span-5 h-full">
                  <div className="lg:sticky lg:top-24 space-y-4">
                    <ServiceSimulator mode={currentSubservice.interactiveMode} serviceName={currentSubservice.name} />
                    
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 text-[11px] text-slate-500 font-sans leading-normal">
                      <span className="font-bold text-slate-800 block mb-1">Interactive Simulation Info:</span>
                      These sliders and inputs mock core responsive parameters and speed diagnostics in real-time, matching Alkhawarizmi's SLA values.
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hub-overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              
              {/* Category Filter and Header info */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-slate-200 pb-6">
                <div className="max-w-xl text-center lg:text-left">
                  <span className="text-xs font-mono uppercase tracking-widest text-teal-600 font-bold">PORTFOLIO DEEP DIVE</span>
                  <h2 className="text-2xl sm:text-3xl font-sans font-black text-[#000000] tracking-tight">Enterprise Visual & Engineering Architecture</h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">Select from our 18 tailored sub-services to load deep interactive modules, code parameters, and check deliverables lists.</p>
                </div>

                {/* Toggle category filter tabs */}
                <div className="flex bg-slate-100 border border-slate-200 hover:border-slate-250 p-1 rounded-xl gap-1">
                  {(['all', 'design', 'ai', 'development'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`cursor-pointer px-4 py-2 text-xs font-black font-sans rounded-lg transition-all ${
                        filterCategory === cat 
                          ? 'bg-[#000000] text-white shadow-sm' 
                          : 'bg-transparent text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid representation of Categorized Services */}
              <div className="space-y-10">
                {UX_AI_CATEGORIES.filter(cat => filterCategory === 'all' || cat.key === filterCategory).map((category) => (
                  <div key={category.key} className="space-y-5 animate-fade-in-up">
                    
                    {/* Header of Category */}
                    <div className="flex items-center gap-2.5 pb-2 border-b border-slate-150">
                      <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100/50 text-[#000000]">
                        {renderLucideIcon(category.iconName, "h-5 w-5")}
                      </div>
                      <div>
                        <h3 className="text-lg font-black font-sans text-slate-900 uppercase tracking-tight">{category.title} Solutions</h3>
                        <p className="text-[11px] text-slate-500 font-medium">{category.description}</p>
                      </div>
                    </div>

                    {/* Cards grid for items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.items.map((it: SubserviceDetail) => (
                        <div
                          key={it.id}
                          onClick={() => setSelectedSubserviceId(it.id)}
                          className="group cursor-pointer bg-white border border-slate-210 border-slate-200 hover:border-slate-300 p-5 rounded-2xl transition-all hover:shadow-lg hover:scale-[1.01] flex flex-col justify-between h-56 duration-200 select-none"
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <div className="p-2.5 bg-slate-50 group-hover:bg-blue-50/50 rounded-xl border border-slate-150 group-hover:border-blue-100/50 text-[#000000] group-hover:text-[#ff8c00] transition-colors shrink-0">
                                {renderLucideIcon(it.iconName, "h-5 w-5")}
                              </div>
                              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold text-slate-400 group-hover:text-[#000000] transition-colors">
                                <span>INTERACTIVE PG</span>
                                <ChevronRight className="h-3 w-3" />
                              </span>
                            </div>

                            <div className="space-y-1">
                              <h4 className="text-sm font-sans font-black text-slate-950 tracking-tight group-hover:text-[#ff8c00] transition-colors">
                                {it.name}
                              </h4>
                              <p className="text-[11px] text-slate-600 group-hover:text-slate-700 leading-normal font-medium max-w-sm line-clamp-3">
                                {it.shortDesc}
                              </p>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-100 mt-2 flex justify-between items-center text-[10px] font-mono">
                            <span className="text-slate-450 font-medium font-semibold text-slate-400">Target score: {it.metrics[0].value}%+</span>
                            <span className="text-[#000000] font-black group-hover:underline flex items-center gap-0.5">
                              <span>Open landing page</span>
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>

              {/* Extra Interactive Speed Optimizer simulation */}
              <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-6 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/[0.01] rounded-full blur-3xl pointer-events-none" />
                
                <div className="border-b border-slate-100 pb-6 mb-8 text-center sm:text-left">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ff8c00] font-bold block mb-2">VITAL SPEED GAUGER</span>
                  <h2 className="text-2xl sm:text-3xl font-sans font-black text-[#000000] tracking-tight">Lighthouse Core Web Vitals Tuner</h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">Drag the target optimization score slider below to simulate how compressing visual assets and deferred JS imports lifts rendering speed markers immediately.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-inner">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs sm:text-sm font-bold text-slate-800 font-sans">Optimization Score Objective</span>
                        <span className="text-2xl font-mono font-black text-[#ff8c00]">{optimizerSlider} / 100</span>
                      </div>
                      <input
                        type="range"
                        min="30"
                        max="99"
                        step="1"
                        value={optimizerSlider}
                        onChange={(e) => setOptimizerSlider(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000000] focus:outline-none"
                      />
                      <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-2 font-bold">
                        <span>30 (Blocking scripts)</span>
                        <span>70 (Moderate)</span>
                        <span>99+ (Alkhawarizmi optimal)</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
                      <h4 className="text-xs font-mono text-[#000000] uppercase tracking-widest font-black">Performance Actions Taken</h4>
                      <ul className="space-y-2.5 text-xs text-slate-700 font-medium font-sans">
                        {optimizerSlider < 65 ? (
                          <li className="flex items-center gap-2 text-amber-700">
                            <AlertCircle className="h-4 w-4 shrink-0 animate-bounce text-amber-500" />
                            <span>Render-blocking custom scripts are delaying LCP index triggers.</span>
                          </li>
                        ) : (
                          <li className="flex items-center gap-2 text-green-700">
                            <Check className="h-4 w-4 shrink-0 text-green-600" />
                            <span>Bundled scripts compressed, and dynamic imports lazy initialized.</span>
                          </li>
                        )}
                        {optimizerSlider < 85 ? (
                          <li className="flex items-center gap-2 text-amber-700">
                            <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />
                            <span>Media dimensions lack responsive container viewport flags.</span>
                          </li>
                        ) : (
                          <li className="flex items-center gap-2 text-green-700">
                            <Check className="h-4 w-4 shrink-0 text-green-600" />
                            <span>Images and CSS elements lazy-loaded safely.</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-slate-400 uppercase">Performance</span>
                      <div className="my-2 relative flex items-center justify-center">
                        <span className={`text-2xl font-black font-mono ${metrics.perf < 50 ? 'text-red-500' : metrics.perf < 85 ? 'text-amber-500' : 'text-green-600'}`}>
                          {metrics.perf}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400">Score Out of 100</span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-slate-400 uppercase">Accessibility</span>
                      <div className="my-2 relative flex items-center justify-center">
                        <span className={`text-2xl font-black font-mono ${metrics.access < 50 ? 'text-red-500' : metrics.access < 85 ? 'text-amber-500' : 'text-green-600'}`}>
                          {metrics.access}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400">Contrast/ARIA standard</span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-slate-400 uppercase">SEO Standard</span>
                      <div className="my-2 relative flex items-center justify-center">
                        <span className={`text-2xl font-black font-mono ${metrics.seo < 50 ? 'text-red-500' : metrics.seo < 85 ? 'text-amber-500' : 'text-green-600'}`}>
                          {metrics.seo}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400">Structured tags</span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-slate-400 uppercase">Speed Index</span>
                      <div className="my-2 relative flex items-center justify-center">
                        <span className="text-xl font-black font-mono text-[#000000]">
                          {metrics.speedIndex}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400">First Paint index</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ContentGenius® Interactive Writer Sandbox Block */}
              <div className="space-y-8 pb-4">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ff8c00] font-bold">WRITING SANDBOX PLAYGROUND</span>
                  <h3 className="text-2xl sm:text-3xl font-sans font-black text-[#000000] tracking-tight font-sans">Interactive Copywriting Optimizer Sandbox</h3>
                  <p className="text-xs sm:text-sm text-slate-650 text-slate-600">Select an industry model sector below to see how our AI ContentGenius® refines standard paragraphs into rich organic copy tracking competitive search metrics instantly.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm">
                    <div className="space-y-4 font-sans text-xs">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-slate-400 font-bold block pb-2 border-b border-slate-100">Select Industry Model Scope</label>
                      <div className="space-y-2">
                        {(['realestate', 'medical', 'ecommerce'] as const).map((sector) => (
                          <button
                            key={sector}
                            onClick={() => handleRewrite(sector)}
                            className={`cursor-pointer w-full text-left p-3 rounded-lg text-xs font-bold border transition-all flex justify-between items-center ${
                              optimizedCopySector === sector
                                ? 'bg-blue-50/70 border-blue-400 text-[#000000] shadow-sm'
                                : 'bg-slate-50 text-slate-600 border-slate-150 hover:bg-slate-100'
                            }`}
                          >
                            <span>
                              {sector === 'realestate' && '🏢 Luxury Real Estate Loft'}
                              {sector === 'medical' && '🦷 Pediatric Dentistry & Clinics'}
                              {sector === 'ecommerce' && '☕ Specialty Single-Origin Coffee'}
                            </span>
                            <ArrowRight className="h-4 w-4 opacity-50" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-[11px] font-sans text-slate-600 leading-normal">
                      <span className="font-bold text-slate-800 block mb-1">How AI Generation Works:</span>
                      We pass structured directives to Gemini to align content against Google's Helpful Content guidelines, raising your site's authority index automatically.
                    </div>
                  </div>

                  <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-white min-h-[350px]">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-1.5 text-teal-400">
                        <Sparkles className="h-4 w-4 animate-spin duration-1000 text-teal-400" />
                        <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-[#ff8c00]">ContentGeniusFX® Writing output</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">Proxy Model: Gemini-3.5-Flash Active</span>
                    </div>

                    {isPlayingWithAi ? (
                      <div className="flex-1 flex flex-col items-center justify-center space-y-3">
                        <RefreshCw className="h-8 w-8 text-teal-400 animate-spin" />
                        <span className="text-xs text-slate-500 font-mono">Running custom semantic AI optimization loops...</span>
                      </div>
                    ) : (
                      <div className="flex-1 py-6 space-y-6">
                        <div className="space-y-3">
                          <span className="text-[9px] font-mono text-slate-500 uppercase font-black">Generated Title Tag Optimized:</span>
                          <h4 className="text-base sm:text-lg font-bold font-sans text-teal-400 tracking-tight">{activeResponse.title}</h4>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[9px] font-mono text-slate-500 uppercase font-black">Generated Meta Description Body:</span>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-medium">{activeResponse.desc}</p>
                        </div>

                        <div className="space-y-2 pt-3">
                          <span className="text-[9px] font-mono text-slate-500 uppercase font-bold block">Targeted High-Intent Semantic Keyword Coordinates Mapping:</span>
                          <div className="flex flex-wrap gap-2">
                            {activeResponse.keywords.map((kw, i) => (
                              <span key={i} className="px-2 py-1 rounded bg-slate-800 text-teal-300 font-mono text-[10px] font-600 font-bold">
                                #{kw}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
                      <span>Passes safe entity checking algorithms.</span>
                      <span className="text-green-500 font-bold flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>SEO Ready</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* bottom cta banner */}
              <div className="bg-gradient-to-r from-[#000000] to-[#ff8c00] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="absolute top-0 right-10 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
                <div className="space-y-3 max-w-xl text-center sm:text-left">
                  <span className="text-xs font-mono tracking-widest text-teal-400 font-bold uppercase">UNCOMPROMISING USER EXPERIENCE</span>
                  <h3 className="text-2xl sm:text-4xl font-black tracking-tight font-sans text-white">Rewrite Your Conversion Limits.</h3>
                  <p className="text-slate-200 text-xs">Run our digital crawler audit right now to identify rendering lag and spacing issues on modern devices instantly.</p>
                </div>
                <button
                  onClick={onGraderClick}
                  className="cursor-pointer bg-white hover:bg-slate-50 text-[#000000] font-black font-sans text-xs px-8 py-4 rounded-xl shadow-lg transition-transform active:scale-95 shrink-0"
                >
                  Launch MarketingCloudFX
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </section>

    </div>
  );
}
