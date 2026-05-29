import React, { useState, useEffect } from 'react';
import { DollarSign, MessageSquare, PhoneCall, Zap, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function RevenueTicker() {
  const [revenue, setRevenue] = useState(10243152840);
  const [leads, setLeads] = useState(24102945);
  const [calls, setCalls] = useState(3214842);
  const [tickerFlash, setTickerFlash] = useState(false);
  const [events, setEvents] = useState<Array<{ id: number; text: string; time: string; value: string }>>([
    { id: 1, text: "Manufacturing client (Chicago) secured qualified quote lead", time: "Just now", value: "+$42,100" },
    { id: 2, text: "Ecommerce merchant (Los Angeles) ranked #1 for core terms", time: "1m ago", value: "+$12,400/mo" },
    { id: 3, text: "Healthcare clinic (Houston) optimized appointment booking UX", time: "3m ago", value: "+84% bookings" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time digital marketing success driven by WebFX
      const revenueBump = Math.floor(Math.random() * 150 + 50);
      setRevenue((prev) => prev + revenueBump);
      
      if (Math.random() > 0.7) {
        setLeads((prev) => prev + 1);
        // Add dynamic notification event
        const cities = ["Atlanta", "Dallas", "New York", "Seattle", "Toronto", "Denver", "Miami", "Boston"];
        const industries = ["SaaS platform", "Home Services co.", "Retail store", "Leasing Agency", "Dental office"];
        const gains = ["+$4,500/mo", "+$15,000", "+$28,500", "+$8,000/mo", "+150% Leads"];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const randomIndustry = industries[Math.floor(Math.random() * industries.length)];
        const randomGain = gains[Math.floor(Math.random() * gains.length)];
        
        setEvents((prev) => [
          {
            id: Date.now(),
            text: `${randomIndustry} (${randomCity}) expanded pipeline visibility`,
            time: "Just now",
            value: randomGain
          },
          ...prev.slice(0, 3)
        ]);
        
        setTickerFlash(true);
        setTimeout(() => setTickerFlash(false), 300);
      }

      if (Math.random() > 0.85) {
        setCalls((prev) => prev + 1);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="revenue-ticker-section" className="bg-[#000000] text-white border border-[#000000]/20 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
      {/* Abstract Background Accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-3xl" />

      {/* Header and Value Proposition */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/20 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-orange-200 text-xs font-mono mb-3 font-semibold">
            <Zap className="h-3.5 w-3.5 animate-pulse text-[#ff8c00]" />
            <span>REAL-TIME SUCCESS CLOUD</span>
          </div>
          <h3 className="text-2xl font-sans font-bold text-white tracking-tight">
            Our Clients' Proven Path to Enterprise Value
          </h3>
          <p className="text-blue-100 text-sm mt-1 max-w-xl">
            Watch the live, automated log of tracked pipeline leads, inbound calls, and cumulative sales value generated across client portfolios.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 bg-emerald-350 rounded-full animate-ping" />
          <span className="text-xs font-mono text-emerald-300 uppercase tracking-widest font-bold">
            LIVE MARKETING DATA FLOWING
          </span>
        </div>
      </div>

      {/* Core Dynamic Counters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Card 1: Revenue Driven */}
        <div className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl p-6 flex flex-col justify-between transition-all">
          <div className="flex items-center justify-between text-blue-150 mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-100 font-bold">TOTAL SALES REVENUE DRIVEN</span>
            <div className="p-2 bg-white/15 text-white rounded-lg">
              <DollarSign className="h-5 w-5 text-orange-200" />
            </div>
          </div>
          <div>
            <div className="text-3xl md:text-3xl xl:text-4xl font-mono font-bold text-white tracking-tight tabular-nums">
              ${revenue.toLocaleString()}
            </div>
            <p className="text-xs text-blue-200 mt-2">
              Verifiable revenue and transactional contract values.
            </p>
          </div>
        </div>

        {/* Metric Card 2: Leads Generated */}
        <div className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl p-6 flex flex-col justify-between transition-all">
          <div className="flex items-center justify-between text-blue-150 mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-100 font-bold">LEADS GENERATED</span>
            <div className={`p-2 bg-white/15 text-white rounded-lg transition-transform ${tickerFlash ? 'scale-110' : ''}`}>
              <MessageSquare className="h-5 w-5 text-emerald-300" />
            </div>
          </div>
          <div>
            <div className="text-3xl xl:text-4xl font-mono font-extrabold text-white tracking-tight tabular-nums">
              {leads.toLocaleString()}
            </div>
            <p className="text-xs text-blue-200 mt-2">
              Captured digital inquiry forms and organic checkouts.
            </p>
          </div>
        </div>

        {/* Metric Card 3: Phone Calls Logged */}
        <div className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl p-6 flex flex-col justify-between transition-all">
          <div className="flex items-center justify-between text-blue-150 mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-100 font-bold">PHONE CALLS DRIVEN</span>
            <div className="p-2 bg-white/15 text-white rounded-lg">
              <PhoneCall className="h-5 w-5 text-orange-300" />
            </div>
          </div>
          <div>
            <div className="text-3xl xl:text-4xl font-mono font-bold text-white tracking-tight tabular-nums">
              {calls.toLocaleString()}
            </div>
            <p className="text-xs text-blue-200 mt-2">
              Inbound phone call triggers tracked via local CRM lines.
            </p>
          </div>
        </div>
      </div>

      {/* Live Conversion Stream */}
      <div className="mt-8">
        <h4 className="text-xs font-mono uppercase tracking-widest text-blue-150 mb-4 flex items-center gap-2">
          <span>Live Conversion Log</span>
          <span className="px-2 py-0.5 rounded text-[10px] bg-white/20 text-white font-semibold">Auto-Refreshed</span>
        </h4>
        <div className="space-y-3">
          {events.map((evt) => (
            <div key={evt.id} className="bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between gap-4 transition-all">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
                <span className="text-xs text-white font-sans font-semibold">{evt.text}</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <span className="text-xs font-mono font-bold text-emerald-300 shrink-0">{evt.value}</span>
                <span className="text-[10px] font-mono text-blue-250 shrink-0 text-blue-200">{evt.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
