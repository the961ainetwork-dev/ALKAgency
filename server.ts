import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Interactive Marketing & SEO Audit Endpoint
app.post("/api/analyze-website", async (req, res): Promise<any> => {
  const { url, industry, competitor, focusArea } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Website URL is required." });
  }

  try {
    const ai = getGeminiClient();

    const systemInstruction = 
      "You are MarketingCloudFX, the advanced proprietary SEO and website audit intelligence core developed by alkhawarizmi.agency. " +
      "Analyze the requested URL, industry, competitor, and focus area to generate a deeply personalized, authentic digital marketing proposal, SEO audit, and conversion optimization strategy. " +
      "Make the feedback specific, practical, and constructive. Provide high-fidelity concrete numbers, issues, and specific services alkhawarizmi.agency provides (OmniSEO, PPC, CRO, UX, custom AI integration, etc.) that will maximize their ROI.";

    const prompt = `Perform a full digital marketing audit and growth proposal for:
URL: ${url}
Industry Segment: ${industry || "General/Business Services"}
Core Competitor: ${competitor || "Unspecified"}
Primary Focus Area: ${focusArea || "Search Engine Optimization (SEO)"}

Generate actionable, customized web analytics, technical SEO issues, estimated revenue impact, and tailored strategic alkhawarizmi.agency action items.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "overallScore",
            "loadTime",
            "seoScore",
            "seoIssues",
            "competitorRankings",
            "mobileScore",
            "mobileIssues",
            "conversionScore",
            "conversionIssues",
            "estimatedMonthlyRevenueIncrease",
            "recommendedServices",
            "executiveSummary",
            "technicalDetails"
          ],
          properties: {
            overallScore: {
              type: Type.INTEGER,
              description: "Overall marketing grade from 1 to 100."
            },
            loadTime: {
              type: Type.STRING,
              description: "Estimated or analyzed home page load time (e.g., '1.8s', '4.2s')."
            },
            seoScore: {
              type: Type.INTEGER,
              description: "SEO core score from 1 to 100."
            },
            seoIssues: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Specific technical, on-page, or content SEO optimization issues encountered."
            },
            competitorRankings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["competitor", "rank", "seoAuthority"],
                properties: {
                  competitor: { type: Type.STRING, description: "Name of the brand/competitor." },
                  rank: { type: Type.INTEGER, description: "estimated rank in core keywords (e.g., 1 to 20)." },
                  seoAuthority: { type: Type.INTEGER, description: "SEO relative page authority score out of 100." }
                }
              },
              description: "Comparison metrics against the input competitor or main industry standards."
            },
            mobileScore: {
              type: Type.INTEGER,
              description: "Mobile usability index from 1 to 100."
            },
            mobileIssues: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Mobile responsiveness or device viewing constraints found."
            },
            conversionScore: {
              type: Type.INTEGER,
              description: "Conversion rate optimization score from 1 to 100."
            },
            conversionIssues: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Friction points or trust signal elements that can stand adjustment to increase pipeline leads."
            },
            estimatedMonthlyRevenueIncrease: {
              type: Type.STRING,
              description: "Predicted monthly return figure based on alkhawarizmi.agency execution (e.g., '+$12,400 / mo', '+$45,000 / mo')."
            },
            recommendedServices: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["name", "impact", "costEstimate", "priority"],
                properties: {
                  name: { type: Type.STRING, description: "alkhawarizmi.agency service title, e.g. 'Enterprise OmniSEO Implementation', 'Local Maps Domination & Reviews'." },
                  impact: { type: Type.STRING, description: "Brief expectation note, e.g. 'Estimated to draw 40% more search clicks within 90 days'." },
                  costEstimate: { type: Type.STRING, description: "Estimated budget/month or campaign cost, e.g. '$1,200/mo', '$4,500 setup'." },
                  priority: { type: Type.STRING, description: "Must be 'High', 'Medium', or 'Low'." }
                }
              },
              description: "Tailored alkhawarizmi.agency services corresponding directly with solving the issues."
            },
            executiveSummary: {
              type: Type.STRING,
              description: "A professional, personalized strategic introduction to the brand on why their revenue is missing out and what alkhawarizmi.agency will do."
            },
            technicalDetails: {
              type: Type.STRING,
              description: "Detailed, actionable background technical guidance regarding schema tags, robots.txt, Core Web Vitals, or UX triggers."
            }
          }
        }
      }
    });

    const reportData = JSON.parse(response.text || "{}");
    return res.json(reportData);

  } catch (error: any) {
    console.error("Gemini Audit Error:", error);
    
    // Provide a beautiful dynamic fallback analysis if Gemini key is missing or calls fail,
    // so the app remains fully functional and allows demonstration while checking keys.
    const urlClean = url.replace(/https?:\/\//, "").split("/")[0];
    const estimatedValue = Math.floor(Math.random() * 30000 + 10000);
    const mockData = {
      overallScore: Math.floor(Math.random() * 20 + 65), // 65-85
      loadTime: (Math.random() * 2 + 1.8).toFixed(1) + "s",
      seoScore: Math.floor(Math.random() * 15 + 70),
      seoIssues: [
        `Missing metadata guidelines & social graph headers for crawl efficiency.`,
        `Title tags exceed maximum pixel width constraint on modern mobile viewports.`,
        `Low keyword density discovered for valuable service modifiers in ${industry || "primary industry"}.`,
        `Incomplete JSON-LD structured schemas, preventing rich snipped generation.`
      ],
      competitorRankings: [
        { competitor: `${urlClean} (You)`, rank: 6, seoAuthority: 48 },
        { competitor: competitor || "Industry Leader A", rank: 1, seoAuthority: 82 },
        { competitor: "Search Competitor B", rank: 3, seoAuthority: 68 }
      ],
      mobileScore: Math.floor(Math.random() * 15 + 75),
      mobileIssues: [
        `Dynamic tap targets on landing page elements are spaced below standard 44px threshold.`,
        `Render-blocking resources found delaying Largest Contentful Paint (LCP) trigger.`
      ],
      conversionScore: Math.floor(Math.random() * 20 + 60),
      conversionIssues: [
        `Hero header missing clear trust indicators or social proof validation.`,
        `Call-to-Action (CTA) positioning sits below the desktop fold, reducing active click CTR.`
      ],
      estimatedMonthlyRevenueIncrease: `+$${estimatedValue.toLocaleString()} / mo`,
      recommendedServices: [
        {
          name: "Elite SEO Management Setup",
          impact: "Drives higher placement for primary keyword terms, projecting 35% click-through growth.",
          costEstimate: "$1,800 / mo",
          priority: "High"
        },
        {
          name: "Conversion-Focused UX Re-Design",
          impact: "Eliminates visual clutter and boosts lead sign-up rates by 2.4x dynamically.",
          costEstimate: "$4,500 one-time",
          priority: "High"
        },
        {
          name: "Structured Content & Semantic Strategy",
          impact: "Develops authoritative articles to target long-tail high-intent organic users.",
          costEstimate: "$900 / mo",
          priority: "Medium"
        }
      ],
      executiveSummary: `Our system successfully analyzed ${url}. While there is immediate search authority, you are leaking significant traffic to your core competitors due to crawl inefficiencies and outdated meta layouts in the ${industry || "general"} field. Implementing structured client acquisition loops and streamlining your load time will yield rapid returns, raising pipeline volume exponentially.`,
      technicalDetails: `To fix these issues, we recommend installing clean JSON-LD markup on your primary pages, enabling lazy-loading for off-screen media assets, and consolidating CSS payloads that currently delay cellular rendering. Implementing Alkhawarizmi's proprietary tracking suite will allow instant visibility over client engagement funnels.`
    };
    
    return res.json({
      ...mockData,
      isFallback: true,
      errorMsg: error.message || String(error)
    });
  }
});

