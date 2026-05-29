import React, { useState, useEffect } from 'react';
import { 
  Search, TrendingUp, CheckCircle, ArrowRight, Zap, RefreshCw, BarChart2, Award, ChevronRight, HelpCircle, Activity, Globe, ArrowLeft, Mail, Database, Brain, Globe2, Eye, Cpu, LucideIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OmniSEOPageProps {
  onGraderClick: () => void;
  onServicesClick: () => void;
  selectedSubPageItem?: string | null;
  setSelectedSubPageItem?: (item: string | null) => void;
}

interface OmniSEOItem {
  name: string;
  shortDesc: string;
  longDesc: string;
  kpis: { label: string; value: string; suffix?: string }[];
  deliverables: string[];
  visualElement?: 'hand-circle' | 'social-likes' | 'teal-circle-bulb';
}

interface OmniSEOCategory {
  title: string;
  description: string;
  key: string;
  items: OmniSEOItem[];
}

const OMNISEO_CATEGORIES_DATA: OmniSEOCategory[] = [
  {
    title: "AI & Search Visibility",
    description: "Align technical website parameters with generational conversational systems, LLM citations, and modern search models.",
    key: "ai-search-visibility",
    items: [
      {
        name: "Generative Engine, LLM & AI SEO",
        shortDesc: "Optimize content templates to secure citations and links inside ChatGPT, Claude, Gemini, and Perplexity query boxes.",
        longDesc: "The future is conversational. Generative Engine Optimization (GEO) ensures your company profile, solutions, and citations are prominently listed whenever searchers ask conversational LLMs for recommendations.",
        kpis: [
          { label: "LLM RECOGNITION", value: "85", suffix: "%" },
          { label: "CITATION RATES", value: "3.5x" },
          { label: "DIRECT TRAFFIC", value: "+44%" }
        ],
        deliverables: [
          "Semantic Schema injection script templates",
          "LLM recommendation vulnerability analysis files",
          "Keyword index targeting conversational intents",
          "Monthly LLM search share position charts"
        ],
        visualElement: "hand-circle"
      },
      {
        name: "SEO Services",
        shortDesc: "Core search optimization focusing on high-intent target terms and semantic keyword density ratios.",
        longDesc: "Secure permanent search placements. We analyze keyword priority matrices, rewrite core page meta tags, and optimize server-side response metrics to guarantee continuous organic improvements.",
        kpis: [
          { label: "INDEX RATIO", value: "100", suffix: "%" },
          { label: "KEYWORD LIFT", value: "3.2x" },
          { label: "CRAWL FREQUENCY", value: "Hourly" }
        ],
        deliverables: [
          "Target search keyword opportunity ledger",
          "On-page meta tag restructure documents",
          "Dynamic XML sitemap health validation",
          "Google search console tracking configurations"
        ]
      },
      {
        name: "Enterprise SEO Services",
        shortDesc: "Algorithmic search management for million-page catalogs requiring complete system stability.",
        longDesc: "Corporate visibility at scale. We design robust programmatic patterns to optimize title tags dynamically and coordinate with developers to prevent server-side indexing drops.",
        kpis: [
          { label: "PAGE SCALING CAPACITY", value: "10M", suffix: "+" },
          { label: "CMS INTEGRITY", value: "100", suffix: "%" },
          { label: "INDEX LATENCY", value: "Sub-1s" }
        ],
        deliverables: [
          "Enterprise programmatic index schema blueprints",
          "Crawl budget allocation efficiency audits",
          "Canonical URL parameter protection scripts",
          "Monthly enterprise share of voice dashboards"
        ]
      },
      {
        name: "AI & LLM Visibility Tracking",
        shortDesc: "Live telemetry dashboards tracking company mentions across OpenAI, Anthropic, and Gemini search boxes.",
        longDesc: "Stop guessing if conversational engines recommend your brand. We poll major generative models dynamically to catalog your reference index and target gaps immediately.",
        kpis: [
          { label: "TRACKED MODELS", value: "8" },
          { label: "DATA RECOVERY RATIO", value: "99.8", suffix: "%" },
          { label: "UPDATE SPEED", value: "Daily" }
        ],
        deliverables: [
          "Live conversational references index scorecard",
          "Competitor citations comparative metrics",
          "Model-level sentiment progress charts",
          "Automated conversational search alerts"
        ]
      },
      {
        name: "AI Brand Visibility Audit",
        shortDesc: "Comprehensive diagnostics evaluating whether conversational search models outline your services favorably.",
        longDesc: "Identify which LLM search boundaries align with your brand metrics. We audit recommendation biases and document search phrases that display competitor options first.",
        kpis: [
          { label: "BIAS AUDITED WORDS", value: "1,500", suffix: "+" },
          { label: "MENTION VELOCITY", value: "Stable" },
          { label: "CORRECTION RATE", value: "92", suffix: "%" }
        ],
        deliverables: [
          "Algorithmic model bias assessment files",
          "Competitive mention gaps opportunity ledger",
          "Optimal keyword phrasing injection guides",
          "Actionable content adjustment check sheets"
        ]
      },
      {
        name: "Local SEO Services",
        shortDesc: "Command localized maps listings and regional review targets to capture nearby search queries.",
        longDesc: "Boost foot-traffic and regional client inquiries. We synchronize localized name-address-phone tags, optimize Google Business coordinates, and capture high-intent map rankings.",
        kpis: [
          { label: "LOCAL MAP POSITIONS", value: "Top 3" },
          { label: "PHONE CLICK ACCELERATION", value: "48", suffix: "%" },
          { label: "CITATIONS SYNCED", value: "100" }
        ],
        deliverables: [
          "Google Business Profile optimization files",
          "Consistent localized reference logs",
          "Localized structured location schema scripts",
          "Monthly map query click metrics"
        ]
      }
    ]
  },
  {
    title: "Digital Advertising",
    description: "Multi-channel PPC actions scaling budgets over strict target ROAS rules across Google, Meta, and Programmatic networks.",
    key: "digital-advertising",
    items: [
      {
        name: "PPC Management Services",
        shortDesc: "Optimize targeted Google Search campaigns to remove ad wastage, using smart bid thresholds.",
        longDesc: "Ensure maximum efficiency for your media spend. We design precision keyword auctions, exclude low-converting search terms, and implement responsive click-through copy configurations.",
        kpis: [
          { label: "ROAS INCREASE", value: "4.2x" },
          { label: "CPA DECREASE", value: "-28", suffix: "%" },
          { label: "AUCTION ADVANTAGE", value: "90", suffix: "%" }
        ],
        deliverables: [
          "Keyword bidding matrix structures",
          "Ad testing copy frameworks",
          "Dynamic negative keyword exclude files",
          "MarketingCloudFX conversion metrics link"
        ]
      },
      {
        name: "Enterprise PPC Management Services",
        shortDesc: "Scale million-dollar global paid campaigns using automated bid ceilings and strict segmentations.",
        longDesc: "Control global media buy accounts with confidence. We implement programmatic ad adjustments matching real-time CRM lead stage values to protect CAC metrics.",
        kpis: [
          { label: "CROSS-REGION ACCOUNTS", value: "12", suffix: "+" },
          { label: "AUTOMATION ACCURACY", value: "99.9", suffix: "%" },
          { label: "BUDGET VELOCITY LIFT", value: "3.5x" }
        ],
        deliverables: [
          "Global programmatic campaign frameworks",
          "Target CPA automated adjustment parameters",
          "Multi-national spend scenario planners",
          "Quarterly corporate ROAS summary reports"
        ]
      },
      {
        name: "Google Local Services Ads Management",
        shortDesc: "Gain regional Google Screened badges and capture highly qualified nearby inquiries quickly.",
        longDesc: "Establish high localized brand authority. We guide local businesses through licensing checks, request Google Screened marks, and manage pay-per-lead spend options.",
        kpis: [
          { label: "APPROVAL RATIO", value: "100", suffix: "%" },
          { label: "COST-PER-LEAD LIFT", value: "-34", suffix: "%" },
          { label: "CREDENTIAL VERIFICATION", value: "Active" }
        ],
        deliverables: [
          "Credential validation assistance",
          "Local pay-per-lead threshold setups",
          "Local customer call tracking configurations",
          "Weekly localized conversion reports"
        ]
      },
      {
        name: "Social Media Advertising",
        shortDesc: "Target high-intent dynamic feeds with custom responsive social media ad creatives.",
        longDesc: "Connect with buyers on Meta, LinkedIn, and TikTok. We design visually striking ad matrices and implement customized demographic tracking to locate qualified leads.",
        kpis: [
          { label: "FEED CTR", value: "4.8", suffix: "%" },
          { label: "CONVERSION LIFT", value: "+38", suffix: "%" },
          { label: "REMARKETING METRICS", value: "Elite" }
        ],
        deliverables: [
          "Responsive ad visual asset files",
          "Target audience demographic mappings",
          "Conversion pixel configuration scripts",
          "Creative performance testing logs"
        ],
        visualElement: "social-likes"
      },
      {
        name: "Enterprise Social Media Advertising",
        shortDesc: "Deliver personalized campaign sequences matching dynamic CRM target account segments.",
        longDesc: "Coordinate complex multi-layered target sequences. We synchronize client remarketing feeds with active CRM lists to show relevant solutions automatically.",
        kpis: [
          { label: "CRM LIST MATCHING", value: "94.2", suffix: "%" },
          { label: "CLOSE RATES LIFT", value: "24", suffix: "%" },
          { label: "DYNAMIC SEGMENTS", value: "150", suffix: "+" }
        ],
        deliverables: [
          "API connection structures to Salesforce/CRMs",
          "Dynamic remarketing flowcharts",
          "Target ad sequence calendars",
          "Monthly B2B return on ad spend maps"
        ]
      },
      {
        name: "Programmatic Advertising Services",
        shortDesc: "Bid on premium private inventory options based on live visitor intent parameters.",
        longDesc: "Skip middleman markups. We leverage DSP configurations to acquire premium visual banner and digital display units inside targeted niche publications.",
        kpis: [
          { label: "CPM SAVINGS", value: "30", suffix: "%" },
          { label: "AUDIENCE ACCURACY", value: "96.5", suffix: "%" },
          { label: "ACQUIRED SITES", value: "50k" }
        ],
        deliverables: [
          "Private Marketplace (PMP) audience lists",
          "Bidding threshold safety models",
          "Responsive multi-device asset layouts",
          "Fraudulent traffic exclusion maps"
        ]
      }
    ]
  },
  {
    title: "Content Marketing",
    description: "Align expertise columns, professional visual copy, and digital story models with organic audience research.",
    key: "content-marketing",
    items: [
      {
        name: "Digital Marketing Services",
        shortDesc: "Unified positioning blueprints matching visual layouts with active search intent indexes.",
        longDesc: "Align all digital channels. We map target market touchpoints, identifying where user queries, social engagement, and content elements support purchase targets.",
        kpis: [
          { label: "CAMPAIGN SYNC", value: "100", suffix: "%" },
          { label: "ORGANIC ENGAGEMENT", value: "+45%" },
          { label: "BRAND TRUST INDEX", value: "9.8/10" }
        ],
        deliverables: [
          "12-month multi-channel marketing blueprint",
          "Target customer segment profiles",
          "Competitor visual positioning audits",
          "Integrated KPI reporting dashboard"
        ]
      },
      {
        name: "Content Marketing Services",
        shortDesc: "Formulate systematic editorial calendars and author authoritative, SEO-friendly columns.",
        longDesc: "Transform search traffic into leads. We research semantic gaps, identifying the specific informational queries your prospective clients use before making a purchase.",
        kpis: [
          { label: "ORGANIC ARTICLE SHARES", value: "1,200", suffix: "+" },
          { label: "SEO TRAFFIC VALUE LIFT", value: "+180%" },
          { label: "CONTENT GAINS", value: "Excellent" }
        ],
        deliverables: [
          "SEO semantic gap opportunity matrix",
          "Authoritative editorial calendar schemas",
          "Full-funnel helpful insight drafts",
          "Monthly content ROI metrics"
        ],
        visualElement: "teal-circle-bulb"
      },
      {
        name: "Website Copywriting",
        shortDesc: "Persuasive and clear copywriting designed to optimize landing page conversion activities.",
        longDesc: "Avoid boring, low-converting sentences. We craft copy focusing on human clarity, technical truth, and strong call-to-action triggers that increase conversion yields.",
        kpis: [
          { label: "LANDING CTR LIFT", value: "24", suffix: "%" },
          { label: "READABILITY SCORE", value: "Grade 8" },
          { label: "MESSAGE COMPLIANCE", value: "100", suffix: "%" }
        ],
        deliverables: [
          "High-fidelity conversion copy decks",
          "SEO keyword density evaluations",
          "Responsive button and CTA text maps",
          "A/B heading variant testing files"
        ]
      },
      {
        name: "Social Media Management",
        shortDesc: "Post high-relevance visual updates to drive organic community interactions, steadily.",
        longDesc: "Develop continuous brand equity. We manage, design, and sequence consistent posts that engage target audiences and prompt positive social dialogue.",
        kpis: [
          { label: "COMMUNITY GROWTH", value: "32", suffix: "%" },
          { label: "ACTIVE ENGAGEMENTS", value: "+115%" },
          { label: "REPLY COMPLIANCE", value: "<15m" }
        ],
        deliverables: [
          "Monthly brand content calendar boards",
          "Bespoke visual graphic posts templates",
          "Community message engagement responses",
          "Monthly organic reach progress maps"
        ]
      },
      {
        name: "Infographics & Motion Graphics",
        shortDesc: "Create visually engaging diagrams and vectors that explain complex software concepts clearly.",
        longDesc: "Simplify complex technical points. We produce stunning graphics, responsive charts, and bite-sized explainer video files to decrease user exit rates.",
        kpis: [
          { label: "USER ON-PAGE DURATION", value: "+40", suffix: "%" },
          { label: "LINK EMBED GRAPHICS", value: "240", suffix: "+" },
          { label: "VIRAL RECOGNITION", value: "High" }
        ],
        deliverables: [
          "High-definition infographic vector files",
          "Animated motion asset sequences",
          "Product dashboard visualization graphics",
          "Embed code integration scripts"
        ]
      },
      {
        name: "Connected TV & OTT",
        shortDesc: "Deploy video campaigns targeting premium digital streaming applications, precisely.",
        longDesc: "Deliver messaging directly to the living room. We manage streaming video ads, targeting local demographic sectors with strict budget controls.",
        kpis: [
          { label: "VIDEO COMPLETE RATIO", value: "96.8", suffix: "%" },
          { label: "BRAND RECALL LIFT", value: "34", suffix: "%" },
          { label: "HOUSEHOLD TARGETS", value: "150k" }
        ],
        deliverables: [
          "Premium CTV platform campaign maps",
          "Household geographic allocation blueprints",
          "Video playback tracker scripts",
          "Cross-device brand lift evaluations"
        ]
      }
    ]
  },
  {
    title: "Expertise",
    description: "Review our historic organic results, conversational search data, and AI overview research.",
    key: "expertise",
    items: [
      {
        name: "Our SEO Results",
        shortDesc: "Explore verified analytics data showcasing long-term growth across our active client domains.",
        longDesc: "True scale is proven by hard organic charts. We share real, authenticated case statistics across highly competitive fields like B2B SaaS and enterprise marketplaces.",
        kpis: [
          { label: "ORGANIC VISITS GAINED", value: "54M", suffix: "+" },
          { label: "CLIENT DOMAIN LIFTS", value: "4.8x" },
          { label: "ROI ASSURANCE", value: "100", suffix: "%" }
        ],
        deliverables: [
          "Anonymized high-accuracy client data files",
          "Organic keywords visibility indices",
          "Historic ranking improvement progression",
          "Third-party audited organic reports"
        ]
      },
      {
        name: "Our SEO Case Studies",
        shortDesc: "Deep-dive interviews detailing exactly how we aligned CRM structures to deliver organic revenue.",
        longDesc: "Get inside the machinery. We document the precise canonical modifications, crawl budgets, and content structures that drove verified business outcomes.",
        kpis: [
          { label: "CASE STUDIES", value: "45", suffix: "+" },
          { label: "AUDITED COMPANIES", value: "Fortune 500" },
          { label: "METHOD METRICS", value: "Verified" }
        ],
        deliverables: [
          "Full methodology explanation files",
          "Attributed client lead charts",
          "Workflow integration playbooks",
          "Technical code optimization references"
        ]
      },
      {
        name: "Our OmniSEO® Approach",
        shortDesc: "Detailed breakdown of our proprietary, conversion-focused organic marketing framework.",
        longDesc: "Understand our unique operational model. OmniSEO® bridges technical SEO, programmatic optimization, and custom conversion paths to optimize for revenue, not just traffic.",
        kpis: [
          { label: "CRM REVENUE LINK", value: "Active" },
          { label: "GUARANTEED PROGRESS", value: "120", suffix: " days" },
          { label: "STANDARDS CERTIFIED", value: "Yes" }
        ],
        deliverables: [
          "OmniSEO® system architecture charts",
          "Conversion pipeline schema models",
          "Onboarding operational timelines",
          "Service SLA contract outlines"
        ]
      },
      {
        name: "Research: Conversational Search",
        shortDesc: "Quarterly research analyzing demographic transitions toward conversational AI search engines.",
        longDesc: "Keep your brand ready for upcoming changes. Our research group monitors shifts in how buyers use conversational platforms instead of classic search grids.",
        kpis: [
          { label: "SAMPLED USERS", value: "15k" },
          { label: "Conversational Shifts", value: "tracked" },
          { label: "LLM PREFERENCE", value: "OpenAI/Google" }
        ],
        deliverables: [
          "Conversational query dataset analysis",
          "Generational user search behavior files",
          "Generative response ranking summaries",
          "Upcoming keyword forecast matrices"
        ]
      },
      {
        name: "Research: AI Overviews",
        shortDesc: "Studies detailing search snippet click-through adjustments under Google's AI Overview panels.",
        longDesc: "Navigate snippet structures successfully. We measure click redirection rates under Google's generative summary boxes to keep your traffic flows stable.",
        kpis: [
          { label: "SOCIETY IMPACT", value: "High" },
          { label: "SAMPLED OUTCOMES", value: "250k" },
          { label: "CLICK THROUGH RATIO", value: "Stable" }
        ],
        deliverables: [
          "Snippet citation click volume studies",
          "Generative layout visibility benchmarks",
          "AI Overview schema optimization guides",
          "Target search term layout templates"
        ]
      },
      {
        name: "Research: AI Search Trends",
        shortDesc: "Quarterly tracking charts outlining conversational tools market share and search behavior shifts.",
        longDesc: "Stay ahead of digital disruption. We monitor changes in search market shares, feature introductions, and algorithmic indexing rules to protect your traffic.",
        kpis: [
          { label: "MARKET DYNAMIC", value: "Quarterly" },
          { label: "TRACKED ENGINES", value: "12" },
          { label: "ALGORITHMIC INDEX", value: "99.2", suffix: "%" }
        ],
        deliverables: [
          "AI search landscape comparative studies",
          "Algorithmic index capability indexes",
          "Forward marketing threat evaluation summaries",
          "Monthly core SEO adjustment guides"
        ]
      }
    ]
  }
];

export default function OmniSEOPage({ 
  onGraderClick, 
  onServicesClick,
  selectedSubPageItem,
  setSelectedSubPageItem
}: OmniSEOPageProps) {
  const [keywordVolume, setKeywordVolume] = useState(10000);
  const [activeTab, setActiveTab] = useState('raw-traffic');
  const [activeCategoryTab, setActiveCategoryTab] = useState('ai-search-visibility');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync active tab if a submenu is selected
  useEffect(() => {
    if (selectedSubPageItem) {
      const parentCat = OMNISEO_CATEGORIES_DATA.find(cat => 
        cat.items.some(it => it.name.toLowerCase() === selectedSubPageItem.toLowerCase())
      );
      if (parentCat) {
        setActiveCategoryTab(parentCat.key);
      }
    }
  }, [selectedSubPageItem]);

  // Find currently selected subservice item
  const allItems = OMNISEO_CATEGORIES_DATA.flatMap(cat => 
    cat.items.map(it => ({ ...it, categoryTitle: cat.title, categoryKey: cat.key }))
  );
  const currentItem = selectedSubPageItem 
    ? allItems.find(it => it.name.toLowerCase() === selectedSubPageItem.toLowerCase())
    : null;

  const handleRewrite = (name: string) => {
    if (setSelectedSubPageItem) {
      setSelectedSubPageItem(name);
    }
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleSlaRegister = (name: string) => {
    setToastMessage(`SLA Pricing Estimate logged for Alkhawarizmi ${name} pathway! Custom blueprint dispatched in under 24h.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Forecast calculator outcomes
  const getForecastMetrics = (volume: number) => {
    const rawClicks = Math.floor(volume * 0.35); // average position 1 CTR is 35%
    const searchInquiries = Math.floor(rawClicks * 0.024); // 2.4% standard conversion rate

    // Under OmniSEO® optimization framework, we boost conversion rate to 5.8% average
    const omniInquiries = Math.floor(rawClicks * 0.058);
    const growthDelta = omniInquiries - searchInquiries;
    const valueForecast = growthDelta * 350; // $350 average contract value

    return { rawClicks, searchInquiries, omniInquiries, growthDelta, valueForecast };
  };

  const forecast = getForecastMetrics(keywordVolume);

  return (
    <div id="omniseo-page" className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans select-none">
      
      {/* Toast Alert Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4"
          >
            <div className="bg-[#000000] text-white p-4 rounded-2xl shadow-2xl border border-teal-500/35 flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-teal-400 shrink-0 mt-0.5 animate-bounce" />
              <div className="flex-1 text-xs">
                <span className="font-bold text-[#ff8c00] block mb-0.5">AL KHAWARIZMI SECURE REGISTRY</span>
                <p className="font-medium text-slate-200">{toastMessage}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#000000] to-[#011430] text-white py-14 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#ff8c00]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-mono text-[#ff8c00] font-bold">
                <Search className="h-4 w-4" />
                <span>ALGORITHMIC WEB PLACEMENTS</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-none text-white">
                SEO Designed for <span className="text-[#ff8c00]">Revenue®</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-sans">
                Most SEO agencies optimize for arbitrary traffic impressions. Alkhawarizmi OmniSEO® maps organic keyword pipelines to live CRM conversion records, guaranteeing that every click directly drives pipeline value.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={onGraderClick}
                  className="cursor-pointer bg-[#ff8c00] hover:bg-[#e07b00] text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                  Analyze My Website
                </button>
                <button
                  onClick={onServicesClick}
                  className="cursor-pointer bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all text-center"
                >
                  Interactive Pricing Model
                </button>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-6 pt-5 border-t border-white/10 max-w-lg">
                <div>
                  <span className="block text-xl sm:text-2xl font-mono font-black text-[#ff8c00]">120d</span>
                  <span className="block text-[10px] text-slate-400 mt-1 font-medium">SLA Page-1 Guarantee</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-mono font-black text-white">2.4M+</span>
                  <span className="block text-[10px] text-slate-400 mt-1 font-medium">Ranked Keywords</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-mono font-black text-white">$1.2B</span>
                  <span className="block text-[10px] text-slate-400 mt-1 font-medium">Client Revenue Audited</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Box */}
            <div className="lg:col-span-4 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff8c00]/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <span className="text-[9px] font-mono tracking-widest text-[#ff8c00] uppercase font-bold block">OMNISEO ENGINE STATUS</span>
                <h3 className="text-lg font-bold text-white mt-1">Multi-model Auditing Active</h3>
                <p className="text-slate-400 text-[11px] mt-1">Dynamic indexing checks across Perplexity, Google Overviews and Claude citation nodes are active.</p>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-[11px] font-mono text-teal-300 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">OpenAI Search citing checks</span>
                    <span className="text-emerald-400 font-bold">Live</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Google Core algorithm trackers</span>
                    <span className="text-emerald-400 font-bold">Stable</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Semantic schema validation</span>
                    <span className="text-emerald-400 font-bold">Optimal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Crawl budget allocation check</span>
                    <span className="text-emerald-400 font-bold">Sync</span>
                  </div>
                </div>
              </div>

              <div className="text-center p-2.5 rounded-xl bg-[#ff8c00]/10 border border-[#ff8c00]/20 text-[10px] text-[#ff8c00] font-sans font-medium">
                💡 Syncing organic attribution straight with your Nutshell Smart CRM.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Corporate Dashboard Interface */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Dynamic routing and detail view context switcher */}
        <AnimatePresence mode="wait">
          {currentItem ? (
            <motion.div
              key="subpage-detail-omniseo"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              {/* Return link breadcrumbs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                <button
                  onClick={() => setSelectedSubPageItem && setSelectedSubPageItem(null)}
                  className="cursor-pointer inline-flex items-center gap-2 hover:bg-slate-50 border border-slate-200 hover:text-slate-900 text-slate-600 px-4 py-2 text-xs font-bold rounded-xl transition-all w-max font-sans"
                >
                  <ArrowLeft className="h-4 w-4 text-[#ff8c00]" />
                  <span>Return to OmniSEO® Console</span>
                </button>
                <div className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                  OMNISEO-HUB / {currentItem.categoryTitle} / {currentItem.name}
                </div>
              </div>

              {/* Service details grid split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left profile descriptors */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                  
                  {/* Headline item */}
                  <div className="space-y-3 pb-5 border-b border-slate-100">
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#000000]/5 text-[#000000] text-[10px] font-mono font-bold uppercase">
                      <Search className="h-3.5 w-3.5 text-[#ff8c00]" />
                      <span>{currentItem.categoryTitle} Solution Spec</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-sans font-black text-[#000000] tracking-tight">{currentItem.name}</h2>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed font-sans">{currentItem.longDesc}</p>
                  </div>

                  {/* Core metric benchmarks */}
                  <div className="grid grid-cols-3 gap-4">
                    {currentItem.kpis.map((kpi, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                        <span className="text-[9px] font-mono text-slate-400 uppercase font-black block">{kpi.label}</span>
                        <span className="text-base sm:text-lg font-mono font-black text-slate-800 mt-1 block">
                          {kpi.value}{kpi.suffix}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables lists */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-slate-950 uppercase tracking-widest font-black">Contractual Deliverables & SLA Milestones</h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {currentItem.deliverables.map((deliv, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start p-3 bg-slate-50 border border-slate-150 rounded-xl">
                          <CheckCircle className="h-4.5 w-4.5 text-teal-600 shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-700 font-sans font-medium">{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing conversion CTA */}
                  <div className="bg-gradient-to-br from-[#011430] to-[#000000] p-5 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
                    <div className="space-y-1 text-center sm:text-left">
                      <span className="text-[9px] font-mono text-teal-400 uppercase font-bold">ALKHAWARIZMI PERFORMANCE AGREEMENT</span>
                      <h4 className="text-sm font-bold font-sans">Request personalized SLA pricing matrix</h4>
                      <p className="text-[10px] text-slate-300">Secure 100% money-back search position and inquiry guarantees.</p>
                    </div>
                    <button
                      onClick={() => handleSlaRegister(currentItem.name)}
                      className="cursor-pointer bg-[#ff8c00] hover:bg-[#e07b00] text-white text-xs font-black px-5 py-3 rounded-xl shadow-lg transition-transform active:scale-95 shrink-0"
                    >
                      Request SLA Pricing Blueprint
                    </button>
                  </div>

                </div>

                {/* Right Visual Sandbox Display */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Render specified requested visual presets */}
                  {currentItem.visualElement === 'hand-circle' && (
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#ff8c00] font-bold block">SPECIFIED DESIGN ASSET: USER INTERACTION RADAR</span>
                      <p className="text-[11px] text-slate-500">Below is the requested blue hand outline touching a concentric circle, mapping generative LLM user query boundaries:</p>
                      
                      {/* Outline of a blue hand icon touching a circle */}
                      <div className="h-48 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                        
                        {/* Layered Concentric Circles */}
                        <div className="absolute w-40 h-40 rounded-full border border-dashed border-blue-200" />
                        <div className="absolute w-28 h-28 rounded-full border border-blue-300 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full border-2 border-dashed border-blue-400 flex items-center justify-center bg-blue-50">
                            {/* Inner core circle */}
                            <div className="w-6 h-6 rounded-full bg-blue-600 animate-pulse" />
                          </div>
                        </div>

                        {/* Blue outline hand cursor touching circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1 translate-y-2 text-[#000000] animate-[pulse_2s_infinite]">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 text-blue-700 drop-shadow-md">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.59 1.59 0 1 0-3.18 0v8.603L5.43 11.23a1.583 1.583 0 0 0-2.238 2.235l3.824 3.825a6.37 6.37 0 0 0 4.5 1.86h2.522a6.37 6.37 0 0 0 4.5-1.86l4.47-4.47a1.59 1.59 0 1 0-2.25-2.25l-.105.105V4.575a1.59 1.59 0 1 0-3.18 0v4.77H13.23V4.575a1.59 1.59 0 1 0-3.18 0v4.77H10.05V4.575Z" />
                          </svg>
                        </div>

                        {/* Ping radar effect at touchpoint */}
                        <div className="absolute top-[52%] left-[51%] w-6 h-6 rounded-full border border-blue-500 animate-ping opacity-75 pointer-events-none" />

                      </div>

                      <div className="text-[10px] font-sans text-slate-500 text-center leading-normal">
                        💡 Concentric rings represent target indexing priorities: Core Database, Citation Layer and LLM response widget.
                      </div>
                    </div>
                  )}

                  {currentItem.visualElement === 'social-likes' && (
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#ff8c00] font-bold block">SPECIFIED DESIGN ASSET: FEED ENGAGEMENT METRIC</span>
                      <p className="text-[11px] text-slate-500">Below is the requested social media likes component showing a glowing heart and thumbs-up visual:</p>
                      
                      {/* Social media likes icon with heart and thumbs up */}
                      <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center relative">
                        
                        {/* Floating Feed Box */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-4 w-full max-w-[240px] space-y-3 relative overflow-hidden">
                          <div className="flex gap-2.5 items-center">
                            <div className="w-7 h-7 rounded-full bg-[#000000] flex items-center justify-center text-white text-[9px] font-black">
                              ALK
                            </div>
                            <div>
                              <span className="text-[11px] font-bold text-slate-800 block leading-tight">Alkhawarizmi Enterprise</span>
                              <span className="text-[8.5px] font-mono text-slate-400 block leading-none">Paid social funnel active</span>
                            </div>
                          </div>

                          <div className="text-[10.5px] text-slate-600 font-medium">
                            Secured over 48% click-through improvements on Meta feeds using dynamic demographic keyword mapping schemas.
                          </div>

                          {/* Likes interaction row with specified heart & thumbs up */}
                          <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                            <div className="flex items-center gap-1">
                              
                              {/* Glowing Red Heart */}
                              <div className="w-7 h-7 rounded-full bg-pink-100 border border-pink-300 flex items-center justify-center cursor-pointer hover:scale-115 active:scale-90 transition-transform text-pink-600">
                                <span className="text-xs leading-none">❤️</span>
                              </div>

                              {/* Glowing Blue Thumbs Up */}
                              <div className="w-7 h-7 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center cursor-pointer hover:scale-115 active:scale-90 transition-transform text-blue-600">
                                <span className="text-xs leading-none">👍</span>
                              </div>

                            </div>

                            <span className="text-[10px] font-mono font-black text-slate-500">
                              +8,450 Likes
                            </span>
                          </div>

                        </div>

                      </div>

                      <div className="text-[10px] font-sans text-slate-500 text-center leading-normal">
                        💡 Dynamic social interactions secure algorithmic feed push, uplifting secondary organic search indexes.
                      </div>
                    </div>
                  )}

                  {currentItem.visualElement === 'teal-circle-bulb' && (
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#ff8c00] font-bold block">SPECIFIED DESIGN ASSET: CREATIVE BRAINSTORM SHAPE</span>
                      <p className="text-[11px] text-slate-500">Below is the requested combination of a glowing teal circle container aligned with a neon blue lightbulb silhouette:</p>
                      
                      {/* Teal circle and blue lightbulb shapes */}
                      <div className="h-44 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center relative overflow-hidden text-white">
                        <div className="absolute inset-0 bg-[radial-gradient(#155e75_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
                        
                        {/* Layout grid overlaying the specified elements */}
                        <div className="relative flex items-center justify-center gap-8">
                          
                          {/* Glowing Teal Circle container */}
                          <div className="w-20 h-20 rounded-full bg-teal-500/10 border-2 border-teal-400 flex items-center justify-center relative shadow-[0_0_24px_rgba(20,184,166,0.25)] animate-pulse">
                            <span className="text-[10px] font-mono text-teal-300 uppercase tracking-wider font-extrabold">CREATIVE</span>
                            <div className="absolute inset-1.5 border border-dashed border-teal-300/30 rounded-full pointer-events-none" />
                          </div>

                          {/* Plus sign divider */}
                          <span className="text-slate-500 font-mono text-sm">+</span>

                          {/* Neon Blue Lightbulb Shape container */}
                          <div className="w-20 h-20 rounded-xl bg-blue-500/10 border-2 border-blue-400 flex items-center justify-center relative shadow-[0_0_24px_rgba(59,130,246,0.25)] group select-none">
                            
                            {/* SVG representing organic corporate blue lightbulb silhouette */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)] animate-bounce">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v3m0 0h.01M12 21h-.01m0-3h3.58a2.25 2.25 0 0 0 2.228-2.606l-1.025-5.974a6 6 0 0 0-11.564 0l-1.025 5.974A2.25 2.25 0 0 0 8.42 18H12Zm0-12V6m0 0h.01M12 6h-.01" />
                            </svg>

                            {/* Tiny filament glowing core */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-400 blur-sm rounded-full mix-blend-screen pointer-events-none opacity-50" />
                          </div>

                        </div>

                      </div>

                      <div className="text-[10px] font-sans text-slate-500 text-center leading-normal">
                        💡 Highlighting how the combination of scientific organic analysis (teal) and rapid creative campaign insights (blue bulb) drive SEO share value.
                      </div>
                    </div>
                  )}

                  {/* Standard simulation info card if no visual presets */}
                  {!currentItem.visualElement && (
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#000000] font-bold block">OMNISEO METRICS ASSURANCE</span>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        This service leverages native CRM-linked organic queries to prevent search drops. We guarantee to execute automated weekly visual checks, preserving target ranking stability securely.
                      </p>
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-150 space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 block">// Service Status Parameters</span>
                        <div className="flex justify-between text-xs text-slate-700 font-bold">
                          <span>SLA Verification Duration</span>
                          <span className="font-mono text-[#000000]">120-Day Money Back</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-700 font-bold">
                          <span>Integration Layer</span>
                          <span className="font-mono text-[#000000]">Rest API Webhook</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="main-overview-omniseo"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              
              {/* Directory Filter tabs */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 border-b border-slate-200 pb-6">
                <div className="max-w-xl text-center lg:text-left">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ff8c00] font-bold">PORTFOLIO INDEX</span>
                  <h2 className="text-2xl sm:text-3xl font-sans font-black text-[#000000] tracking-tight">OmniSEO® Solutions Matrix</h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">Select from our 24 integrated AI-search, copywriting, digital ads, and research tracks to load deep interactive documentation dashboards instantly.</p>
                </div>

                {/* Categories toggle row */}
                <div className="flex flex-wrap bg-slate-100 border border-slate-200 p-1.5 rounded-2xl gap-1">
                  {OMNISEO_CATEGORIES_DATA.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategoryTab(cat.key)}
                      className={`cursor-pointer px-3.5 py-2.5 text-xs font-black rounded-xl transition-all ${
                        activeCategoryTab === cat.key 
                          ? 'bg-[#000000] text-white shadow-md' 
                          : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                      }`}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid representation of chosen Category */}
              <div>
                {OMNISEO_CATEGORIES_DATA.filter(cat => cat.key === activeCategoryTab).map((category) => (
                  <div key={category.key} className="space-y-6">
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm text-center sm:text-left">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#ff8c00] font-black">{category.title} Domain Matrix</span>
                      <h4 className="text-lg font-bold text-[#000000] mt-1 pr-12">{category.title} Suite</h4>
                      <p className="text-xs text-slate-500 mt-1.5 max-w-2xl leading-relaxed">{category.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.items.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleRewrite(item.name)}
                          className="group cursor-pointer bg-white border border-slate-200 hover:border-[#ff8c00]/40 p-5 rounded-2xl transition-all hover:shadow-xl hover:scale-[1.01] flex flex-col justify-between h-52 duration-200"
                        >
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <span className="px-2 py-0.5 bg-slate-50 rounded text-[9px] font-mono text-slate-400 uppercase font-black">SLA TRACK {idx + 1}</span>
                              <ChevronRight className="h-4 w-4 text-slate-350 group-hover:text-[#ff8c00] transition-colors" />
                            </div>

                            <div className="space-y-1">
                              <h4 className="text-xs sm:text-sm font-sans font-black text-slate-950 tracking-tight group-hover:text-[#ff8c00] transition-colors">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-slate-600 leading-normal line-clamp-3">
                                {item.shortDesc}
                              </p>
                            </div>
                          </div>

                          <span className="text-[10px] font-mono font-bold text-[#000000] group-hover:underline block border-t border-slate-100 pt-2 text-right">
                            Open specification &gt;
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>
                ))}
              </div>

              {/* Dynamic ROI SEO forecasts slider tool */}
              <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-6 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/[0.01] rounded-full blur-3xl pointer-events-none" />
                
                <div className="border-b border-slate-100 pb-6 mb-8 text-center sm:text-left">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ff8c00] font-bold block mb-2">INTELLIGENT SEO FORECASTER</span>
                  <h2 className="text-2xl sm:text-3xl font-sans font-black text-[#000000] tracking-tight">Predict Organic Revenue Uplifts</h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">Adjust monthly target query search volumes to model organic conversions under Alkhawarizmi methodologies.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left inputs */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold font-sans text-slate-700">
                        <span>Target Keyword Volume</span>
                        <span className="font-mono text-[#000000] text-sm">{keywordVolume.toLocaleString()} searches/mo</span>
                      </div>
                      <input
                        type="range"
                        min="5000"
                        max="100000"
                        step="5000"
                        value={keywordVolume}
                        onChange={(e) => setKeywordVolume(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000000] focus:outline-none"
                      />
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-1.5 font-sans font-medium text-slate-600">
                      <div className="flex justify-between">
                        <span>Est. Clicks (Page 1 Position 1 Average):</span>
                        <span className="text-slate-800 font-bold font-mono">{forecast.rawClicks.toLocaleString()} views</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Attributed Contract Value base:</span>
                        <span className="text-green-600 font-bold font-mono">$350 avg</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Comparisons */}
                  <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Standard SEO (No CRO)</span>
                          <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[9px] font-mono font-medium">2.4% CR</span>
                        </div>
                        <span className="text-xl font-black text-slate-500 block mt-1">{forecast.searchInquiries} inquiries/mo</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-sans mt-4 leading-normal">
                        Drives raw search query views to unoptimized generic site layouts, experiencing high exit rates and low leads rates.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-[#ff8c00]/30 shadow-md flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-[#ff8c00]/5 rounded-full blur-xl" />
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[9px] font-mono text-[#ff8c00] uppercase font-bold">Alkhawarizmi OmniSEO®</span>
                          <span className="px-1.5 py-0.5 bg-emerald-50 rounded text-[9px] font-mono text-[#ff8c00] font-bold">5.8% CRED</span>
                        </div>
                        <span className="text-xl font-black text-green-600 block mt-1">{forecast.omniInquiries} inquiries/mo</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-sans mt-4 leading-normal">
                        <span className="font-bold text-slate-800 block">+{forecast.growthDelta} extra customer calls</span>
                        Driven by technical search tag injection combined with tailored conversion rates optimizations.
                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Bottom Banner */}
        <div className="bg-gradient-to-r from-[#000000] to-[#ff8c00] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-10 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-3 max-w-xl text-center sm:text-left">
            <span className="text-xs font-mono tracking-widest text-[#ff8c00] font-bold uppercase">SECURE PLACEMENT VELOCITY</span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight font-sans">Index Your Brand inside Generative AI.</h3>
            <p className="text-slate-200 text-xs">Run our proprietary crawler audit dynamically to target conversion friction blockages in under 60 seconds.</p>
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
