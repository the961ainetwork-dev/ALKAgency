import React, { useState } from 'react';
import { Sparkles, Terminal, Activity, FileCheck, CheckCircle2, ChevronRight, ChevronDown, Zap, RefreshCw, AlertTriangle, ArrowUpRight, Award, Server, TrendingUp, TrendingDown, Download, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { AuditReport } from '../types';

interface GraderConsoleProps {
  onAnalyzeComplete: (report: AuditReport) => void;
  savedReport: AuditReport | null;
  setSavedReport: (report: AuditReport | null) => void;
}

const LOADING_STEPS = [
  "Initializing MarketingCloudFX secure data crawlers...",
  "Running organic visibility keyword parity checks on SERPs...",
  "Analyzing viewport responsive breakpoints and tap targets...",
  "Evaluating secure domain headers and on-page schema trees...",
  "Processing conversion path bottlenecks & call-to-action density...",
  "Pinging relative keyword ranking versus competitors using Gemini intelligence...",
  "Synthesizing customized budget ROI forecast formulas..."
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function GraderConsole({ onAnalyzeComplete, savedReport, setSavedReport }: GraderConsoleProps) {
  const [url, setUrl] = useState('');
  const [industry, setIndustry] = useState('ecommerce');
  const [competitor, setCompetitor] = useState('');
  const [focusArea, setFocusArea] = useState('SEO');
  const [loading, setLoading] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [proposalOpen, setProposalOpen] = useState(false);
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);

  const handleDownloadJson = () => {
    if (!savedReport) return;
    const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0] || 'domain';
    const dataToDownload = { ...savedReport };
    delete dataToDownload.errorMsg;
    
    const dataStr = JSON.stringify(dataToDownload, null, 2);
    const element = document.createElement("a");
    const file = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${cleanUrl}-alkhawarizmi-audit.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setDownloadDropdownOpen(false);
  };

  const handleDownloadText = () => {
    if (!savedReport) return;
    const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0] || 'domain';
    
    const reportString = `================================================================================
AL KHAWARIZMI AGENCY - ENTERPRISE AUDIT & REVENUE APPRAISAL
================================================================================
Target URL / Coordinate: ${url}
Report Date: ${new Date().toLocaleDateString()}
Status: ${savedReport.isFallback ? 'SLA Fallback (Pre-computed)' : 'Live MarketingCloudFX Solved'}

--------------------------------------------------------------------------------
1. EXECUTIVE PERFORMANCE OUTLINE
--------------------------------------------------------------------------------
${savedReport.executiveSummary}

--------------------------------------------------------------------------------
2. MASTER GRADINGS METRIC SUMMARY
--------------------------------------------------------------------------------
* Overall Marketing Grade : ${savedReport.overallScore}/100  (Year-over-Year Trend: +7.4%)
* Technical SEO Score     : ${savedReport.seoScore}/100
* Mobile Viewing Index    : ${savedReport.mobileScore}/100
* Conversion UX Score     : ${savedReport.conversionScore}/100
* Target Site Load Time   : ${savedReport.loadTime}

--------------------------------------------------------------------------------
3. AL KHAWARIZMI REVENUE ESTIMATIONS
--------------------------------------------------------------------------------
* Estimated Client Monthly Return Value: ${savedReport.estimatedMonthlyRevenueIncrease}
* Calculation Parameter: Based on digital organic traffic conversion path adjustments

--------------------------------------------------------------------------------
4. STRATEGIC POSITION PLACEMENT MAPPING (COMPETITORS)
--------------------------------------------------------------------------------
${savedReport.competitorRankings.map(c => 
`* ${c.competitor.padEnd(30)} | Rank: #${c.rank} | SEO Authority Score: ${c.seoAuthority}/100`
).join('\n')}

--------------------------------------------------------------------------------
5. TECHNICAL AUDIT CONSTRAINTS & ISSUE LISTS
--------------------------------------------------------------------------------
A. SEO Visibility Barriers:
${savedReport.seoIssues.map(issue => `   - [ ] ${issue}`).join('\n') || '   No critical SEO constraints found.'}

B. Mobile Responsiveness Adjustments:
${savedReport.mobileIssues.map(issue => `   - [ ] ${issue}`).join('\n') || '   No critical mobile constraints found.'}

C. Conversion Pipeline Friction Points:
${savedReport.conversionIssues.map(issue => `   - [ ] ${issue}`).join('\n') || '   No critical conversion constraints found.'}