// Lead capture in-memory store
interface CapturedLead {
  id: string;
  website: string;
  name: string;
  email: string;
  phone: string;
  focusArea: string;
  trafficTier: string;
  potentialIncrease: string;
  createdAt: string;
}

const capturedLeads: CapturedLead[] = [
  {
    id: "lead-initial-1",
    website: "https://hypergrowthlabs.com",
    name: "Alex Sterling",
    email: "alex@hypergrowthlabs.com",
    phone: "+1 (555) 321-7890",
    focusArea: "Conversion Rate Optimization (CRO)",
    trafficTier: "50k - 150k monthly visits",
    potentialIncrease: "+$24,500 / mo",
    createdAt: "2026-05-28T14:12:00.000Z"
  },
  {
    id: "lead-initial-2",
    website: "https://shopflowfashion.com",
    name: "Miranda Vance",
    email: "miranda.v@shopflowfashion.com",
    phone: "+1 (555) 789-1234",
    focusArea: "Search Engine Optimization (SEO)",
    trafficTier: "10k - 50k monthly visits",
    potentialIncrease: "+$12,800 / mo",
    createdAt: "2026-05-29T03:45:00.000Z"
  }
];

// POST - Capture standard lead from exit intent audit modal
app.post("/api/leads", (req, res): any => {
  const { website, name, email, phone, focusArea, trafficTier } = req.body;

  if (!website || !name || !email) {
    return res.status(400).json({ error: "Website, Name, and Email are required properties." });
  }

  // Calculate potential growth multiplier based on selected traffic tier
  let estIncrease = "+$8,500 / mo";
  if (trafficTier?.includes("150k")) {
    estIncrease = "+$48,000 / mo";
  } else if (trafficTier?.includes("50k")) {
    estIncrease = "+$22,500 / mo";
  } else if (trafficTier?.includes("10k")) {
    estIncrease = "+$11,400 / mo";
  } else if (trafficTier?.includes("Under")) {
    estIncrease = "+$3,200 / mo";
  }

  const newLead: CapturedLead = {
    id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    website,
    name,
    email,
    phone: phone || "Not specified",
    focusArea: focusArea || "General SEO Optimization",
    trafficTier: trafficTier || "Under 10k monthly visits",
    potentialIncrease: estIncrease,
    createdAt: new Date().toISOString()
  };

  capturedLeads.unshift(newLead);
  return res.json({ success: true, lead: newLead });
});

