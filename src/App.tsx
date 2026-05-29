import React, { useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RevenueTicker from './components/RevenueTicker';
import GraderConsole from './components/GraderConsole';
import ServiceEstimator from './components/ServiceEstimator';
import Footer from './components/Footer';
import { AuditReport } from './types';
import { ArrowUpRight, BarChart3, HelpCircle, Star, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import our tailored service pages
import OmniSEOPage from './pages/OmniSEOPage';
import RevenueMarketingPage from './pages/RevenueMarketingPage';
import UxAiPage from './pages/UxAiPage';
import RevenuePlatformPage from './pages/RevenuePlatformPage';
import ExitIntentModal from './components/ExitIntentModal';
import FreeQuotePage from './pages/FreeQuotePage';
import FaqSection from './components/FaqSection';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import SeminarsPage from './pages/SeminarsPage';


export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'omniseo' | 'revmarketing' | 'uxai' | 'platform' | 'quote' | 'knowledgebase' | 'seminars'>('home');
  const [selectedSubPageItem, setSelectedSubPageItem] = useState<string | null>(null);
  const [savedReport, setSavedReport] = useState<AuditReport | null>(null);

  // References for navigation smooth scroll
  const graderRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const seminarsSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAnalysisComplete = (report: AuditReport) => {
    setSavedReport(report);
  };

  const handlePageNavigation = (page: 'home' | 'omniseo' | 'revmarketing' | 'uxai' | 'platform' | 'quote' | 'knowledgebase' | 'seminars', subItem?: string | null) => {
    setCurrentPage(page);
    setSelectedSubPageItem(subItem || null);
  };

  // Helper helper to handle triggers on sub-pages
  const handleGraderTrigger = () => {
    setCurrentPage('home');
    setTimeout(() => {
      handleScrollTo(graderRef);
    }, 120);
  };

  const handleServicesTrigger = () => {
    setCurrentPage('home');
    setTimeout(() => {
      handleScrollTo(servicesRef);
    }, 120);
  };

  return (
    <div id="webfx-app" className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-500/30 selection:text-slate-950 font-sans antialiased">
      {/* Dynamic Header */}
      <Header
        currentPage={currentPage}
        onPageChange={handlePageNavigation}
        onGraderClick={handleGraderTrigger}
        onServicesClick={handleServicesTrigger}
        onTickerClick={() => {
          setCurrentPage('home');
          setTimeout(() => handleScrollTo(tickerRef), 120);
        }}
      />

      {/* Screen Animation Content Switcher */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {currentPage === 'home' && (
            <div id="home-view">
              {/* Hero Header */}
              <Hero onGraderClick={handleGraderTrigger} />

              {/* Main Body */}
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
                
                {/* Grader Console Wrapper */}
                <section ref={graderRef} id="grader-console-section" className="scroll-mt-24 space-y-4">
                  <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#ff8c00] font-bold">
                      WEBSITE REVENUE OPTIMIZER
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-sans font-black text-[#000000] tracking-tight">
                      Instant Agency Audit & SEO Rank Appraisal
                    </h2>
                    <p className="text-sm text-slate-650">
                      Input your coordinate URL below to boot the MarketingCloudFX crawler engine. It will perform a live deep audit of Core Web Vitals, mobile viewport sizes, and relative SEO domain strengths.
                    </p>
                  </div>
                  
                  <GraderConsole
                    onAnalyzeComplete={handleAnalysisComplete}
                    savedReport={savedReport}
                    setSavedReport={setSavedReport}
                  />
                </section>

                {/* Real-time Ticker Metrics Widget */}
                <section ref={tickerRef} className="scroll-mt-24">
                  <RevenueTicker />
                </section>

                {/* Dynamic Calculator & Pricing Sliders */}
                <section ref={servicesRef} className="scroll-mt-24">
                  <ServiceEstimator />
                </section>

                {/* Trust Endorsement Badges */}
                <section id="badges-section" className="bg-white border border-slate-200 shadow-md rounded-3xl p-8 text-center space-y-6">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">TRUSTED BY HIGH-GROWTH BRANDS WORLDWIDE</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
                    <div className="flex items-center justify-center gap-2">
                      <Star className="h-4 w-4 text-[#ff8c00] fill-[#ff8c00]" />
                      <span className="font-sans font-bold text-slate-700 text-sm">4.9 G2 Standard</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Users className="h-4 w-4 text-[#000000]" />
                      <span className="font-sans font-bold text-slate-700 text-sm font-semibold">1,020+ Clients</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <BarChart3 className="h-4 w-4 text-[#ff8c00]" />
                      <span className="font-mono font-bold text-slate-700 text-sm">$10B+ Sales Driven</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <HelpCircle className="h-4 w-4 text-[#000000]" />
                      <span className="font-sans font-bold text-slate-700 text-sm">Guaranteed Audits</span>
                    </div>
                  </div>
                </section>

                {/* Visual B2B Seminars Segment */}
                <section ref={seminarsSectionRef} id="seminars-spotlight-section" className="scroll-mt-24 space-y-8 bg-white border border-slate-200 shadow-md rounded-3xl p-8 sm:p-12 relative overflow-hidden">
                  
                  {/* Absolute subtle background monospaced accent line */}
                  <div className="absolute right-6 top-6 text-[9px] font-mono text-slate-400 tracking-wider hidden sm:block">
                    CLASS ID: AKW-SEM-2026
                  </div>

                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-6">
                    <div className="space-y-2 max-w-xl">
                      <span className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-[#ff8c00]">
                        B2B ENTERPRISE TRAINING & ADVOCACY
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-sans font-black text-[#000000] tracking-tight">
                        Al-Khawarizmi Seminar Labs
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500">
                        Raise industry literacy within your internal teams and reduce alignment friction. Join our upcoming webcasts or retrieve instant access to pre-recorded technical materials.
                      </p>
                    </div>

                    <button
                      onClick={() => handlePageNavigation('seminars')}
                      className="group flex items-center gap-1.5 text-xs font-bold bg-[#000000] hover:bg-neutral-800 text-[#ff8c00] px-5 py-3 rounded-xl shadow transition-all cursor-pointer self-start md:self-auto"
                    >
                      <span>Explore All 16 Seminars</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>

                  {/* 4-Bento Grid Columns showcasing the four major educational paths */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    {/* Block 1 */}
                    <div className="bg-slate-50/80 hover:bg-slate-100/50 transition-colors p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono font-bold text-[#ff8c00] bg-orange-50 px-2.5 py-0.5 rounded-full w-fit">
                          01 . FOUNDATIONAL
                        </div>
                        <h4 className="font-sans font-extrabold text-[#000000] text-xs">Strategy & Data Literacy</h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          Reduce vocabulary gaps. Teach teams why digital networks succeed, map customer paths, and understand cookie and GDPR privacy regulations.
                        </p>
                      </div>
                      <button 
                        onClick={() => handlePageNavigation('seminars', 'foundational')}
                        className="text-[11px] font-bold text-slate-700 hover:text-[#ff8c00] flex items-center gap-1 w-fit cursor-pointer outline-none"
                      >
                        <span>Analyze 4 Sessions</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Block 2 */}
                    <div className="bg-slate-50/80 hover:bg-slate-100/50 transition-colors p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono font-bold text-slate-650 bg-slate-100 px-2.5 py-0.5 rounded-full w-fit">
                          02 . ACTIONABLE
                        </div>
                        <h4 className="font-sans font-extrabold text-[#000000] text-xs">CRM & Tooling Focus</h4>
                        <p className="text-[11px] text-slate-550 leading-relaxed">
                          Deliver hands-on value. Practical sessions targeting HubSpot pipeline hacks, platform testing, and scaling content production.
                        </p>
                      </div>
                      <button 
                        onClick={() => handlePageNavigation('seminars', 'actionable')}
                        className="text-[11px] font-bold text-slate-700 hover:text-[#ff8c00] flex items-center gap-1 w-fit cursor-pointer outline-none"
                      >
                        <span>Analyze 4 Sessions</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Block 3 */}
                    <div className="bg-slate-50/80 hover:bg-slate-100/50 transition-colors p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full w-fit">
                          03 . THOUGHT LEADERS
                        </div>
                        <h4 className="font-sans font-extrabold text-[#000000] text-xs">Future-Proof Authority</h4>
                        <p className="text-[11px] text-slate-550 leading-relaxed">
                          Keep your enterprise ahead. Deep dives into upcoming algorithm updates, organic GEO methodologies, and digital budget planning.
                        </p>
                      </div>
                      <button 
                        onClick={() => handlePageNavigation('seminars', 'thought-leadership')}
                        className="text-[11px] font-bold text-slate-700 hover:text-[#ff8c00] flex items-center gap-1 w-fit cursor-pointer outline-none"
                      >
                        <span>Analyze 4 Sessions</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Block 4 */}
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 flex flex-col justify-between space-y-4 shadow-lg">
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono font-semibold text-[#ff8c00] bg-orange-500/10 px-2.5 py-0.5 rounded-full w-fit border border-orange-500/20">
                          ★ SPECIAL SUITE
                        </div>
                        <h4 className="font-sans font-black text-white text-xs">AI Masterclass Cluster</h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed">
                          Move from AI-curious to AI-competent. Highly structured hands-on sessions explaining automated lead triggers and workflow engines.
                        </p>
                      </div>
                      <button 
                        onClick={() => handlePageNavigation('seminars', 'ai-masterclass')}
                        className="text-[11px] font-bold text-[#ff8c00] hover:text-[#ffaf40] flex items-center gap-1 w-fit cursor-pointer outline-none"
                      >
                        <span>Analyze 4 Sessions</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>

                  </div>

                  {/* Horizontal Feature Bar showcasing AI Masterclass Details */}
                  <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 sm:p-6 space-y-4">
                    <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase font-extrabold block">Featured Masterclass Spotlight</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-[#000000] block">1. AI Workflow Revolution</span>
                        <span className="text-[10px] text-slate-500 block leading-tight">Shifting mindset to AI as team member with prompt engineering basics.</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-[#000000] block">2. Scaling Brand Voice</span>
                        <span className="text-[10px] text-slate-500 block leading-tight">Write on-brand content at 10x speed with strict human-in-the-loop nuances.</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-[#000000] block">3. Data Analysis Insights</span>
                        <span className="text-[10px] text-slate-500 block leading-tight">Spot trends or anomalies in performance datasets anonymously.</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-[#000000] block">4. The Agentic Workflow</span>
                        <span className="text-[10px] text-slate-500 block leading-tight">Level-up by automating stack actions, scoring lists and report generation.</span>
                      </div>
                    </div>
                  </div>

                </section>

                {/* Compact Accordion-Style FAQ Section */}
                <FaqSection />

              </main>
            </div>
          )}

          {/* Sub Pages routing */}
          {currentPage === 'omniseo' && (
            <OmniSEOPage 
              onGraderClick={handleGraderTrigger} 
              onServicesClick={handleServicesTrigger} 
              selectedSubPageItem={selectedSubPageItem}
              setSelectedSubPageItem={setSelectedSubPageItem}
            />
          )}

          {currentPage === 'revmarketing' && (
            <RevenueMarketingPage 
              onGraderClick={handleGraderTrigger} 
              onServicesClick={handleServicesTrigger} 
              selectedSubPageItem={selectedSubPageItem}
              setSelectedSubPageItem={setSelectedSubPageItem}
            />
          )}

          {currentPage === 'uxai' && (
            <UxAiPage 
              onGraderClick={handleGraderTrigger} 
              onServicesClick={handleServicesTrigger} 
            />
          )}

          {currentPage === 'platform' && (
            <RevenuePlatformPage 
              onGraderClick={handleGraderTrigger} 
              onServicesClick={handleServicesTrigger} 
            />
          )}

          {currentPage === 'quote' && (
            <FreeQuotePage 
              onGraderClick={handleGraderTrigger} 
              onServicesClick={handleServicesTrigger} 
            />
          )}

          {currentPage === 'knowledgebase' && (
            <KnowledgeBasePage 
              onGraderClick={handleGraderTrigger} 
              onServicesClick={handleServicesTrigger} 
              selectedSubPageItem={selectedSubPageItem}
              onSubPageItemChange={(item) => setSelectedSubPageItem(item)}
            />
          )}

          {currentPage === 'seminars' && (
            <SeminarsPage 
              onGraderClick={handleGraderTrigger} 
              onServicesClick={handleServicesTrigger} 
              selectedSubPageItem={selectedSubPageItem}
              onSubPageItemChange={(item) => setSelectedSubPageItem(item)}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Styled Corporate Footer */}
      <Footer onPageChange={handlePageNavigation} />

      {/* Automated High-Conversion Exit Intent Modal with Persistent Database Records */}
      <ExitIntentModal currentPage={currentPage} />
    </div>
  );
}
