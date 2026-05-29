import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, Sparkles, Cpu, Shield, DollarSign, LineChart, Layers, X } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: 'platform' | 'security' | 'pricing' | 'results';
  tag?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What exactly is MarketingCloudFX and how does it drive client revenue?",
    answer: "MarketingCloudFX is our proprietary, industry-leading customer tracking, Unified Lead Attribution, and AI-driven growth forecasting platform. It seamlessly aggregates search index parameters, organic keywords, inbound telephone call sources, CRM sync events, and on-page engagement metrics. Tie real dollar revenue goals directly to the individual digital campaigns creating your traffic rather than settling for simple click metrics.",
    category: "platform",
    tag: "Core Platform"
  },
  {
    question: "How does the Instant SEO & Grader audit tool evaluate my website?",
    answer: "Our real-time testing crawler connects directly to Live Core Web Vitals monitors and historical backlink repositories. By entering your URL domain, MarketingCloudFX performs an intensive diagnostic sweep measuring code responsiveness, accessibility compliance, layout viewport optimization ratios, and absolute SEO indexing marks, rendering instant step-by-step suggestions.",
    category: "results",
    tag: "Auditing Tech"
  },
  {
    question: "Are the quote estimates custom-built based on our specific business industry?",
    answer: "Yes, completely. MarketingCloudFX carries direct algorithmic scoring sheets aligned to real customer acquisition costs (CAC) and conversion value benchmarks across multiple business sectors—including SaaS/Tech, E-Commerce, Professional Services, and Consumer Brands. This ensures your customized estimates map precisely to your market's performance thresholds.",
    category: "pricing",
    tag: "Industry Calibration"
  },
  {
    question: "How does the database persistent record tracker store our quote requests?",
    answer: "Any quotes generated via our estimator or interactive forms are instantly persistent. When you click complete, our node-based secure API server commits your campaign configuration guidelines, selected channels, and budget parameters into our in-memory data store. This allows you and our representatives to retrieve, review, and adjust your active estimates on the fly.",
    category: "platform",
    tag: "Instant Server Sync"
  },
  {
    question: "Can I integrate my existing CRM system (like Salesforce or HubSpot) with MarketingCloudFX?",
    answer: "Definitely. MarketingCloudFX is built with absolute compatibility in mind. We provide zero-latency webhooks and API-driven sync layers for Salesforce, HubSpot, Zoho CRM, Microsoft Dynamics, and major marketing suites. Inbound leads, organic query terms, and phone recordings are systematically pushed straight to your sales pipeline.",
    category: "security",
    tag: "Enterprise Integration"
  },
  {
    question: "What is the security standard for website audits and database records?",
    answer: "We adhere to strict data-integrity protocols. All crawled domains, custom budget metrics, and contact coordinates transmitted to our CRM systems are protected via industry-standard TLS 1.3 transit encryption. We do not store financial credentials, and all in-memory quote assets are isolated by modern multi-tenant enterprise firewalls.",
    category: "security",
    tag: "Top Security"
  },
  {
    question: "What separates standard SEO optimization from the high-end Enterprise Accelerator plan?",
    answer: "Standard packages establish foundational crawl visibility, fix performance bottlenecks, and target focus keyword clusters. The high-volume Enterprise Accelerator implements state-of-the-art programmatic landing page structures, multi-channel automated trigger flows, deep behavioral heatmapping, and dedicated engineering queues for complete organic results dominance.",
    category: "pricing",
    tag: "Service Tiers"
  },
  {
    question: "How quickly can we expect to verify ROI and growth metrics in our console?",
    answer: "While deep organic search indexes grow over 60-90 days, conversion rate improvements (CRO) and paid promotion modules within MarketingCloudFX generally yield significant lead generation gains within 14 to 30 days of campaign activation. Your analytics dashboard updates metrics hourly with transparent attribution.",
    category: "results",
    tag: "Hourly Metrics Updated"
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'platform' | 'security' | 'pricing' | 'results'>('all');

  const toggleAccordion = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  // Filter items by category and search string
  const filteredFaqs = FAQ_ITEMS.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (faq.tag && faq.tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'All Questions', icon: <Layers className="h-3.5 w-3.5" /> },
    { id: 'platform', name: 'Platform', icon: <Cpu className="h-3.5 w-3.5" /> },
    { id: 'pricing', name: 'Pricing', icon: <DollarSign className="h-3.5 w-3.5" /> },
    { id: 'security', name: 'Security', icon: <Shield className="h-3.5 w-3.5" /> },
    { id: 'results', name: 'Results', icon: <LineChart className="h-3.5 w-3.5" /> }
  ];

  return (
    <section id="faq-section" className="scroll-mt-24 bg-white border border-slate-200 shadow-xl rounded-3xl overflow-hidden mt-12">
      
      {/* FAQ Header area */}
      <div className="bg-gradient-to-r from-[#000000] to-[#151515] py-10 px-6 sm:px-10 text-white relative">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-44 h-44 rounded-full bg-[#ff8c00]/5 blur-xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="bg-[#ff8c00] text-white text-[9px] font-mono font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-3 w-3 animate-spin" />
              MarketingCloudFX Intelligence Centre
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black font-sans tracking-tight">
            Common Client Enquiries &amp; Mechanics
          </h3>
          <p className="text-xs sm:text-sm text-slate-200">
            Unravel how our specialized technology crawls index marks, handles persistent quote budgets, and aligns digital assets to generate maximum conversion performance.
          </p>
        </div>
      </div>

      {/* Filter and search utilities rail */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 sm:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Horizontal Category Pill Selector */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id as any);
                setOpenIndex(null); // Reset selection
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 outline-none ${
                activeCategory === cat.id
                  ? 'bg-[#000000] text-white shadow-md scale-[1.02]'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <span className={`transition-transform duration-200 ${activeCategory === cat.id ? 'scale-110' : 'opacity-70'}`}>
                {cat.icon}
              </span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Live Filter Search bar */}
        <div className="relative w-full md:w-80 max-w-md shrink-0">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setOpenIndex(null); // Reset selection to prevent confusing active indices
              }}
              placeholder="Search questions & answers..."
              className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-24 py-2.5 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff8c00]/20 focus:border-[#ff8c00] transition-all shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-16 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md pointer-events-none border border-slate-200">
              {filteredFaqs.length}
            </span>
          </div>
        </div>
      </div>

      {/* Accordion List Body */}
      <div className="p-6 sm:p-8 space-y-3.5">
        <AnimatePresence mode="popLayout">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const staticIndex = FAQ_ITEMS.indexOf(faq);
              const isOpen = openIndex === staticIndex;
              
              return (
                <motion.div
                  key={faq.question}
                  layout="position"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className={`border rounded-2xl transition-all overflow-hidden ${
                    isOpen 
                      ? 'border-[#000000] bg-[#000000]/2 shadow-sm' 
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  {/* Question Accordion Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(staticIndex)}
                    className="w-full text-left px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`mt-0.5 p-1.5 rounded-lg border ${
                        isOpen 
                          ? 'bg-blue-100/40 text-[#000000] border-[#000000]/10' 
                          : 'bg-slate-50 text-slate-450 border-slate-100'
                      }`}>
                        <HelpCircle className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs sm:text-sm font-extrabold text-slate-850 hover:text-[#000000] leading-snug">
                          {faq.question}
                        </span>
                        
                        {faq.tag && (
                          <div className="flex items-center gap-1.5 pt-1.5">
                            <span className={`inline-block font-mono text-[9px] px-2 py-0.5 rounded font-extrabold uppercase ${
                              isOpen ? 'bg-orange-100 text-orange-850' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {faq.tag}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 text-slate-450">
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-[#ff8c00] shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 shrink-0" />
                      )}
                    </div>
                  </button>

                  {/* Expandable answer panel */}
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs text-slate-650 leading-relaxed font-sans border-t border-slate-150/40 mt-1 pl-[4.2rem]">
                        <p className="max-w-3xl whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })
          ) : (
            /* Empty Filter Search feedback */
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 px-4 space-y-3"
            >
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search className="h-5 w-5" />
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
                No matching enquiries found for &quot;<span className="font-semibold text-slate-850">{searchTerm}</span>&quot;. Try filtering by the structural categories above or simplify your query.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Accordion Footer help badge */}
      <div className="bg-slate-50 border-t border-slate-150 px-6 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-sans">
          <MessageSquare className="h-4 w-4 text-[#ff8c00]" />
          <span>Have an unanswered question regarding implementation details?</span>
        </div>
        <button
          onClick={() => {
            // Find contact / get quote button at header context
            const activePageBtn = document.getElementById("quotes-db-toggle-btn");
            if (activePageBtn) {
              activePageBtn.click();
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }
          }}
          className="text-xs font-bold text-[#000000] hover:text-[#ff8c00] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Consult custom pricing model</span>
          <ChevronDown className="h-4 w-4 shrink-0 -rotate-90" />
        </button>
      </div>

    </section>
  );
}