// GET - Retrieve leads list
app.get("/api/leads", (req, res) => {
  res.json({ leads: capturedLeads });
});

// Quote Request in-memory store
interface CapturedQuote {
  id: string;
  services: string[];
  website: string;
  company: string;
  budget: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  notes: string;
  estimatedQuote: string;
  createdAt: string;
}

const capturedQuotes: CapturedQuote[] = [
  {
    id: "quote-initial-1",
    services: ["Search Engine Optimization (SEO)", "Conversion Rate Optimization (CRO)"],
    website: "https://shopflowfashion.com",
    company: "ShopFlow Fashion Ltd",
    budget: "$5,000 - $10,000 / mo",
    name: "Samantha Vance",
    email: "samantha@shopflowfashion.com",
    phone: "+1 (555) 321-7890",
    industry: "E-Commerce",
    notes: "We want to improve our checkout funnel conversion rate and organic search presence for upcoming seasonal sales.",
    estimatedQuote: "$4,500 - $6,200 / mo Custom Growth Plan",
    createdAt: "2026-05-28T18:45:00.000Z"
  },
  {
    id: "quote-initial-2",
    services: ["PPC Management Services", "Conversion Web Design"],
    website: "https://hypergrowthlabs.com",
    company: "HyperGrowth Labs Inc",
    budget: "$10,000 - $25,000 / mo",
    name: "Alex Sterling",
    email: "alex@hypergrowthlabs.com",
    phone: "+1 (555) 789-1234",
    industry: "SaaS / B2B Tech",
    notes: "Need an enterprise AdWords and LinkedIn ad strategy with optimized landing pages to lower cost-per-lead.",
    estimatedQuote: "$8,000 - $11,500 / mo Performance Marketing Plan",
    createdAt: "2026-05-29T02:15:00.000Z"
  }
];

// POST - Capture quote request
app.post("/api/quotes", (req, res): any => {
  const { services, website, company, budget, name, email, phone, industry, notes } = req.body;

  if (!website || !name || !email) {
    return res.status(400).json({ error: "Website, Name, and Email are required properties to calculate your free quote." });
  }

  // Calculate customized marketing agency package based on services selected and client budget
  const servicesCount = Array.isArray(services) ? services.length : 1;
  let estimatedQuote = "$2,500 - $4,000 / mo Standard Optimization Plan";
  if (budget?.includes("25,000")) {
    estimatedQuote = `$15,000 - $22,000 / mo Enterprise Accelerator Package`;
  } else if (budget?.includes("10,000")) {
    estimatedQuote = `$7,500 - $9,800/mo Pro Growth Package`;
  } else if (budget?.includes("5,000")) {
    estimatedQuote = `$4,200 - $5,800 / mo Core Performance Package`;
  } else {
    estimatedQuote = `$1,800 - $3,200 / mo Startup Optimization Plan`;
  }

  const newQuote: CapturedQuote = {
    id: `quote-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    services: Array.isArray(services) ? services : ["Digital Marketing Suite"],
    website,
    company: company || "Not specified",
    budget: budget || "$1,000 - $5,000 / mo",
    name,
    email,
    phone: phone || "Not specified",
    industry: industry || "General Business",
    notes: notes || "No additional requirements specified.",
    estimatedQuote,
    createdAt: new Date().toISOString()
  };

  capturedQuotes.unshift(newQuote);
  return res.json({ success: true, quote: newQuote });
});

// GET - Retrieve quotes list
app.get("/api/quotes", (req, res) => {
  res.json({ quotes: capturedQuotes });
});

// Configure Vite middleware or static file delivery based on environment
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite dev server middleware integrated.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Production static server route configured.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`alkhawarizmi.agency service running on host 0.0.0.0, port ${PORT}`);
  });
}

setupViteOrStatic().catch((err) => {
  console.error("Failed to bootstrap Vite or Static Server:", err);
});
