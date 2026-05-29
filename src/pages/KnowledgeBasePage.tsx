import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Calendar, Clock, ArrowLeft, Search, Sparkles, 
  MessageSquare, CheckCircle, FileText, Award, Zap, Globe, 
  Send, User, ChevronRight, Share, Layers, ArrowUpRight 
} from 'lucide-react';
import { KNOWLEDGE_BASE_DATA, Article } from '../data/knowledgeBaseData';

interface KnowledgeBasePageProps {
  onGraderClick: () => void;
  onServicesClick: () => void;
  selectedSubPageItem: string | null;
  onSubPageItemChange: (item: string | null) => void;
}

export default function KnowledgeBasePage({ 
  onGraderClick, 
  onServicesClick, 
  selectedSubPageItem, 
  onSubPageItemChange 
}: KnowledgeBasePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'popular' | 'industry' | 'services' | 'clutch'>('all');
  
  // Submit Your Work Form Local State
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    workUrl: '',
    emailAddress: '',
    workCategory: 'web-design',
    description: '',
    impactMetric: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Reset form when sub-page changes
  useEffect(() => {
    if (selectedSubPageItem !== 'submit-your-work') {
      setSubmitted(false);
      setFormData({
        companyName: '',
        workUrl: '',
        emailAddress: '',
        workCategory: 'web-design',
        description: '',
        impactMetric: ''
      });
      setFormErrors({});
    }
  }, [selectedSubPageItem]);

  // Find the currently selected article/sub-page
  const currentKey = selectedSubPageItem ? selectedSubPageItem.toLowerCase().replace(/[^a-z0-9]+/g, '-') : null;
  
  // Map friendly navigation title or URL item to the database key
  let resolvedKey = currentKey;
  if (currentKey) {
    // Exact match search
    if (KNOWLEDGE_BASE_DATA[currentKey]) {
      resolvedKey = currentKey;
    } else {
      // Fuzzy lookup if navigating via menu string
      const matchedKey = Object.keys(KNOWLEDGE_BASE_DATA).find(
        k => k === currentKey || KNOWLEDGE_BASE_DATA[k].title.toLowerCase().includes(currentKey)
      );
      if (matchedKey) resolvedKey = matchedKey;
    }
  }

  const currentArticle = resolvedKey ? KNOWLEDGE_BASE_DATA[resolvedKey] : null;

  // Filter items for dashboard listing
  const articlesList = Object.values(KNOWLEDGE_BASE_DATA);
  const filteredArticles = articlesList.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' ? true : article.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleApplyFilter = (catId: 'all' | 'popular' | 'industry' | 'services' | 'clutch') => {
    setActiveCategory(catId);
    onSubPageItemChange(null);
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.companyName.trim()) errors.companyName = 'Company name is required';
    if (!formData.emailAddress.trim()) {
      errors.emailAddress = 'Corporate email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      errors.emailAddress = 'Invalid corporate email format';
    }
    if (!formData.workUrl.trim()) {
      errors.workUrl = 'Operational website URL coordinate is required';
    } else if (!/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(formData.workUrl)) {
      errors.workUrl = 'Operational URL coordinate must be fully qualified starting with http:// or https://';
    }
    if (!formData.description.trim()) errors.description = 'Brief description of engineering craft is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  // Mock static showcase assets for Website Designs & Marketing Campaigns pages
  const SHOWCASE_WEBSITES = [
    {
      title: "Vanguard Quant Intelligence Portal",
      metric: "99/100 Core Web Vitals",
      impact: "+58% lead conversions via instant simulated pricing matrices",
      description: "A highly dynamic platform designed with deep-black color branding and a high-contrast monospaced layout to establish premium financial authority.",
      slug: "vanguard-quant"
    },
    {
      title: "Apex Logistics & Supply Chain Grid",
      metric: "0.4s First Contentful Paint",
      impact: "Replaced heavy mapping APIs with optimized server-to-server coordinates",
      description: "An elegant, grid-centric Swiss-layout web portal that handles real-time live fleet tracking indexes in milliseconds without layout shift.",
      slug: "apex-grid"
    },
    {
      title: "Solomon BioMedical RAG Discovery Web",
      metric: "98.4% IA Scraper Alignment Score",
      impact: "Over 12,000 conversational citations inside main AI search models",
      description: "Utilized Generative Engine Optimization (GEO) structured schema markups to transform scientific document pools into search authoritative citations.",
      slug: "solomon-rag"
    }
  ];

  const SHOWCASE_CAMPAIGNS = [
    {
      title: "Strategic Lead-Capture Orchestration",
      metric: "14.2% Funnel Conversion Rate",
      impact: "Acquired $42M in direct pipeline sales at a 32% lower cost per lead",
      description: "Coordinated paid PPC search networks, interactive exit intent models, and automated email nurturing into one unified attribution loop.",
      channel: "Omni-Channel PPC & Automation"
    },
    {
      title: "Local SEO Directory Domination 2026",
      metric: "+320% Local Search Visibility",
      impact: "Positioned client branches in the top-3 local maps results for 48 markets",
      description: "Optimized structured reviews acceleration, micro-copy schema markups, and responsive location grids across 48 target regional centers.",
      channel: "Technical Local SEO & CRO"
    }
  ];

  // Helper to jump to article
  const handleArticleClick = (articleId: string) => {
    onSubPageItemChange(articleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="knowledgebase-container" className="bg-[#ffffff] min-h-screen text-slate-800">
      
      {/* Search Header Banner */}
      <div className="bg-slate-900 text-white relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-[#000000] opacity-90" />
        
        {/* Subtle grid elements in backend */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1 bg-[#ff8c00] text-white text-[9px] font-mono font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AL KHAWARIZMI LEARNING RESOURCES</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-white leading-none">
            {currentArticle ? currentArticle.categoryLabel : "Knowledge Base"}
          </h1>
          
          <p className="text-xs sm:text-base text-slate-350 max-w-2xl mx-auto leading-relaxed">
            {currentArticle 
              ? `Operational documentation & strategic analyses mapping digital assets to optimal conversion results.` 
              : `Explore technical guidelines, structured SEO walkthroughs, corporate HR trends, and industry benchmarks curated by Al Khawarizmi Retrieval Pilots.`
            }
          </p>

          {/* Search bar inside header when looking at catalog */}
          {!currentArticle && (
            <div className="max-w-md mx-auto pt-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4.5 w-4.5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, guides, keywords, or trends..."
                className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 rounded-xl pl-10 pr-4 py-3.5 text-xs font-sans placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ff8c00] border border-white/10 focus:border-transparent transition-all shadow-xl"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 px-2 py-1 rounded"
                >
                  Clear
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Container Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Detail view of selected item */}
        {currentArticle ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Article Content Panel (Col 1-8) */}
            <article className="lg:col-span-8 space-y-6">
              
              <button
                onClick={() => onSubPageItemChange(null)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 hover:text-[#ff8c00] border hover:border-[#ff8c00]/30 hover:bg-[#ff8c00]/5 px-4 py-2 rounded-xl transition-all cursor-pointer mb-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Knowledge Catalog</span>
              </button>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md uppercase">
                    {currentArticle.categoryLabel}
                  </span>
                  
                  {currentArticle.metaMetric && (
                    <span className="bg-emerald-50 border border-emerald-100 text-emerald-850 text-[10px] font-mono font-extrabold px-2.5 py-1 rounded-md flex items-center gap-1">
                      <span>{currentArticle.metaMetric.label}:</span>
                      <span className="text-emerald-600">{currentArticle.metaMetric.value}</span>
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black font-sans text-slate-900 tracking-tight leading-tight">
                  {currentArticle.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-b border-slate-100 pb-4">
                  {currentArticle.author && (
                    <span className="flex items-center gap-1.5 font-bold text-slate-600">
                      <User className="h-4 w-4 text-[#ff8c00]" />
                      <span>{currentArticle.author.name}</span>
                      <span className="text-[10px] font-normal text-slate-400">({currentArticle.author.role})</span>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Published: {currentArticle.publishDate}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{currentArticle.readTime}</span>
                  </span>
                </div>
              </div>

              {/* Bold Intro Block */}
              <p className="text-sm sm:text-base font-medium text-slate-650 leading-relaxed border-l-4 border-[#ff8c00] pl-4 italic">
                {currentArticle.summary}
              </p>

              {/* Core Written Body Paragraphes */}
              <div className="space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
                {currentArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Specialized Dynamic Interaction View for "Submit Your Work" Form */}
              {currentArticle.id === 'submit-your-work' && (
                <div className="bg-slate-50 border border-slate-200 shadow-xl rounded-3xl p-6 sm:p-8 mt-10 space-y-6">
                  <div className="border-b border-slate-200 pb-4">
                    <h3 className="text-lg font-black font-sans text-slate-950 flex items-center gap-2">
                      <Award className="h-5 w-5 text-[#ff8c00]" />
                      Nominate Your Portal for alkhawarizmi.agency Clutch Showcases
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Our evaluation team runs automated Core Vitals and crawl audits. Approved entries are archived in perpetuity.
                    </p>
                  </div>

                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 border border-emerald-150 rounded-2xl p-6 text-center space-y-4"
                    >
                      <div className="mx-auto h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="text-sm font-black text-emerald-950 font-sans">Nomination Submission Secured Successfully</h4>
                        <p className="text-xs text-emerald-700 leading-relaxed max-w-md mx-auto">
                          Our alkhawarizmi.agency evaluation crawler has been dispatch to queue <span className="font-bold underline">{formData.workUrl}</span>. We will analyze alignment against standard layout indexes and contact you at <span className="font-bold">{formData.emailAddress}</span>.
                        </p>
                      </div>

                      <div className="bg-white border border-emerald-100 rounded-xl p-3 max-w-sm mx-auto flex items-center justify-between text-[10px] font-mono font-bold text-slate-500 uppercase pb-2">
                        <span>TRANSACTION STATUS: QUEUED</span>
                        <span className="text-[#ff8c00]">TOKEN: ALK-NOM-{Math.floor(Math.random() * 90000 + 10000)}</span>
                      </div>

                      <button
                        onClick={() => setSubmitted(false)}
                        className="cursor-pointer text-xs font-mono font-bold text-[#ff8c00] hover:underline"
                      >
                        Submit another corporate case study
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-500 uppercase font-black block">Company Brand Name</label>
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleFormInputChange}
                            placeholder="e.g. Apex Quant Systems"
                            className="w-full bg-white border border-slate-200 focus:border-[#ff8c00] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-all placeholder:text-slate-350"
                          />
                          {formErrors.companyName && <p className="text-[10px] font-mono font-bold text-red-500">{formErrors.companyName}</p>}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-500 uppercase font-black block">Corporate Email Address</label>
                          <input
                            type="email"
                            name="emailAddress"
                            value={formData.emailAddress}
                            onChange={handleFormInputChange}
                            placeholder="e.g. pilot@apexquant.com"
                            className="w-full bg-white border border-slate-200 focus:border-[#ff8c00] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-all placeholder:text-slate-350"
                          />
                          {formErrors.emailAddress && <p className="text-[10px] font-mono font-bold text-red-500">{formErrors.emailAddress}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-500 uppercase font-black block">Target Site URL Coordinate</label>
                          <input
                            type="text"
                            name="workUrl"
                            value={formData.workUrl}
                            onChange={handleFormInputChange}
                            placeholder="e.g. https://apexquant.com"
                            className="w-full bg-white border border-slate-200 focus:border-[#ff8c00] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-all placeholder:text-slate-350"
                          />
                          {formErrors.workUrl && <p className="text-[10px] font-mono font-bold text-red-500">{formErrors.workUrl}</p>}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-500 uppercase font-black block">Awards Nomination Category</label>
                          <select
                            name="workCategory"
                            value={formData.workCategory}
                            onChange={handleFormInputChange}
                            className="w-full bg-white border border-slate-200 focus:border-[#ff8c00] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-all"
                          >
                            <option value="web-design">Innovative Website Design</option>
                            <option value="marketing-campaign">High-Yield Marketing Campaign</option>
                            <option value="seo-geo">GEO-Traditional SEO Hybrid Solution</option>
                            <option value="ai-infrastructure">Server AI Ingestion Platform</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-500 uppercase font-black block">Key Achievement Value or Net ROI Metric</label>
                        <input
                          type="text"
                          name="impactMetric"
                          value={formData.impactMetric}
                          onChange={handleFormInputChange}
                          placeholder="e.g. +42% monthly demo conversions OR 0.3s core platform load speed"
                          className="w-full bg-white border border-slate-200 focus:border-[#ff8c00] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-all placeholder:text-slate-350"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-500 uppercase font-black block">Describe the Project &amp; Corporate Craft</label>
                        <textarea
                          name="description"
                          rows={4}
                          value={formData.description}
                          onChange={handleFormInputChange}
                          placeholder="Provide a breakdown of the web layout, conversion architecture, and backend systems employed..."
                          className="w-full bg-white border border-slate-200 focus:border-[#ff8c00] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-all placeholder:text-slate-350"
                        />
                        {formErrors.description && <p className="text-[10px] font-mono font-bold text-red-500">{formErrors.description}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-slate-950 hover:bg-[#ff8c00] text-white disabled:bg-slate-400 font-sans font-black text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Send className="h-4 w-4" />
                        <span>{submitting ? "Booting crawler logic..." : "Submit nomination to alkhawarizmi.agency"}</span>
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Specialized Interactive Showcase for "Website Designs" */}
              {currentArticle.id === 'website-designs' && (
                <div className="mt-10 space-y-6">
                  <h3 className="text-xl font-black font-sans text-slate-900 border-b pb-3 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-[#ff8c00]" />
                    Featured 25-26 Website Design Showcase Nominations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {SHOWCASE_WEBSITES.map((site, sidx) => (
                      <div key={sidx} className="bg-white border border-slate-200 hover:border-slate-350 p-5 rounded-2xl space-y-3 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-[9px] font-mono font-extrabold text-[#ff8c00] bg-orange-50 px-2 py-0.5 rounded uppercase">
                            {site.metric}
                          </span>
                          <h4 className="text-xs font-black text-slate-900 leading-snug">{site.title}</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-sans">{site.description}</p>
                        </div>
                        <div className="pt-2 border-t border-slate-50 text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 shrink-0" />
                          <span>{site.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specialized Interactive Showcase for "Marketing Campaigns" */}
              {currentArticle.id === 'marketing-campaigns' && (
                <div className="mt-10 space-y-6">
                  <h3 className="text-xl font-black font-sans text-slate-900 border-b pb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#ff8c00]" />
                    Active High-Attribution Marketing Campaign Case Studies
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SHOWCASE_CAMPAIGNS.map((camp, cidx) => (
                      <div key={cidx} className="bg-slate-50 border border-slate-200 hover:border-slate-300 p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono font-black text-slate-450 uppercase tracking-widest block">{camp.channel}</span>
                            <span className="text-xs font-mono font-black text-[#ff8c00] bg-white border border-orange-100 px-2 py-0.5 rounded">
                              {camp.metric}
                            </span>
                          </div>
                          <h4 className="text-sm font-black text-slate-900 leading-tight">{camp.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-sans">{camp.description}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span>Attributed Growth Value:</span>
                          <span className="text-emerald-600 font-mono font-black">{camp.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags and Share Row */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex flex-wrap items-center gap-1">
                  <span className="font-bold mr-1">Tags:</span>
                  {currentArticle.tags.map((t, idx) => (
                    <span key={idx} className="bg-slate-100/80 px-2 py-1 rounded text-[10px] text-slate-550 lowercase">
                      #{t.replace(/\s+/g, '')}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => {
                    const pageUrl = window.location.href;
                    navigator.clipboard.writeText(`${pageUrl}#knowledgebase?article=${currentArticle.id}`);
                    alert("Article linkage coordinates copied to clipboard clipboard secure token!");
                  }}
                  className="cursor-pointer inline-flex items-center gap-1 px-3 py-1 bg-slate-50 hover:bg-slate-150 border rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Share className="h-3 w-3" />
                  <span>Copy Link</span>
                </button>
              </div>

            </article>

            {/* Sidebar Article Navigation (Col  9-12) */}
            <aside className="lg:col-span-4 space-y-6 lg:border-l lg:border-slate-100 lg:pl-10">
              
              {/* Promotional CTA Box: Trigger Grader */}
              <div className="bg-gradient-to-br from-slate-900 to-[#000000] text-white p-6 rounded-2xl space-y-4 shadow-xl text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 bg-[#ff8c00]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-1.5 relative z-10">
                  <span className="text-[9px] font-mono text-[#ff8c00] font-black uppercase tracking-widest block">Core Web Vitals Checker</span>
                  <h4 className="text-sm font-black font-sans leading-snug">Worry about your crawl authority score?</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                    Launch the MarketingCloudFX crawler pipeline to run instant response tests on your pages.
                  </p>
                </div>
                <button
                  onClick={onGraderClick}
                  className="w-full bg-[#ff8c00] hover:bg-[#e07b00] text-white font-sans font-black text-xs py-2.5 rounded-lg transition-colors shadow flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Launch Live UI Audit</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Related articles filter */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest pl-1 block border-b pb-2">
                  Related Learning Blocks
                </h4>
                <ul className="space-y-1.5 text-left">
                  {Object.values(KNOWLEDGE_BASE_DATA)
                    .filter(a => a.category === currentArticle.category && a.id !== currentArticle.id)
                    .slice(0, 4)
                    .map((art) => (
                      <li key={art.id}>
                        <button
                          onClick={() => handleArticleClick(art.id)}
                          className="w-full text-left p-2.5 rounded-xl border border-transparent hover:border-slate-200/60 hover:bg-slate-50 transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <div className="space-y-0.5 max-w-[85%]">
                            <span className="text-[8px] font-mono text-slate-400 font-bold block">{art.readTime}</span>
                            <span className="text-xs font-bold text-slate-800 group-hover:text-[#ff8c00] block truncate">{art.title}</span>
                          </div>
                          <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:transform group-hover:translate-x-0.5 transition-transform shrink-0" />
                        </button>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Return to list button */}
              <div className="pt-2">
                <button
                  onClick={() => onSubPageItemChange(null)}
                  className="w-full text-center text-xs font-sans font-black text-slate-650 hover:text-[#ff8c00] hover:bg-slate-50 border py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Browse all 21 articles &amp; guides
                </button>
              </div>

            </aside>

          </div>
        ) : (
          
          /* KNOWLEDGE BASE PRIMARY LANDING CATALOG */
          <div className="space-y-8">
            
            {/* Horizontal Filter Categories Bar */}
            <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-2xl flex flex-wrap items-center gap-1.5 z-10 justify-center">
              {[
                { id: 'all', name: 'All Resources', icon: <Layers className="h-3.5 w-3.5" /> },
                { id: 'popular', name: 'Popular Articles', icon: <Sparkles className="h-3.5 w-3.5 text-amber-500 fill-amber-500" /> },
                { id: 'industry', name: 'Industry Insights', icon: <FileText className="h-3.5 w-3.5" /> },
                { id: 'services', name: 'Services Guides', icon: <Zap className="h-3.5 w-3.5" /> },
                { id: 'clutch', name: 'Best of Clutch Awards', icon: <Award className="h-3.5 w-3.5" /> }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => handleApplyFilter(pill.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-sans cursor-pointer flex items-center gap-1.5 transition-all outline-none ${
                    activeCategory === pill.id
                      ? 'bg-[#000000] text-white shadow-md scale-[1.02]'
                      : 'bg-white border border-slate-150 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <span className="opacity-80 scale-90">{pill.icon}</span>
                  <span>{pill.name}</span>
                </button>
              ))}
            </div>

            {/* Zero Results Container */}
            {filteredArticles.length === 0 && (
              <div className="bg-slate-50 border border-slate-200 py-16 px-4 rounded-3xl text-center max-w-md mx-auto space-y-4">
                <div className="h-12 w-12 bg-slate-150 rounded-full flex items-center justify-center text-slate-500 mx-auto">
                  <Search className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black font-sans text-slate-900 leading-tight">No learning coordinates matched your search</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We crawled the index catalog for "{searchQuery}" but returned empty logs. Modify your queries or reset pills to look again.
                  </p>
                </div>
                <button
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="cursor-pointer bg-[#000000] hover:bg-[#222222] text-white text-xs font-mono font-bold px-4 py-2 rounded-xl transition-colors"
                >
                  Reset Catalog Search Filter
                </button>
              </div>
            )}

            {/* Grid of beautifully printed Article Cards */}
            {filteredArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {filteredArticles.map((article) => {
                  let badgeColor = "bg-slate-100 text-slate-600";
                  if (article.category === 'popular') badgeColor = "bg-[#ff8c00]/10 text-[#ff8c00]";
                  if (article.category === 'industry') badgeColor = "bg-blue-50 text-blue-700";
                  if (article.category === 'services') badgeColor = "bg-emerald-50 text-emerald-850";
                  if (article.category === 'clutch') badgeColor = "bg-slate-950 text-[#ff8c00]";

                  return (
                    <motion.div
                      key={article.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-slate-200 rounded-3xl p-5 hover:shadow-xl hover:border-slate-350 transition-all flex flex-col justify-between group relative shadow-xs"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className={`${badgeColor} text-[8.5px] font-mono font-black px-2.5 py-1 rounded-md uppercase block tracking-wider`}>
                            {article.categoryLabel}
                          </span>
                          
                          <span className="text-[10px] text-slate-405 font-mono flex items-center gap-0.5">
                            <Clock className="h-3 w-3 inline text-slate-400" />
                            {article.readTime}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          <h4 
                            onClick={() => handleArticleClick(article.id)}
                            className="text-xs sm:text-[14px] font-black font-sans leading-tight text-slate-900 group-hover:text-[#ff8c00] transition-colors cursor-pointer"
                          >
                            {article.title}
                          </h4>
                          <p className="text-[11.5px] text-slate-500 leading-relaxed font-sans line-clamp-3">
                            {article.summary}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[9px] font-mono font-bold text-slate-400">
                            CALIBRATED: {article.publishDate}
                          </span>
                        </div>
                        <button
                          onClick={() => handleArticleClick(article.id)}
                          className="cursor-pointer text-[10px] font-sans font-black text-slate-650 hover:text-[#ff8c50] transition-colors flex items-center gap-1"
                        >
                          <span>Extract Core Insights</span>
                          <ChevronRight className="h-3 w-3 group-hover:transform group-hover:translate-x-1 transition-all" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Quick Interactive Tool Promotion Section */}
            <div className="bg-slate-50 border border-slate-150 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between text-left gap-6 shadow-xs mt-12">
              <div className="space-y-2 max-w-2xl">
                <span className="bg-[#000000] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                  Budget Calculator
                </span>
                <h4 className="text-lg sm:text-xl font-black font-sans text-slate-900 tracking-tight leading-tight">
                  Calibrate your personalized corporate SEO &amp; marketing SLA contract budget
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Use our live interactive slider calculator to select target channel values, dial in your organic metrics, and get instant budgetary appraisals returned live.
                </p>
              </div>
              <button
                onClick={onServicesClick}
                className="w-full md:w-auto cursor-pointer bg-[#000000] hover:bg-[#ff8c00] text-white font-sans font-black text-xs px-6 py-3.5 rounded-xl text-center shadow-lg transition-transform active:scale-95 shrink-0"
              >
                Launch Price Estimator
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
