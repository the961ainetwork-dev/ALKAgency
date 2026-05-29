export interface SubserviceDetail {
  id: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  iconName: 'Layout' | 'RefreshCw' | 'Zap' | 'Share2' | 'ShoppingBag' | 'Mail' | 'PenTool' | 'Brain' | 'TrendingUp' | 'MessageSquare' | 'Bot' | 'Layers' | 'Globe' | 'Code' | 'Settings' | 'Terminal' | 'Database' | 'ShieldAlert' | 'Cpu' | 'Monitor';
  deliverables: string[];
  metrics: { label: string; value: string; suffix?: string }[];
  interactiveMode: 'layout-designer' | 'redesign-slider' | 'rapid-mockup' | 'social-preview' | 'ecommerce-funnel' | 'email-ab' | 'content-scores' | 'consulting-planner' | 'marketing-roi' | 'chatgpt-prompt' | 'agent-nodes' | 'gpt-connector' | 'geo-map' | 'hud-terminal' | 'wp-speed' | 'shopify-cart' | 'infra-status' | 'cms-matrix' | 'accessibility-auditor';
}

export interface ServiceCategory {
  title: string;
  key: 'design' | 'ai' | 'development';
  description: string;
  iconName: 'PenTool' | 'Cpu' | 'Code';
  items: SubserviceDetail[];
}

