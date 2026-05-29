import React, { useState } from 'react';
import { Sparkles, BarChart3, TrendingUp, Cpu, Award, ChevronDown, CheckCircle, Search, Percent, Shield, Zap, X, Menu, Home, Layers, DollarSign, ChevronRight, ArrowRight, BookOpen, Video } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: 'home' | 'omniseo' | 'revmarketing' | 'uxai' | 'platform' | 'quote' | 'knowledgebase' | 'seminars', subItem?: string | null) => void;
  onGraderClick: () => void;
  onServicesClick: () => void;
  onTickerClick: () => void;
}

const SERVICES_DATA = [
  {
    title: "OmniSEO® & Lead Gen",
    key: "omniseo" as const,
    icon: <Search className="h-4 w-4 text-blue-600 shrink-0" />,
    sections: [
      {
        category: "AI & Search Visibility",
        items: [
          "Generative Engine, LLM & AI SEO",
          "SEO Services",
          "Enterprise SEO Services",
          "AI & LLM Visibility Tracking",
          "AI Brand Visibility Audit",
          "Local SEO Services"
        ]
      },
      {
        category: "Digital Advertising",
        items: [
          "PPC Management Services",
          "Enterprise PPC Management Services",
          "Google Local Services Ads Management",
          "Social Media Advertising",
          "Enterprise Social Media Advertising",
          "Programmatic Advertising Services"
        ]
      },
      {
        category: "Content Marketing",
        items: [
          "Digital Marketing Services",
          "Content Marketing Services",
          "Website Copywriting",
          "Social Media Management",
          "Infographics & Motion Graphics",
          "Connected TV & OTT"
        ]
      },
      {
        category: "Expertise",
        items: [
          "Our SEO Results",
          "Our SEO Case Studies",
          "Our OmniSEO® Approach",
          "Research: Conversational Search",
          "Research: AI Overviews",
          "Research: AI Search Trends"
        ]
      }
    ]
  },
  {
    title: "Revenue Marketing & CRO",
    key: "revmarketing" as const,
    icon: <Percent className="h-4 w-4 text-orange-605 text-orange-600 shrink-0" />,
    sections: [
      {
        category: "Digital Intelligence",
        items: [
          "Web Channel Call Tracking",
          "Media Mixed Modeling Services",
          "Channel Attribution & Forecasting",
          "Digital Marketing Competitor Analysis",
          "Private Equity Due Diligence"
        ]
      },
      {
        category: "Revenue Operations",
        items: [
          "Conversion Rate Optimization",
          "Landing Pages & Funnels",
          "Online Review Acceleration",
          "Channel Partner Sales Pipeline Management",
          "Website Personalization"
        ]
      },
      {
        category: "Marketing Automation",
        items: [
          "Account-Based Marketing Services",
          "Email Marketing Management",
          "Salesforce Marketing Automation",
          "Microsoft Dynamics Marketing Automation",
          "Employment & Recruiting Marketing"
        ]
      },
      {
        category: "Commerce Platforms",
        items: [
          "SEO for Amazon",
          "Advertising Management for Amazon",
          "Target Plus Management Services",
          "Walmart Marketplace Advertising",
          "Influencer Marketing Services"
        ]
      }
    ]
  },
  {
    title: "UX & AI Services",
    key: "uxai" as const,
    icon: <Cpu className="h-4 w-4 text-teal-600 shrink-0" />,
    sections: [
      {
        category: "Visuals & AI Suite",
        items: [
          "Conversion Web Design",
          "Enterprise AI Services",
          "Bespoke Web Development"
        ]
      }
    ]
  },
  {
    title: "Revenue Platform",
    key: "platform" as const,
    icon: <Zap className="h-4 w-4 text-amber-500 shrink-0" />,
    sections: [
      {
        category: "Integrated Systems",
        items: [
          "MarketingCloudFX Suite",
          "Nutshell Smart CRM",
          "LeadManagerFX Tracker",
          "CallTrackerFX Dynamic",
          "Mail360FX Automation"
        ]
      }
    ]
  }
];