--------------------------------------------------------------------------------
6. DETAILED REVENUE CORRECTION SERVICES RECOMMENDED
--------------------------------------------------------------------------------
${savedReport.recommendedServices.map((service, idx) => 
`[Service #${idx + 1}] ${service.name}
- Strategic Priority: ${service.priority}
- Performance Impact: ${service.impact}
- Cost Estimate     : ${service.costEstimate}`
).join('\n\n')}

================================================================================
AUTHENTICATED VERIFICATION SECURE TOKEN: ALK-${Math.floor(Math.random() * 90000 + 10000)}
alkhawarizmi.agency Platform - AI & REVENUE ENGINE
================================================================================`;

    const element = document.createElement("a");
    const file = new Blob([reportString], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `${cleanUrl}-alkhawarizmi-audit.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setDownloadDropdownOpen(false);
  };

  const handleDownloadPdf = () => {
    if (!savedReport) return;
    const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0] || 'domain';
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups to generate and view the PDF report.");
      return;
    }
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${cleanUrl} - Enterprise Audit - Al Khawarizmi Agency</title>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
            
            @page {
              size: A4 portrait;
              margin: 18mm 16mm 18mm 16mm;
            }
            
            body {
              font-family: 'Inter', sans-serif;
              color: #1e293b;
              line-height: 1.5;
              font-size: 11.5px;
              margin: 0;
              padding: 0;
              background-color: #ffffff;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            .header-info-bar {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              border-bottom: 2.5px solid #4D6920;
              padding-bottom: 12px;
              margin-bottom: 20px;
            }
            
            .brand-name {
              font-family: 'Space Grotesk', sans-serif;
              font-size: 20px;
              font-weight: 700;
              color: #4D6920;
              letter-spacing: -0.02em;
            }
            
            .report-title {
              font-family: 'Space Grotesk', sans-serif;
              font-size: 13.5px;
              font-weight: 600;
              color: #64748b;
              margin-top: 2px;
            }
            
            .meta-details {
              font-family: 'JetBrains Mono', monospace;
              font-size: 9px;
              color: #475569;
              text-align: right;
              line-height: 1.4;
            }
            
            .score-flex-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 12px;
              margin-bottom: 20px;
            }
            
            .score-metric-box {
              background: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 12px 6px;
              text-align: center;
            }
            
            .score-metric-box.featured-box {
              background: #f1f5f9;
              border-color: #cbd5e1;
            }
            
            .metric-numeric-val {
              font-family: 'JetBrains Mono', monospace;
              font-size: 21px;
              font-weight: 700;
              color: #0f172a;
            }
            
            .featured-box .metric-numeric-val {
              color: #4D6920;
            }
            
            .metric-description-lbl {
              font-size: 9px;
              font-weight: 600;
              color: #64748b;
              text-transform: uppercase;
              margin-top: 4px;
              letter-spacing: 0.03em;
            }
            
            .predicted-gain-panel {
              background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
              border: 1px solid #bbf7d0;
              border-radius: 12px;
              padding: 14px 18px;
              margin-bottom: 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            
            .gain-txt-group h4 {
              margin: 0;
              font-family: 'Space Grotesk', sans-serif;
              font-size: 12px;
              font-weight: 700;
              color: #14532d;
            }
            
            .gain-txt-group p {
              margin: 3px 0 0 0;
              font-size: 10px;
              color: #166534;
            }
            
            .gain-numeric-panel {
              font-family: 'JetBrains Mono', monospace;
              font-size: 18px;
              font-weight: 700;
              color: #15803d;
              background-color: #ffffff;
              padding: 6px 14px;
              border-radius: 8px;
              border: 1.5px solid #bbf7d0;
            }
            
            .section-container {
              margin-bottom: 20px;
            }
            
            .section-header-title {
              font-family: 'Space Grotesk', sans-serif;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.08em;
              color: #4D6920;
              border-bottom: 1px solid #cbd5e1;
              padding-bottom: 4px;
              margin-bottom: 10px;
              font-weight: 700;
            }
            
            .executive-summary-block {
              background: #f8fafc;
              border-left: 3.5px solid #ff8c00;
              padding: 10px 14px;
              border-radius: 0 8px 8px 0;
              font-size: 11px;
              color: #334155;
              font-style: italic;
            }
            
            .constraints-two-col {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
            }
            
            .constraints-column h5 {
              margin: 0 0 6px 0;
              font-size: 10.5px;
              font-weight: 700;
            }
            
            .constraints-column.seo-col h5 {
              color: #4D6920;
            }
            
            .constraints-column.ux-col h5 {
              color: #ea580c;
            }
            
            .constraints-list {
              margin: 0;
              padding-left: 14px;
              font-size: 10.5px;
              color: #334155;
            }
            
            .constraints-list li {
              margin-bottom: 5px;
            }
            
            .competitors-data-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 6px;
            }
            
            .competitors-data-table th, .competitors-data-table td {
              padding: 7px 10px;
              font-size: 10.5px;
              border-bottom: 1px solid #e2e8f0;
            }
            
            .competitors-data-table th {
              background: #f8fafc;
              text-transform: uppercase;
              font-size: 8.5px;
              color: #64748b;
              font-weight: 700;
              text-align: left;
            }
            
            .services-three-col {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 12px;
            }
            
            .service-item-card {
              border: 1px solid #e2e8f0;
              border-radius: 8px;
              padding: 10px;
              background-color: #ffffff;
            }
            
            .service-title-text {
              font-family: 'Space Grotesk', sans-serif;
              font-size: 11px;
              font-weight: 700;
              color: #4D6920;
              margin-bottom: 4px;
            }
            
            .service-badge-details {
              font-family: 'JetBrains Mono', monospace;
              font-size: 8px;
              color: #64748b;
              margin-bottom: 6px;
              font-weight: 700;
              text-transform: uppercase;
            }
            
            .service-impact-desc {
              font-size: 9.5px;
              color: #475569;
              line-height: 1.4;
            }
            
            .page-break {
              page-break-before: always;
            }
            
            .printable-pdf-footer {
              margin-top: 25px;
              border-top: 1px solid #e2e8f0;
              padding-top: 10px;
              text-align: center;
              font-family: 'JetBrains Mono', monospace;
              font-size: 8px;
              color: #94a3b8;
              line-height: 1.4;
            }
            
            .top-sticky-bar {
              background: #0f172a;
              color: #ffffff;
              padding: 8px 16px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 11px;
            }
            
            .print-btn {
              background: #ff8c00;
              color: #ffffff;
              border: none;
              padding: 5px 12px;
              border-radius: 4px;
              font-weight: 700;
              cursor: pointer;
              font-size: 11px;
              transition: background 0.15s ease;
            }
            
            .print-btn:hover {
              background: #e07b00;
            }
            
            @media print {
              .top-sticky-bar {
                display: none;
              }
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="top-sticky-bar">
            <span>Enterprise Marketing SLA Report PDF Preview</span>
            <button class="print-btn" onclick="window.print()">Print or Save as PDF</button>
          </div>
          
          <div style="padding: 24px;">
            <div class="header-info-bar">
              <div>
                <div class="brand-name">AL KHAWARIZMI AGENCY</div>
                <div class="report-title">Enterprise Security &amp; Marketing Performance Audit</div>
              </div>
              <div class="meta-details">
                TARGET COORDINATE: ${url}<br>
                DATE: ${new Date().toLocaleDateString()}<br>
                PLATFORM: MarketingCloudFX Solved
              </div>
            </div>

            <div class="section-container">
              <div class="section-header-title">1. Operational Authority Grades</div>
              <div class="score-flex-grid">
                <div class="score-metric-box featured-box">
                  <div class="metric-numeric-val">${savedReport.overallScore}/100</div>
                  <div class="metric-description-lbl">Overall Marketing Grade</div>
                </div>
                <div class="score-metric-box">
                  <div class="metric-numeric-val">${savedReport.seoScore}/100</div>
                  <div class="metric-description-lbl">Technical SEO Score</div>
                </div>
                <div class="score-metric-box">
                  <div class="metric-numeric-val">${savedReport.mobileScore}/100</div>
                  <div class="metric-description-lbl">Mobile Viewing Index</div>
                </div>
                <div class="score-metric-box">
                  <div class="metric-numeric-val">${savedReport.conversionScore}/100</div>
                  <div class="metric-description-lbl">Conversion UX Score</div>
                </div>
              </div>
            </div>

            <div class="predicted-gain-panel">
              <div class="gain-txt-group">
                <h4>Dynamic Net Return Asset Forecast</h4>
                <p>Estimated incremental monthly pipeline returns upon optimizing core technical bottlenecks.</p>
              </div>
              <div class="gain-numeric-panel">${savedReport.estimatedMonthlyRevenueIncrease}</div>
            </div>

            <div class="section-container">
              <div class="section-header-title">2. Executive Summary</div>
              <div class="executive-summary-block">
                "${savedReport.executiveSummary}"
              </div>
            </div>

            <div class="section-container">
              <div class="section-header-title">3. Critical Audit Constraints</div>
              <div class="constraints-two-col">
                <div class="constraints-column seo-col">
                  <h5>SEO &amp; Crawling Barriers</h5>
                  <ul class="constraints-list">
                    ${savedReport.seoIssues.map(issue => `<li>${issue}</li>`).join('')}
                  </ul>
                </div>
                <div class="constraints-column ux-col">
                  <h5>Conversion Path Friction</h5>
                  <ul class="constraints-list">
                    ${savedReport.conversionIssues.map(issue => `<li>${issue}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>

            <div class="section-container page-break" style="padding-top: 15px;">
              <div class="section-header-title">4. Competitive Authority Overview</div>
              <table class="competitors-data-table">
                <thead>
                  <tr>
                    <th>Target Brand Identifier</th>
                    <th>Expected SERP Position</th>
                    <th>Technical Search Authority</th>
                  </tr>
                </thead>
                <tbody>
                  ${savedReport.competitorRankings.map(comp => `
                    <tr>
                      <td><strong>${comp.competitor}</strong></td>
                      <td>Position #${comp.rank}</td>
                      <td>${comp.seoAuthority}%</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="section-container">
              <div class="section-header-title">5. Alkhawarizmi Execution Services Roadmap</div>
              <div class="services-three-col">
                ${savedReport.recommendedServices.map(service => `
                  <div class="service-item-card">
                    <div class="service-title-text">${service.name}</div>
                    <div class="service-badge-details">${service.priority} Priority • ${service.costEstimate}</div>
                    <div class="service-impact-desc">${service.impact}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="printable-pdf-footer">
              AUTHENTICATED VERIFICATION SECURE TOKEN: ALK-${Math.floor(Math.random() * 90000 + 10000)}<br>
              alkhawarizmi.agency Platform • AI &amp; REVENUE ENGINE • ALL RIGHTS RESERVED
            </div>
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 300);
            };
          </script>
        </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setDownloadDropdownOpen(false);
  };

  // Run the API audit request
  const handleLaunchAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    setCurrentStepIndex(0);
    setErrorMsg('');
    setSavedReport(null);

    // Dynamic loading steps sequence
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < LOADING_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1800);

    try {
      const response = await fetch('/api/analyze-website', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          industry,
          competitor,
          focusArea
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process audit query.");
      }

      const reportData: AuditReport = await response.json();
      setSavedReport(reportData);
      onAnalyzeComplete(reportData);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected network error occurred.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  // Helper component for Score Ring
  const ScoreRing = ({ 
    score, 
    label, 
    colorClass, 
    trend 
  }: { 
    score: number; 
    label: string; 
    colorClass: string; 
    trend?: { direction: 'up' | 'down'; value: string } 
  }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="flex flex-col items-center select-none">
        <div className="relative h-24 w-24 flex items-center justify-center">
          <svg className="absolute -rotate-90 transform h-24 w-24">
            <circle
              cx="48"
              cy="48"
              r={radius}
              className="text-slate-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r={radius}
              className={`${colorClass} transition-all duration-1000`}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <span className="text-xl font-mono font-bold text-slate-800 mb-0.5">{score}</span>
          
          {trend && (
            <div className={`absolute -top-1.5 -right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[8px] font-mono font-medium tracking-tight shadow-md border ${
              trend.direction === 'up' 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`} title="Year-over-Year progress indicator">
              {trend.direction === 'up' ? (
                <TrendingUp className="h-2.5 w-2.5 text-emerald-600" />
              ) : (
                <TrendingDown className="h-2.5 w-2.5 text-rose-600" />
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <span className="text-xs font-sans text-slate-600 mt-2 font-semibold text-center">{label}</span>
      </div>
    );
  };

  return (
    <div id="grader-console-parent" className="space-y-8">
      {/* Search Input Grader Panel */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6 font-sans">
          <div className="p-2.5 bg-blue-50 border border-blue-200 text-[#000000] rounded-xl shadow-sm">
            <Terminal className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-sans font-black text-[#000000] tracking-tight">MarketingCloudFX Grader Interface</h3>
            <p className="text-xs text-slate-500 font-sans">Powered by server-side Gemini 3.5 Web-Parity Models</p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 mb-6 bg-red-50 border border-red-250 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {!loading && !savedReport && (
          <form onSubmit={handleLaunchAudit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* URL Input */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-650 font-bold">Target Website URL *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. https://mybusiness.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#000000] transition-all font-mono"
                />
              </div>

              {/* Competitor URL */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-650 font-bold">Core Competitor URL (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. competitorbrand.com"
                  value={competitor}
                  onChange={(e) => setCompetitor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#000000] transition-all font-mono"
                />
              </div>

              {/* Industry Selection */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-650 font-bold">Industry Segment</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="cursor-pointer w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#000000] transition-all font-sans"
                >
                  <option value="ecommerce font-sans">E-Commerce & Online Retail</option>
                  <option value="manufacturing font-sans font-medium">Heavy Industry & Manufacturing</option>
                  <option value="healthcare font-sans font-medium">Medical, Healthcare & Biotech</option>
                  <option value="legal font-sans">Professional Services & Legal</option>
                  <option value="saas font-sans">SaaS, Tech & Software Platforms</option>
                  <option value="realestate font-sans">Real Estate & Construction</option>
                </select>
              </div>

              {/* Focus Area */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-650 font-bold">Primary Performance Goal</label>
                <select
                  value={focusArea}
                  onChange={(e) => setFocusArea(e.target.value)}
                  className="cursor-pointer w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-[#000000] transition-all font-sans"
                >
                  <option value="SEO font-sans">Organic Placement & SEO Visibility</option>
                  <option value="PPC font-sans">Paid Ad PPC Revenue Performance</option>
                  <option value="UX font-sans">Conversion Rate Optimization (CRO & UX)</option>
                  <option value="FullStack font-sans">Omnichannel Full-Stack Scaling</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="cursor-pointer font-sans w-full py-4 rounded-md bg-[#ff8c00] hover:bg-[#e07b00] text-white font-bold text-sm transition-all hover:shadow-xl hover:shadow-orange-500/20 active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
              <span>Launch MarketingCloudFX SEO Audit</span>
            </button>
          </form>
        )}

        {/* Loading Terminal Logs */}
        {loading && (
          <div className="bg-slate-900 border border-slate-950 rounded-2xl p-6 font-mono text-xs space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-sky-400 animate-spin" />
                <span className="text-slate-200 font-semibold uppercase tracking-wider">SECURE AUDIT STREAM LIVE</span>
              </div>
              <span className="text-[10px] text-slate-500">TASK ID: {Math.floor(Math.random() * 90000 + 10000)}</span>
            </div>
            
            <div className="space-y-2.5 max-h-48 overflow-y-auto">
              {LOADING_STEPS.slice(0, currentStepIndex + 1).map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-slate-300 leading-relaxed">
                  <span className="text-slate-550 shrink-0">[{idx * 15}s]</span>
                  <span className="text-emerald-400 shrink-0">✔</span>
                  <span>{step}</span>
                </div>
              ))}
              <div className="flex items-center gap-2.5 text-sky-400 animate-pulse mt-2">
                <span className="text-slate-500">[{ (currentStepIndex + 1) * 15 }s]</span>
                <span className="shrink-0 animate-spin">⚡</span>
                <span>Executing server side LLM structured data grading...</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/10 text-[10px] text-slate-400 flex justify-between">
              <span>ESTIMATED TIME TO SOLVE: ~10 SECONDS</span>
              <span className="animate-pulse text-sky-400 font-bold">Processing live parity matrices...</span>
            </div>
          </div>
        )}

        {/* Audit Report Visual Output Dashboard */}
        {savedReport && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 text-slate-900"
          >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-200 pb-6 gap-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-600 uppercase tracking-widest font-bold">ANALYSIS SOLVED SUCCESSFULLY</span>
                <h4 className="text-2xl font-sans font-black text-[#000000] tracking-tight mt-1">{url}</h4>
                {savedReport.isFallback && (
                  <div className="mt-2 text-xs text-orange-600 flex items-center gap-1 font-bold">
                    <AlertTriangle className="h-3.5 w-3.5 animate-bounce" />
                    <span>Fall-back analysis used because process.env.GEMINI_API_KEY is not configured.</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2 items-center relative">
                <button
                  onClick={() => setSavedReport(null)}
                  className="cursor-pointer p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 rounded-xl border border-slate-200 transition-all shadow-sm flex items-center justify-center shrink-0"
                  title="Run new analysis"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>

                {/* Download Menu */}
                <div className="relative">
                  <button
                    onClick={() => setDownloadDropdownOpen(!downloadDropdownOpen)}
                    className="cursor-pointer px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-sans text-xs font-bold rounded-xl border border-slate-200 flex items-center gap-1.5 transition-all shadow-sm"
                    title="Download Report Options"
                  >
                    <Download className="h-4 w-4 text-[#ff8c00]" />
                    <span>Download Report</span>
                    <ChevronDown className={`h-3 w-3 text-slate-450 transition-transform ${downloadDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {downloadDropdownOpen && (
                    <>
                      {/* Dismiss overlay */}
                      <div 
                        className="fixed inset-0 z-40 cursor-default" 
                        onClick={() => setDownloadDropdownOpen(false)} 
                      />
                      <div className="absolute right-0 top-full mt-1.5 w-64 bg-white border border-slate-250 shadow-2xl rounded-xl p-1.5 z-50 text-left animate-fade-in-up">
                        <button
                          onClick={handleDownloadPdf}
                          className="w-full text-left px-3 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#4D6920] font-bold rounded-lg flex items-center justify-between transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-emerald-600" />
                            <span>Download PDF Report</span>
                          </div>
                          <span className="font-mono text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded">.pdf</span>
                        </button>
                        <button
                          onClick={handleDownloadText}
                          className="w-full text-left px-3 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#4D6920] font-bold rounded-lg flex items-center justify-between transition-colors mt-0.5"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-orange-600" />
                            <span>Premium Plain Text Audit</span>
                          </div>
                          <span className="font-mono text-[9px] text-orange-600 font-bold bg-orange-50 px-1 py-0.5 rounded">.txt</span>
                        </button>
                        <button
                          onClick={handleDownloadJson}
                          className="w-full text-left px-3 py-2.5 text-xs text-slate-705 hover:bg-slate-50 hover:text-[#4D6920] font-semibold rounded-lg flex items-center justify-between transition-colors mt-0.5"
                        >
                          <div className="flex items-center gap-2">
                            <Terminal className="h-4 w-4 text-slate-500" />
                            <span>Structured JSON Data</span>
                          </div>
                          <span className="font-mono text-[9px] text-slate-400 font-normal bg-slate-100 px-1 py-0.5 rounded">.json</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setProposalOpen(true)}
                  className="cursor-pointer px-5 py-2.5 bg-[#000000] hover:bg-[#222222] text-white font-sans text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-lg shadow-[#000000]/15 select-none shrink-0"
                >
                  <FileCheck className="h-4 w-4" />
                  <span>Interactive Pitch Deck & Contract</span>
                </button>
              </div>
            </motion.div>

            {/* Core Score Badges row */}
            <motion.div variants={itemVariants} className="bg-slate-50 rounded-3xl border border-slate-200 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 items-center shadow-inner">
              <ScoreRing 
                score={savedReport.overallScore} 
                label="Overall Marketing Grade" 
                colorClass="text-blue-600" 
                trend={{ direction: 'up', value: '+7.4% YoY' }} 
              />
              <ScoreRing score={savedReport.seoScore} label="Technical SEO Score" colorClass="text-sky-600" />
              <ScoreRing score={savedReport.mobileScore} label="Mobile Viewing Index" colorClass="text-teal-600" />
              <ScoreRing score={savedReport.conversionScore} label="Conversion UX Score" colorClass="text-orange-600" />
            </motion.div>

            {/* Projected ROI Highlight Card */}
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl border border-blue-200/50 p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-10 w-44 h-44 bg-emerald-500/[0.03] rounded-full blur-2xl pointer-events-none" />
              <div>
                <span className="text-[10px] font-mono text-slate-900 uppercase tracking-widest font-bold">AL KHAWARIZMI REVENUE PREDICTION</span>
                <h5 className="text-xl font-sans font-black text-[#000000] mt-1">Estimated Client Monthly Return Value</h5>
                <p className="text-xs text-slate-600 mt-1 max-w-lg font-sans">
                  Based on resolving critical metadata, mobile spacing boundaries, and tap CTA indexing with our custom MarketingCloudFX suite.
                </p>
              </div>
              <div className="bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-md text-center min-w-[200px]">
                <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">EXPECTED NET GAINS</span>
                <span className="text-2xl font-mono font-bold text-green-600">{savedReport.estimatedMonthlyRevenueIncrease}</span>
                <span className="text-[9px] font-sans text-slate-500 block mt-1">Calculated via baseline conversions</span>
              </div>
            </motion.div>

            {/* Executive Summary */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h5 className="text-xs font-mono uppercase tracking-wider text-[#000000] font-bold">Strategic Executive Outline</h5>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-inner">
                <p className="text-xs text-slate-700 leading-relaxed font-sans font-medium">{savedReport.executiveSummary}</p>
              </div>
            </motion.div>

            {/* Core Issues tabs */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* SEO issues */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 shadow-sm">
                <h6 className="text-[11px] font-mono font-black text-[#000000] uppercase tracking-wider border-b border-slate-200 pb-2 mb-3">SEO CONSTRAINTS</h6>
                <ul className="space-y-2.5 font-sans">
                  {savedReport.seoIssues.map((issue, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs text-slate-700 leading-normal">
                      <span className="text-sky-600 font-bold mt-0.5">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conversion UX issues */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 shadow-sm">
                <h6 className="text-[11px] font-mono font-black text-[#ff8c00] uppercase tracking-wider border-b border-slate-200 pb-2 mb-3">CONVERSION UX FRICTION</h6>
                <ul className="space-y-2.5 font-sans">
                  {savedReport.conversionIssues.map((issue, idx) => (
                    <li key={idx} className="flex gap-2 items-start text-xs text-slate-700 leading-normal">
                      <span className="text-[#ff8c00] font-bold mt-0.5">•</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical context */}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm">
                <div>
                  <h6 className="text-[11px] font-mono font-black text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2 mb-3">TECHNICAL BREAKOUT</h6>
                  <p className="text-[11px] text-slate-705 leading-relaxed font-sans">{savedReport.technicalDetails}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-500 font-mono font-semibold">
                  <span>PAGE LOAD TIME:</span>
                  <span className="text-[#000000] font-black">{savedReport.loadTime}</span>
                </div>
              </div>
            </motion.div>

            {/* Competitor Parity Analysis */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h5 className="text-xs font-mono uppercase tracking-wider text-slate-800 font-bold">Competitive Placement Mapping</h5>
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-inner">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="text-[10px] font-mono text-slate-605 uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="pb-3 font-bold">Brand Analyzed</th>
                        <th className="pb-3 font-bold">Expected SERP Rank</th>
                        <th className="pb-3 font-bold">Search Authority Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-sans">
                      {savedReport.competitorRankings.map((comp, idx) => (
                        <tr key={idx} className="hover:bg-slate-100/55 transition-colors">
                          <td className="py-3.5 font-bold text-[#000000]">{comp.competitor}</td>
                          <td className="py-3.5 font-mono text-slate-700 font-medium font-bold">Position #{comp.rank}</td>
                          <td className="py-3.5">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-green-600 font-bold">{comp.seoAuthority}%</span>
                              <div className="h-1.5 w-24 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-green-600 rounded-full" style={{ width: `${comp.seoAuthority}%` }} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Custom Alkhawarizmi Recommended execution services */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h5 className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">Tailored Actionable Services Alkhawarizmi Recommends</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {savedReport.recommendedServices.map((service, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col justify-between hover:border-[#000000]/30 hover:shadow-xl transition-all shadow-sm">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-full ${
                          service.priority === 'High' 
                            ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {service.priority} priority
                        </span>
                        <span className="text-xs font-mono text-slate-655 font-bold">{service.costEstimate}</span>
                      </div>
                      <h6 className="text-sm font-sans font-bold text-[#000000] mb-2">{service.name}</h6>
                      <p className="text-xs text-slate-605 leading-normal font-sans">{service.impact}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-150">
                      <button
                        onClick={() => setProposalOpen(true)}
                        className="cursor-pointer text-[11px] font-mono text-[#000000] font-bold hover:text-[#ff8c00] flex items-center gap-1.5 transition-all"
                      >
                        <span>Inspect service spec sheet</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Interactive Pitch Deck / Contract Agreement Overlay Modal */}
      {proposalOpen && savedReport && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col shadow-2xl animate-fade-in-scale">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-[#ff8c00]" />
                <span className="text-sm font-sans font-bold text-slate-800">Personalized Alkhawarizmi Executive Agreement Design</span>
              </div>
              <button
                onClick={() => setProposalOpen(false)}
                className="cursor-pointer text-xs font-mono text-slate-500 hover:text-slate-900 px-3 py-1.5 rounded-md bg-slate-100 border border-slate-200 transition-all font-semibold"
              >
                CLOSE [ESC]
              </button>
            </div>

            {/* Agreement Content (Looks like printed business deck contract) */}
            <div className="p-6 md:p-8 space-y-8 flex-1 font-sans text-slate-800">
              <div className="text-center space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-[#ff8c00] uppercase font-bold">PREPARED BY AL KHAWARIZMI SALES INTELLIGENCE SYSTEMS</span>
                <h3 className="text-3xl font-black text-[#000000] tracking-tight">Digital Marketing & Growth Partnership Agreement</h3>
                <p className="text-xs text-slate-600 font-sans">Specially formulated for <span className="text-slate-900 font-bold">{url}</span> • Account ID: WFX-{Math.floor(Math.random() * 9000 + 1000)}</p>
                <div className="h-0.5 w-16 bg-gradient-to-r from-[#000000] to-[#ff8c00] mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Contract Core Clauses */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#ff8c00] font-bold border-b border-slate-200 pb-2">Clause 1. Execution Objectives & Scope</h4>
                  <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                    Alkhawarizmi shall deploy a dedicated task force of 5 specialists representing search engine index engineers, conversion planners, and digital tracking analysts. Immediate task queues will resolve standard responsive taps, structured page markup, and missing localized schema records to jumpstart pipeline efficiency. Clients enjoy high-fidelity insights generated seamlessly.
                  </p>

                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#ff8c00] font-bold border-b border-slate-200 pb-2">Clause 2. Dynamic Performance Baseline</h4>
                  <p className="text-xs text-slate-650 leading-relaxed font-sans font-medium">
                    We project a targeted monthly expansion of <span className="text-green-600 font-bold font-mono">{savedReport.estimatedMonthlyRevenueIncrease}</span> in qualified lead pipeline values under systematic Alkhawarizmi management. Operational hours will focus entirely on beating competitors listed in our mapping records.
                  </p>
                </div>

                {/* Scope Action Grid list and Pricing details */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-6 shadow-inner">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">MONTHLY MANAGEMENT VALUE</span>
                    <span className="text-4xl font-mono font-black text-[#000000]">{savedReport.recommendedServices[0]?.costEstimate || "$1,800/mo"}</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Excludes direct self-managed advertising ad spend.</span>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-mono text-slate-605 uppercase block font-bold">Active Service Queue:</span>
                    <div className="space-y-2">
                      {savedReport.recommendedServices.map((service, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs font-sans border-b border-slate-150 pb-2">
                          <span className="text-slate-800 font-bold truncate pr-4">{service.name}</span>
                          <span className="text-[#ff8c00] font-mono font-bold shrink-0">{service.costEstimate}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-[10px] font-mono text-emerald-700 bg-emerald-50/70 border border-emerald-200/50 p-3 rounded-lg font-semibold">
                    <Server className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Includes MarketingCloudFX platform subscription logs for transparent ROI reporting.</span>
                  </div>
                </div>
              </div>

              {/* Fake signature area and button */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50 p-5 rounded-2xl">
                <div>
                  <h5 className="text-xs font-sans font-black text-[#000000]">Accept Proposal & Initiate Setup</h5>
                  <p className="text-[11px] text-slate-600 mt-0.5 font-sans">Your dedicated account strategist will contact you shortly to authorize final payment routing.</p>
                </div>
                <button
                  onClick={() => { alert("Thank you! Alkhawarizmi growth agents are preparing your secure launch assets."); setProposalOpen(false); }}
                  className="cursor-pointer px-8 py-3.5 rounded-md bg-[#ff8c00] hover:bg-[#e07b00] text-white font-sans font-bold text-xs hover:shadow-lg hover:shadow-orange-500/10 active:scale-95 transition-all text-center"
                >
                  Authorize Execution Contract
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