export const UX_AI_CATEGORIES: ServiceCategory[] = [
  {
    title: "Design",
    key: "design",
    description: "Conversion-optimized user interfaces combining modern visual aesthetics with strict mobile responsiveness rules.",
    iconName: "PenTool",
    items: [
      {
        id: "website-design",
        name: "Website Design",
        shortDesc: "Stunning custom interfaces engineered strictly for sub-second mobile page loads and clear navigation patterns.",
        longDesc: "We create bespoke desktop and mobile websites from first principle wireframes. Our architectures focus on strict typographic pairings, optimal positive/negative spacing hierarchies, and responsive tactile UI behaviors that encourage immediate user actions.",
        iconName: "Layout",
        deliverables: [
          "Bespoke wireframes & interactive dynamic Figma layouts",
          "Responsive mobile-first screen viewports mapped at 390px, 768px, and 1440px",
          "Custom SVG graphic resource elements and vector asset libraries",
          "Optimized style guides including fluid tracking and Inter typography pairs"
        ],
        metrics: [
          { label: "Target Interaction Score", value: "95", suffix: "+" },
          { label: "Conversion Rate Increase", value: "+38", suffix: "%" },
          { label: "Responsive Media Compression", value: "100", suffix: "%" }
        ],
        interactiveMode: "layout-designer"
      },
      {
        id: "website-redesign",
        name: "Website Redesign",
        shortDesc: "Breathe new life into aging, high-friction websites without losing established search traffic indexes.",
        longDesc: "Identify structural visual gridlocks and high-friction elements that prevent users from converting. We transition your system to modern Tailwind CSS utility sheets while maintaining canonical link integrity and pre-existing meta descriptions.",
        iconName: "RefreshCw",
        deliverables: [
          "Heatmap analysis of dead clicks and behavioral scrolling limits",
          "Tailwind CSS code structural rewrite replacing legacy stylesheet baggage",
          "Sub-second asset caching maps with lazy-loaded media dimensions",
          "Full URL mapping configuration preventing 404 drops or organic rank loss"
        ],
        metrics: [
          { label: "Rendering Lag Reduction", value: "-64", suffix: "%" },
          { label: "Exit Page Drops Prevented", value: "-42", suffix: "%" },
          { label: "Bounce Rate Improvement", value: "2.4", suffix: "x better" }
        ],
        interactiveMode: "redesign-slider"
      },
      {
        id: "rapid-web-design",
        name: "Rapid Web Design",
        shortDesc: "Launch high-fidelity marketing landing pages built specifically for targeted performance campaigns under tight deadlines.",
        longDesc: "When speed-to-market is critical, our rapid-deploy service produces compliant, high-end layouts in a matter of days. We bypass bloated drag-and-drop frameworks to code custom components directly.",
        iconName: "Zap",
        deliverables: [
          "48-hour turn-around from content brief to production staging",
          "Strict lightweight static layouts with inline critical CSS attributes",
          "Integrated Webhook form configurations linked directly to standard CRMs",
          "Adaptive device structures optimized for Google PPC and Meta traffic sources"
        ],
        metrics: [
          { label: "Lead Capture Acceleration", value: "1.8", suffix: "s lag" },
          { label: "Deployment Duration", value: "< 72", suffix: " hrs" },
          { label: "Mobile Validation Success", value: "100", suffix: "%" }
        ],
        interactiveMode: "rapid-mockup"
      },
      {
        id: "social-media-design",
        name: "Social Media Design",
        shortDesc: "High-contrast visually captivating layouts for LinkedIn, Instagram, and premium digital pipelines.",
        longDesc: "Stand out on highly crowded modern feeds with bold layouts built on precise color theory. We create modular social frameworks and templates that maintain brand alignment across all digital interactions.",
        iconName: "Share2",
        deliverables: [
          "Bespoke visual graphic templates structured at exact platform dimensions",
          "Custom asset kits including curated high-contrast photography resources",
          "LinkedIn premium executive slide templates and PDF presentation outlines",
          "Custom animated SVG micro-interaction assets formatted for stories"
        ],
        metrics: [
          { label: "Click-Through Yield Boost", value: "+54", suffix: "%" },
          { label: "Social Media Engagement Index", value: "3.2", suffix: "x" },
          { label: "Template Output Parity", value: "18", suffix: " templates" }
        ],
        interactiveMode: "social-preview"
      },
      {
        id: "ecommerce-website-design",
        name: "Ecommerce Website Design",
        shortDesc: "Frictionless checkout pipelines, optimized product pages, and smart dynamic shopping matrices.",
        longDesc: "Most buyers abandon carts due to unexpected page latency or input friction. We completely redesign checkout pipelines and catalog displays to maximize average order value (AOV).",
        iconName: "ShoppingBag",
        deliverables: [
          "One-click accordion checkout wireframes and sticky interactive shopping pads",
          "High-fidelity product grid pages featuring modern zoom preview metrics",
          "Dynamic review badges and persistent countdown and promotion indicators",
          "Client-side local persistence integration for seamless back-and-forth catalog navigation"
        ],
        metrics: [
          { label: "Checkout Friction drop", value: "-47", suffix: "%" },
          { label: "Average Order Value Lift", value: "+22", suffix: "%" },
          { label: "Add-to-Cart Action Intensity", value: "+34", suffix: "%" }
        ],
        interactiveMode: "ecommerce-funnel"
      },
      {
        id: "email-marketing-design",
        name: "Email Marketing Testing & Design",
        shortDesc: "Create stunning, lightweight newsletter code templates that bypass spam filter boundaries successfully.",
        longDesc: "Modern mail software often breaks complex CSS styles. We design and test highly responsive, darkmode-safe raw tables and minimal layouts that display perfectly in Outlook, Gmail, and mobile screens.",
        iconName: "Mail",
        deliverables: [
          "Litmus-verified responsive HTML code compatible across 70+ mail clients",
          "Dark-mode adaptive graphic layouts with static content fallback buffers",
          "Strategic A/B split subject line blueprints synced with user journey points",
          "Ultra-lightweight embedded visual assets compressed for standard bandwidth"
        ],
        metrics: [
          { label: "Template Inbox Delivery Rate", value: "99.8", suffix: "%" },
          { label: "Open Rate Performance Lift", value: "+26", suffix: "%" },
          { label: "Mobile Readability Index", value: "100", suffix: "%" }
        ],
        interactiveMode: "email-ab"
      },
      {
        id: "content-marketing-design",
        name: "Content Marketing Copywriting & Design",
        shortDesc: "Pencil & paper content frameworks designed for semantic search engines and high-authority client readers.",
        longDesc: "We construct layout articles that combine expert technical copywriting with readable graphics. Beautiful custom summaries, highlight panels, and inline diagrams guide the user through dense analysis cleanly.",
        iconName: "PenTool", // Representing the requested pencil and paper icon!
        deliverables: [
          "Search-intent matched technical content blueprints based on core topics",
          "Inline infographics, visual summaries, and key summary outline callouts",
          "E-E-A-T guideline implementation ensuring high factual and industry authority",
          "Call-to-action asset insertions positioned exactly at high-attention scroll zones"
        ],
        metrics: [
          { label: "Average Session Duration", value: "4:12", suffix: " mins" },
          { label: "Organic Backlink Attraction", value: "+85", suffix: "%" },
          { label: "Helpful Content Conformity", value: "99", suffix: "/100" }
        ],
        interactiveMode: "content-scores"
      }
    ]
  },
  {
    title: "AI Services",
    key: "ai",
    description: "Server-side artificial intelligence models, custom agents, and high-performance pipeline integrations.",
    iconName: "Cpu",
    items: [
      {
        id: "ai-consulting",
        name: "AI Consulting",
        shortDesc: "Feasibility audits, security risk evaluation, and high-return action maps for corporate AI adoption.",
        longDesc: "Our advisory framework outlines exactly where machine learning brings measurable revenue increases while avoiding common API cost explosions and private client database data leaks.",
        iconName: "Brain",
        deliverables: [
          "Detailed corporate AI readiness matrix and potential friction scoring report",
          "Technical architecture blueprints using secure server API proxies",
          "Cost estimating outlines analyzing monthly token costs vs human hours saved",
          "Data privacy checklists aligning with international privacy parameters"
        ],
        metrics: [
          { label: "Corporate Efficiency Gain", value: "3.5", suffix: "x boost" },
          { label: "API Cost Optimization", value: "-52", suffix: "%" },
          { label: "Execution Roadmaps Solved", value: "100", suffix: "%" }
        ],
        interactiveMode: "consulting-planner"
      },
      {
        id: "ai-digital-marketing",
        name: "AI Digital Marketing Services",
        shortDesc: "Automate dynamic programmatic bidding and personalize landing pages based on live demographic feeds.",
        longDesc: "We use predictive algorithms to analyze ad performance tags. Deliver custom visual banners, text variations, and tailored landing layouts matched to specific user search histories dynamically.",
        iconName: "TrendingUp",
        deliverables: [
          "Dynamic ad placement integration utilizing predictive cohort analyses",
          "Contextual page variant generators updating hero headers on page-load",
          "Dynamic lead-scoring triggers that automatically route premium clients to reps",
          "Automated PPC bidding adjustment trackers based on custom target conversion formulas"
        ],
        metrics: [
          { label: "Cost Per Acquisition reduction", value: "-34", suffix: "%" },
          { label: "Ad Relevance Index Score", value: "9.6", suffix: "/10" },
          { label: "Dynamic Segment Allocations", value: "128", suffix: " variations" }
        ],
        interactiveMode: "marketing-roi"
      },
      {
        id: "chatgpt-optimization",
        name: "ChatGPT Optimization",
        shortDesc: "Optimize your corporate content strategy to ensure your brand is cited as the primary expert in LLM searches.",
        longDesc: "Modern buyers search via ChatGPT, Gemini, and Perplexity. We optimize your website structures, XML semantic listings, and citations to ensure your company dominates LLM-generated search answers.",
        iconName: "MessageSquare",
        deliverables: [
          "LLM optimization audits detailing your company's visibility on OpenAI",
          "Semantic schema updates formatted specifically for model web crawlers",
          "Comprehensive digital authority positioning ensuring solid contextual citations",
          "Third-party entity matching aligning keywords with professional knowledge bases"
        ],
        metrics: [
          { label: "AI Search Citation Rate", value: "+148", suffix: "%" },
          { label: "LLM Search Rank Dominance", value: "#1", suffix: " tier" },
          { label: "XML Schema Validation", value: "100", suffix: "%" }
        ],
        interactiveMode: "chatgpt-prompt"
      },
      {
        id: "ai-agent-development",
        name: "AI Agent Development",
        shortDesc: "Autonomous, state-managed conversational assistants integrated directly with databases and systems.",
        longDesc: "Bypass simplistic rule-based triggers. We deploy advanced, server-side dynamic routing engines that let conversational systems execute API functions, log sales opportunities, and answer client queries.",
        iconName: "Bot",
        deliverables: [
          "Advanced multi-agent routing systems using stateful memory controls",
          "Secure Express/Node API bridges wrapping internal system records safely",
          "Conversational fallback guarantees with automated handoffs to live agents",
          "Custom training layers optimizing tone and response guidelines"
        ],
        metrics: [
          { label: "Support Ticket Deflection", value: "72", suffix: "%" },
          { label: "Agent Average Response Time", value: "< 1.2", suffix: "s" },
          { label: "Sales Lead Opportunities Routed", value: "+45", suffix: "%" }
        ],
        interactiveMode: "agent-nodes"
      },
      {
        id: "ai-gpt-integration",
        name: "AI & GPT Integration",
        shortDesc: "Embed high-performance language modeling features flawlessly inside pre-existing enterprise portals.",
        longDesc: "Add text classification, semantic parsing, or automatic summarizers to your software. We design secure API pipelines with robust fallback layers that prevent service downtime, keeping API keys strictly hidden browser-side.",
        iconName: "Layers",
        deliverables: [
          "Custom API connectors configured for multi-model fallback routes",
          "Secure server-side proxy wrappers for process.env.GEMINI_API_KEY",
          "Automatic prompt-engineering matrices embedded at database endpoints",
          "Comprehensive logging monitors analyzing token consumption and safety scores"
        ],
        metrics: [
          { label: "Middleware Integration Speed", value: "< 15", suffix: "ms" },
          { label: "Uptime and Prompt Safety Code", value: "99.99", suffix: "%" },
          { label: "Processing Pipeline Capacity", value: "2M", suffix: " tokens" }
        ],
        interactiveMode: "gpt-connector"
      },
      {
        id: "enterprise-geo-services",
        name: "Enterprise GEO Services",
        shortDesc: "Optimize geo-targeted visibility to capture local, map-based, and high-intent local mobile search traffic.",
        longDesc: "Control local lookup results on organic search apps. We configure maps coordinates, local tags, structured address schema, and geo-fenced marketing pipelines so local buyers choose your nearest facilities.",
        iconName: "Globe",
        deliverables: [
          "Optimized local structured metadata configured for search crawlers",
          "Citations across relevant regional and corporate directories globally",
          "Geo-targeted landing layouts highlighting dynamic maps and distances",
          "Local map tracking systems detailing geographic search share parameters"
        ],
        metrics: [
          { label: "Local Navigation Conversion", value: "+62", suffix: "%" },
          { label: "Geo-targeted Leads Acquired", value: "+44", suffix: "%" },
          { label: "Map Citation Accuracy", value: "100", suffix: "%" }
        ],
        interactiveMode: "geo-map"
      }
    ]
  },
  {
    title: "Development",
    key: "development",
    description: "Production-ready, rock-solid engineering specializing in custom full-stack solutions, headless stores, and CMS frameworks.",
    iconName: "Code", // Representing the requested development icon!
    items: [
      {
        id: "digital-experience",
        name: "Digital Experience Development",
        shortDesc: "Rich, interactive web portals, custom dashboards, and high-fidelity frontends built with React and Tailwind.",
        longDesc: "We build modern, stateful clients that replace dry static content with high-end tools. Includes smooth, GPU-accelerated transition states, responsive vector layouts, and robust local browser caching engines.",
        iconName: "Monitor",
        deliverables: [
          "Stateful React clients utilizing clean modular design and hooks",
          "Dynamic interactive user widgets including drag sliders and charts",
          "Optimized style classes utilizing lightweight Tailwind frameworks",
          "Websocket connection pipelines for instant data synchronization"
        ],
        metrics: [
          { label: "Client-Side Interaction Cost", value: "Zero", suffix: " lag" },
          { label: "Active Portal Engagement Lift", value: "2.8", suffix: "x" },
          { label: "Code Coverage Standards", value: "95", suffix: "%+" }
        ],
        interactiveMode: "hud-terminal"
      },
      {
        id: "wordpress-development",
        name: "WordPress Development",
        shortDesc: "Hyper-optimized, decoupled headless WordPress architectures with blazing fast page speeds.",
        longDesc: "WordPress editing interfaces are wonderful, but the default page-load speeds are often slow. We decouple the frontend, using WordPress purely as a headless API database while building React/Tailwind visual clients.",
        iconName: "Code",
        deliverables: [
          "Headless rest-API connector configuration maps",
          "Custom optimized admin panel filters with tailored content blocks",
          "Database query profiling to eliminate slow nested table responses",
          "Ultra-fast page caches backed by lightweight cloud content frameworks"
        ],
        metrics: [
          { label: "WordPress Feed Acceleration", value: "7.2", suffix: "x faster" },
          { label: "Lighthouse Mobile Speeds", value: "96", suffix: "/100" },
          { label: "Database Bloat Cut", value: "-78", suffix: "%" }
        ],
        interactiveMode: "wp-speed"
      },
      {
        id: "shopify-ecommerce",
        name: "Shopify Ecommerce Development",
        shortDesc: "Bespoke Liquid template code, checkout customizations, and specialized third-party app connections.",
        longDesc: "Transform your Shopify store into a highly optimized visual presentation. We code custom templates directly, optimize payload behaviors, and configure robust CRM and ERP data integrations.",
        iconName: "ShoppingBag",
        deliverables: [
          "Bespoke Shopify Liquid code tailored precisely for custom designs",
          "Optimized checkout flows reducing cart friction and page redirection",
          "Dynamic discount mechanisms and automated upsell configuration",
          "API connection maps for ERP, inventory management, and fulfillment"
        ],
        metrics: [
          { label: "Checkout Redirection Speed", value: "0.4", suffix: "s" },
          { label: "Cart Abandonment Drop", value: "-35", suffix: "%" },
          { label: "Revenue Per Visitor Lift", value: "+19", suffix: "%" }
        ],
        interactiveMode: "shopify-cart"
      },
      {
        id: "web-infrastructure",
        name: "Web Infrastructure & Maintenance",
        shortDesc: "Sub-second server tuning, automated daily backups, and strict corporate system firewall policies.",
        longDesc: "We control and optimize the underlying systems that serve your files. Our infrastructure frameworks utilize lightweight edge caches, modern SSL standards, and strict firewall configurations.",
        iconName: "Settings",
        deliverables: [
          "Automated cloud routine backup logs with instant restoration paths",
          "SSL/TLS security optimization ensuring highest rating certifications",
          "Dynamic load-balancer setups preventing downtime during traffic spikes",
          "Continuous system and library update scripts preventing exploits"
        ],
        metrics: [
          { label: "Systems SLA Guarantee", value: "99.99", suffix: "%" },
          { label: "Malicious Threat Deflection", value: "100", suffix: "%" },
          { label: "Server Response Latency", value: "< 50", suffix: "ms" }
        ],
        interactiveMode: "infra-status"
      },
      {
        id: "content-management",
        name: "Content Management Systems (CMS)",
        shortDesc: "Bespoke headless configuration with GraphiQL, Contentful, and customized visual page builders.",
        longDesc: "Give your marketing staff full power to update structures without breaking live components. We configure clean visual interfaces, nested layout grids, and instant publishing workflows.",
        iconName: "Database",
        deliverables: [
          "Custom tailored Contentful or Sanity workspace interfaces",
          "Repeatable visual layout blocks customized for dynamic styling",
          "Instant webhook configuration rebuilding client static files in seconds",
          "Roles and permissions blueprints defending code structures from errors"
        ],
        metrics: [
          { label: "Content Publishing Loop", value: "< 2", suffix: " mins" },
          { label: "Layout Block Options", value: "32", suffix: " elements" },
          { label: "User Access Control", value: "Defined", suffix: " roles" }
        ],
        interactiveMode: "cms-matrix"
      },
      {
        id: "ada-compliance",
        name: "ADA Compliance Services",
        shortDesc: "Bring your site fully in line with WCAG 2.2 accessibility structures to avoid litigation and help all users.",
        longDesc: "Corporate sites face increasing legal penalties due to broken screen-reader and keyboard navigation setups. We audit and rebuild components to guarantee compliance without breaking visual styles.",
        iconName: "ShieldAlert",
        deliverables: [
          "WCAG 2.2 AA validation audits detailing keyboard focus maps",
          "Interactive ARIA attributes configured for dynamic modal screens",
          "Optimized background color ratios ensuring strict text contrast scoring",
          "Keyboard accessible nav controls bypass elements mapped correctly"
        ],
        metrics: [
          { label: "WCAG Accessibility Score", value: "100", suffix: "/100" },
          { label: "Legal Compliance Standing", value: "Secured", suffix: "" },
          { label: "Screen-Reader Compatibility", value: "Optimal", suffix: "" }
        ],
        interactiveMode: "accessibility-auditor"
      }
    ]
  }
];