const KNOWLEDGE_BASE_SECTIONS = [
  {
    category: "Popular Articles",
    items: [
      "Integration of GEO With Traditional SEO",
      "SEO Strategies Unpacked: Amanda Natividad on When to Outsource SEO Services",
      "What is Full Stack Development: Do I Need It?",
      "Cybersecurity Trends 2025: Insights from Helen Yu"
    ]
  },
  {
    category: "Industry Insights",
    items: [
      "Development Trends",
      "Web Design Trends",
      "Digital Marketing Trends",
      "PR Trends",
      "HR Trends",
      "UX Design Trends",
      "SEO Trends"
    ]
  },
  {
    category: "Services Guides",
    items: [
      "App Development Services",
      "Software Development Services",
      "Web Development Services",
      "Artificial Intelligence Services",
      "SEO Services",
      "Digital Marketing Services",
      "PPC Services"
    ]
  },
  {
    category: "Best of Clutch Awards",
    items: [
      "Submit Your Work",
      "Website Designs",
      "Marketing Campaigns"
    ]
  }
];

export default function Header({ currentPage, onPageChange, onGraderClick, onServicesClick, onTickerClick }: HeaderProps) {
  const [activeMegaMenu, setActiveMegaMenu] = useState<'services' | 'knowledgebase' | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: 'services' | 'knowledgebase') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMegaMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  const handleServiceNavigation = (key: 'omniseo' | 'revmarketing' | 'uxai' | 'platform', subItem?: string | null) => {
    setActiveMegaMenu(null);
    setMobileDrawerOpen(false);
    onPageChange(key, subItem);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleKnowledgeNavigation = (subItem?: string | null) => {
    setActiveMegaMenu(null);
    setMobileDrawerOpen(false);
    onPageChange('knowledgebase', subItem);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSeminarsNavigation = (subItem?: string | null) => {
    setActiveMegaMenu(null);
    setMobileDrawerOpen(false);
    onPageChange('seminars', subItem);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleHomeClick = () => {
    setActiveMegaMenu(null);
    setMobileDrawerOpen(false);
    onPageChange('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuoteClick = () => {
    setActiveMegaMenu(null);
    setMobileDrawerOpen(false);
    onPageChange('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="webfx-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all text-slate-800 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer group shrink-0" onClick={handleHomeClick}>
          <div className="h-10 w-10 bg-[#000000] rounded-md flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-sm">ALK</span>
          </div>
          <div>
            <span className="font-sans font-black text-xl sm:text-2xl tracking-tight text-[#000000] flex items-center">
              alkhawarizmi<span className="text-[#ff8c00]">.agency</span>
            </span>
            <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#ff8c00] leading-none font-bold">
              AI & REVENUE ENGINE
            </div>
          </div>
        </div>

        {/* Desktop Navigation - Mega Menu Style */}
        <nav id="webfx-desktop-nav" className="hidden xl:flex items-center gap-4 lg:gap-6">
          <button 
            onClick={handleHomeClick}
            className={`font-sans text-xs font-bold transition-all cursor-pointer hover:text-[#ff8c00] py-2 px-1 ${
              currentPage === 'home' ? 'text-[#ff8c00] border-b-2 border-[#ff8c00]' : 'text-slate-600'
            }`}
          >
            Console Home
          </button>

          {/* Strategic Services Mega Trigger */}
          <div 
            className="static py-6"
            onMouseEnter={() => handleMouseEnter('services')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleServiceNavigation('omniseo', null)}
              className={`font-sans text-xs font-bold flex items-center gap-1 transition-all cursor-pointer py-2 px-1 hover:text-[#ff8c00] outline-none ${
                ['omniseo', 'revmarketing', 'uxai', 'platform'].includes(currentPage)
                  ? 'text-[#ff8c00] border-b-2 border-[#ff8c00]'
                  : 'text-slate-600'
              }`}
            >
              <span>Strategic Services Suite</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${activeMegaMenu === 'services' ? 'rotate-180 text-[#ff8c00]' : ''}`} />
            </button>
          </div>

          {/* New Knowledge Base Mega Trigger */}
          <div 
            className="static py-6"
            onMouseEnter={() => handleMouseEnter('knowledgebase')}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => handleKnowledgeNavigation(null)}
              className={`font-sans text-xs font-bold flex items-center gap-1 transition-all cursor-pointer py-2 px-1 hover:text-[#ff8c00] outline-none ${
                currentPage === 'knowledgebase'
                  ? 'text-[#ff8c00] border-b-2 border-[#ff8c00]'
                  : 'text-slate-600'
              }`}
            >
              <span>Knowledge Base</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${activeMegaMenu === 'knowledgebase' ? 'rotate-180 text-[#ff8c00]' : ''}`} />
            </button>
          </div>

          <button 
            onClick={() => handleSeminarsNavigation(null)}
            className={`font-sans text-xs font-bold transition-all cursor-pointer hover:text-[#ff8c00] py-2 px-1 outline-none ${
              currentPage === 'seminars'
                ? 'text-[#ff8c00] border-b-2 border-[#ff8c00]'
                : 'text-slate-600'
            }`}
          >
            Seminars
          </button>

          <button 
            onClick={onServicesClick}
            className="font-sans text-xs font-bold text-slate-600 hover:text-[#ff8c00] transition-colors cursor-pointer py-2 px-1"
          >
            Calculator Pricing
          </button>

          <button 
            onClick={handleQuoteClick}
            className={`font-sans text-xs font-bold transition-all cursor-pointer hover:text-[#ff8c00] py-2 px-2 rounded-lg flex items-center gap-1 ${
              currentPage === 'quote' 
                ? 'text-[#ff8c00] bg-orange-50' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Zap className="h-3 w-3 text-[#ff8c50] shrink-0 fill-current" />
            <span>Get Free Quote</span>
          </button>
        </nav>

        {/* Right Buttons group */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={onGraderClick}
            className="cursor-pointer font-sans text-xs font-bold text-white bg-[#ff8c00] hover:bg-[#e07b00] px-4 py-2.5 rounded-lg transition-all hover:shadow-md hover:shadow-orange-500/15 active:scale-95 flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Launch MarketingCloudFX</span>
            <span className="sm:hidden">Launch Grader</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="xl:hidden cursor-pointer p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700"
          >
            {mobileDrawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Unified Enterprise Mega Menu Dropdown */}
      {activeMegaMenu === 'services' && (
        <div 
          className="absolute top-20 left-0 right-0 w-full bg-white border-b border-slate-200 shadow-2xl z-50 py-8 animate-fade-in duration-150"
          onMouseEnter={() => handleMouseEnter('services')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Mega Menu Top header / insight bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-5 mb-6 gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#ff8c00] text-white text-[9px] font-mono font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Strategic Revenue Architectures
                </span>
                <span className="text-xs text-slate-400 font-sans">
                  | 48 Enterprise Channels Calibrated for SEO &amp; Conversion Yields
                </span>
              </div>
              <button
                onClick={() => {
                  setActiveMegaMenu(null);
                  onPageChange('quote');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#000000] hover:text-[#ff8c00] transition-colors flex items-center gap-1 cursor-pointer w-fit"
              >
                <span>Calculate custom marketing SLA budget</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Main Balanced Grid: 6 Columns total */}
            <div className="grid grid-cols-6 gap-x-8 gap-y-6">
              
              {/* Column Group 1: OmniSEO® & Lead Gen (Cols 1-2) */}
              <div className="col-span-2 space-y-4 border-r border-slate-100 pr-6">
                <div className="flex items-center gap-2 text-[#000000] pb-2 border-b border-slate-200">
                  <Search className="h-4.5 w-4.5 text-[#000000]" />
                  <span className="font-sans font-black text-xs uppercase tracking-wider">
                    OmniSEO® &amp; Lead Gen
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {SERVICES_DATA[0].sections.map((section, sidx) => (
                    <div key={sidx} className="space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-extrabold block border-b border-slate-100 pb-1">
                        {section.category}
                      </span>
                      <ul className="space-y-1">
                        {section.items.map((item, itemIdx) => (
                          <li 
                            key={itemIdx}
                            onClick={() => handleServiceNavigation('omniseo', item)}
                            className="group/item cursor-pointer block py-1 px-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <span className="text-[11px] font-bold text-slate-700 group-hover/item:text-[#ff8c00] transition-all flex items-center justify-between">
                              <span>{item}</span>
                              <ChevronRight className="h-2.5 w-2.5 text-slate-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column Group 2: Revenue Marketing & CRO (Cols 3-4) */}
              <div className="col-span-2 space-y-4 border-r border-slate-100 pr-6">
                <div className="flex items-center gap-2 text-orange-600 pb-2 border-b border-slate-200">
                  <Percent className="h-4.5 w-4.5 text-[#ff8c00] shrink-0" />
                  <span className="font-sans font-black text-xs uppercase tracking-wider text-[#ff8c00]">
                    Revenue Marketing &amp; CRO
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {SERVICES_DATA[1].sections.map((section, sidx) => (
                    <div key={sidx} className="space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-extrabold block border-b border-slate-100 pb-1">
                        {section.category}
                      </span>
                      <ul className="space-y-1">
                        {section.items.map((item, itemIdx) => (
                          <li 
                            key={itemIdx}
                            onClick={() => handleServiceNavigation('revmarketing', item)}
                            className="group/item cursor-pointer block py-1 px-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <span className="text-[11px] font-bold text-slate-700 group-hover/item:text-[#ff8c00] transition-all flex items-center justify-between">
                              <span>{item}</span>
                              <ChevronRight className="h-2.5 w-2.5 text-slate-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column Group 3: UX & AI (Col 5) */}
              <div className="col-span-1 space-y-4 pr-2">
                <div className="flex items-center gap-2 text-teal-600 pb-2 border-b border-slate-200">
                  <Cpu className="h-4.5 w-4.5 text-teal-600" />
                  <span className="font-sans font-black text-xs uppercase tracking-wider text-teal-700">
                    UX &amp; AI Design
                  </span>
                </div>

                <div className="space-y-4">
                  {SERVICES_DATA[2].sections.map((section, sidx) => (
                    <div key={sidx} className="space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-extrabold block border-b border-slate-100 pb-1">
                        {section.category}
                      </span>
                      <ul className="space-y-1">
                        {section.items.map((item, itemIdx) => (
                          <li 
                            key={itemIdx}
                            onClick={() => handleServiceNavigation('uxai', item)}
                            className="group/item cursor-pointer block py-1 px-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <span className="text-[11px] font-bold text-slate-700 group-hover/item:text-[#ff8c00] transition-all flex items-center justify-between">
                              <span>{item}</span>
                              <ChevronRight className="h-2.5 w-2.5 text-slate-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Custom CTA Card within column */}
                  <div className="bg-teal-50 border border-teal-100 p-4 rounded-xl space-y-2">
                    <span className="text-[9px] font-mono font-bold text-teal-850 uppercase tracking-wider block">
                      Instant Audit
                    </span>
                    <p className="text-[10px] text-teal-700 leading-snug">
                      Audit your layout assets and UX elements with our instant checker console.
                    </p>
                    <button 
                      onClick={() => {
                        setActiveMegaMenu(null);
                        onGraderClick();
                      }}
                      className="text-[10px] font-bold text-teal-800 hover:text-[#ff8c00] flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <span>Launch UI Audit</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Column Group 4: Revenue Platform Suite (Col 6) */}
              <div className="col-span-1 space-y-4 border-l border-slate-100 pl-6">
                <div className="flex items-center gap-2 text-[#000000] pb-2 border-b border-slate-200">
                  <Zap className="h-4.5 w-4.5 text-[#ff8c00]" />
                  <span className="font-sans font-black text-xs uppercase tracking-wider text-[#000000]">
                    Revenue Platform
                  </span>
                </div>

                <div className="space-y-4">
                  {SERVICES_DATA[3].sections.map((section, sidx) => (
                    <div key={sidx} className="space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-extrabold block border-b border-slate-100 pb-1">
                        {section.category}
                      </span>
                      <ul className="space-y-1">
                        {section.items.map((item, itemIdx) => (
                          <li 
                            key={itemIdx}
                            onClick={() => handleServiceNavigation('platform', item)}
                            className="group/item cursor-pointer block py-1 px-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <span className="text-[11px] font-bold text-slate-700 group-hover/item:text-[#ff8c00] transition-all flex items-center justify-between">
                              <span>{item}</span>
                              <ChevronRight className="h-2.5 w-2.5 text-slate-400 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Custom SLA Insight in menu */}
                  <div className="bg-[#000000]/5 border border-[#000000]/10 p-4 rounded-xl space-y-2">
                    <span className="text-[9px] font-mono font-bold text-[#000000] uppercase tracking-wider block">
                      SLA Performance
                    </span>
                    <p className="text-[10px] text-slate-500 leading-snug">
                      Unified live tracking, CRM webhooks, and automated pipelines.
                    </p>
                    <button 
                      onClick={() => handleServiceNavigation('platform', null)}
                      className="text-[10px] font-extrabold text-[#000000] hover:text-[#ff8c00] flex items-center gap-1 transition-all cursor-pointer"
                    >
                      <span>Read SLA Tech Specs</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Corporate trust and SLA compliance Footer in Mega Menu */}
            <div className="mt-8 pt-5 border-t border-slate-150 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <div className="hidden md:flex items-center gap-4">
                <span>🔒 ENCRYPTED TRANSIT SHA-256</span>
                <span>⚡ OVER 1,024 ACTIVE CHANNELS IN LIVE POOL</span>
                <span>🚀 99.9% ATTRIBUTION SYSTEM SLA</span>
              </div>
              <div className="flex items-center gap-1 font-sans text-[11px] font-bold text-slate-550 ml-auto md:ml-0">
                <span>Need custom bespoke setups?</span>
                <button 
                  onClick={() => {
                    setActiveMegaMenu(null);
                    onPageChange('quote');
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                  className="text-[#ff8c00] hover:underline cursor-pointer"
                >
                  Settle contract quote now
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Unified Knowledge Base Mega Menu Dropdown */}
      {activeMegaMenu === 'knowledgebase' && (
        <div 
          className="absolute top-20 left-0 right-0 w-full bg-white border-b border-slate-200 shadow-2xl z-50 py-8 animate-fade-in duration-150"
          onMouseEnter={() => handleMouseEnter('knowledgebase')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Mega Menu Top header / insight bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-150 pb-5 mb-5 gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#000000] text-white text-[9px] font-mono font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-[#ff8c00]" />
                  Secure Knowledge Base Logs
                </span>
                <span className="text-xs text-slate-400 font-sans">
                  | Technical guidelines, research summaries, and interactive showcases
                </span>
              </div>
              <button
                onClick={() => handleKnowledgeNavigation(null)}
                className="text-xs font-bold text-slate-700 hover:text-[#ff8c50] transition-colors flex items-center gap-1 cursor-pointer w-fit"
              >
                <span>View all Resources</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#ff8c00]" />
              </button>
            </div>

            {/* 4-Column Grid based on Section Items */}
            <div className="grid grid-cols-4 gap-x-8 gap-y-4">
              {KNOWLEDGE_BASE_SECTIONS.map((section, sidx) => (
                <div key={sidx} className="space-y-3 pb-2 select-none">
                  <div className="border-b border-slate-100 pb-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-extrabold block">
                      {section.category}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {section.items.map((item, itemIdx) => (
                      <li 
                        key={itemIdx}
                        onClick={() => handleKnowledgeNavigation(item)}
                        className="group/item cursor-pointer block py-1 px-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-[11px] font-bold text-slate-700 group-hover/item:text-[#ff8c00] transition-all flex items-center justify-between">
                          <span className="truncate max-w-[90%]">{item}</span>
                          <ChevronRight className="h-2.5 w-2.5 text-slate-400 opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0" />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom SLA banner line */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400 font-mono">
              <div className="flex items-center gap-4">
                <span>📚 21 SECURED TECHNICAL CHANNELS</span>
                <span>📅 MAY 2026 AUDITED REPORT INDEX</span>
                <span>📝 INTERACTIVE NOMINATIONS ACTIVE</span>
              </div>
              <div className="flex items-center gap-1 font-sans text-xs font-bold text-[#ff8c10]">
                <span>Looking for specific guides?</span>
                <button 
                  onClick={() => handleKnowledgeNavigation(null)}
                  className="hover:underline cursor-pointer"
                >
                  Retrieve entire learning pool
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Mobile Drawer/Navigation */}
      {mobileDrawerOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-6 shadow-xl space-y-4 max-h-[80vh] overflow-y-auto absolute top-20 left-0 w-full z-40 animate-fade-in-up">
          <div className="space-y-1 pb-4 border-b border-slate-100">
            <button
               onClick={handleHomeClick}
               className="w-full text-left p-2.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#ff8c00] flex items-center gap-2"
            >
              <Home className="h-4 w-4 text-slate-400" />
              <span>Console Home</span>
            </button>
            <button
              onClick={() => { setMobileDrawerOpen(false); onServicesClick(); }}
              className="w-full text-left p-2.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#ff8c00] flex items-center gap-2"
            >
              <Layers className="h-4 w-4 text-slate-400" />
              <span>Interactive Calculator Pricing</span>
            </button>
            <button
              onClick={() => handleKnowledgeNavigation(null)}
              className="w-full text-left p-2.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#ff8c50] flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4 text-slate-400" />
              <span>Retrieve Learning Resources</span>
            </button>
            <button
              onClick={() => handleSeminarsNavigation(null)}
              className="w-full text-left p-2.5 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#ff8c50] flex items-center gap-2"
            >
              <Video className="h-4 w-4 text-slate-400" />
              <span>Seminars & Training Hub</span>
            </button>
            <button
              onClick={handleQuoteClick}
              className={`w-full text-left p-2.5 rounded-lg text-xs font-extrabold flex items-center gap-2 transition-all border ${
                currentPage === 'quote'
                  ? 'bg-orange-50 border-orange-200 text-[#ff8c00]'
                  : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Zap className="h-4 w-4 text-[#ff8c00]" />
              <span>Get Interactive Free Quote</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#000000] font-black pl-2 block mb-2">
                Our Strategic Services
              </span>
              
              {SERVICES_DATA.map((cat) => {
                const expanded = mobileExpandedCat === cat.key;
                return (
                  <div key={cat.key} className="border border-slate-105 rounded-xl overflow-hidden mb-2">
                    <button
                      onClick={() => setMobileExpandedCat(expanded ? null : cat.key)}
                      className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-[#000000]">
                        {cat.icon}
                        <span>{cat.title}</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                    </button>

                    {expanded && (
                      <div className="p-3 bg-white space-y-2 border-t border-slate-100">
                        <button
                          onClick={() => handleServiceNavigation(cat.key, null)}
                          className="w-full text-center py-2 bg-[#000000] hover:bg-[#222222] text-[#ff8c00] text-xs font-extrabold rounded-md shadow flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Analyze Page Layout</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>

                        <div className="space-y-3 pt-2 pl-2">
                          {cat.sections.map((section, sidx) => (
                            <div key={sidx} className="space-y-1">
                              <span className="text-[9px] font-mono text-[#ff8c00] font-bold tracking-wider">{section.category}</span>
                              <ul className="space-y-1.5">
                                {section.items.map((item, itemIdx) => (
                                  <li 
                                    key={itemIdx}
                                    onClick={() => handleServiceNavigation(cat.key, item)}
                                    className="text-left cursor-pointer hover:bg-slate-50 p-1 rounded font-sans text-[11px] font-bold text-slate-800"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#000000] font-black pl-2 block mb-2 border-t border-slate-100 pt-3">
                Knowledge Base Directory
              </span>

              {KNOWLEDGE_BASE_SECTIONS.map((cat, catIdx) => {
                const kbMenuKey = `kb-${catIdx}`;
                const expanded = mobileExpandedCat === kbMenuKey;
                return (
                  <div key={kbMenuKey} className="border border-slate-105 rounded-xl overflow-hidden mb-2">
                    <button
                      onClick={() => setMobileExpandedCat(expanded ? null : kbMenuKey)}
                      className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-[#000000]">
                        <BookOpen className="h-4 w-4 text-[#ff8c00]" />
                        <span>{cat.category}</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                    </button>

                    {expanded && (
                      <div className="p-3 bg-white space-y-1 border-t border-slate-100 pl-3">
                        <ul className="space-y-1.5">
                          {cat.items.map((item, itemIdx) => (
                            <li 
                              key={itemIdx}
                              onClick={() => handleKnowledgeNavigation(item)}
                              className="text-left cursor-pointer hover:bg-slate-50 p-1.5 rounded font-sans text-[11px] font-bold text-slate-800 truncate"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
