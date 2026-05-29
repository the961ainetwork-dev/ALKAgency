import React, { useState, useMemo } from 'react';
import { Calendar, Search, ArrowRight, User, Clock, BookOpen, CheckCircle, RefreshCw, X, Play, ShieldAlert, Sparkles, Send, Award, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Seminar {
  id: string;
  title: string;
  category: 'foundational' | 'actionable' | 'thought-leadership' | 'ai-masterclass';
  categoryLabel: string;
  description: string;
  duration: string;
  date: string;
  time: string;
  speaker: string;
  speakerTitle: string;
  focus?: string;
  takeaways?: string[];
  isOnDemand?: boolean;
}

const SEMINARS_DATA: Seminar[] = [
  // Category 1: Foundational
  {
    id: "f1",
    title: "Digital Marketing Strategy 101",
    category: "foundational",
    categoryLabel: "The Foundational Series",
    description: "Align your core business objectives with strategic digital networks to eliminate ad spend inefficiencies.",
    duration: "45 Mins",
    date: "June 10, 2026",
    time: "10:00 AM EST",
    speaker: "Marcus Vance",
    speakerTitle: "Chief Revenue Strategist",
    focus: "Strategy & Literacy",
    takeaways: [
      "Defining high-yield acquisition channels vs luxury channels",
      "Drafting a multi-channel revenue plan for modern enterprises",
      "How to set up realistic ROI checkpoints and target benchmarks",
      "Transitioning from localized campaigns to global brand visibility"
    ]
  },
  {
    id: "f2",
    title: "Decoding Your Data: An Introduction to Analytics & Performance Reports",
    category: "foundational",
    categoryLabel: "The Foundational Series",
    description: "Demystify GA4, learn to audit high-value traffic indicators, and read a monthly performance report with full clarity.",
    duration: "50 Mins",
    date: "June 17, 2026",
    time: "2:00 PM EST",
    speaker: "Dr. Lana Kross",
    speakerTitle: "Principal Analytics Lead",
    focus: "A/B Testing & Analysis",
    takeaways: [
      "Translating raw data metrics (engagement rate, events) into cash flow velocity",
      "Auditing a live marketing report to distinguish vanity metrics from revenue",
      "Configuring custom GA4 funnels to spot user leak points instantly",
      "Formulating data-backed answers to executive performance boards"
    ]
  },
  {
    id: "f3",
    title: "The Customer Journey: Mapping and Influencing the Path to Conversion",
    category: "foundational",
    categoryLabel: "The Foundational Series",
    description: "Visualizing how a buyer transitions from initial discovery or brand awareness down to standard transactional purchase.",
    duration: "45 Mins",
    date: "June 25, 2026",
    time: "11:00 AM EST",
    speaker: "Chloe Sterling",
    speakerTitle: "Director of UX Research",
    focus: "User Intent Optimization",
    takeaways: [
      "Bridging the semantic gap between informational and transactional searches",
      "Designing high-converting middle-of-funnel consideration mechanisms",
      "Recognizing friction patterns that cause abandonment before transaction",
      "Post-purchase journeys: Turning standard buyers into brand evangelists"
    ]
  },
  {
    id: "f4",
    title: "Ethical Marketing & Data Privacy: Compliance and Cookie Regulations",
    category: "foundational",
    categoryLabel: "The Foundational Series",
    description: "Understand global privacy laws, cookie consent frameworks, and how to safely leverage customer databases ethically.",
    duration: "60 Mins",
    date: "July 02, 2026",
    time: "1:00 PM EST",
    speaker: "Jonathan Vance",
    speakerTitle: "VP of Legal & Data Integrity",
    focus: "Compliance & Security",
    takeaways: [
      "Interpreting GDPR, CCPA, and upcoming privacy acts for 2026 websites",
      "Transitioning to zero-party and first-party databases confidently",
      "Implementing non-intrusive consent mechanisms that maintain high analytic precision",
      "How transparent compliance builds long-term brand authority and equity"
    ]
  },

  // Category 2: Actionable & Tool-Specific
  {
    id: "a1",
    title: "Mastering Your CRM/Platform: Pro-Tips & Pipeline Automations",
    category: "actionable",
    categoryLabel: "Actionable & Tool-Specific",
    description: "Maximize your investment in HubSpot, Salesforce, or custom proprietary reporting interfaces.",
    duration: "45 Mins",
    date: "Immediate On-Demand",
    time: "Pre-recorded Access",
    speaker: "Alex Diaz",
    speakerTitle: "Solutions Architecture Specialist",
    focus: "CRM Optimization",
    isOnDemand: true,
    takeaways: [
      "Building seamless automated handoffs from marketing leads to sales champions",
      "Setting up high-conversion drip schedules based on actual platform triggers",
      "Removing duplicate entries and keeping clean databases automatically",
      "Creating customized real-time company performance indicators inside dashboards"
    ]
  },
  {
    id: "a2",
    title: "Content Creation & AI: Maintaining Brand Nuance with LLMs",
    category: "actionable",
    categoryLabel: "Actionable & Tool-Specific",
    description: "Formulate concrete workflows to generate high-quality text assets without sounding robotic or repetitive.",
    duration: "55 Mins",
    date: "June 12, 2026",
    time: "3:00 PM EST",
    speaker: "Elena Rostova",
    speakerTitle: "VP of Brand Strategy",
    focus: "AI Generative Workflows",
    takeaways: [
      "Feeding brand guidelines into AI context windows for localized output",
      "Writing robust system schemas to align tone, formatting, and industry slang",
      "A structured 3-phase human review protocol to polish synthetic text",
      "Scaling newsletter copy, metadata descriptors, and search queries with high velocity"
    ]
  },
  {
    id: "a3",
    title: "Social Media 'Quick Wins': Platform-Specific Tactics for 2026",
    category: "actionable",
    categoryLabel: "Actionable & Tool-Specific",
    description: "Drive high engagement and active leads with focused strategies on LinkedIn and short-form video reels.",
    duration: "45 Mins",
    date: "Pre-recorded Access",
    time: "Immediate Playback",
    speaker: "Sarah Jenkins",
    speakerTitle: "Social Media Strategist",
    focus: "Interactive Channels",
    isOnDemand: true,
    takeaways: [
      "The 5-second hook logic that spikes short-form organic video velocity",
      "Setting up standard employees as industry voice beacons on LinkedIn",
      "Optimizing corporate page profiles to serve as secondary conversion channels",
      "Free interactive script templates that encourage organic direct messages"
    ]
  },
  {
    id: "a4",
    title: "Campaign Optimization: Practical A/B Testing on Landing Pages",
    category: "actionable",
    categoryLabel: "Actionable & Tool-Specific",
    description: "Learn how to isolate variables and run high-conviction tests on email campaigns and checkout pages.",
    duration: "50 Mins",
    date: "June 19, 2026",
    time: "11:00 AM EST",
    speaker: "Robert Chen",
    speakerTitle: "Lead Optimization Specialist",
    focus: "Conversion Engineering",
    takeaways: [
      "How to write high-converting headers that immediately double conversions",
      "Formulating robust hypothesis statements that yield actionable metrics",
      "Calculating minimum traffic requirements for statistically secure test figures",
      "The layout principles of high-converting B2B capture forms"
    ]
  },

  // Category 3: Thought Leadership
  {
    id: "t1",
    title: "Industry Trends for 2026: Macro Shifts & Algorithm Updates",
    category: "thought-leadership",
    categoryLabel: "Thought Leadership Series",
    description: "Anticipate systemic shifts in organic distribution models and artificial intelligence search integrations.",
    duration: "60 Mins",
    date: "June 23, 2026",
    time: "4:00 PM EST",
    speaker: "Tariq Al-Nasser",
    speakerTitle: "Chief Innovation Officer",
    focus: "Executive Intelligence",
    takeaways: [
      "The emergence of zero-click inquiries and localized conversational AI",
      "Predictive analysis of ad placement costs inside automated bid platforms",
      "Why standard video assets are outperforming written assets in organic algorithms",
      "Planning for the upcoming 2027 market transition points"
    ]
  },
  {
    id: "t2",
    title: "The Future of Search (SEO/GEO): Adapting to generative engines",
    category: "thought-leadership",
    categoryLabel: "Thought Leadership Series",
    description: "Move from classic blue links to generative engine citation formats so that your brand remains the top cited authority.",
    duration: "55 Mins",
    date: "June 30, 2026",
    time: "10:00 AM EST",
    speaker: "Saman Al-Khawarizmi",
    speakerTitle: "Founder & CEO, alkhawarizmi.agency",
    focus: "GEO (Generative Engine Optimization)",
    takeaways: [
      "What is GEO and how models select brand content for summaries",
      "Developing authoritative, deeply structured long-form content that crawls cleanly",
      "Semantic markup techniques to help neural networks process company details",
      "Proactive sentiment tracking to protect brand visibility in Gemini summaries"
    ]
  },
  {
    id: "t3",
    title: "Budgeting & ROI Planning: Measuring Digital Footprint Performance",
    category: "thought-leadership",
    categoryLabel: "Thought Leadership Series",
    description: "Formulate a sound financial framework to analyze performance indicators across multiple ad domains.",
    duration: "45 Mins",
    date: "July 08, 2026",
    time: "2:00 PM EST",
    speaker: "Melissa Sterling, CFA",
    speakerTitle: "Chief Financial Director",
    focus: "Financial Operations",
    takeaways: [
      "Determining a rational customer lifetime value to customer acquisition cost ratio",
      "Constructing full-attribution models to avoid double-crediting channels",
      "Budget sizing methods for early-phase exploratory digital campaigns",
      "Communicating digital marketing expenditures clearly to high-level CFOs"
    ]
  },
  {
    id: "t4",
    title: "Vertical Deep Dives: Marketing for B2B Financial Services & Hospitality",
    category: "thought-leadership",
    categoryLabel: "Thought Leadership Series",
    description: "Tailor advice for high-regulation compliance finance and high-touch hospitality channels.",
    duration: "60 Mins",
    date: "Immediate On-Demand",
    time: "Pre-recorded Access",
    speaker: "David Vance",
    speakerTitle: "Managing Director of Enterprises",
    focus: "Niche Solutions",
    isOnDemand: true,
    takeaways: [
      "B2B Trust structures that secure major enterprise accounts in finance",
      "Hyper-local geographic routing for high-end boutique hospitality properties",
      "Complying with FINRA, SEC, and other critical financial regulations in copy",
      "Case studies of companies that doubled inquiries within 9 months"
    ]
  },

  // Category 4: AI Masterclass Cluster
  {
    id: "mc1",
    title: "The AI Workflow Revolution (The 'Get Started' Session)",
    category: "ai-masterclass",
    categoryLabel: "AI Masterclass Cluster",
    description: "Shift your operational model from 'AI as a toy' to 'AI as an integrated team member' focusing on structured business ROI.",
    duration: "60 Mins",
    date: "June 08, 2026",
    time: "1:00 PM EST",
    speaker: "Dr. Saman Al-Khawarizmi",
    speakerTitle: "Lead AI & Revenue Orchestrator",
    focus: "Mindset & Setup",
    takeaways: [
      "Setting up secure local environments to protect proprietary corporate brand assets",
      "Prompt engineering protocols (Persona, Context, Actions, Constraints) for daily tasks",
      "How to train an LLM on your specific, immutable brand voice and editorial rules"
    ]
  },
  {
    id: "mc2",
    title: "Scaling Content & Brand Voice",
    category: "ai-masterclass",
    categoryLabel: "AI Masterclass Cluster",
    description: "Scale high-conversion articles, newsletters, and social assets at 10x velocity without losing structural brand integrity.",
    duration: "60 Mins",
    date: "June 15, 2026",
    time: "1:00 PM EST",
    speaker: "Elena Rostova",
    speakerTitle: "VP of Brand Strategy",
    focus: "Velocity Content Generation",
    takeaways: [
      "Drafting high-conversion blog posts, email campaigns, and multi-platform captions",
      "Advanced human-in-the-loop editing methods to maintain elegant sentence variety",
      "Dynamic repurposing: Translating a single research paper into a month of social posts"
    ]
  },
  {
    id: "mc3",
    title: "Data Analysis & Consumer Insight",
    category: "ai-masterclass",
    categoryLabel: "AI Masterclass Cluster",
    description: "Upload anonymized data points to extract critical anomalies, patterns, and immediate user insights safely.",
    duration: "60 Mins",
    date: "June 22, 2026",
    time: "1:00 PM EST",
    speaker: "Dr. Lana Kross",
    speakerTitle: "Principal Analytics Lead",
    focus: "Predictive Analytics",
    takeaways: [
      "Safely processing anonymized datasets with LLM analysis tools without privacy leaks",
      "Constructing responsive customer persona avatars based on real traffic metrics",
      "Formulating questions to extract what to prioritize for next month's organic strategy"
    ]
  },
  {
    id: "mc4",
    title: "The Agentic Workflow: Automating Your Marketing Stack",
    category: "ai-masterclass",
    categoryLabel: "AI Masterclass Cluster",
    description: "Connect multi-agent frameworks to automate marketing pipelines, qualification triggers, and client report compilation.",
    duration: "75 Mins",
    date: "June 29, 2026",
    time: "1:00 PM EST",
    speaker: "Saman Al-Khawarizmi",
    speakerTitle: "Founder & CEO, alkhawarizmi.agency",
    focus: "Enterprise Automations",
    takeaways: [
      "Moving beyond basic chat: Initiating multi-step autonomous recursive loops",
      "Simplifying complex tasks (e.g., automated lead scoring, dynamic PDF summaries)",
      "Building internal knowledge hubs to index support answers and client FAQs"
    ]
  }
];

interface SeminarsPageProps {
  onGraderClick: () => void;
  onServicesClick: () => void;
  selectedSubPageItem?: string | null;
  onSubPageItemChange?: (item: string | null) => void;
}

export default function SeminarsPage({ onGraderClick, onServicesClick, selectedSubPageItem, onSubPageItemChange }: SeminarsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  
  // Registration form inputs
  const [attendeeEmail, setAttendeeEmail] = useState<string>('');
  const [attendeeName, setAttendeeName] = useState<string>('');
  const [attendeeCompany, setAttendeeCompany] = useState<string>('');
  const [attendeeFormat, setAttendeeFormat] = useState<'live' | 'playback'>('live');
  
  // Registration outcome states
  const [regLoading, setRegLoading] = useState<boolean>(false);
  const [regStep, setRegStep] = useState<string>('');
  const [regSuccess, setRegSuccess] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>('');

  // Handle cross-page deep linking if selectedSubPageItem represents a seminar title or ID
  React.useEffect(() => {
    if (selectedSubPageItem) {
      const match = SEMINARS_DATA.find(s => 
        s.id === selectedSubPageItem || s.title.toLowerCase().includes(selectedSubPageItem.toLowerCase())
      );
      if (match) {
        setSelectedSeminar(match);
        // Reset subpage item so it doesn't lock state
        if (onSubPageItemChange) onSubPageItemChange(null);
      }
    }
  }, [selectedSubPageItem, onSubPageItemChange]);

  const filteredSeminars = useMemo(() => {
    return SEMINARS_DATA.filter(seminar => {
      const matchesCategory = selectedCategory === 'all' || seminar.category === selectedCategory;
      const matchesSearch = 
        seminar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seminar.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        seminar.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (seminar.takeaways && seminar.takeaways.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleRegisterClick = (seminar: Seminar) => {
    setSelectedSeminar(seminar);
    setIsRegistering(true);
    setRegSuccess(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeEmail || !attendeeName) return;

    setRegLoading(true);
    setRegStep('Connecting to alkhawarizmi secure coordinate nodes...');

    setTimeout(() => {
      setRegStep('Validating seat parameters in calendar indexes...');
      setTimeout(() => {
        setRegStep('Compiling custom dynamic attendee certificate token...');
        setTimeout(() => {
          const generatedId = `AKW-2026-${Math.floor(100000 + Math.random() * 900000)}`;
          setTicketId(generatedId);
          setRegLoading(false);
          setRegSuccess(true);
          setRegStep('');
        }, 800);
      }, 700);
    }, 600);
  };

  const categories = [
    { key: 'all', label: 'All Seminars' },
    { key: 'foundational', label: 'Foundational' },
    { key: 'actionable', label: 'Actionable & Tools' },
    { key: 'thought-leadership', label: 'Thought Leadership' },
    { key: 'ai-masterclass', label: 'AI Masterclass Cluster' }
  ];

  return (
    <div id="seminars-viewport" className="bg-slate-50 min-h-screen pt-8 pb-20 select-none">
      
      {/* Dynamic Breadcrumb & Header Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#ff8c00] font-bold mb-4">
          <span>AL-KHAWARIZMI EDUCATIONAL SUITE</span>
          <span>/</span>
          <span>B2B SEMINAR LABS</span>
          <span className="hidden sm:inline">/</span>
          <span className="hidden sm:inline text-slate-400 font-normal">AUDITED REVENUE DISCOVERY</span>
        </div>

        {/* Hero Section */}
        <div className="bg-[#000000] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-900 mb-12">
          {/* Subtle technological visual accents */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
            <div className="w-full h-full border-l border-[#ff8c00] border-dashed flex flex-col justify-between py-10 pl-6 font-mono text-[9px] text-[#ff8c00]">
              <span>[COORD_INDEX_ACTIVE]</span>
              <span>[REVENUE_MULTIPLIER_ONLINE]</span>
              <span>[SYSTEM_TETHER: SECURE_SSL]</span>
            </div>
          </div>

          <div className="max-w-2xl space-y-4">
            <span className="bg-[#ff8c00] text-black text-[9px] font-mono font-black uppercase px-2.5 py-1 rounded-full tracking-widest">
              Live Interactive & On-demand Seminars
            </span>
            <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight leading-tight">
              Raise Communication Standards, <span className="text-[#ff8c00]">Empower Your Operations.</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              We engineer webinars that reduce communication friction, explaining the foundational logic behind high-yield optimization models, tactical software tutorials, and generative AI systems designed to scale digital business workflows.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#ff8c00]" />
                <span className="text-xs font-mono font-bold">16 Certified Programs</span>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#ff8c00]" />
                <span className="text-xs font-mono font-bold">On-Demand & Live Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 mb-8 bg-white p-4 border border-slate-200 rounded-2xl shadow-sm">
          {/* Categories Tab list */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap border ${
                  selectedCategory === cat.key
                    ? 'bg-[#000000] text-white border-black shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:text-black border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex items-center min-w-[240px] md:min-w-[320px] self-stretch md:self-auto">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search webinars, key takeaways..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-medium pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#ff8c00] transition-all text-slate-800 placeholder-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-900"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Main List Grid */}
        {filteredSeminars.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center space-y-3">
            <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
              <Search className="h-5 w-5 text-[#ff8c00]" />
            </div>
            <h3 className="font-sans font-bold text-slate-800 text-sm">No Matching Educational Seminars</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              We couldn't find any seminars matching "{searchQuery}". Try exploring general terms like "AI" or filter by a specific category tab.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSeminars.map((seminar) => (
              <motion.div
                layout
                id={`seminar-card-${seminar.id}`}
                key={seminar.id}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Upper Details Block */}
                <div className="p-6 sm:p-8 space-y-4">
                  {/* Category Pill and Availability Indicator */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff8c00] font-black">
                      {seminar.categoryLabel}
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      seminar.isOnDemand 
                        ? 'bg-blue-50 text-blue-600 border border-blue-150' 
                        : 'bg-orange-50 text-[#ff8c30] border border-orange-150'
                    }`}>
                      <div className={`h-1.5 w-1.5 rounded-full ${seminar.isOnDemand ? 'bg-blue-600' : 'bg-orange-500 animate-ping'}`} />
                      {seminar.isOnDemand ? 'ON-DEMAND PLAYBACK' : 'RESERVE BROADCAST'}
                    </span>
                  </div>

                  {/* Title and Focus */}
                  <div className="space-y-1">
                    {seminar.focus && (
                      <span className="inline-block bg-slate-100 text-slate-700 text-[9px] font-semibold px-2 py-0.5 rounded">
                        Focus: {seminar.focus}
                      </span>
                    )}
                    <h3 className="font-sans font-black text-[#000000] text-base sm:text-lg tracking-tight leading-tight group-hover:text-[#ff8c00] transition-colors">
                      {seminar.title}
                    </h3>
                  </div>

                  {/* Narrative Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {seminar.description}
                  </p>

                  {/* Key Takeaways */}
                  {seminar.takeaways && seminar.takeaways.length > 0 && (
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-extrabold block">
                        Core Takeaways Including:
                      </span>
                      <ul className="space-y-1.5">
                        {seminar.takeaways.map((takeaway, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                            <CheckCircle className="h-3.5 w-3.5 text-[#ff8c00] shrink-0 mt-0.5" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Speaker Details */}
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-9 h-9 bg-slate-900 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm border border-slate-800">
                      <User className="h-4 w-4 text-[#ff8c00]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800">{seminar.speaker}</div>
                      <div className="text-[10px] font-mono text-slate-400 font-semibold">{seminar.speakerTitle}</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Schedule Banner & Trigger Button */}
                <div className="bg-slate-50/50 hover:bg-slate-50 border-t border-slate-150 p-4 px-6 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono uppercase text-slate-400 font-extrabold block">SESSION TIMESTAMPS</span>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {seminar.date}
                      </span>
                      <span className="text-slate-300">|</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        {seminar.time}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRegisterClick(seminar)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm hover:shadow"
                  >
                    <span>{seminar.isOnDemand ? 'Access Playback' : 'Secure Free Seat'}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#ff8c00]" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Corporate Educational Advisory SLA */}
        <section className="mt-16 bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <span className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center text-[#ff8c00] border border-slate-200 shadow-sm">
                📚
              </span>
              <h4 className="font-sans font-bold text-slate-900 text-sm">Empower Decision Makers</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                By helping your in-house teams understand standard acquisition math, we eliminate friction during monthly performance and ROI evaluations.
              </p>
            </div>
            <div className="space-y-2">
              <span className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center text-[#ff8c00] border border-slate-200 shadow-sm">
                🤖
              </span>
              <h4 className="font-sans font-bold text-slate-900 text-sm">Leverage Practical Tooling</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                We focus on concrete, real-world interfaces like HubSpot pipelines, Salesforce reports, and secure AI templates to trigger immediate, organic performance gains.
              </p>
            </div>
            <div className="space-y-2">
              <span className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center text-[#ff8c00] border border-slate-200 shadow-sm">
                📈
              </span>
              <h4 className="font-sans font-bold text-slate-900 text-sm">Strategic Vision Alignment</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Prepare your business systems for incoming macro shifts, zero-cookie standards, and Generative Engine Optimization models ahead of 2027 parameters.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Registration Portal Modal Drawer */}
      <AnimatePresence>
        {isRegistering && selectedSeminar && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            
            {/* Backdrop filter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#000000]/60 backdrop-blur-sm"
              onClick={() => { if (!regLoading) setIsRegistering(false); }}
            />

            {/* Main Dialog Panel */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-slate-150 z-10 p-6 sm:p-8"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsRegistering(false)} 
                disabled={regLoading}
                className="absolute right-4 top-4 hover:bg-slate-100 p-2 rounded-full text-slate-400 hover:text-slate-900 transition-colors disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Success View */}
              {regSuccess ? (
                <div className="space-y-6 py-6 text-center">
                  <div className="w-14 h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-sm">
                    <CheckCircle className="h-7 w-7" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-green-600 uppercase tracking-wider font-extrabold bg-green-50 px-2.5 py-0.5 rounded-full border border-green-100">
                      Attendance Confirmed
                    </span>
                    <h3 className="font-sans font-black text-xl text-[#000000] tracking-tight mx-auto max-w-sm">
                      Seat Secured for {selectedSeminar.title}
                    </h3>
                    <p className="text-slate-550 text-xs leading-relaxed max-w-xs mx-auto">
                      A personalized gateway invitation code and high-resolution calendar coordinates has been dispatched to <span className="text-[#000000] font-bold">{attendeeEmail}</span>.
                    </p>
                  </div>

                  {/* Virtual Ticket Pass Design representation */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 font-mono text-[10px] text-left relative overflow-hidden select-none">
                    <div className="absolute right-2 top-2 h-8 w-8 text-[#ff8c00]/20 pointer-events-none">
                      <Award className="h-full w-full" />
                    </div>
                    <div className="border-b border-dashed border-slate-200 pb-2.5 mb-2.5 flex items-center justify-between font-bold text-slate-800">
                      <span>🎟️ OFFICIAL BROADCAST ACCESS</span>
                      <span className="text-[#ff8c00]">{ticketId}</span>
                    </div>
                    <div className="space-y-1 text-slate-650 font-medium">
                      <div><span className="text-slate-400 uppercase">EVENT:</span> {selectedSeminar.title}</div>
                      <div><span className="text-slate-400 uppercase">ATTENDEE:</span> {attendeeName} ({attendeeCompany})</div>
                      <div><span className="text-slate-400 uppercase">ACCESS CODE:</span> AKW_PORTAL_2026_X92</div>
                      <div className="pt-1.5 flex items-center justify-between text-[9px] text-[#ff8c00] font-black border-t border-slate-100 mt-2">
                        <span>🛰️ MULTI-ROUTED FEED</span>
                        <span>DATE: {selectedSeminar.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsRegistering(false)}
                      className="w-full py-2.5 bg-[#000000] hover:bg-[#222222] text-[#ff8c00] font-bold rounded-xl text-xs flex items-center justify-center gap-1 shadow cursor-pointer"
                    >
                      <span>Return to Seminary Database</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Dynamic Form View */
                <div className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#ff8c00] font-black block">
                      SEMINAR REGISTRATION PORTAL
                    </span>
                    <h3 className="text-lg font-black font-sans text-slate-900 tracking-tight pr-8 leading-snug">
                      {selectedSeminar.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Host: {selectedSeminar.speaker} ({selectedSeminar.speakerTitle})
                    </p>
                  </div>

                  {/* Loading Status Indicator */}
                  {regLoading ? (
                    <div className="py-12 flex flex-col items-center justify-center space-y-4">
                      <RefreshCw className="h-8 w-8 text-[#ff8c00] animate-spin" />
                      <div className="text-center">
                        <span className="text-xs font-mono font-bold text-slate-800 block">Processing Authorization</span>
                        <span className="text-[10px] font-mono text-slate-405 block animate-pulse">{regStep}</span>
                      </div>
                    </div>
                  ) : (
                    /* The registration HTML input details */
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      
                      {/* Session Recap Summary Block */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-[11px] flex items-center justify-between gap-1">
                        <div className="space-y-0.5">
                          <span className="text-slate-400 font-bold block uppercase text-[8px] font-mono">Date Coordinate</span>
                          <span className="text-slate-800 font-bold">{selectedSeminar.date}</span>
                        </div>
                        <div className="space-y-0.5 text-right">
                          <span className="text-slate-400 font-bold block uppercase text-[8px] font-mono font-bold">Session Timing</span>
                          <span className="text-slate-800 font-bold">{selectedSeminar.time}</span>
                        </div>
                      </div>

                      {/* Attendee Name inputs */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Sarah Jenkins"
                          value={attendeeName}
                          onChange={(e) => setAttendeeName(e.target.value)}
                          className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#ff8c00] transition-colors text-slate-800"
                        />
                      </div>

                      {/* Attendee Email Address */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">
                          Corporate Email Code *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="e.g., sjenkins@enterprise.com"
                          value={attendeeEmail}
                          onChange={(e) => setAttendeeEmail(e.target.value)}
                          className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#ff8c00] transition-colors text-slate-800"
                        />
                      </div>

                      {/* Company Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block">
                          Entity / Organization *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g., Enterprise Inc."
                          value={attendeeCompany}
                          onChange={(e) => setAttendeeCompany(e.target.value)}
                          className="w-full text-xs font-semibold px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-[#ff8c00] transition-colors text-slate-800"
                        />
                      </div>

                      {/* Format Choice: Live broad vs playback */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-extrabold block mb-1">
                          Preferred Attendance Channel
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setAttendeeFormat('live')}
                            className={`p-3 border rounded-xl text-left cursor-pointer transition-all ${
                              attendeeFormat === 'live'
                                ? 'border-[#000000] bg-slate-50 ring-1 ring-black'
                                : 'border-slate-200 bg-white hover:bg-slate-50'
                            }`}
                          >
                            <span className="text-xs font-bold text-slate-800 block">Live Broadcast Feed</span>
                            <span className="text-[9px] text-[#ff8c00] font-extrabold font-mono block uppercase">Interactive Chat Live</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setAttendeeFormat('playback')}
                            className={`p-3 border rounded-xl text-left cursor-pointer transition-all ${
                              attendeeFormat === 'playback'
                                ? 'border-[#000000] bg-slate-50 ring-1 ring-black'
                                : 'border-slate-200 bg-white hover:bg-slate-50'
                            }`}
                          >
                            <span className="text-xs font-bold text-slate-800 block">Secure Playback Code</span>
                            <span className="text-[9px] text-blue-500 font-extrabold font-mono block uppercase">Watch On-Demand</span>
                          </button>
                        </div>
                      </div>

                      {/* Security Policy Reminder */}
                      <p className="text-[10px] font-medium text-slate-400 select-none">
                        ⚠️ By submitting, you authorize the dispatching of calendar event triggers. Your data is managed strictly in compliance with global first-party database schemas.
                      </p>

                      <div className="pt-2">
                        <button
                          type="submit"
                          className="w-full py-3 bg-[#000000] hover:bg-[#222222] text-[#ff8c00] text-xs font-bold rounded-xl shadow cursor-pointer transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>Secure My Free Coordinates Seat</span>
                          <Send className="h-4 w-4" />
                        </button>
                      </div>

                    </form>
                  )}
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
