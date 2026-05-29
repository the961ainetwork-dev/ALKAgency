import React, { useState, useEffect } from 'react';
import { 
  Target, TrendingUp, CheckCircle, ShieldAlert, ArrowRight, Zap, RefreshCw, BarChart2, Star, Award, MousePointer, Shield, Check, Eye, Percent, Users, Layout, ChevronRight, FileText, Settings, HelpCircle, Activity, Globe, ArrowLeft, Mail, Database, ShoppingBag, Landmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RevenueMarketingPageProps {
  onGraderClick: () => void;
  onServicesClick: () => void;
  selectedSubPageItem?: string | null;
  setSelectedSubPageItem?: (item: string | null) => void;
}

interface SubserviceItem {
  name: string;
  shortDesc: string;
  longDesc: string;
  kpis: { label: string; value: string; suffix?: string }[];
  deliverables: string[];
  visualElement?: 'green-plus' | 'finger-buy' | 'b2b-node';
}

interface RevenueCategory {
  title: string;
  description: string;
  key: string;
  items: SubserviceItem[];
}

const REVENUE_CATEGORIES_DATA: RevenueCategory[] = [
  {
    title: "Digital Intelligence",
    description: "Multi-touch web telemetry and analytics modeling prioritizing absolute revenue value over raw traffic impressions.",
    key: "digital-intelligence",
    items: [
      {
        name: "Web Channel Call Tracking",
        shortDesc: "Attribute offline telephone inquiries directly to ad campaigns, search queries, and specific web referrer coordinates.",
        longDesc: "Never let offline sales escape your attribution ledger. Web Channel Call Tracking dynamically injects tracking proxies to map inbound client calls straight to custom CPC keywords, resolving client source coordinates instantly.",
        kpis: [
          { label: "MAPPED ATTRIBUTION", value: "99.8", suffix: "%" },
          { label: "CAC SAVINGS", value: "28", suffix: "%" },
          { label: "ROAS RESOLVER", value: "10x" }
        ],
        deliverables: [
          "Dynamic Number Insertion (DNI) setup scripts",
          "Keyword-to-call matching logs mapping engine",
          "Nutshell CRM lead routing synchronization pipelines",
          "Interactive dashboard for telephone revenue records"
        ]
      },
      {
        name: "Media Mixed Modeling Services",
        shortDesc: "Advanced multi-channel statistical models analyzing direct and indirect media impacts on corporate revenue loops.",
        longDesc: "Optimize budget allocation using econometric analysis. Media Mixed Modeling (MMM) strips out seasonal noise to define actual linear revenue lifts from each paid marketing branch.",
        kpis: [
          { label: "MODEL ACCURACY", value: "96.4", suffix: "%" },
          { label: "OPTIMIZED LIFT", value: "18", suffix: "%" },
          { label: "DECISION LATENCY", value: "Real-time" }
        ],
        deliverables: [
          " econometrics regression modeling layout",
          "Multi-year historic attribution weight matrix",
          "Quarterly media scenario optimizer workbook",
          "Interactive spend simulation panel"
        ]
      },
      {
        name: "Channel Attribution & Forecasting",
        shortDesc: "Forecast client conversion trajectories and revenue yields across multiple acquisition touchpoints.",
        longDesc: "Stop throwing resources at first-touch references blindly. Command linear, decay, and position-based data trails to predict precisely where next month's growth thresholds reside.",
        kpis: [
          { label: "FORECAST HORIZON", value: "12", suffix: " mo" },
          { label: "DATA CONGRUENCY", value: "99.2", suffix: "%" },
          { label: "PIPELINE LIFT", value: "3.2x" }
        ],
        deliverables: [
          "Multi-touch allocation framework installation",
          "Markov-Chain algorithmic weights setup",
          "Monthly channel velocity forecast sheets",
          "Automatic variance exception reports"
        ]
      },
      {
        name: "Digital Marketing Competitor Analysis",
        shortDesc: "Expose competitor ad investments, target bid keywords, and landing layout techniques.",
        longDesc: "Gain tactical marketing supremacy. We audit competitive domains, extracting exact paid spend indicators and conversion funnel strategies to locate open marketing gaps.",
        kpis: [
          { label: "COMPETITORS SCRAPED", value: "25", suffix: "+" },
          { label: "BID HOLE DETECTION", value: "880", suffix: " terms" },
          { label: "INTELLIGENCE DEPTH", value: "Daily" }
        ],
        deliverables: [
          "Competitor keyword bid matrix mapping",
          "Ad copy and custom CTA layout audit files",
          "Backlink authority profile comparison",
          "Weekly tactical threat logs"
        ]
      },
      {
        name: "Private Equity Due Diligence",
        shortDesc: "Rigorous digital diagnostics assessing organic potential, speed index values and marketing liabilities of target targets.",
        longDesc: "Perform uncompromising digital audits before issuing acquisition letters. We evaluate CMS liabilities, tracking setups, and domain penalties to model actual purchase yields.",
        kpis: [
          { label: "AUDIT CHECKPOINTS", value: "150", suffix: "+" },
          { label: "PRE-BUY ASSURANCE", value: "100", suffix: "%" },
          { label: "RISK REDUCTION", value: "3.5x" }
        ],
        deliverables: [
          "Core Web Vitals and performance benchmarks",
          "Organic SEO durability vulnerability index",
          "Attributable revenue verification ledger",
          "3-year growth scaling timeline model"
        ]
      }
    ]
  },
  {
    title: "Revenue Operations",
    description: "Align internal metrics, database schemas, and digital interfaces with physical lead conversions and checkout flows.",
    key: "revenue-operations",
    items: [
      {
        name: "Conversion Rate Optimization",
        shortDesc: "Remove user action friction to consistently elevate purchase conversions and customer inquiry yields.",
        longDesc: "CRO is the master link of paid channel scaling. We rewrite structural grids, increase target tap sizes, and simplify sign-up parameters to deliver maximum pipeline output.",
        kpis: [
          { label: "AVERAGE LIFT", value: "114", suffix: "%" },
          { label: "TEST SPEED", value: "7", suffix: " days" },
          { label: "FRICTION REDUCTION", value: "45" }
        ],
        deliverables: [
          "Continuous multi-variant experiment setup",
          "Mouse scroll and dynamic click mapping audit",
          "Forms checkout optimization script files",
          "Monthly progress comparison matrices"
        ],
        visualElement: "green-plus"
      },
      {
        name: "Landing Pages & Funnels",
        shortDesc: "Design stateful high-speed visual pages featuring highly-converting action cues.",
        longDesc: "Funnels must be lightning-fast and responsive. We compile optimized landing architectures featuring clean Inter titles and sticky desktop conversion cards.",
        kpis: [
          { label: "SPEED INDEX", value: "1.2", suffix: "s" },
          { label: "MOBILE DENSITY", value: "Perfect" },
          { label: "FORM CTR", value: "8.4", suffix: "%" }
        ],
        deliverables: [
          "Bespoke mobile-ready template designs",
          "Secure dynamic input forms setup",
          "Integrated speed optimizing parameters",
          "Webhook connection logs to CRM suites"
        ]
      },
      {
        name: "Online Review Acceleration",
        shortDesc: "Trigger high-congruency customer surveys and secure positive public domain ratings automatically.",
        longDesc: "Social proof dictates commercial trust index levels. We automate post-purchase email feedback requests to quickly scale your organic ratings without manual staff time.",
        kpis: [
          { label: "REVIEW LIFT", value: "240", suffix: "%" },
          { label: "RATING INCREASE", value: "0.8" },
          { label: "AUTOMATION RATIO", value: "100", suffix: "%" }
        ],
        deliverables: [
          "Automated ratings survey templates",
          "Multi-channel review acceleration sequences",
          "Google Business listing review triggers",
          "Negative sentiment diversion safeguards"
        ]
      },
      {
        name: "Channel Partner Sales Pipeline Management",
        shortDesc: "Distribute and attribute localized incoming leads to regional distributor networks smoothly.",
        longDesc: "Empower your partner sales structure. Manage incoming customer queries, routing them to nearby regional locations with automated SLA check reminders.",
        kpis: [
          { label: "ROUTING LATENCY", value: "60", suffix: "s" },
          { label: "PARTNER VELOCITY", value: "2.4x" },
          { label: "MAPPED NETWORKS", value: "500", suffix: "+" }
        ],
        deliverables: [
          "Geographic distributor mapping application",
          "Partner-level lead log tracking system",
          "Automatic compliance alert scripts",
          "Localized co-op marketing dashboard portal"
        ]
      },
      {
        name: "Website Personalization",
        shortDesc: "Tailor visual heading blocks and pricing tiers on-the-fly depending on client profile UTM segments.",
        longDesc: "Maximize click values. When enterprise accounts enter, Website Personalization displays customized quotes, enterprise logos, or industry case benchmarks instantly.",
        kpis: [
          { label: "CTR RESPONSE", value: "32", suffix: "%" },
          { label: "VISITOR VELOCITY", value: "2.2x" },
          { label: "DATABASE LOOKUPS", value: "Sub-5ms" }
        ],
        deliverables: [
          "IP reverse DNS lookup setup",
          "Dynamic text block injection framework",
          "UTM source visual state synchronizer",
          "Personalized customer journey analytics"
        ],
        visualElement: "finger-buy"
      }
    ]
  },
  {
    title: "Marketing Automation",
    description: "Convert high-value leads with event-triggered email flows, custom B2B segments, and safe HubSpot/Salesforce integrations.",
    key: "marketing-automation",
    items: [
      {
        name: "Account-Based Marketing Services",
        shortDesc: "Deliver targeted ad sequences and high-fidelity content pathways directly to key enterprise prospects.",
        longDesc: "Command deep-funnel sales deals. We match target buyer profiles to active corporate domains, displaying bespoke ads designed exclusively for decision-makers.",
        kpis: [
          { label: "ACCOUNT PENETRATION", value: "78", suffix: "%" },
          { label: "DEAL SIZE INCREASE", value: "42", suffix: "%" },
          { label: "ATTRIBUTED LIFETIME", value: "5x" }
        ],
        deliverables: [
          "Enterprise key-prospect mapping lists",
          "Target IP-focused paid campaign layouts",
          "Custom corporate-level landing nodes",
          "Nutshell CRM lead scorecard integrations"
        ],
        visualElement: "b2b-node"
      },
      {
        name: "Email Marketing Management",
        shortDesc: "Sequence behavior-responsive automated newsletters and deal follow-ups.",
        longDesc: "Stop blasting email databases blindly. We construct targeted behavioral loops that trigger exactly when client clicks or views specific product sections.",
        kpis: [
          { label: "OPEN RATIO", value: "44.2", suffix: "%" },
          { label: "CLICK RATE LIFT", value: "5.8", suffix: "%" },
          { label: "DELIVERABILITY INDEX", value: "99.4", suffix: "%" }
        ],
        deliverables: [
          "Segmented campaign sequence templates",
          "Responsive HTML newsletter wireframe files",
          "Domain SPF/DKIM/DMARC certificate validation",
          "A/B heading copy split tests reports"
        ]
      },
      {
        name: "Salesforce Marketing Automation",
        shortDesc: "Integrate Salesforce triggers directly into active client acquisition pipelines.",
        longDesc: "Bridge the gap between marketing records and sales pipelines. We construct secure multi-touch webhook flows to map Salesforce lead stages automatically.",
        kpis: [
          { label: "INTEGRATION LATENCY", value: "Instant" },
          { label: "PIPELINE LEAKAGE", value: "0", suffix: "%" },
          { label: "DATA FLOW FIELDS", value: "85" }
        ],
        deliverables: [
          "Salesforce REST API connection scripts",
          "Lead status mapping and update logs",
          "Sales representative warning notifications",
          "Historical analytics synchronizers"
        ]
      },
      {
        name: "Microsoft Dynamics Marketing Automation",
        shortDesc: "Orchestrate enterprise journeys using Dynamics 365 customer intelligence blocks.",
        longDesc: "Achieve extreme multi-department metric unity. Leverage dynamic target contact lists to trigger personalized visual alerts matching exact purchase plans.",
        kpis: [
          { label: "JOURNEY COMPLIANCE", value: "100", suffix: "%" },
          { label: "DEPARTMENT SYNC", value: "Perfect" },
          { label: "CRM DATA DEPTH", value: "High" }
        ],
        deliverables: [
          "Dynamics journey pathway mapping",
          "Customer 360-degree integration maps",
          "Automated notification triggers pipeline",
          "Dynamics Marketing hub configuration files"
        ]
      },
      {
        name: "Employment & Recruiting Marketing",
        shortDesc: "Deploy multi-channel ad campaigns to source highly qualified professional team members.",
        longDesc: "Attract world-class technical credentials. We construct recruiting landing pages and targeted LinkedIn ad systems to pipeline peak candidate resumes.",
        kpis: [
          { label: "APPLICANT CONVERSION", value: "12", suffix: "%" },
          { label: "COST PER HIRE LIFT", value: "-38", suffix: "%" },
          { label: "TALENT INDEX", value: "Elite" }
        ],
        deliverables: [
          "Custom optimized career landing nodes",
          "LinkedIn applicant campaign playbooks",
          "Automated candidate email pre-screeners",
          "Talent funnel analytics dashboard"
        ]
      }
    ]
  },
  {
    title: "Commerce Platforms",
    description: "Excel underneath marketplace listing algorithms to dominate Amazon grids, Target Plus and Walmart Marketplace networks.",
    key: "commerce-platforms",
    items: [
      {
        name: "SEO for Amazon",
        shortDesc: "Optimize product title tags, bullets and backend indexes to command Amazon's A10 ranking grids.",
        longDesc: "Maximize organic marketplace listings. We perform precise competitor share audits, rewriting content templates to boost your product query visibility.",
        kpis: [
          { label: "ORGANIC GRIDS", value: "Top 3" },
          { label: "CLICK-THROUGH LIFT", value: "34", suffix: "%" },
          { label: "CONVERSION WEIGHT", value: "2.4x" }
        ],
        deliverables: [
          "A10 algorithm keyword research matrix",
          "Optimized bullet and copy description templates",
          "Backend search index term sheets",
          "Quarterly organic share progress report"
        ]
      },
      {
        name: "Advertising Management for Amazon",
        shortDesc: "Structure Sponsored Product bid auctions targeting low ACoS metrics and max sales velocity.",
        longDesc: "Eliminate paid click waste. We manage automatic and manual ad targets to protect brand coordinates and secure high-intent transactional placements.",
        kpis: [
          { label: "ACOS DECREASE", value: "-40", suffix: "%" },
          { label: "TOTAL RETRIEVED ROI", value: "6.2x" },
          { label: "MONTHLY DIRECT SALES", value: "$450k" }
        ],
        deliverables: [
          "Sponsored Brand / Product campaign maps",
          "Negative search terms exclusion ledger",
          "Bid ceiling scaling optimization scripts",
          "Amazon Ads programmatic setup"
        ]
      },
      {
        name: "Target Plus Management Services",
        shortDesc: "Navigate Target's invite-only marketplace onboarding and manage daily merchant operations.",
        longDesc: "Gain exclusive digital storefront authority. We assist with store configuration, catalog verification, and fulfillment API connections to keep ratings perfect.",
        kpis: [
          { label: "APPROVAL RATIO", value: "98", suffix: "%" },
          { label: "CATALOG MATCHING", value: "Perfect" },
          { label: "TRUST SCORE", value: "Gold" }
        ],
        deliverables: [
          "Target Plus application coordinate logs",
          "Category and metadata matching sheets",
          "Fulfillment API setup validation protocols",
          "Daily target sales summary dashboards"
        ]
      },
      {
        name: "Walmart Marketplace Advertising",
        shortDesc: "Command Walmart search grid positions using Sponsored Product ad bid optimization.",
        longDesc: "Establish early Walmart leadership. We deploy highly targeted auction bids to capture organic positions before legacy brands react.",
        kpis: [
          { label: "Walmart CPA", value: "-25", suffix: "%" },
          { label: "organic ranks gained", value: "22" },
          { label: "BID PERFORMANCE", value: "Elite" }
        ],
        deliverables: [
          "Walmart merchant ad campaign frameworks",
          "Auction bidding threshold models",
          "Walmart catalog validation checks",
          "Monthly ad ROI visualization report"
        ]
      },
      {
        name: "Influencer Marketing Services",
        shortDesc: "Source validated creators and manage automated, trackable checkout code loops.",
        longDesc: "Drive real consumer conversions through vetted social partners. We align creator media plans with tracking parameters to prove every penny spent.",
        kpis: [
          { label: "ACTIVE CREATORS", value: "150", suffix: "+" },
          { label: "INFLUENCE ROI", value: "4.8x" },
          { label: "MAPPED CONVERSIONS", value: "100", suffix: "%" }
        ],
        deliverables: [
          "Vetted creator agreement files",
          "Dynamic coupon track coding setup",
          "Creator outreach script libraries",
          "Unified sales performance dashboard"
        ]
      }
    ]
  }
];

export default function RevenueMarketingPage({ 
  onGraderClick, 
  onServicesClick,
  selectedSubPageItem,
  setSelectedSubPageItem
}: RevenueMarketingPageProps) {
  const [adSpend, setAdSpend] = useState(5000);
  const [campaignType, setCampaignType] = useState<'google' | 'social' | 'programmatic'>('google');
  const [testVersion, setTestVersion] = useState<'A' | 'B'>('B');
  const [activeCategoryTab, setActiveCategoryTab] = useState('digital-intelligence');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state if header selected a sub-item
  useEffect(() => {
    if (selectedSubPageItem) {
      // Auto assign active tab based on where the item lives
      const parentCat = REVENUE_CATEGORIES_DATA.find(cat => 
        cat.items.some(it => it.name.toLowerCase() === selectedSubPageItem.toLowerCase())
      );
      if (parentCat) {
        setActiveCategoryTab(parentCat.key);
      }
    }
  }, [selectedSubPageItem]);

  // Find currently selected subservice item
  const allItems = REVENUE_CATEGORIES_DATA.flatMap(cat => 
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

  // Simulator values depending on spend and campaign type
  const getPPCMetrics = (spend: number, type: 'google' | 'social' | 'programmatic') => {
    let cpc = 1.45;
    let ctr = 3.8;
    let conversionRate = 1.8;

    if (type === 'social') {
      cpc = 0.95;
      ctr = 2.4;
      conversionRate = 2.1;
    } else if (type === 'programmatic') {
      cpc = 0.65;
      ctr = 1.2;
      conversionRate = 0.9;
    }

    const clicks = Math.floor(spend / cpc);
    const regularLeads = Math.floor(clicks * (conversionRate / 100));
    
    // Under CRO optimization, we lift conversion rate by 110% average
    const croConversionRate = conversionRate * 2.1;
    const croLeads = Math.floor(clicks * (croConversionRate / 100));
    const extraLeads = croLeads - regularLeads;
    const cpaSavingsPercent = 35; // 35% reduction in acquisition cost

    return { clicks, regularLeads, croLeads, extraLeads, cpaSavingsPercent, croConversionRate: croConversionRate.toFixed(1) };
  };

  const metrics = getPPCMetrics(adSpend, campaignType);

  return (
    <div id="revenue-marketing-page" className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans select-none">
      
      {/* Toast Alert Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4"
          >
            <div className="bg-[#000000] text-white p-4 rounded-2xl shadow-2xl border border-teal-500/30 flex items-start gap-3">
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
                <Percent className="h-4 w-4" />
                <span>ROI-MAXIMIZING PAID MEDIA</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-none text-white">
                Paid Media Optimized for <span className="text-[#ff8c00]">Revenue®</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed font-sans">
                Most agencies focus on CPC and search impressions. Alkhawarizmi synchronizes PPC spends directly with dynamic landing page split-tests to deliver highly qualified lead pipelines at a fraction of standard cost.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={onGraderClick}
                  className="cursor-pointer bg-[#ff8c00] hover:bg-[#e07b00] text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] text-center"
                >
                  Audit My PPC Spend
                </button>
                <button
                  onClick={onServicesClick}
                  className="cursor-pointer bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all text-center"
                >
                  Interactive SLA Estimates
                </button>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-6 pt-5 border-t border-white/10 max-w-lg">
                <div>
                  <span className="block text-xl sm:text-2xl font-mono font-black text-[#ff8c00]">-35%</span>
                  <span className="block text-[10px] text-slate-400 mt-1 font-medium">Average CPA Savings</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-mono font-black text-white">$250M+</span>
                  <span className="block text-[10px] text-slate-400 mt-1 font-medium">Ad spend Managed</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-mono font-black text-white">4.8x</span>
                  <span className="block text-[10px] text-slate-400 mt-1 font-medium">Attributable Pipeline ROI</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Box */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff8c00]/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <span className="text-[9px] font-mono tracking-widest text-[#ff8c00] uppercase font-bold block">PPC FRAUD GUARD</span>
                <h3 className="text-lg font-bold text-white mt-1">Leakage Prevention Active</h3>
                <p className="text-slate-400 text-[11px] mt-1">We exclude fraudulent IPs and information seekers dynamically.</p>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-[11px] font-mono text-teal-300 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Google Ads bidding optimization</span>
                    <span className="text-emerald-400 font-bold">Real-time</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Target Social feed dynamic filters</span>
                    <span className="text-emerald-400 font-bold">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">CRO landing page A/B templates</span>
                    <span className="text-emerald-400 font-bold">Continuous</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Programmatic geo boundary tags</span>
                    <span className="text-emerald-400 font-bold">Integrated</span>
                  </div>
                </div>
              </div>

              <div className="text-center p-2.5 rounded-xl bg-[#ff8c00]/10 border border-[#ff8c00]/20 text-[10px] text-[#ff8c00] font-sans font-medium">
                💡 Real-time attribution synchronized with your MarketingCloudFX portal keys.
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
              key="subpage-detail-revmarketing"
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
                  <span>Return to Paid Media & RevOps Console</span>
                </button>
                <div className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                  REVMARKETING-HUB / {currentItem.categoryTitle} / {currentItem.name}
                </div>
              </div>

              {/* Service details grid split */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left profile descriptors */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                  
                  {/* Headline item */}
                  <div className="space-y-3 pb-5 border-b border-slate-100">
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#000000]/5 text-[#000000] text-[10px] font-mono font-bold uppercase">
                      <Target className="h-3.5 w-3.5 text-[#ff8c00]" />
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
                  {currentItem.visualElement === 'green-plus' && (
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#ff8c00] font-bold block">SPECIFIED DESIGN ASSET: REVENUE SUM PLUS LIFT</span>
                      <p className="text-[11px] text-slate-500">Below is the requested light green square and blue plus sign indicating ROI incremental additions:</p>
                      
                      {/* Light green square and blue plus sign */}
                      <div className="flex items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-2xl relative">
                        <div className="w-24 h-24 bg-emerald-100 border-2 border-emerald-400 rounded-2xl flex items-center justify-center shadow-md relative group select-none">
                          <Database className="h-10 w-10 text-emerald-600" />
                          
                          {/* Inside light green square, a mini light green overlay */}
                          <div className="absolute inset-2 border border-dashed border-emerald-300 rounded-lg pointer-events-none" />
                          
                          {/* Solid blue plus indicator */}
                          <div className="absolute -top-3 -right-3 w-8 h-8 bg-[#000000] hover:bg-blue-800 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white cursor-pointer transition-transform hover:scale-110 active:scale-90 font-black">
                            <span className="text-lg leading-none">+</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-[10px] font-sans text-slate-500 text-center leading-normal">
                        💡 Click the blue plus sign to trigger a mock layout optimization update immediately.
                      </div>
                    </div>
                  )}

                  {currentItem.visualElement === 'finger-buy' && (
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#ff8c00] font-bold block">SPECIFIED DESIGN ASSET: TRIGGER CONVERSION CLICK</span>
                      <p className="text-[11px] text-slate-500">Below is the requested finger tapping buy icon demonstrating tactile CTR optimization boundaries on mobile portals:</p>
                      
                      {/* Finger tapping buy icon */}
                      <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                        
                        {/* Simulated Buy Button with Tap Ripple */}
                        <div className="relative w-full max-w-[200px]">
                          <button className="w-full py-3 px-4 bg-[#ff8c00] hover:bg-orange-600 text-white text-xs font-black rounded-xl shadow-lg relative flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider">
                            <ShoppingBag className="h-3.5 w-3.5" />
                            <span>Buy Ticket $199</span>
                          </button>

                          {/* Pulsing ripple representing tactile buy target clicks */}
                          <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-teal-400 animate-ping opacity-75 pointer-events-none" />
                          <div className="absolute top-1/2 left-3/4 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full border border-teal-300 animate-[pulse_1.5s_infinite] opacity-50 pointer-events-none" />

                          {/* Hand tapping cursor */}
                          <div className="absolute -bottom-2 right-4 w-12 h-12 text-[#000000] animate-[bounce_1s_infinite] pointer-events-none">
                            {/* SVG representing organic outline hand cursor tapping */}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8 text-blue-800 drop-shadow-md">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.303.197-1.591 1.591M21.75 12h-2.25m-.197 5.303-1.591-1.591M12 21.75V19.5m-5.303-.197 1.591-1.591M2.25 12h2.25m.197-5.303 1.591 1.591" />
                            </svg>
                          </div>
                        </div>

                      </div>

                      <div className="text-[10px] font-sans text-slate-500 text-center leading-normal">
                        💡 High-contrast finger pointer targeting with at least 48px padding boundaries avoids manual input error.
                      </div>
                    </div>
                  )}

                  {currentItem.visualElement === 'b2b-node' && (
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#ff8c00] font-bold block">SPECIFIED DESIGN ASSET: b2b-icon model</span>
                      <p className="text-[11px] text-slate-500">Below is the requested icon-b2b network cluster demonstrating secure corporate marketing node routing:</p>
                      
                      {/* icon-b2b representation */}
                      <div className="p-8 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-white relative h-48 overflow-hidden">
                        
                        {/* Dynamic node grid mapping */}
                        <div className="relative w-full h-full flex items-center justify-between px-6">
                          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ff8c00_1px,transparent_1px)] [background-size:12px_12px]" />
                          
                          {/* Corporate account node */}
                          <div className="z-10 bg-blue-900 border border-blue-400 p-2.5 rounded-lg text-center text-[10px] font-mono shadow-lg">
                            <Landmark className="h-4 w-4 text-blue-300 mx-auto mb-1" />
                            <span>ENTERPRISE</span>
                          </div>

                          {/* Connection line arrows */}
                          <div className="flex-1 border-t border-dashed border-teal-400 mx-3 relative flex justify-center">
                            <span className="absolute -top-3 px-1.5 py-0.5 bg-slate-900 text-[10px] font-mono text-teal-300 border border-teal-400/30 rounded text-center leading-none">
                              B2B FLOW
                            </span>
                          </div>

                          {/* Revenue terminal node */}
                          <div className="z-10 bg-emerald-950 border border-emerald-400 p-2.5 rounded-lg text-center text-[10px] font-mono shadow-lg">
                            <Percent className="h-4 w-4 text-emerald-300 mx-auto mb-1" />
                            <span>CONVERSION</span>
                          </div>
                        </div>

                      </div>

                      <div className="text-[10px] font-sans text-slate-500 text-center leading-normal">
                        💡 Links target accounts to converted client contracts via dynamic reverse DNS matching algorithms.
                      </div>
                    </div>
                  )}

                  {/* Standard simulation info card if no visual presets */}
                  {!currentItem.visualElement && (
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#000000] font-bold block">ALKHAWARIZMI SIMULATOR ADVISOR</span>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans">
                        This service optimizes parameters straight through standard client API pipelines. We guarantee to maintain stable visual layout structures, zero code blockages and perfect mobile viewports.
                      </p>
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-150 space-y-1">
                        <span className="text-[10px] font-mono text-slate-400 block">// Managed Service KPIs</span>
                        <div className="flex justify-between text-xs text-slate-700 font-bold">
                          <span>Service Response Speed</span>
                          <span className="font-mono text-[#000000]">&lt; 24h average</span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-700 font-bold">
                          <span>Integration Method</span>
                          <span className="font-mono text-[#000000]">HubSpot/Nutshell Hook</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </motion.div>
          ) : (
            <motion.div
              key="main-overview-revmarketing"
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
                  <h2 className="text-2xl sm:text-3xl font-sans font-black text-[#000000] tracking-tight">Revenue Marketing Solutions Matrix</h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">Select from our 20 integrated paid media, automation, and operational tracks to load deep interactive documentation dashboards instantly.</p>
                </div>

                {/* Categories toggle row */}
                <div className="flex flex-wrap bg-slate-100 border border-slate-200 p-1.5 rounded-2xl gap-1">
                  {REVENUE_CATEGORIES_DATA.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategoryTab(cat.key)}
                      className={`cursor-pointer px-4 py-2.5 text-xs font-black rounded-xl transition-all ${
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
                {REVENUE_CATEGORIES_DATA.filter(cat => cat.key === activeCategoryTab).map((category) => (
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

              {/* Extra integrated calculator slide tools */}
              <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-6 lg:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/[0.01] rounded-full blur-3xl pointer-events-none" />
                
                <div className="border-b border-slate-100 pb-6 mb-8 text-center sm:text-left">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ff8c00] font-bold block mb-2">INTELLIGENT PPC EVALUATOR</span>
                  <h2 className="text-2xl sm:text-3xl font-sans font-black text-[#000000] tracking-tight">Generate Instant Ad Lead Predictions</h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">Select your media channel and adjust budgets to predict CRO conversion lifts under Alkhawarizmi methods.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left sliders (cols 5) */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">Choose PPC Channel</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['google', 'social', 'programmatic'] as const).map((chan) => (
                          <button
                            key={chan}
                            onClick={() => setCampaignType(chan)}
                            className={`cursor-pointer px-3 py-2 text-xs font-bold border rounded-lg transition-all ${
                              campaignType === chan
                                ? 'bg-[#000000] text-white border-[#000000]'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {chan === 'google' ? 'Google Search' : chan === 'social' ? 'Social Feed' : 'Programmatic'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold font-sans text-slate-700">
                        <span>Target Monthly Spends</span>
                        <span className="font-mono text-[#000000] text-sm">${adSpend.toLocaleString()}/mo</span>
                      </div>
                      <input
                        type="range"
                        min="1000"
                        max="30000"
                        step="500"
                        value={adSpend}
                        onChange={(e) => setAdSpend(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#000000] focus:outline-none"
                      />
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-1.5 font-sans font-medium text-slate-600">
                      <div className="flex justify-between">
                        <span>Est. Ad Clicks generated:</span>
                        <span className="text-slate-800 font-bold font-mono">{metrics.clicks.toLocaleString()} clicks</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CPA cost reduction target:</span>
                        <span className="text-green-600 font-bold">-{metrics.cpaSavingsPercent}% average</span>
                      </div>
                    </div>
                  </div>

                  {/* Right comparisons (cols 7) */}
                  <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Standard Agencies</span>
                          <span className="px-1.5 py-0.5 bg-slate-100 rounded text-[9px] font-mono font-medium">No CRO</span>
                        </div>
                        <span className="text-xl font-black text-slate-500 block mt-1">{metrics.regularLeads} leads/mo</span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-sans mt-4 leading-normal">
                        Spends ad budget quickly without dynamic landing optimizations, yielding standard industry conversion levels.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-[#ff8c00]/30 shadow-md flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-[#ff8c00]/5 rounded-full blur-xl" />
                      <div>
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[9px] font-mono text-[#ff8c00] uppercase font-bold">Alkhawarizmi Revenue®</span>
                          <span className="px-1.5 py-0.5 bg-emerald-50 rounded text-[9px] font-mono text-[#ff8c00] font-bold">CRO LIFTED</span>
                        </div>
                        <span className="text-xl font-black text-green-600 block mt-1">{metrics.croLeads} leads/mo</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-sans mt-4 leading-normal">
                        <span className="font-bold text-slate-800 block">+{metrics.extraLeads} extra client inquiries</span>
                        Driven by tailored mobile-responsive multi-variant layouts and instant page-performance tuning.
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/* Dual A/B test layout wire with heat map */}
              <div className="space-y-8">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#ff8c00] font-bold">CRO SIMULATOR LAB</span>
                  <h3 className="text-2xl sm:text-3xl font-sans font-black text-[#000000] tracking-tight">Interactive A/B Testing Heatmap</h3>
                  <p className="text-xs sm:text-sm text-slate-600">Toggle between Version A (generic template) and Version B (Alkhawarizmi's conversion-driven layout) to see visual differences in cursor focus and simulated heatmap activity.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Side Controller (cols 4) */}
                  <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between space-y-6 shadow-sm">
                    <div className="space-y-4">
                      <label className="text-xs font-mono uppercase tracking-widest text-[#000000] font-black block pb-2 border-b border-slate-100">Toggle Live Interface</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setTestVersion('A')}
                          className={`cursor-pointer px-4 py-3 rounded-lg text-xs font-bold border transition-all text-center ${
                            testVersion === 'A'
                              ? 'bg-red-50 text-red-700 border-red-300 shadow-sm'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          🚫 Version A (Generic)
                        </button>
                        <button
                          onClick={() => setTestVersion('B')}
                          className={`cursor-pointer px-4 py-3 rounded-lg text-xs font-bold border transition-all text-center ${
                            testVersion === 'B'
                              ? 'bg-green-50 text-green-700 border-green-300 shadow-sm'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          🏆 Version B (CRO Suite)
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4 font-sans text-xs">
                      {testVersion === 'A' ? (
                        <div className="space-y-3 bg-red-50/50 p-4 border border-red-200/50 rounded-xl text-red-900 font-medium">
                          <h5 className="font-bold underline">Version A Crucial Friction:</h5>
                          <ul className="space-y-2 list-disc pl-4 text-[11px] text-red-700">
                            <li>Call-To-Action form sits below the mobile screen fold (reduces active click rates by 45%).</li>
                            <li>Zero visible immediate client reviews, trust badges, or safety guarantees.</li>
                            <li>Taps targets are spaced at 32px, triggering massive click mistakes.</li>
                          </ul>
                        </div>
                      ) : (
                        <div className="space-y-3 bg-green-50/50 p-4 border border-green-200/50 rounded-xl text-green-900 font-medium">
                          <h5 className="font-bold underline">Version B Optimizations Built:</h5>
                          <ul className="space-y-2 list-disc pl-4 text-[11px] text-green-700">
                            <li>Floating, sticky conversion CTA panel sits exactly on the viewport fold.</li>
                            <li>Highlighted client score badges (Clutch, G2) are visible right in the header.</li>
                            <li>Tap target buttons refined to 48px to accommodate responsive mobile interactions.</li>
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-sans text-slate-500 font-bold">Simulated Conversion Rate:</span>
                        <span className={`font-mono text-base font-black ${testVersion === 'A' ? 'text-red-650' : 'text-green-600'}`}>
                          {testVersion === 'A' ? '1.4%' : '3.8%'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Graphic simulator representation (cols 8) */}
                  <div className="lg:col-span-8 bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between text-white relative overflow-hidden min-h-[400px]">
                    
                    {/* Overlay heatmaps */}
                    <div className="absolute inset-0 pointer-events-none transition-all duration-300">
                      {testVersion === 'A' ? (
                        <div className="absolute inset-0 z-0">
                          <div className="absolute top-10 left-10 w-24 h-24 bg-red-500/20 rounded-full blur-xl shrink-0" />
                          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-yellow-500/10 rounded-full blur-[18px]" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 z-0">
                          <div className="absolute top-12 left-10 w-24 h-24 bg-red-600/40 rounded-full blur-xl" />
                          <div className="absolute top-14 right-16 w-32 h-32 bg-red-500/50 rounded-full blur-[24px]" />
                          <div className="absolute bottom-12 right-24 w-16 h-16 bg-yellow-500/40 rounded-full blur-[14px]" />
                        </div>
                      )}
                    </div>

                    {/* Simulated UI layout screen */}
                    <div className="relative z-10 space-y-6 flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-1.5">
                          <Layout className="h-4 w-4 text-[#ff8c00]" />
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff8c00] font-bold">Active Grid Landing Layout simulator</span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">Live Heatmap overlay mode: Active</span>
                      </div>

                      {/* Wireframe Mock */}
                      <div className="grid grid-cols-12 gap-4 flex-1 items-center">
                        <div className="col-span-12 sm:col-span-7 space-y-4">
                          <div className="h-2 w-20 bg-slate-800 rounded" />
                          <div className="h-6 w-full bg-slate-800 rounded-md" />
                          <div className="h-4 w-4/5 bg-slate-800 rounded" />
                          <div className="flex gap-2">
                            <div className="h-8 w-24 bg-slate-800 rounded-lg" />
                            <div className="h-8 w-24 bg-slate-800 rounded-lg" />
                          </div>
                        </div>

                        {/* Sidebar conversion point */}
                        <div className="col-span-12 sm:col-span-5 text-slate-300">
                          {testVersion === 'A' ? (
                            <div className="space-y-2 opacity-50 border border-dashed border-slate-800 p-4 rounded-xl">
                              <span className="text-[10px] font-mono text-slate-600 block">[Friction: CTA form placed down below screen fold]</span>
                              <div className="h-12 w-full bg-slate-900 rounded border border-slate-800" />
                            </div>
                          ) : (
                            <div className="space-y-2 border border-[#ff8c00]/30 bg-slate-850 p-4 rounded-xl shadow-lg relative animate-pulse">
                              <div className="absolute -top-2.5 -right-2.5 bg-[#ff8c00] text-white text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded font-black">HIGH CONVERSION ATTRACTOR</div>
                              <span className="text-[10px] font-mono text-[#ff8c00] block uppercase font-bold">🎯 Sticky lead form</span>
                              <div className="h-12 w-full bg-[#ff8c00] rounded flex items-center justify-center font-bold text-xs cursor-pointer hover:bg-[#e07b00] transition-colors">
                                Download Audit Report
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="border-t border-slate-800 pt-4 text-center">
                        <span className="text-slate-500 font-mono text-[10px] uppercase">
                          Heatmap representation based on 10,000+ client scroll and mouse tracking maps.
                        </span>
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
            <span className="text-xs font-mono tracking-widest text-[#ff8c00] font-bold uppercase">MAXIMIZE YOUR AD EFFICIENCY</span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight font-sans">Stop Wasting Spend On Empty Clicks.</h3>
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
