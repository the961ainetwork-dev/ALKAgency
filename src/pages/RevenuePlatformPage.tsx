import React, { useState } from 'react';
import { Sparkles, BarChart3, TrendingUp, Cpu, Award, Zap, Phone, Mail, FolderOpen, Play, CheckCircle2, DollarSign, Users, Award as AwardIcon, ArrowRight, ShieldCheck, Check, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface RevenuePlatformPageProps {
  onGraderClick: () => void;
  onServicesClick: () => void;
}

export default function RevenuePlatformPage({ onGraderClick, onServicesClick }: RevenuePlatformPageProps) {
  const [activeTab, setActiveTab] = useState<'mcfx' | 'crm' | 'voice' | 'forms' | 'mail'>('mcfx');
  const [isPlayingCall, setIsPlayingCall] = useState(false);
  const [callProgress, setCallProgress] = useState(30);

  const togglePlayCall = () => {
    setIsPlayingCall(!isPlayingCall);
    if (!isPlayingCall) {
      const interval = setInterval(() => {
        setCallProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlayingCall(false);
            return 100;
          }
          return prev + 5;
        });
      }, 300);
    } else {
      setCallProgress(30);
    }
  };

  return (
    <div id="revenue-platform-page" className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0c1020] via-[#000000] to-[#ff8c00]/40 text-white py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-2 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-mono text-[#ff8c00] font-bold">
                <Zap className="h-4 w-4 text-orange-400 animate-pulse" />
                <span>MARKETINGCLOUDFX ENGINE PORTAL</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-tight">
                Unified Sales <span className="text-[#ff8c00]">Telemetry®</span> Dashboard
              </h1>
              <p className="text-slate-350 text-base sm:text-lg max-w-2xl leading-relaxed">
                Most platforms display confusing graphs. MarketingCloudFX aggregates incoming leads, dynamic telephone voice recordings, form analytics, and CRM sales pipelines into a single high-fidelity, attributable return dashboard.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={onGraderClick}
                  className="cursor-pointer bg-[#ff8c00] hover:bg-[#e07b00] text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                  Analyze My Website Now
                </button>
                <button
                  onClick={onServicesClick}
                  className="cursor-pointer bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-8 py-4 rounded-xl transition-all text-center"
                >
                  Interactive SLA Estimates
                </button>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
                <div>
                  <span className="block text-2xl sm:text-3xl font-mono font-black text-[#ff8c00]">4.5x</span>
                  <span className="block text-xs text-slate-400 mt-1 font-medium">Average ROI Factor</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-mono font-black text-white">$10B+</span>
                  <span className="block text-xs text-slate-400 mt-1 font-medium">Attributable Transactions</span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-mono font-black text-white">100% Attributed</span>
                  <span className="block text-xs text-slate-400 mt-1 font-medium">Every inquiry traced</span>
                </div>
              </div>
            </div>

            {/* Right mock UI logo card */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff8c00]/10 rounded-full blur-2xl animate-pulse" />
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#ff8c00] uppercase font-bold block">AL KHAWARIZMI SUITE</span>
                <h3 className="text-xl font-bold text-white mt-1">MarketingCloudFX</h3>
                <p className="text-slate-400 text-xs mt-1">Our fully integrated suite of proprietary tracking properties.</p>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#ff8c00] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">LeadManagerFX™ Tracker</span>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Traces incoming online emails and forms directly to dynamic keyword targets.</p>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex gap-3 items-start">
                  <CheckCircle2 className="h-5 w-5 text-[#ff8c00] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">CallTrackerFX™ VoIP Logging</span>
                    <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Drives telephone routing values with full transcripts synced directly to your target CRM.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Mock Software Dashboard Container */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#ff8c00] font-bold">SOFTWARE PREVIEW DEMO</span>
            <h2 className="text-2xl sm:text-3xl font-sans font-black text-[#000000] tracking-tight">Interactive MarketingCloudFX Demonstration</h2>
            <p className="text-sm text-slate-600">Click the menu items on the left sidebar to navigate and interact with realistic modules in our platform ecosystem.</p>
          </div>

          <div className="bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
            
            {/* Dashboard Sidebar (cols 4) */}
            <div className="md:col-span-3 bg-slate-900 text-white p-5 flex flex-col justify-between border-r border-slate-800">
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-800">
                  <span className="text-xs font-sans font-extrabold text-[#ff8c00] block">Telemetry Software</span>
                  <span className="text-sm font-sans font-black tracking-tight text-white block mt-0.5">MarketingCloudFX v4.0</span>
                </div>
                
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('mcfx')}
                    className={`cursor-pointer w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                      activeTab === 'mcfx'
                        ? 'bg-[#000000] text-[#ff8c00] font-extrabold shadow'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <BarChart3 className="h-4 w-4 shrink-0" />
                    <span>Unified Telemetry</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('crm')}
                    className={`cursor-pointer w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                      activeTab === 'crm'
                        ? 'bg-[#000000] text-[#ff8c00] font-extrabold shadow'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Users className="h-4 w-4 shrink-0" />
                    <span>Nutshell CRM Pipeline</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('voice')}
                    className={`cursor-pointer w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                      activeTab === 'voice'
                        ? 'bg-[#000000] text-[#ff8c00] font-extrabold shadow'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>CallTrackerFX Audio</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('forms')}
                    className={`cursor-pointer w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                      activeTab === 'forms'
                        ? 'bg-[#000000] text-[#ff8c00] font-extrabold shadow'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <FolderOpen className="h-4 w-4 shrink-0" />
                    <span>LeadManagerFX Forms</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('mail')}
                    className={`cursor-pointer w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                      activeTab === 'mail'
                        ? 'bg-[#000000] text-[#ff8c00] font-extrabold shadow'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Mail className="h-4 w-4 shrink-0" />
                    <span>Mail360FX Automation</span>
                  </button>
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 font-mono">
                Safe TLS channels active. Server latency: 12ms.
              </div>
            </div>

            {/* Dashboard Workspace (cols 9) */}
            <div className="md:col-span-9 bg-slate-50 p-6 md:p-8 flex flex-col justify-between">
              
              {activeTab === 'mcfx' && (
                <div className="space-y-6 flex-1 animate-fade-in-up">
                  <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-sans">Unified Pipeline Telemetry Overview</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Overall Marketing ROI reporting compiled in real-time.</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-green-700 text-[10px] font-mono font-bold animate-pulse">● LIVE METRICS RUNNING</span>
                  </div>

                  {/* Summary row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <span className="text-[9px] font-mono text-slate-450 block uppercase">Client Pipeline Sales Value</span>
                      <span className="text-xl font-bold font-mono text-[#000000] block mt-1">$458,920.00</span>
                      <span className="text-[9px] text-green-600 font-mono font-bold block mt-1">+14.2% week-on-week</span>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <span className="text-[9px] font-mono text-slate-450 block uppercase">Attributable Transactions</span>
                      <span className="text-xl font-bold font-mono text-[#000000] block mt-1">1,429 cases</span>
                      <span className="text-[9px] text-green-600 font-mono font-semibold block mt-1">100% matched to ad query</span>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <span className="text-[9px] font-mono text-slate-450 block uppercase">Ad Clicks Cost Index</span>
                      <span className="text-xl font-bold font-mono text-green-600 block mt-1">$0.92 CPA average</span>
                      <span className="text-[9px] text-blue-600 font-mono font-bold block mt-1">Saved 32% budget targets</span>
                    </div>
                  </div>

                  {/* Graphic mock chart */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <span className="text-[9px] font-mono text-slate-450 uppercase block">Weekly Conversion Pipeline Yield Index</span>
                    <div className="h-28 flex items-end gap-3 pt-4 border-b border-slate-200 px-2">
                      <div className="flex-1 bg-slate-100 rounded-t-lg h-2/3 hover:bg-[#000000] transition-all relative group">
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-mono">$1.2k</span>
                      </div>
                      <div className="flex-1 bg-slate-100 rounded-t-lg h-3/4 hover:bg-[#000000] transition-all relative group">
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-mono">$1.8k</span>
                      </div>
                      <div className="flex-1 bg-slate-100 rounded-t-lg h-1/2 hover:bg-[#000000] transition-all relative group">
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-mono">$0.9k</span>
                      </div>
                      <div className="flex-1 bg-gradient-to-t from-[#ff8c00] to-[#000000] rounded-t-lg h-full relative group">
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#000000] text-[#ff8c00] text-[9px] font-bold p-1 rounded font-mono shadow-md">$3.4k</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>Standard Ad week 1</span>
                      <span>Standard Ad week 2</span>
                      <span>Standard Ad week 3</span>
                      <span className="font-bold text-[#ff8c05]">Alkhawarizmi optimization week 4</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'crm' && (
                <div className="space-y-6 flex-1 animate-fade-in-up">
                  <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-sans">Nutshell Smart CRM Pipeline Integration</h4>
                      <p className="text-[11px] text-[#000000] font-sans font-semibold">Active deals mapping synced dynamically across sales representatives.</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#000000] text-[10px] font-mono font-bold">14 reps logged</span>
                  </div>

                  {/* CRM Column stages */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                      <span className="text-[9px] font-mono text-slate-500 uppercase font-extrabold pb-1.5 border-b border-slate-100 block">01. INCOMING LEAD INQUIRY</span>
                      <div className="bg-slate-50 p-2.5 rounded border border-slate-200 space-y-1">
                        <span className="font-bold font-sans text-xs text-slate-800 block">Maverick Systems LLC</span>
                        <div className="flex justify-between text-[10px] text-slate-450 font-mono">
                          <span>$14,500 deal</span>
                          <span className="text-[#ff8c00]">OmniSEO® source</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                      <span className="text-[9px] font-mono text-slate-550 uppercase font-bold pb-1.5 border-b border-slate-100 block">02. STRATEGY AUDIT PROPOSAL</span>
                      <div className="bg-slate-50 p-2.5 rounded border border-slate-200 space-y-1">
                        <span className="font-bold font-sans text-xs text-slate-800 block">Vanguard Realty Group</span>
                        <div className="flex justify-between text-[10px] text-slate-450 font-mono">
                          <span>$32,000 deal</span>
                          <span className="text-green-600 font-bold">LCP score Optimized</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#000000]/5 p-4 rounded-xl border border-blue-200/50 shadow-sm space-y-3 relative">
                      <span className="text-[9px] font-mono text-[#000000] uppercase font-bold pb-1.5 border-b border-blue-200 block">03. EXECUTIVE LAUNCH DEALS</span>
                      <div className="bg-white p-2.5 rounded border border-blue-200 shadow-sm space-y-1">
                        <span className="font-bold font-sans text-xs text-slate-900 block">AeroCargo Logistics</span>
                        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                          <span className="font-bold text-green-600">$45,000 / mo</span>
                          <span className="text-green-600 font-bold">Closed-Won ✅</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'voice' && (
                <div className="space-y-6 flex-1 animate-fade-in-up">
                  <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-sans">CallTrackerFX VoIP Record Playback</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Dynamic routing telephone recordings mapping precise keyword targets.</p>
                    </div>
                  </div>

                  {/* Player representation */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={togglePlayCall}
                          className="cursor-pointer h-10 w-10 bg-[#ff8c00] hover:bg-[#e07b00] rounded-full flex items-center justify-center text-white active:scale-95 transition-all shadow-md"
                        >
                          <Play className="h-5 w-5 fill-white" />
                        </button>
                        <div>
                          <span className="font-bold text-xs text-slate-800 block">Inbound call #49332 (1 min 42s)</span>
                          <span className="text-[10px] text-slate-450 block font-mono">Mapped Key: "dubai luxury duplex apartment for sale"</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#000000] bg-blue-50 px-2 py-1 rounded">Caller Location: Global (UAE)</span>
                    </div>

                    {/* Progress tracking */}
                    <div className="space-y-1.5">
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative border border-slate-205">
                        <div className="absolute top-0 left-0 bg-[#000000] h-full transition-all duration-300" style={{ width: `${callProgress}%` }} />
                      </div>
                      <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                        <span>{isPlayingCall ? "Streaming audio feed..." : "Audio paused"}</span>
                        <span>{callProgress}% complete</span>
                      </div>
                    </div>

                    {/* AI Transcripts snippets */}
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-[11px] text-slate-700 font-sans space-y-1">
                      <span className="text-[9px] font-mono text-slate-400 block uppercase font-bold">ContentGeniusFX Real-time Call Transcript Analysis:</span>
                      <p className="italic">
                        "Yes, we are highly interested in renting the 3-bedroom canal view loft starting on November 1st. We saw your organic ranking check page..."
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'forms' && (
                <div className="space-y-6 flex-1 animate-fade-in-up">
                  <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-sans">LeadManagerFX Registry Events</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Tracks and attributes incoming web form inquiry emails immediately.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs">
                    <table className="w-full text-left font-sans">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[10px]">
                          <th className="p-3 font-bold">CLIENT SENDER</th>
                          <th className="p-3 font-bold">AD SOURCE MAPPING</th>
                          <th className="p-3 font-bold">ACTION TYPE</th>
                          <th className="p-3 font-bold">STAGE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="p-3 font-bold text-slate-800">john@mavericksystems.net</td>
                          <td className="p-3 font-mono text-slate-550">Organic Google Rank (OmniSEO)</td>
                          <td className="p-3 text-slate-600">Enterprise SLA Inquiry</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-mono text-[9px] font-bold">Contacted</span></td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-slate-800">sarah@vanguardrealty.co</td>
                          <td className="p-3 font-mono text-slate-550">Google search PPC ads (CRO)</td>
                          <td className="p-3 text-slate-600">Free Audit Proposal Form</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[9px] font-bold">Proposal Sent</span></td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-slate-800">delivery@aerocargo.com</td>
                          <td className="p-3 font-mono text-slate-550">Direct coordinate crawler</td>
                          <td className="p-3 text-slate-600">Corporate Agreement Setup</td>
                          <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-50 text-green-700 font-mono text-[9px] font-bold">Won ✅</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'mail' && (
                <div className="space-y-6 flex-1 animate-fade-in-up">
                  <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 font-sans">Mail360FX Automation Triggers</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Triggers customized post-visit email sequences dynamically to prevent cart abandonment.</p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2.5">
                      <span className="text-[9px] font-mono text-slate-500 uppercase font-black">Active Triggers Logic:</span>
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-[10px] space-y-1">
                        <div>IF (userScrollDepth &gt; 80% AND emailSubmitted)</div>
                        <div className="pl-4 text-[#ff8c00]">TRIGGER mailSequenceSequence_04;</div>
                        <div>ELSE IF (formIncomplete AND visitorExitIntended)</div>
                        <div className="pl-4 text-[#000000]">TRIGGER cartNurtureForm_02;</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs font-sans text-slate-705 leading-normal">
                      <h5 className="font-bold text-slate-900 flex items-center gap-1.5 pb-1 border-b border-slate-100">
                        <CheckCircle2 className="h-4 w-4 text-[#ff8c00]" />
                        <span>Workflow Performance Index:</span>
                      </h5>
                      <p className="text-[11px] font-medium">
                        Under systematic automation rules, clients enjoy a 28% increase in direct form retrieval, converting passive website exits into active sales dialogs in under 5 minutes.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons inside workspace */}
              <div className="border-t border-slate-200 mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                <span className="font-mono">Every MarketingCloudFX license features automatic, unlimited user seats and CRM database backups.</span>
                <button
                  onClick={onGraderClick}
                  className="cursor-pointer bg-[#000000] hover:bg-[#222222] text-white px-5 py-2.5 rounded-md font-bold transition-all shadow-md font-sans"
                >
                  Analyze My Website
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Feature Comparison metrics */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
          <div className="px-6 py-5 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
            <h4 className="text-sm font-sans font-bold text-[#000000] tracking-tight">Ecosystem Platforms Comparison Limits</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono">
                  <th className="p-4 font-bold">TRACKING INFRASTRUCTURE</th>
                  <th className="p-4 font-bold">GENERIC CRM LOGS</th>
                  <th className="p-4 font-sans font-black text-[#000000] tracking-wider uppercase">AL KHAWARIZMI MARKETINGCLOUDFX</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-bold text-slate-800">Dynamic IP Call Pool recording</td>
                  <td className="p-4 text-slate-500">Requires manual configuration & third party fees</td>
                  <td className="p-4 text-green-700 font-extrabold flex items-center gap-1.5 bg-green-50/40">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Included on standard campaign targets</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-800">AI Call Transcripts</td>
                  <td className="p-4 text-slate-500">None, manually logged by sales representatives</td>
                  <td className="p-4 text-green-700 font-extrabold flex items-center gap-1.5 bg-green-50/40">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Real-time Gemini voice optimization text</span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-slate-800">Exit intent cart triggers</td>
                  <td className="p-4 text-slate-500">None standard, needs manual CRM scripting</td>
                  <td className="p-4 text-green-700 font-extrabold flex items-center gap-1.5 bg-green-50/40">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Mail360FX automatic webhook configurations</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-gradient-to-r from-[#000000] to-[#ff8c00] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-10 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-3 max-w-xl text-center sm:text-left">
            <span className="text-xs font-mono tracking-widest text-[#ff8c00] font-bold uppercase">TAKE FULL PIPELINE DOMINATION</span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight font-sans">Connect Your CRM with Sales Telemetry.</h3>
            <p className="text-slate-200 text-xs">Run a completely free, live crawling report on code latency and viewport constraints in under 60 seconds.</p>
          </div>
          <button
            onClick={onGraderClick}
            className="cursor-pointer bg-white hover:bg-slate-50 text-[#000000] font-black font-sans px-8 py-4 rounded-xl shadow-lg transition-transform active:scale-95 shrink-0"
          >
            Launch MarketingCloudFX
          </button>
        </div>

      </section>
    </div>
  );
}
