import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Sparkles, TrendingUp, AlertTriangle, ShieldCheck, 
  ArrowRight, CheckCircle2, BadgeCheck, Phone, Mail, 
  Globe, Clock, RotateCcw, Database, FileSpreadsheet, ExternalLink 
} from 'lucide-react';

interface ExitIntentModalProps {
  onLeadCaptured?: (lead: any) => void;
  currentPage: string;
}

export default function ExitIntentModal({ onLeadCaptured, currentPage }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [cooldownPassed, setCooldownPassed] = useState(false);
  const [activeTab, setActiveTab] = useState<'audit' | 'leads'>('audit');
  
  // Form fields
  const [website, setWebsite] = useState('');
  const [focusArea, setFocusArea] = useState('Conversion Rate Optimization (CRO)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [trafficTier, setTrafficTier] = useState('10k - 50k monthly visits');

  // Real-time Validation States
  const [websiteError, setWebsiteError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [websiteTouched, setWebsiteTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  
  // Active countdown timer for high urgency
  const [timeLeft, setTimeLeft] = useState(259); // 4m 19s
  const [slotsLeft, setSlotsLeft] = useState(3);

  // Leads state (retrieved from backend DB)
  const [submittedLeads, setSubmittedLeads] = useState<any[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);

  // Simulator analysis step counter
  const [simStep, setSimStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Floating trigger helper visible on bottom right
  const [showTeaser, setShowTeaser] = useState(true);

  // Individual Validation helpers
  const validateWebsite = (val: string): string => {
    if (!val.trim()) {
      return 'Website domain is required.';
    }
    // Clean domain value (strip standard protocol prefix)
    const cleanUrl = val.replace(/^(https?:\/\/)?(www\.)?/, '').trim();
    // Verify a pattern matching standard domains consisting of host segments and TLD
    const domainPattern = /^([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
    if (!domainPattern.test(cleanUrl)) {
      return 'Please enter a valid website domain format (e.g., brand.com or company.co.uk).';
    }
    return '';
  };

  const validateName = (val: string): string => {
    if (!val.trim()) {
      return 'Full Name is strictly required.';
    }
    if (val.trim().length < 2) {
      return 'Full Name must be at least 2 characters.';
    }
    return '';
  };

  const validateEmail = (val: string): string => {
    if (!val.trim()) {
      return 'Work email address is required.';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(val)) {
      return 'Please enter a valid email pattern (e.g., name@company.com).';
    }
    
    // Work email restriction rule
    const genericDomains = [
      'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 
      'protonmail.com', 'icloud.com', 'mail.ru', 'live.com', 'msn.com', 
      'yandex.com', 'gmx.com', 'zoho.com'
    ];
    const domain = val.split('@')[1]?.toLowerCase().trim();
    if (genericDomains.includes(domain)) {
      return 'Commercial optimization requires your business/work email (generic provider address is blocked).';
    }
    return '';
  };

  const validatePhone = (val: string): string => {
    if (!val.trim()) return ''; // Optional field
    const phonePattern = /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$|^[\+]?[0-9\s-\(\)\.]{7,20}$/;
    if (!phonePattern.test(val)) {
      return 'Please provide a valid corporate phone structure (e.g., +1 555-0100).';
    }
    return '';
  };

  // Real-time input handlers
  const handleWebsiteChange = (val: string) => {
    setWebsite(val);
    if (websiteTouched) {
      setWebsiteError(validateWebsite(val));
    }
  };

  const handleWebsiteBlur = () => {
    setWebsiteTouched(true);
    setWebsiteError(validateWebsite(website));
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (nameTouched) {
      setNameError(validateName(val));
    }
  };

  const handleNameBlur = () => {
    setNameTouched(true);
    setNameError(validateName(name));
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (emailTouched) {
      setEmailError(validateEmail(val));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  const handlePhoneChange = (val: string) => {
    setPhone(val);
    if (phoneTouched) {
      setPhoneError(validatePhone(val));
    }
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    setPhoneError(validatePhone(phone));
  };

  // Time-out & urgency timers
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 259));
    }, 1000);

    const slotRandomizer = setInterval(() => {
      setSlotsLeft((prev) => {
        if (prev <= 1) return 3;
        return Math.random() > 0.8 ? prev - 1 : prev;
      });
    }, 22000);

    return () => {
      clearInterval(countdown);
      clearInterval(slotRandomizer);
    };
  }, []);

  // Fetch submitted leads
  const fetchLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await fetch('/api/leads');
      if (res.ok) {
        const data = await res.json();
        setSubmittedLeads(data.leads || []);
      }
    } catch (e) {
      console.error("Error loading mock leads", e);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  // Main Intent Emitters
  useEffect(() => {
    // Only arm exit intent on the home page view
    if (currentPage !== 'home') return;

    // Trigger on mouse leave
    const handleMouseLeave = (e: MouseEvent) => {
      // clientY < 20 indicates mouse is leaving the viewport top (e.g., towards tabs/address bar)
      if (e.clientY < 20) {
        const wasDismissed = sessionStorage.getItem('exit_intent_dismissed_v1');
        if (!wasDismissed) {
          openModal();
        }
      }
    };

    // Trigger on mobile scroll-up behavior or inactivity
    let mobileTimer: NodeJS.Timeout;
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // 18-second delay auto exit-intent fallback for mobile
      mobileTimer = setTimeout(() => {
        const wasDismissed = sessionStorage.getItem('exit_intent_dismissed_v1');
        if (!wasDismissed) {
          openModal();
        }
      }, 18000);
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (mobileTimer) clearTimeout(mobileTimer);
    };
  }, [currentPage]);

  const openModal = () => {
    setIsOpen(true);
    // Track that exit intent was triggered
    sessionStorage.setItem('exit_intent_dismissed_v1', 'true');
  };

  const closeModal = () => {
    setIsOpen(false);
    // Close modal & reset views
    setTimeout(() => {
      if (step !== 3) {
        setStep(1);
      }
      setSimStep(0);
      setIsSimulating(false);
      setErrorMsg('');
      setWebsiteError('');
      setNameError('');
      setEmailError('');
      setPhoneError('');
      setWebsiteTouched(false);
      setNameTouched(false);
      setEmailTouched(false);
      setPhoneTouched(false);
    }, 400);
  };

  // Move from Step 1 to Step 2
  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setWebsiteTouched(true);
    const err = validateWebsite(website);
    if (err) {
      setWebsiteError(err);
      setErrorMsg(err);
      return;
    }
    setWebsiteError('');
    setErrorMsg('');
    setStep(2);
  };

  // Execute Submission
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);
    if (phone) {
      setPhoneTouched(true);
    }

    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const phoneErr = validatePhone(phone);

    if (nameErr || emailErr || phoneErr) {
      setNameError(nameErr);
      setEmailError(emailErr);
      setPhoneError(phoneErr);
      setErrorMsg('Please resolve all validation errors before generating your appraisal report.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          website,
          name,
          email,
          phone,
          focusArea,
          trafficTier
        })
      });

      if (!response.ok) {
        throw new Error('Server lead processing error');
      }

      const result = await response.json();
      
      // Trigger live AI simulator visual workflow
      setIsSubmitting(false);
      setIsSimulating(true);
      setStep(3);

      // Call optional callback
      if (onLeadCaptured && result.lead) {
        onLeadCaptured(result.lead);
      }

      // Stagger loader steps for beautiful immersion
      let activeStep = 0;
      const interval = setInterval(() => {
        activeStep += 1;
        setSimStep(activeStep);
        if (activeStep >= 4) {
          clearInterval(interval);
          setIsSimulating(false);
          // Refresh leads list
          fetchLeads();
        }
      }, 650);

    } catch (err: any) {
      console.error(err);
      setIsSubmitting(false);
      setErrorMsg('Inbound pipeline error. Please double check parameters and submit again.');
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {/* Floating Teaser Widget - Bottom Right corner - high professional standard */}
      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20 }}
            id="audit-teaser-widget"
            className="fixed bottom-6 right-6 z-40 max-w-sm bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 overflow-hidden"
          >
            {/* Urgency Stripe */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-500 to-amber-600 animate-pulse" />
            
            <div className="flex items-start gap-3">
              <div className="bg-orange-50 p-2 rounded-xl text-orange-600">
                <Sparkles className="h-5 w-5 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">SPECIAL SPONSOR OFFER</span>
                </div>
                <h5 className="text-sm font-sans font-black text-[#000000] tracking-tight">
                  Free Revenue Optimization Audit
                </h5>
                <p className="text-xs text-slate-600">
                  Value <span className="line-through text-slate-400 font-medium">$499</span> — Zero cost for {slotsLeft} remaining visitors today. Improve conversion up to +40%.
                </p>
                <div className="pt-2 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    ⚠️ {formatTime(timeLeft)} left
                  </span>
                  <button
                    onClick={openModal}
                    id="trigger-exit-intent-view"
                    className="flex items-center gap-1 text-[11px] font-sans font-bold text-white bg-[#000000] hover:bg-[#ff8c00] transition-colors px-3 py-1.5 rounded-lg shadow cursor-pointer"
                  >
                    Claim Free Audit
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setShowTeaser(false)} 
                className="text-slate-405 hover:text-slate-800 p-0.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Close promotion box"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Modal Overlay Block */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Translucent Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              id="exit-modal-backdrop"
            />

            {/* Modal Box Frame */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              id="exit-intent-dialog"
              className="relative w-full max-w-2xl bg-white border border-slate-200/80 rounded-3xl shadow-3xl overflow-hidden z-10 flex flex-col max-h-[92vh]"
            >
              {/* Decorative top gradient header */}
              <div className="bg-gradient-to-r from-[#000000] via-[#01409c] to-orange-600 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="bg-white/10 p-1.5 rounded-lg text-amber-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight">MarketingCloudFX™ Assessment Suite</h3>
                    <p className="text-[10px] text-slate-100 opacity-80 font-mono">CORE LEADS & AUDIT VERIFICATION ENGINE</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Admin Leads View Toggle inside modal for absolute visibility and review */}
                  <button
                    onClick={() => {
                      if (activeTab === 'audit') {
                        fetchLeads();
                        setActiveTab('leads');
                      } else {
                        setActiveTab('audit');
                      }
                    }}
                    className={`flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1 rounded-lg transition-all border ${
                      activeTab === 'leads' 
                        ? 'bg-white text-[#000000] border-white' 
                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                    }`}
                  >
                    <Database className="h-3.5 w-3.5" />
                    {activeTab === 'audit' ? 'Leads DB Admin' : 'Exit Offer Form'}
                  </button>

                  <button
                    onClick={closeModal}
                    className="p-1 hover:bg-white/10 rounded-lg text-white transition-colors cursor-pointer"
                    id="exit-modal-dismiss-btn"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Urgency Announcement banner */}
              {activeTab === 'audit' && (
                <div className="bg-amber-50 border-b border-amber-100 px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-800">
                  <div className="flex items-center gap-1.5 font-sans font-medium">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
                    <span>Before you leave: Get personalized profit recovery suggestions</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono font-bold">
                    <span>🔥 {slotsLeft} Slots Left Today</span>
                    <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px]">
                      ⏰ {formatTime(timeLeft)} Remaining
                    </span>
                  </div>
                </div>
              )}

              {/* Scrollable Container Content */}
              <div className="overflow-y-auto p-6 sm:p-8 flex-1">
                {activeTab === 'leads' ? (
                  /* Admins' captured leads dashboard */
                  <div className="space-y-4" id="leads-list-panel">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-lg font-black text-[#000000]">Lead Capture DB Drawer</h4>
                        <p className="text-xs text-slate-500">Live captured leads submitted via digital exit intent</p>
                      </div>
                      <button 
                        onClick={fetchLeads} 
                        className="text-xs text-slate-500 font-mono flex items-center gap-1 hover:text-slate-800 bg-slate-100 px-2 py-1 rounded"
                        disabled={isLoadingLeads}
                      >
                        <RotateCcw className={`h-3 w-3 ${isLoadingLeads ? 'animate-spin' : ''}`} />
                        Reload DB
                      </button>
                    </div>

                    {submittedLeads.length === 0 ? (
                      <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center text-slate-400 space-y-2">
                        <FileSpreadsheet className="h-10 w-10 mx-auto text-slate-300" />
                        <p className="text-sm font-medium">No leads captured in active session yet.</p>
                        <p className="text-xs">Fill the Exit Audit Form to write a record to the database live.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-[10px] font-mono bg-slate-100 border p-2 rounded text-slate-500 uppercase flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          <span>Persisted Database Record Output ({submittedLeads.length} leads in store)</span>
                        </div>
                        <div className="grid gap-3 max-h-[350px] overflow-y-auto pr-1">
                          {submittedLeads.map((item, idx) => (
                            <div key={item.id || idx} className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 text-xs space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-slate-500 tracking-tighter text-[9px] bg-slate-200 px-1 py-0.5 rounded">ID: {item.id}</span>
                                <span className="text-slate-500 text-[10px]">{new Date(item.createdAt).toLocaleTimeString()}</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-slate-700">
                                <div>
                                  <p className="text-[10px] font-mono text-slate-400 uppercase">Website URL</p>
                                  <p className="font-sans font-bold text-slate-800 truncate">{item.website}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-mono text-slate-400 uppercase">Contact Name</p>
                                  <p className="font-sans font-semibold text-slate-800">{item.name}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-mono text-slate-400 uppercase">Focus Pillar</p>
                                  <p className="font-sans text-slate-600 truncate">{item.focusArea}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-mono text-slate-400 uppercase">Work Email</p>
                                  <p className="font-sans text-slate-600 underline truncate">{item.email}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-mono text-slate-400 uppercase">Monthly Traffic</p>
                                  <p className="font-sans text-slate-600">{item.trafficTier}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] font-mono text-slate-400 uppercase">Predicted Recovery</p>
                                  <p className="font-mono text-emerald-600 font-bold">{item.potentialIncrease}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t flex justify-end">
                      <button
                        onClick={() => setActiveTab('audit')}
                        className="bg-[#000000] text-white font-sans text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#ff8c00] transition-colors"
                      >
                        Return to Free Exit Intent Audit
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Standard Exit Intent lead capture form steps */
                  <div className="space-y-6">
                    {/* Stepper Wizard Bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                          step >= 1 ? 'bg-[#ff8c00] text-white' : 'bg-slate-200 text-slate-500'
                        }`}>1</span>
                        <span className="text-xs font-semibold text-slate-700">Select Goal</span>
                        <span className="h-px w-6 bg-slate-200" />
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                          step >= 2 ? 'bg-[#ff8c00] text-white' : 'bg-slate-200 text-slate-500'
                        }`}>2</span>
                        <span className="text-xs font-semibold text-slate-700">Contact Setup</span>
                        <span className="h-px w-6 bg-slate-200" />
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
                          step >= 3 ? 'bg-green-500 text-white animate-pulse' : 'bg-slate-200 text-slate-500'
                        }`}>3</span>
                        <span className="text-xs font-semibold text-slate-700">Audit Projections</span>
                      </div>
                    </div>

                    {step === 1 && (
                      <form onSubmit={handleProceedToStep2} className="space-y-6" id="exit-modal-step1-form">
                        <div className="space-y-2">
                          <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1">
                            <Globe className="h-4 w-4 text-slate-400" />
                            Specify Your Target Website URL
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={website}
                              onChange={(e) => handleWebsiteChange(e.target.value)}
                              onBlur={handleWebsiteBlur}
                              placeholder="e.g., myshopifybrand.com or company.com"
                              className={`w-full bg-slate-50 border rounded-2xl px-4 py-3.5 pr-10 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all font-sans text-slate-800 ${
                                websiteTouched && websiteError
                                  ? 'border-rose-500 ring-2 ring-rose-100 bg-rose-50/10'
                                  : websiteTouched && !websiteError && website
                                  ? 'border-emerald-500 bg-emerald-50/5 focus:ring-emerald-500/20 focus:border-emerald-500'
                                  : 'border-slate-200 focus:ring-[#000000]/20 focus:border-[#000000]'
                              }`}
                              autoFocus
                            />
                            <div className="absolute right-3.5 top-3.5 text-xs font-mono text-slate-400">
                              .com
                            </div>
                          </div>
                          {websiteTouched && websiteError ? (
                            <p className="text-xs text-rose-600 font-medium flex items-center gap-1.5 mt-1">
                              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                              {websiteError}
                            </p>
                          ) : websiteTouched && !websiteError && website ? (
                            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 mt-1">
                              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                              Domain structure verified. Proceed to next step.
                            </p>
                          ) : (
                            <p className="text-[11px] text-slate-550">
                              Our crawler assesses meta optimization, layout layouts, script speed bottlenecks, and search ranking signals.
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                            Primary Revenue Optimization Area
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              'Search Engine Optimization (SEO)',
                              'Conversion Rate Optimization (CRO)',
                              'Core Web Vitals & Load Speed',
                              'Inbound Leads & Pipeline Sales'
                            ].map((area) => (
                              <button
                                type="button"
                                key={area}
                                onClick={() => setFocusArea(area)}
                                className={`text-left p-3.5 rounded-2xl border text-sm transition-all flex items-start gap-2.5 ${
                                  focusArea === area
                                    ? 'border-[#000000] bg-blue-50/40 font-semibold text-[#000000]'
                                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                                }`}
                              >
                                <span className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                                  focusArea === area ? 'border-[#000000] bg-[#000000]' : 'border-slate-300'
                                }`}>
                                  {focusArea === area && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </span>
                                <span>{area}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {errorMsg && (
                          <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-lg flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>{errorMsg}</span>
                          </div>
                        )}

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                            <ShieldCheck className="h-4 w-4 text-emerald-600" />
                            <span>Complies with strict GDPR privacy standards</span>
                          </div>
                          <button
                            type="submit"
                            className="w-full sm:w-auto bg-[#000000] hover:bg-[#ff8c00] text-white font-sans font-bold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            Proceed to Logistics Setup
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </form>
                    )}

                    {step === 2 && (
                      <form onSubmit={handleSubmitLead} className="space-y-5" id="exit-modal-step2-form">
                        <div className="p-4 bg-[#000000]/5 border border-blue-100/60 rounded-2xl text-xs space-y-1">
                          <span className="font-mono text-[#000000] font-black uppercase tracking-wider">PRELIMINARY ASSESSMENT INITIAL CONTEXT</span>
                          <p className="text-slate-600">
                            Analyzing Website: <span className="font-bold font-mono text-[#000000]">{website}</span> &bull; Focus Pillar: <span className="font-bold text-slate-800">{focusArea}</span>
                          </p>
                          <button 
                            type="button" 
                            onClick={() => setStep(1)} 
                            className="text-[11px] text-[#ff8c00] font-semibold underline hover:text-orange-700 mt-1 cursor-pointer"
                          >
                            Change site details
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Your Full Name</label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => handleNameChange(e.target.value)}
                              onBlur={handleNameBlur}
                              placeholder="e.g. Samuel Jenkins"
                              className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all font-sans text-slate-800 ${
                                nameTouched && nameError
                                  ? 'border-rose-500 ring-2 ring-rose-100 bg-rose-50/10'
                                  : nameTouched && !nameError && name
                                  ? 'border-emerald-500 bg-emerald-50/5 focus:ring-emerald-500/20 focus:border-emerald-500'
                                  : 'border-slate-200 focus:ring-[#000000]/20 focus:border-[#000000]'
                              }`}
                              required
                            />
                            {nameTouched && nameError && (
                              <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1">
                                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
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
                              placeholder="e.g. sam@yourcompany.com"
                              className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all font-sans text-slate-800 ${
                                emailTouched && emailError
                                  ? 'border-rose-500 ring-2 ring-rose-100 bg-rose-50/10'
                                  : emailTouched && !emailError && email
                                  ? 'border-emerald-500 bg-emerald-50/5 focus:ring-emerald-500/20 focus:border-emerald-500'
                                  : 'border-slate-200 focus:ring-[#000000]/20 focus:border-[#000000]'
                              }`}
                              required
                            />
                            {emailTouched && emailError && (
                              <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1">
                                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                                {emailError}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Phone Number (Optional)</label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                              <input
                                type="tel"
                                value={phone}
                                onChange={(e) => handlePhoneChange(e.target.value)}
                                onBlur={handlePhoneBlur}
                                placeholder="+1 (555) 000-0000"
                                className={`w-full bg-slate-50 border rounded-xl pl-9 pr-3 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all font-sans text-slate-800 ${
                                  phoneTouched && phoneError
                                    ? 'border-rose-500 ring-2 ring-rose-100 bg-rose-50/10'
                                    : phoneTouched && !phoneError && phone
                                    ? 'border-emerald-500 bg-emerald-50/5 focus:ring-emerald-500/20 focus:border-emerald-500'
                                    : 'border-slate-200 focus:ring-[#000000]/20 focus:border-[#000000]'
                                }`}
                              />
                            </div>
                            {phoneTouched && phoneError && (
                              <p className="text-[11px] text-rose-600 font-medium flex items-center gap-1 mt-1">
                                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                                {phoneError}
                              </p>
                            )}
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">Estimated Monthly Traffic</label>
                            <select
                              value={trafficTier}
                              onChange={(e) => setTrafficTier(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#000000]/20 focus:border-[#000000] transition-all font-sans text-slate-800"
                            >
                              <option value="Under 10k monthly visits">Under 10k monthly visits</option>
                              <option value="10k - 50k monthly visits">10k - 50k monthly visits</option>
                              <option value="50k - 150k monthly visits">50k - 150k monthly visits</option>
                              <option value="Over 150k monthly visits">Over 150k monthly visits</option>
                            </select>
                          </div>
                        </div>

                        {errorMsg && (
                          <div className="text-xs text-rose-600 bg-rose-50 border border-rose-100 p-3 rounded-lg flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span>{errorMsg}</span>
                          </div>
                        )}

                        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full sm:w-auto text-xs text-slate-550 hover:underline px-4 py-2 cursor-pointer text-center"
                          >
                            Back To Step 1
                          </button>
                          
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            id="run-audit-submit-btn"
                            className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-sans font-bold text-sm px-8 py-4 rounded-2xl transition-all shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
                          >
                            {isSubmitting ? (
                              <>
                                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                                Analyzing domain parameters...
                              </>
                            ) : (
                              <>
                                Generate Free ROI Appraisal Report
                                <TrendingUp className="h-4 w-4" />
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}

                    {step === 3 && (
                      <div className="space-y-6 text-center py-4" id="exit-modal-step3-completion">
                        {isSimulating ? (
                          /* Visual AI Simulation Loader */
                          <div className="space-y-6 max-w-sm mx-auto py-8">
                            <div className="relative w-16 h-16 mx-auto">
                              <span className="absolute inset-0 rounded-full border-4 border-slate-100" />
                              <span className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
                              <Sparkles className="absolute top-5 left-5 h-6 w-6 text-[#000000] animate-pulse" />
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="text-base font-bold text-[#000000] font-sans">
                                MarketingCloudFX™ Running Live Crawl
                              </h4>
                              <p className="text-xs text-slate-500">
                                Probing website structural layouts and assessing standard profit leaks...
                              </p>
                            </div>

                            {/* Staggered progress checkpoints */}
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-mono text-left space-y-2.5">
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${simStep >= 1 ? 'bg-green-500' : 'bg-slate-350 animate-ping'}`} />
                                <span className={simStep >= 1 ? 'text-slate-700' : 'text-slate-400 font-normal'}>
                                  [OK] Initialized crawler for {website}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${simStep >= 2 ? 'bg-green-500' : 'bg-slate-350 animate-ping'}`} />
                                <span className={simStep >= 2 ? 'text-slate-700' : 'text-slate-400 font-normal'}>
                                  [OK] Audited Core Web Vitals (LCP/TBT)
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${simStep >= 3 ? 'bg-green-500' : 'bg-slate-350 animate-ping'}`} />
                                <span className={simStep >= 3 ? 'text-slate-700' : 'text-slate-400 font-normal'}>
                                  [OK] Calculated SEO Rank Competitiveness
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${simStep >= 4 ? 'bg-green-500' : 'bg-slate-350 animate-ping'}`} />
                                <span className={simStep >= 4 ? 'text-slate-700' : 'text-slate-400 font-normal'}>
                                  [OK] Exporting forecasted ROI spreadsheet
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Successful simulated results display */
                          <div className="space-y-6">
                            <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 text-center max-w-lg mx-auto space-y-3">
                              <div className="mx-auto w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center">
                                <BadgeCheck className="h-8 w-8" style={{ animation: 'bounce 1.5s infinite' }} />
                              </div>
                              
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-extrabold bg-emerald-100 px-2 py-0.5 rounded">
                                  AUDIT INITIALIZED SUCCESSFUL
                                </span>
                                <h4 className="text-xl sm:text-2xl font-black text-[#000000] font-sans">
                                  Your Custom Website Report is Being Compiled!
                                </h4>
                              </div>
                              <p className="text-xs text-slate-600 max-w-md mx-auto">
                                Comprehensive analysis for <span className="font-bold underline">{website}</span> is in final stages. Our optimization specialists will send the final manual evaluation to <span className="font-semibold text-slate-800 italic">{email}</span> in within 2 hours.
                              </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
                              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 text-center space-y-1">
                                <p className="text-[10px] font-mono text-slate-450 uppercase font-black">Estimated Annual Profit Recovery</p>
                                <p className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono tracking-tight animate-pulse">
                                  {trafficTier.includes("150k") && "+$570,000 / yr"}
                                  {trafficTier.includes("50k") && "+$270,000 / yr"}
                                  {trafficTier.includes("10k") && "+$136,800 / yr"}
                                  {trafficTier.includes("Under") && "+$38,400 / yr"}
                                </p>
                                <p className="text-[10px] text-slate-500">Based on standard conversion improvement multiplier</p>
                              </div>

                              <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 text-center flex flex-col justify-center space-y-1">
                                <p className="text-[10px] font-mono text-slate-455 uppercase font-black">Your Booking Slot ID</p>
                                <p className="text-lg font-bold text-slate-800 tracking-tight font-mono">
                                  #AM-{(Math.random()*10000+5000).toFixed(0)}
                                </p>
                                <p className="text-[10px] text-slate-550 font-bold text-amber-600">⚠️ COMPLIMENTARY STRATEGY CALL LOCK</p>
                              </div>
                            </div>

                            <div className="border border-indigo-100 bg-[#000000]/5 rounded-3xl p-6 max-w-lg mx-auto text-left space-y-4">
                              <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-[#ff8c00] shrink-0 mt-0.5" />
                                <div className="space-y-1">
                                  <h5 className="text-xs font-bold text-[#000000] uppercase font-mono">
                                    Bonus Strategy Call (100% Free)
                                  </h5>
                                  <p className="text-xs text-slate-600">
                                    Discuss the audit results immediately with an alkhawarizmi.agency revenue analyst to implement rapid-impact code optimizations on your layout.
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  window.open('https://calendly.com/alkhawarizmi-agency/strategy', '_blank');
                                }}
                                className="w-full bg-[#000000] hover:bg-[#ff8c00] text-white font-sans font-bold text-xs py-3.5 rounded-2xl transition-colors shadow flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                Reserve My Audit Call (Calendly Portal)
                                <ExternalLink className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <button
                              onClick={closeModal}
                              id="done-exit-audit-btn"
                              className="text-xs text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer"
                            >
                              Close and Continue Reading Site
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Secure Trust Footer on Dialog modal */}
              {activeTab === 'audit' && (
                <div className="bg-slate-50 border-t border-slate-150 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500">
                  <span className="font-mono">alkhawarizmi.agency Core System Assessment API v4.28</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-600" />
                      Encrypted Lead Delivery
                    </span>
                    <span>&bull;</span>
                    <span>No CC required</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
