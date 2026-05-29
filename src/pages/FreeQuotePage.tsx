import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Search, Percent, Cpu, Zap, ArrowRight, ArrowLeft, Check, 
  HelpCircle, Star, Users, BarChart3, ShieldCheck, Mail, Phone, Globe, 
  Building2, DollarSign, FileText, ChevronRight, Briefcase, Database, 
  RotateCcw, AlertTriangle, CheckCircle2, BadgeCheck, Clock, ExternalLink,
  Download, X, FileSpreadsheet
} from 'lucide-react';

interface FreeQuotePageProps {
  onGraderClick: () => void;
  onServicesClick: () => void;
}

export default function FreeQuotePage({ onGraderClick, onServicesClick }: FreeQuotePageProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [activeSegment, setActiveSegment] = useState<'calculator' | 'database'>('calculator');
  
  // Quotes database store state
  const [submittedQuotes, setSubmittedQuotes] = useState<any[]>([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');

  // Form Fields
  const [selectedServices, setSelectedServices] = useState<string[]>(["Search Engine Optimization (SEO)"]);
  const [website, setWebsite] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('$5,000 - $10,000 / mo');
  const [industry, setIndustry] = useState('E-Commerce');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Validation States
  const [websiteError, setWebsiteError] = useState('');
  const [companyError, setCompanyError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [websiteTouched, setWebsiteTouched] = useState(false);
  const [companyTouched, setCompanyTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  // Simulation loading states
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  // Stats Counters
  const [timeLeft, setTimeLeft] = useState(389); // 6m 29s
  const [slotsRemaining, setSlotsRemaining] = useState(4);

  // Initialize countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 389);
    }, 1000);

    const slotTimer = setInterval(() => {
      setSlotsRemaining(prev => prev > 1 ? prev - 1 : 4);
    }, 45000);

    return () => {
      clearInterval(timer);
      clearInterval(slotTimer);
    };
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Service options list
  const SERVICE_OPTIONS = [
    {
      name: "Search Engine Optimization (SEO)",
      desc: "Supercharge your Google keyword positions to direct high-intent searchers",
      icon: <Search className="h-4 w-4 text-blue-600" />,
      tag: "Scale Traffic"
    },
    {
      name: "Conversion Rate Optimization (CRO)",
      desc: "Maximize buyer conversions and repair leaky dropoffs in checkout flows",
      icon: <Percent className="h-4 w-4 text-orange-600" />,
      tag: "Increase Profit"
    },
    {
      name: "Conversion Web Design",
      desc: "Pristine, lightning-fast pages crafted for modern device dimensions",
      icon: <Cpu className="h-4 w-4 text-teal-600" />,
      tag: "Premium Experience"
    },
    {
      name: "PPC & Paid Meta Marketing",
      desc: "Precision bidding and multi-platform advertising with strict positive ROI",
      icon: <BarChart3 className="h-4 w-4 text-purple-600" />,
      tag: "Immediate Visibility"
    },
    {
      name: "Smart Email Marketing Suite",
      desc: "Automated trigger sequences and segmented nurture pipelines",
      icon: <Mail className="h-4 w-4 text-[#ff8c00]" />,
      tag: "Dynamic Nurture"
    },
    {
      name: "MarketingCloudFX Integration",
      desc: "Our high-end call, rank, lead and email correlation toolkit",
      icon: <Zap className="h-4 w-4 text-amber-500" />,
      tag: "Proprietary Tech"
    }
  ];

  // Validation functions
  const validateWebsite = (val: string): string => {
    if (!val.trim()) return 'Target Website URL domain is strictly required.';
    const cleanUrl = val.replace(/^(https?:\/\/)?(www\.)?/, '').trim();
    const domainPattern = /^([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
    if (!domainPattern.test(cleanUrl)) {
      return 'Please specify a correct host domain layout (e.g. brand.com or company.ca).';
    }
    return '';
  };

  const validateCompany = (val: string): string => {
    if (!val.trim()) return 'Please declare your corporate entity or organization name.';
    if (val.trim().length < 2) return 'Company name must be at least 2 characters.';
    return '';
  };

  const validateName = (val: string): string => {
    if (!val.trim()) return 'Your Full Name is required to authorize the appraisal report.';
    if (val.trim().length < 2) return 'Full Name should be at least 2 characters.';
    return '';
  };

  const validateEmail = (val: string): string => {
    if (!val.trim()) return 'Business/Work email is strictly required to deliver files.';
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(val)) return 'Provide a valid email destination (e.g. jenkins@brand.com).';
    
    // Work email generic domain block
    const generic = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 
      'protonmail.com', 'icloud.com', 'mail.ru', 'live.com', 'yandex.com'
    ];
    const domain = val.split('@')[1]?.toLowerCase().trim();
    if (generic.includes(domain)) {
      return 'Corporate systems require your work email (generic provider domains are blocked).';
    }
    return '';
  };

  const validatePhone = (val: string): string => {
    if (!val.trim()) return ''; // Optional
    const pattern = /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$|^[\+]?[0-9\s-\(\)\.]{7,20}$/;
    if (!pattern.test(val)) return 'Please supply a standard corporate telephone format.';
    return '';
  };

  // Change and Blur input handlers
  const handleWebsiteChange = (val: string) => {
    setWebsite(val);
    if (websiteTouched) setWebsiteError(validateWebsite(val));
  };
  const handleWebsiteBlur = () => {
    setWebsiteTouched(true);
    setWebsiteError(validateWebsite(website));
  };

  const handleCompanyChange = (val: string) => {
    setCompany(val);
    if (companyTouched) setCompanyError(validateCompany(val));
  };
  const handleCompanyBlur = () => {
    setCompanyTouched(true);
    setCompanyError(validateCompany(company));
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (nameTouched) setNameError(validateName(val));
  };
  const handleNameBlur = () => {
    setNameTouched(true);
    setNameError(validateName(name));
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailTouched) setEmailError(validateEmail(val));
  };
  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  const handlePhoneChange = (val: string) => {
    setPhone(val);
    if (phoneTouched) setPhoneError(validatePhone(val));
  };
  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    setPhoneError(validatePhone(phone));
  };

  const toggleService = (srvName: string) => {
    setSelectedServices(prev => {
      if (prev.includes(srvName)) {
        if (prev.length === 1) return prev; // Must have at least one select
        return prev.filter(x => x !== srvName);
      }
      return [...prev, srvName];
    });
  };

  // Fetch Quotes DB
  const fetchQuotes = async () => {
    setIsLoadingQuotes(true);
    try {
      const resp = await fetch('/api/quotes');
      if (resp.ok) {
        const data = await resp.json();
        setSubmittedQuotes(data.quotes || []);
      }
    } catch (e) {
      console.error("Error reading quotes records", e);
    } finally {
      setIsLoadingQuotes(false);
    }
  };

  // Handle actual file generation and download triggering
  const handleDownloadExport = () => {
    if (submittedQuotes.length === 0) return;
    
    let content = '';
    let filename = `alkhawarizmi_quotes_export_${new Date().toISOString().slice(0, 10)}`;
    let contentType = '';

    if (exportFormat === 'csv') {
      const headers = ['ID', 'Website', 'Company', 'Contact Name', 'Contact Email', 'Phone', 'Industry', 'Proposed Budget', 'Algorithmic Appraisal', 'Selected Services', 'Created At'];
      const rows = submittedQuotes.map(item => [
        item.id || '',
        item.website || '',
        item.company || '',
        item.name || '',
        item.email || '',
        item.phone || '',
        item.industry || '',
        item.budget || '',
        item.estimatedQuote || '',
        Array.isArray(item.services) ? item.services.join('; ') : String(item.services || ''),
        item.createdAt || ''
      ]);
      content = [
        headers.join(','),
        ...rows.map(r => r.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
      ].join('\n');
      filename += '.csv';
      contentType = 'text/csv;charset=utf-8;';
    } else {
      content = JSON.stringify(submittedQuotes, null, 2);
      filename += '.json';
      contentType = 'application/json;charset=utf-8;';
    }

    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setIsExportModalOpen(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  // Step 1 to Step 2 Transition
  const proceedToStep2 = () => {
    if (selectedServices.length === 0) {
      setErrorMsg('Please select at least one strategic marketing channel to request your quote.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  // Step 2 to Step 3 Transition with Validation
  const proceedToStep3 = () => {
    setWebsiteTouched(true);
    setCompanyTouched(true);

    const webErr = validateWebsite(website);
    const compErr = validateCompany(company);

    if (webErr || compErr) {
      setWebsiteError(webErr);
      setCompanyError(compErr);
      setErrorMsg('Kindly resolve all highlighted parameters before calculating pricing logistics.');
      return;
    }

    setWebsiteError('');
    setCompanyError('');
    setErrorMsg('');
    setStep(3);
  };

  // Perform Final Quote Submission
  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setNameTouched(true);
    setEmailTouched(true);
    if (phone) setPhoneTouched(true);

    const nErr = validateName(name);
    const eErr = validateEmail(email);
    const pErr = validatePhone(phone);

    if (nErr || eErr || pErr) {
      setNameError(nErr);
      setEmailError(eErr);
      setPhoneError(pErr);
      setErrorMsg('Ensure all coordinates are properly entered to authorize quote compilation.');
      return;
    }

    setErrorMsg('');
    setIsSimulating(true);
    setStep(4);

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          services: selectedServices,
          website,
          company,
          budget,
          name,
          email,
          phone,
          industry,
          notes
        })
      });

      if (!response.ok) {
        throw new Error('Quote post failed');
      }

      await response.json();

      // Trigger beautiful live animation loaders
      let curStep = 0;
      const interval = setInterval(() => {
        curStep += 1;
        setSimStep(curStep);
        if (curStep >= 4) {
          clearInterval(interval);
          setIsSimulating(false);
          fetchQuotes(); // Refresh table view
        }
      }, 700);

    } catch (err: any) {
      console.error(err);
      setIsSimulating(false);
      setStep(3);
      setErrorMsg('We encountered an error dispatching your request to our CRM gateway. Please retry.');
    }
  };

  const handleResetQuote = () => {
    setStep(1);
    setSelectedServices(["Search Engine Optimization (SEO)"]);
    setWebsite('');
    setCompany('');
    setBudget('$5,000 - $10,000 / mo');
    setIndustry('E-Commerce');
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');

    setWebsiteError('');
    setCompanyError('');
    setNameError('');
    setEmailError('');
    setPhoneError('');

    setWebsiteTouched(false);
    setCompanyTouched(false);
    setNameTouched(false);
    setEmailTouched(false);
    setPhoneTouched(false);
    setSimStep(0);
    setErrorMsg('');
  };

  return (
    <div id="free-quote-page" className="bg-[#000000]/5 min-h-screen py-10">
      
      {/* Top Banner Stats Grid Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="bg-gradient-to-r from-[#000000] via-[#111111] to-[#ff8c00] text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtly animated accent ring */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />
          
          <div className="space-y-1.5 z-10">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-amber-300">
                ACTIVE REVENUE SERVICE ESTIMATOR ENGINE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight">
              Get My Free Strategic Revenue Quote
            </h1>
            <p className="text-xs text-slate-200 max-w-2xl">
              WebFX-inspired commercial modeler. Select targeted marketing modules, describe company scale parameters, and get specialized pricing models persisted in real time.
            </p>
          </div>

          <div className="flex items-center gap-4 text-center z-10 shrink-0">
            <div className="bg-white/10 backdrop-blur px-4 py-2.5 rounded-2xl border border-white/20">
              <span className="text-[10px] font-mono text-slate-300 uppercase block font-bold">LOCKED SLOTS</span>
              <span className="text-lg font-black text-white">{slotsRemaining} Left Today</span>
            </div>
            <div className="bg-white/10 backdrop-blur px-4 py-2.5 rounded-2xl border border-white/20">
              <span className="text-[10px] font-mono text-slate-300 uppercase block font-bold">TIMER EXPIRES</span>
              <span className="text-lg font-black text-[#ff8c00] font-mono">{formatTime(timeLeft)} min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hand: Appraisals, CRM settings, live db review */}
        <div className="col-span-1 lg:col-span-8 space-y-6">
          
          {/* Section Selector Tab Header */}
          <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 w-full">
              <button
                onClick={() => setActiveSegment('calculator')}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-2 ${
                  activeSegment === 'calculator'
                    ? 'bg-[#000000] text-white shadow-md'
                    : 'bg-transparent text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Zap className="h-4 w-4 shrink-0" />
                <span>Interactive Quote Modeler</span>
              </button>

              <button
                onClick={() => {
                  fetchQuotes();
                  setActiveSegment('database');
                }}
                className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-2 ${
                  activeSegment === 'database'
                    ? 'bg-[#000000] text-white shadow-md'
                    : 'bg-transparent text-slate-600 hover:bg-slate-50'
                }`}
                id="quotes-db-toggle-btn"
              >
                <Database className="h-4 w-4 shrink-0" />
                <span>Quotes Records Database</span>
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeSegment === 'calculator' ? (
              /* THE DYNAMIC CALCULATOR COMPONENT STEPPER */
              <motion.div
                key="quote-calculator"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-slate-200 shadow-xl rounded-3xl overflow-hidden"
              >
                {/* Embedded Stepper Progress Tracker */}
                <div className="bg-slate-50 border-b border-slate-200 px-6 sm:px-8 py-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold ${
                      step >= 1 ? 'bg-[#ff8c00] text-white' : 'bg-slate-200 text-slate-500'
                    }`}>1</span>
                    <span className={`font-semibold ${step >= 1 ? 'text-slate-800' : 'text-slate-400'}`}>Target Service</span>
                    
                    <span className="h-px w-4 sm:w-8 bg-slate-200" />
                    
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold ${
                      step >= 2 ? 'bg-[#ff8c00] text-white' : 'bg-slate-200 text-slate-500'
                    }`}>2</span>
                    <span className={`font-semibold ${step >= 2 ? 'text-slate-800' : 'text-slate-400'}`}>Business Details</span>
                    
                    <span className="h-px w-4 sm:w-8 bg-slate-200" />
                    
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold ${
                      step >= 3 ? 'bg-[#ff8c00] text-white' : 'bg-slate-200 text-slate-500'
                    }`}>3</span>
                    <span className={`font-semibold ${step >= 3 ? 'text-slate-800' : 'text-slate-400'}`}>Contact & Notes</span>

                    <span className="h-px w-4 sm:w-8 bg-slate-200" />
                    
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold ${
                      step >= 4 ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>4</span>
                    <span className={`font-semibold ${step >= 4 ? 'text-slate-800' : 'text-slate-400'}`}>Quote Ready</span>
                  </div>

                  <span className="text-[10px] font-mono uppercase bg-slate-200 text-slate-650 px-2 py-0.5 rounded font-bold">
                    STEP {step} OF 4
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  {step === 1 && (
                    <div id="quote-choice-step1" className="space-y-6">
                      <div className="space-y-1.5">
                        <span className="inline-block text-[10px] font-mono font-black text-[#ff8c00] uppercase tracking-[0.15em]">
                          STEP 01 // CUSTOM STRATEGIES
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-[#000000] tracking-tight">
                          Select Strategic Areas You Want to Optimize
                        </h2>
                        <p className="text-xs text-slate-500">
                          We bundle our core SEO techniques with specialized CRO code optimizations inside MarketingCloudFX to unlock immediate conversion growth. Check all that apply:
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {SERVICE_OPTIONS.map((srv) => {
                          const isSelected = selectedServices.includes(srv.name);
                          return (
                            <button
                              key={srv.name}
                              type="button"
                              onClick={() => toggleService(srv.name)}
                              className={`text-left p-4 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer group ${
                                isSelected
                                  ? 'border-[#000000] bg-[#000000]/5 ring-1 ring-[#000000]'
                                  : 'border-slate-200 bg-white hover:border-slate-350 hover:bg-slate-50/50'
                              }`}
                            >
                              <div className={`mt-0.5 p-2 rounded-xl border ${
                                isSelected ? 'bg-white border-[#000000]/20 text-[#000000]' : 'bg-slate-50 border-slate-100 text-slate-400 group-hover:text-[#ff8c00]'
                              }`}>
                                {srv.icon}
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#000000]">
                                    {srv.name}
                                  </span>
                                  {isSelected && (
                                    <span className="bg-[#000000] text-white p-0.5 rounded-full">
                                      <Check className="h-3 w-3" />
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-550 leading-relaxed font-sans">
                                  {srv.desc}
                                </p>
                                <span className={`inline-block text-[9px] font-mono px-2 py-0.5 rounded ${
                                  isSelected ? 'bg-[#000000]/10 text-[#000000] font-semibold' : 'bg-slate-100 text-slate-450'
                                }`}>
                                  {srv.tag}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {errorMsg && (
                        <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-lg flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <HelpCircle className="h-4 w-4 text-[#ff8c00]" />
                          <span>Need support selecting? Default plan includes SEO & CRO integration</span>
                        </div>
                        <button
                          onClick={proceedToStep2}
                          className="w-full sm:w-auto bg-[#000000] hover:bg-[#ff8c00] text-white font-sans font-bold text-xs py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow"
                        >
                          <span>Step 2: Tell Us About Your Business</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div id="quote-choice-step2" className="space-y-6">
                      <div className="space-y-1.5">
                        <span className="inline-block text-[10px] font-mono font-black text-[#ff8c00] uppercase tracking-[0.15em]">
                          STEP 02 // TRAFFIC & METRICS
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-[#000000] tracking-tight">
                          Tell Us About Your Scale Parameters
                        </h2>
                        <p className="text-xs text-slate-500">
                          We use these parameters to outline custom conversion and organic keyword recommendations specifically tailored to your domain's index status.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1">
                            <Globe className="h-4 w-4 text-slate-400" />
                            Target Website URL
                          </label>
                          <input
                            type="text"
                            value={website}
                            onChange={(e) => handleWebsiteChange(e.target.value)}
                            onBlur={handleWebsiteBlur}
                            placeholder="e.g. yourcommercebrand.com"
                            className={`w-full bg-slate-50 border rounded-xl px-3 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all font-sans text-slate-800 ${
                              websiteTouched && websiteError
                                ? 'border-rose-500 ring-2 ring-rose-100 bg-rose-50/10'
                                : websiteTouched && !websiteError && website
                                ? 'border-emerald-500 bg-emerald-50/5 focus:ring-emerald-500/20 focus:border-emerald-500'
                                : 'border-slate-200 focus:ring-[#000000]/20 focus:border-[#000000]'
                            }`}
                            autoFocus
                          />
                          {websiteTouched && websiteError ? (
                            <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-550" />
                              {websiteError}
                            </p>
                          ) : websiteTouched && !websiteError && website && (
                            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                              Ready for domain indexing crawl
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1">
                            <Building2 className="h-4 w-4 text-slate-400" />
                            Company / Entity Name
                          </label>
                          <input
                            type="text"
                            value={company}
                            onChange={(e) => handleCompanyChange(e.target.value)}
                            onBlur={handleCompanyBlur}
                            placeholder="e.g. Sterling Industries LLC"
                            className={`w-full bg-slate-50 border rounded-xl px-3 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all font-sans text-slate-800 ${
                              companyTouched && companyError
                                ? 'border-rose-500 ring-2 ring-rose-100 bg-rose-50/10'
                                : companyTouched && !companyError && company
                                ? 'border-emerald-500 bg-emerald-50/5 focus:ring-emerald-500/20 focus:border-emerald-500'
                                : 'border-slate-200 focus:ring-[#000000]/20 focus:border-[#000000]'
                            }`}
                          />
                          {companyTouched && companyError && (
                            <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-550" />
                              {companyError}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-slate-400" />
                            Estimated Monthly Marketing Budget
                          </label>
                          <select
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000] transition-all font-sans text-slate-800"
                          >
                            <option value="Under $5,000 / mo">Under $5,000 / mo</option>
                            <option value="$5,000 - $10,000 / mo">$5,000 - $10,000 / mo</option>
                            <option value="$10,000 - $25,000 / mo">$10,000 - $25,000 / mo</option>
                            <option value="Over $25,000 / mo">Over $25,000 / mo</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1">
                            <Briefcase className="h-4 w-4 text-slate-400" />
                            Primary Business Industry
                          </label>
                          <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000] transition-all font-sans text-slate-800"
                          >
                            <option value="E-Commerce">E-Commerce</option>
                            <option value="SaaS / B2B Technology">SaaS / B2B Technology</option>
                            <option value="Healthcare & Legal">Healthcare & Legal</option>
                            <option value="Professional Services">Professional Services</option>
                            <option value="Consumer Brands / Retail">Consumer Brands / Retail</option>
                            <option value="Other Industry Sectors">Other Industry Sectors</option>
                          </select>
                        </div>
                      </div>

                      {errorMsg && (
                        <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-lg flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-rose-550 shrink-0" />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      <div className="pt-6 border-t flex items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          <span>Back to Step 1</span>
                        </button>
                        
                        <button
                          type="button"
                          onClick={proceedToStep3}
                          className="w-full sm:w-auto bg-[#000000] hover:bg-[#ff8c00] text-white font-sans font-bold text-xs py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow"
                        >
                          <span>Step 3: Contact & Logistics</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <form onSubmit={handleSubmitQuote} className="space-y-6" id="quote-choice-step3-form">
                      <div className="space-y-1.5">
                        <span className="inline-block text-[10px] font-mono font-black text-[#ff8c00] uppercase tracking-[0.15em]">
                          STEP 03 // PERSONAL COORDINATES
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-[#000000] tracking-tight">
                          Who Should We Send the Appraisals To?
                        </h2>
                        <p className="text-xs text-slate-500">
                          Confirming quote delivery parameters. A copy of the system plan and estimated savings will be written directly into our active database.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Your Full Name</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => handleNameChange(e.target.value)}
                            onBlur={handleNameBlur}
                            placeholder="e.g. Marcus Aurelius"
                            className={`w-full bg-slate-50 border rounded-xl px-3 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all font-sans text-slate-800 ${
                              nameTouched && nameError
                                ? 'border-rose-500 ring-2 ring-rose-100 bg-rose-50/10'
                                : nameTouched && !nameError && name
                                ? 'border-emerald-500 bg-emerald-50/5 focus:ring-emerald-500/20 focus:border-emerald-500'
                                : 'border-slate-200 focus:ring-[#000000]/20 focus:border-[#000000]'
                            }`}
                            required
                          />
                          {nameTouched && nameError && (
                            <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-550" />
                              {nameError}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Work Email Address</label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => handleEmailChange(e.target.value)}
                            onBlur={handleEmailBlur}
                            placeholder="e.g. marcus@empire.com"
                            className={`w-full bg-slate-50 border rounded-xl px-3 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all font-sans text-slate-800 ${
                              emailTouched && emailError
                                ? 'border-rose-500 ring-2 ring-rose-100 bg-rose-50/10'
                                : emailTouched && !emailError && email
                                ? 'border-emerald-500 bg-emerald-50/5 focus:ring-emerald-500/20 focus:border-emerald-500'
                                : 'border-slate-200 focus:ring-[#000000]/20 focus:border-[#000000]'
                            }`}
                            required
                          />
                          {emailTouched && emailError && (
                            <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-550" />
                              {emailError}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono uppercase tracking-wider text-slate-550 font-bold">Contact Telephone (Optional)</label>
                          <div className="relative">
                            <span className="absolute left-3 top-3.5"><Phone className="h-4 w-4 text-slate-450" /></span>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => handlePhoneChange(e.target.value)}
                              onBlur={handlePhoneBlur}
                              placeholder="+1 (555) 123-4567"
                              className={`w-full bg-slate-50 border rounded-xl pl-10 pr-3 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all font-sans text-slate-800 ${
                                phoneTouched && phoneError
                                  ? 'border-rose-500 ring-2 ring-rose-100 bg-rose-50/10'
                                  : phoneTouched && !phoneError && phone
                                  ? 'border-emerald-500 bg-emerald-50/5 focus:ring-emerald-500/20 focus:border-emerald-500'
                                  : 'border-slate-200 focus:ring-[#000000]/20 focus:border-[#000000]'
                              }`}
                            />
                          </div>
                          {phoneTouched && phoneError && (
                            <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
                              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-550" />
                              {phoneError}
                            </p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-mono uppercase tracking-wider text-slate-550 font-bold">Strategic Notes / Specific Requirements</label>
                          <div className="relative font-sans text-xs">
                            <input
                              type="text"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="e.g. Lower AdWords acquisition costs by 30%"
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000] transition-all font-sans text-slate-800"
                            />
                          </div>
                        </div>
                      </div>

                      {errorMsg && (
                        <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-lg flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-rose-550 shrink-0" />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      <div className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          <span>Back to Step 2</span>
                        </button>

                        <button
                          type="submit"
                          className="w-full sm:w-auto bg-gradient-to-r from-[#ff8c00] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-sans font-bold text-xs py-3.5 px-8 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange-500/20"
                        >
                          <span>Complete Quote Calculation</span>
                          <BarChart3 className="h-4 w-4" />
                        </button>
                      </div>
                    </form>
                  )}

                  {step === 4 && (
                    <div id="quote-choice-step4-success" className="space-y-6 text-center">
                      {isSimulating ? (
                        /* Dynamic loader simulating crawler checks */
                        <div className="max-w-md mx-auto py-10 space-y-6">
                          <div className="relative w-16 h-16 mx-auto">
                            <span className="absolute inset-0 rounded-full border-4 border-slate-150" />
                            <span className="absolute inset-0 rounded-full border-4 border-[#ff8c00] border-t-transparent animate-spin" />
                            <Sparkles className="absolute top-5 left-5 h-6 w-6 text-[#000000] animate-pulse" />
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="text-lg font-black text-[#000000] font-sans">
                              Compiling Custom Agency Quote
                            </h3>
                            <p className="text-xs text-slate-500">
                              MarketingCloudFX modeler is measuring metrics for <span className="font-semibold underline text-slate-800">{website}</span>...
                            </p>
                          </div>

                          <div className="bg-slate-50 border rounded-2xl p-4 text-left space-y-2 font-mono text-[11px] text-slate-600 shadow-inner">
                            <div className="flex items-center gap-2">
                              <span className={`w-2.5 h-2.5 rounded-full ${simStep >= 1 ? 'bg-green-500' : 'bg-slate-350 animate-ping'}`} />
                              <span>[OK] Evaluated Selected Modules ({selectedServices.length} channels)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`w-2.5 h-2.5 rounded-full ${simStep >= 2 ? 'bg-green-500' : 'bg-slate-350 animate-ping'}`} />
                              <span>[OK] Computed organic search baseline for {website}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`w-2.5 h-2.5 rounded-full ${simStep >= 3 ? 'bg-green-500' : 'bg-slate-355 animate-ping'}`} />
                              <span>[OK] Generated custom pricing estimates with budget alignment</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`w-2.5 h-2.5 rounded-full ${simStep >= 4 ? 'bg-green-500' : 'bg-slate-350 animate-ping'}`} />
                              <span>[OK] Wrote plan variables to active database collection</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Simulated results compiled nicely */
                        <div className="space-y-6 max-w-2xl mx-auto">
                          
                          <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 space-y-3">
                            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
                              <BadgeCheck className="h-8 w-8" style={{ animation: 'bounce 2s infinite' }} />
                            </div>

                            <div className="space-y-1">
                              <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                                PRICING OUTLINE VERIFIED
                              </span>
                              <h3 className="text-xl sm:text-2xl font-black text-[#000000] font-sans">
                                Custom Marketing Plan Generated for {company}!
                              </h3>
                            </div>
                            <p className="text-xs text-slate-600 max-w-lg mx-auto">
                              Your personalized quote appraisal with estimated ROI projections is compiled. A representative from alkhawarizmi.agency will reach out to <span className="font-semibold italic text-[#000000]">{email}</span> within 1-2 hours to walk through specifications.
                            </p>
                          </div>

                          {/* Calculated package stats card */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-slate-50 border rounded-2xl p-5 text-center space-y-1">
                              <span className="text-[9px] font-mono text-slate-450 uppercase block font-extrabold">Proposed Alkhawarizmi Scope</span>
                              <p className="text-xl font-black text-[#ff8c00] font-mono">
                                {budget.includes("25,000") && "$15k - $22k / mo Enterprise"}
                                {budget.includes("10,000") && "$7.5k - $9.8k / mo Pro"}
                                {budget.includes("5,000") && "$4.2k - $5.8k / mo Core"}
                                {budget.includes("Under") && "$1.8k - $3.2k / mo Startup"}
                              </p>
                              <span className="text-[10px] text-slate-500">Based on a {selectedServices.length}-channel integrated blueprint</span>
                            </div>

                            <div className="bg-slate-50 border rounded-2xl p-5 text-center space-y-1 flex flex-col justify-center">
                              <span className="text-[9px] font-mono text-slate-450 uppercase block font-extrabold">Forecasted Digital Value Generated</span>
                              <p className="text-xl font-black text-emerald-600 font-mono tracking-tight animate-pulse">
                                {budget.includes("25,000") && "+$124,000 / mo"}
                                {budget.includes("10,000") && "+$58,000 / mo"}
                                {budget.includes("5,000") && "+$29,500 / mo"}
                                {budget.includes("Under") && "+$11,400 / mo"}
                              </p>
                              <span className="text-[10px] text-slate-500">Predicted standard conversion optimization yield</span>
                            </div>
                          </div>

                          {/* Selected services list box */}
                          <div className="bg-slate-50/60 border rounded-2xl p-4 text-left">
                            <span className="text-[10px] font-mono text-slate-400 uppercase font-black tracking-wider block mb-2">
                              Your Campaign Configurations
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {selectedServices.map(srv => (
                                <span key={srv} className="bg-white border text-slate-700 text-xs font-semibold px-3 py-1 rounded-lg flex items-center gap-1 shadow-xs">
                                  <span className="w-1.5 h-1.5 bg-[#000000] rounded-full" />
                                  {srv}
                                </span>
                              ))}
                            </div>
                            <div className="mt-3 text-[11px] text-slate-550 flex items-center gap-1.5 font-mono">
                              <span>Industry Focus: {industry}</span>
                              <span>&bull;</span>
                              <span>Initial Budget Target: {budget}</span>
                            </div>
                          </div>

                          {/* Action call container */}
                          <div className="border border-indigo-150 bg-[#000000]/5 rounded-3xl p-6 text-left space-y-3">
                            <div className="flex items-center gap-2">
                              <Clock className="h-5 w-5 text-[#ff8c00] shrink-0" />
                              <h4 className="text-xs font-bold text-[#000000] uppercase font-mono">
                                Lock In Your Quote Validation Call (calendly integration)
                              </h4>
                            </div>
                            <p className="text-xs text-slate-600 font-sans">
                              Our revenue systems have registered your lead. Book a quick 15-minute call directly with a partner analyst to review this algorithmic calculation today.
                            </p>

                            <button
                              onClick={() => {
                                window.open('https://calendly.com/alkhawarizmi-agency/strategy', '_blank');
                              }}
                              className="w-full bg-[#000000] hover:bg-[#ff8c00] text-white font-sans font-bold text-xs py-3 rounded-xl transition-colors shadow flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <span>Secure My Calendly Consultation</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-center gap-4 pt-4">
                            <button
                              onClick={handleResetQuote}
                              className="text-xs text-slate-550 hover:text-slate-800 underline font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                              <span>Model Another Quote</span>
                            </button>
                          </div>

                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              /* THE PERSISTED QUOTES DATABASE DRAWER */
              <motion.div
                key="quote-database"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-slate-200 shadow-xl rounded-3xl p-6 sm:p-8 space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-black text-[#000000] font-sans">
                      Captured CRM Quotes Store
                    </h3>
                    <p className="text-xs text-slate-500 font-sans">
                      Recent marketing budgets and service channel quotes logged securely to the server in active sessions.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={fetchQuotes}
                      disabled={isLoadingQuotes}
                      className="text-xs text-slate-700 font-mono border hover:bg-slate-50 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-colors bg-white cursor-pointer"
                    >
                      <RotateCcw className={`h-3 w-3 ${isLoadingQuotes ? 'animate-spin' : ''}`} />
                      <span>Reload Records</span>
                    </button>

                    <button
                      onClick={() => setIsExportModalOpen(true)}
                      disabled={submittedQuotes.length === 0}
                      className={`text-xs font-mono px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all border ${
                        submittedQuotes.length === 0
                          ? 'opacity-50 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
                          : 'text-white bg-[#000000] hover:bg-[#ff8c00] border-transparent cursor-pointer'
                      }`}
                    >
                      <Download className="h-3.5 w-3.5 text-[#ff8c00]" />
                      <span>Export Records</span>
                    </button>
                  </div>
                </div>

                {submittedQuotes.length === 0 ? (
                  <div className="border border-dashed border-slate-250 rounded-2xl p-10 text-center space-y-2 text-slate-450">
                    <Database className="h-10 w-10 mx-auto text-slate-350" />
                    <p className="text-sm font-semibold">No Quotes Written inside DB Store yet.</p>
                    <p className="text-xs">Complete the interactive quote wizard modeler to instantly persist a live record item.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-[10px] font-mono bg-[#000000]/5 text-[#000000] border px-3 py-2 rounded-lg flex items-center gap-1 uppercase font-bold">
                      <Database className="h-3 w-3" />
                      <span>Node.js Server Storage Output ({submittedQuotes.length} quotes total)</span>
                    </div>

                    <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-1">
                      {submittedQuotes.map((item, index) => (
                        <div key={item.id || index} className="border border-slate-200 rounded-2xl p-4 bg-slate-50 hover:bg-white transition-all space-y-3 text-xs">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
                            <span className="font-mono text-[9px] text-[#ff8c00] font-black tracking-tighter bg-orange-50 px-2 py-0.5 rounded">
                              ID: {item.id}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(item.createdAt || Date.now()).toLocaleTimeString()} &bull; {new Date(item.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-slate-700">
                            <div>
                              <span className="text-[9px] text-slate-400 font-mono uppercase block">Target Website Domain</span>
                              <span className="font-sans font-bold text-slate-800 text-sm flex items-center gap-1 truncate">
                                <Globe className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                {item.website}
                              </span>
                            </div>

                            <div>
                              <span className="text-[9px] text-slate-400 font-mono uppercase block">Company / Entity</span>
                              <span className="font-sans font-semibold text-slate-800 text-sm truncate block">
                                {item.company}
                              </span>
                            </div>

                            <div>
                              <span className="text-[9px] text-slate-400 font-mono uppercase block">Contact Name & Email</span>
                              <span className="font-sans text-slate-755 truncate block">
                                <strong className="text-slate-805">{item.name}</strong> &bull; <span className="underline italic">{item.email}</span>
                              </span>
                            </div>

                            <div>
                              <span className="text-[9px] text-slate-400 font-mono uppercase block">Business Sector & Chosen Budget</span>
                              <span className="font-sans text-slate-650 block">
                                {item.industry} &bull; <strong className="text-slate-800">{item.budget}</strong>
                              </span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-white border border-slate-150 rounded-xl space-y-1">
                            <span className="text-[9px] font-mono text-slate-400 uppercase block">Selected Marketing Modules</span>
                            <div className="flex flex-wrap gap-1.5">
                              {Array.isArray(item.services) ? (
                                item.services.map((s: string) => (
                                  <span key={s} className="bg-blue-50/50 border text-[10px] px-2 py-0.5 rounded text-[#000000] font-medium">
                                    {s}
                                  </span>
                                ))
                              ) : (
                                <span className="text-slate-500">{String(item.services)}</span>
                              )}
                            </div>
                          </div>

                          <div className="p-2.5 bg-emerald-50 border border-emerald-100/80 rounded-xl flex items-center justify-between gap-4">
                            <div>
                              <span className="text-[9px] font-mono text-emerald-800 uppercase block font-black">Algorithmic Appraisal Valuation</span>
                              <p className="font-mono text-xs font-black text-emerald-700">{item.estimatedQuote}</p>
                            </div>
                            <span className="text-[10px] font-sans font-bold text-[#000000] bg-white border px-2 py-1 rounded-lg">
                              Locked Rate
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Hand Sidebar: Key Endorsements and WebFX standard stats */}
        <div className="col-span-1 lg:col-span-4 space-y-6">
          
          {/* Guaranteed performance quote WebFX card */}
          <div className="bg-gradient-to-br from-[#000000] to-[#1F1F1F] text-white rounded-3xl p-6 shadow-lg space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 bg-white/10 rounded-bl-3xl">
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
            </div>
            
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase bg-white/10 text-slate-200 px-2 py-0.5 rounded inline-block font-bold">
                THE ALKHAWARIZMI PROMISE
              </span>
              <h4 className="text-base font-black tracking-tight font-sans">
                No Gimmicks. 100% Real-Time Value-Driven Scopes.
              </h4>
            </div>

            <p className="text-xs text-slate-250 leading-relaxed">
              We leverage modern analytics pipelines to capture leaks that general agencies overlook. Your appraisal incorporates verified metrics based on active traffic segments.
            </p>

            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-1 rounded-lg text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold">Zero-Obligation Audit</p>
                  <p className="text-[10px] text-slate-300">You retain all computed guidelines.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-1 rounded-lg text-amber-300">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="text-xs">
                  <p className="font-bold">2-Hour Executive Turnaround</p>
                  <p className="text-[10px] text-slate-300">Personalized manually by standard SEO experts.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Client Testimonial Sidebar Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-amber-500" />
              <Star className="h-4 w-4 fill-amber-500" />
              <Star className="h-4 w-4 fill-amber-500" />
              <Star className="h-4 w-4 fill-amber-500" />
              <Star className="h-4 w-4 fill-amber-500" />
            </div>

            <p className="text-xs text-slate-600 italic font-sans leading-relaxed">
              &ldquo;Using Alkhawarizmi's conversion plan, we optimized our checkouts and lowered PPC acquisition spend by 42%. The estimated calculator on their console matched our custom SLA outline perfectly.&rdquo;
            </p>

            <div className="flex items-center gap-3 border-t pt-3">
              <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 text-xs shrink-0">
                HS
              </div>
              <div>
                <p className="text-xs font-bold text-[#000000]">Hamilton St. Charles</p>
                <p className="text-[10px] text-slate-450 uppercase font-mono">VP of Growth &bull; ShopFlow Fashion Ltd</p>
              </div>
            </div>
          </div>

          {/* Core corporate stats info snippet */}
          <div className="bg-white border border-slate-250/70 rounded-3xl p-6 shadow-sm text-center space-y-5">
            <span className="text-[9px] font-mono text-[#ff8c00] uppercase font-black tracking-widest block">
              ALKHAWARIZMI AT A GLANCE
            </span>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-0.5 border-r border-slate-100">
                <p className="text-lg font-black text-[#000000] font-mono">$10.2B+</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase font-sans">SALES DRIVEN</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-lg font-black text-[#ff8c00] font-mono">24.8M+</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase font-sans">LEADS GENERATED</p>
              </div>
              <div className="space-y-0.5 border-t border-r border-slate-100 pt-3">
                <p className="text-lg font-black text-[#ff8c00] font-mono">1.6M+</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase font-sans">CALLS TRACKED</p>
              </div>
              <div className="space-y-0.5 border-t border-slate-100 pt-3">
                <p className="text-lg font-black text-[#000000] font-mono">500+</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase font-sans">SEO EXPERTS</p>
              </div>
            </div>

            <div className="bg-slate-50 border rounded-2xl p-3.5 text-[10px] text-slate-500 text-left leading-relaxed">
              Our calculations integrate directly with **Nutshell Smart CRM** and **LeadManagerFX Tracker** for secure corporate synchronization.
            </div>
          </div>

        </div>

      </div>

      {/* Dynamic DB Export Confirmation Modal Overlay */}
      <AnimatePresence>
        {isExportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark background backing overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExportModalOpen(false)}
              className="absolute inset-0 bg-[#000000]/70 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Body card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-xl z-10 relative overflow-hidden space-y-6"
            >
              
              {/* Header with Title and close handle */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-50 rounded-xl border border-amber-100 text-[#ff8c50]">
                    <Database className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#000000] font-sans">
                      Export Quotes Database
                    </h3>
                    <p className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">
                      AL-KHAWARIZMI CRM ARCHIVE
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsExportModalOpen(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  title="Close Dialog"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Summary Statistics Segment */}
              <div className="space-y-4">
                <p className="text-xs text-slate-600">
                  You are preparing to export the active capture logs. Below is a validated structural summary of the records contained within the current session database:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Total Records</span>
                    <p className="text-base font-black text-[#000000] font-mono">
                      {submittedQuotes.length} Quotes
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Captured Domains</span>
                    <p className="text-xs font-semibold text-slate-800 truncate" title={submittedQuotes.map(q => q.website).join(', ')}>
                      {submittedQuotes.slice(0, 3).map(q => {
                        const clean = q.website?.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
                        return clean;
                      }).join(', ')}
                      {submittedQuotes.length > 3 ? ' ...' : ''}
                    </p>
                  </div>

                  <div className="space-y-0.5 sm:col-span-2 border-t border-slate-150 pt-2 mt-1">
                    <span className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Estimate Value Breakdown</span>
                    <div className="grid grid-cols-2 gap-2 mt-1 text-[10px] sm:text-xs">
                      <div className="text-slate-600">
                        Startup tiers: <span className="font-bold text-[#000000]">{submittedQuotes.filter(q => q.budget?.toLowerCase().includes('under')).length}</span>
                      </div>
                      <div className="text-slate-600">
                        Core / Mid-market: <span className="font-bold text-[#000000]">{submittedQuotes.filter(q => q.budget?.includes('10,000') || q.budget?.includes('5,000')).length}</span>
                      </div>
                      <div className="text-slate-600">
                        Enterprise premium: <span className="font-bold text-[#000000]">{submittedQuotes.filter(q => q.budget?.toLowerCase().includes('over') || q.budget?.includes('25,000')).length}</span>
                      </div>
                      <div className="text-slate-600">
                        Total Modules Requested: <span className="font-bold text-[#000000]">{submittedQuotes.reduce((acc, q) => acc + (Array.isArray(q.services) ? q.services.length : 1), 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Format Choice Selector Toggle */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-black tracking-wider block">
                  Select Download File Format
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setExportFormat('csv')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 relative ${
                      exportFormat === 'csv'
                        ? 'border-[#ff8c00] bg-orange-50/20 text-[#000000]'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-350'
                    }`}
                  >
                    <div className={`p-2 rounded-lg border ${
                      exportFormat === 'csv' ? 'bg-white border-[#ff8c00]/30 text-[#ff8c00]' : 'bg-slate-50'
                    }`}>
                      <FileSpreadsheet className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold font-sans">CSV Spreadsheet</p>
                      <p className="text-[9px] text-slate-450 font-mono">.csv layout format</p>
                    </div>
                    {exportFormat === 'csv' && (
                      <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#ff8c00]" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportFormat('json')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 relative ${
                      exportFormat === 'json'
                        ? 'border-[#ff8c00] bg-orange-50/20 text-[#000000]'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-350'
                    }`}
                  >
                    <div className={`p-2 rounded-lg border ${
                      exportFormat === 'json' ? 'bg-white border-[#ff8c00]/30 text-[#ff8c00]' : 'bg-slate-50'
                    }`}>
                      <Database className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold font-sans">JSON Document</p>
                      <p className="text-[9px] text-slate-450 font-mono">.json direct schema</p>
                    </div>
                    {exportFormat === 'json' && (
                      <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#ff8c00]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsExportModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDownloadExport}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#000000] hover:bg-[#ff8c00] transition-all cursor-pointer flex items-center gap-1.5 shadow"
                >
                  <Download className="h-3.5 w-3.5 text-[#ff8c00]" />
                  <span>Confirm & Download</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
