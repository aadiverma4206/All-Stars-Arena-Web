import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  Database,
  Trash2,
  UserCheck,
  CheckCircle2,
  ArrowLeft,
  Printer,
  Share2,
  Check,
  Mail,
  Phone,
  MapPin,
  Camera,
  CreditCard,
  FileText,
  AlertTriangle,
  Clock,
  Eye,
  Server
} from 'lucide-react';
import { useSupportStore } from '../store/useSupportStore';

export const PrivacyPolicyPage = () => {
  const { openLegalModal, openCallModal, closeChat } = useSupportStore();
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    closeChat();
    const originalTitle = document.title;
    document.title = 'Privacy Policy | All Stars Arena Raipur';
    return () => {
      document.title = originalTitle;
    };
  }, [closeChat]);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const scrollToId = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'overview', label: '1. Overview' },
    { id: 'collection', label: '2. Data Collection' },
    { id: 'payments', label: '3. Payment Security' },
    { id: 'cctv', label: '4. CCTV & Match Video' },
    { id: 'storage', label: '5. Cloud Storage' },
    { id: 'cookies', label: '6. Cookies & Cache' },
    { id: 'minors', label: '7. Youth Privacy' },
    { id: 'erasure', label: '8. Account Deletion' },
    { id: 'dpo', label: '9. Contact DPO' },
  ];

  return (
    <div className="space-y-8 py-4 sm:py-6 max-w-5xl mx-auto">
      {/* Top Breadcrumb & Quick Actions Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <nav className="flex items-center space-x-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sport-600 dark:text-sport-400 hover:underline transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-extrabold">Legal</span>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300">Privacy Policy</span>
        </nav>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer border border-slate-200 dark:border-slate-700/60"
            title="Copy page link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-bold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share URL</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer border border-slate-200 dark:border-slate-700/60"
            title="Print or Save PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <section className="relative rounded-3xl p-4 sm:p-8 lg:p-10 bg-[#011f13] border border-emerald-800/40 text-white shadow-2xl overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sport-500/20 border border-sport-500/40 text-sport-400 text-xs font-black uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>OFFICIAL LEGAL COMPLIANCE • ALL STARS ARENA</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-tight break-words">
            Privacy Policy
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-3xl leading-relaxed">
            Our comprehensive commitment to player confidentiality, Razorpay payment encryption, AWS S3 biometric protection, and transparent data rights for all athletes and visitors at All Stars Arena, Raipur.
          </p>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-2 text-[11px] font-bold text-slate-300">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-sport-400" />
              <span>Effective Date: November 2026</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-sport-400" />
              <span>Beside Zora Mall, Raipur (C.G.)</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Version 2.4 • PCI-DSS &amp; DPDP Aligned</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Jump Anchor Pills */}
      <div className="sticky top-16 sm:top-20 z-30 py-2 sm:py-2.5 px-2.5 sm:px-3 rounded-2xl bg-white/95 dark:bg-[#011410]/95 backdrop-blur-md border border-slate-200 dark:border-emerald-950/80 shadow-md flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] font-black uppercase text-slate-400 dark:text-slate-500 px-2 shrink-0">
          Jump to:
        </span>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToId(item.id)}
            className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeSection === item.id
                ? 'bg-sport-500 text-slate-950 font-black shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        
        {/* 1. Introduction & Commitment */}
        <section id="overview" className="footy-card p-6 sm:p-8 space-y-4 scroll-mt-36">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center font-black text-sm">
              1
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Introduction &amp; Commitment to Privacy
            </h2>
          </div>

          <p>
            Welcome to <strong>All Stars Arena</strong> ("we," "our," or "the Arena"). We provide state-of-the-art pickup sports experiences, ARENA 5G synthetic turf rentals, basketball courts, and athlete management platforms located beside <strong>Zora Mall, Raipur, Chhattisgarh 492006</strong>.
          </p>

          <p>
            We take your personal privacy seriously. This Privacy Policy details the policies and practices regarding the collection, handling, storage, encryption, and protection of personally identifiable information (PII) gathered whenever you visit our website, utilize our mobile booking applications, step into our sports facility, or engage with our customer support teams.
          </p>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-sport-500 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <strong>Our Golden Promise:</strong> All Stars Arena never sells, leases, or trades your personal information, phone numbers, or match history to third-party ad networks or data aggregators. Every piece of information collected directly serves to streamline your match bookings and enhance arena safety.
            </div>
          </div>
        </section>

        {/* 2. Information We Collect */}
        <section id="collection" className="footy-card p-6 sm:p-8 space-y-5 scroll-mt-36">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center font-black text-sm">
              2
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Information We Collect
            </h2>
          </div>

          <p>
            To deliver frictionless slot reservations, balanced community matchmaking, and reliable arena services, we collect information in the following categories:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-sport-600 dark:text-sport-400 font-extrabold text-sm uppercase">
                <UserCheck className="w-4 h-4" />
                <span>A. Identity &amp; Profile Details</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 list-disc pl-4">
                <li>Full name and preferred baller nickname.</li>
                <li>Verified mobile telephone number (verified via One-Time Password / OTP).</li>
                <li>Email address for booking tax invoices and slot confirmations.</li>
                <li>Profile picture / sports avatar (optional).</li>
                <li>Preferred positions (e.g. Striker, Midfielder, Goalkeeper).</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-sport-600 dark:text-sport-400 font-extrabold text-sm uppercase">
                <MapPin className="w-4 h-4" />
                <span>B. Geolocation &amp; Device Information</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 list-disc pl-4">
                <li>Approximate or precise device GPS location (with explicit permission) to calculate travel time to Raipur Arena.</li>
                <li>IP address, browser type, device operating system (Android, iOS, Windows, macOS).</li>
                <li>Hardware identifiers to prevent multi-account fraudulent slot hoarding.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-sport-600 dark:text-sport-400 font-extrabold text-sm uppercase">
                <Database className="w-4 h-4" />
                <span>C. Athletic &amp; Community Activity</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 list-disc pl-4">
                <li>Match booking dates, scheduled hours, and pitch numbers (Pitch 1 5G, Pitch 2 Futsal).</li>
                <li>Player Performance Rating (OVR / ELO score), match attendance rate, and MVP votes.</li>
                <li>Attendance punctuality and compliance with arena etiquette.</li>
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-sport-600 dark:text-sport-400 font-extrabold text-sm uppercase">
                <CreditCard className="w-4 h-4" />
                <span>D. Payment Identifiers</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 list-disc pl-4">
                <li>Razorpay unique Payment IDs, Order IDs, and settlement timestamps.</li>
                <li>Arena Wallet balance, refund credits, and recharge ledger.</li>
                <li>Note: Sensitive payment card details and bank passwords are <strong>never</strong> received or saved by our servers.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Payment Security & Razorpay Integration */}
        <section id="payments" className="footy-card p-6 sm:p-8 space-y-4 scroll-mt-36">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center font-black text-sm">
              3
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Payment Security &amp; Razorpay Integration
            </h2>
          </div>

          <p>
            Financial safety is our highest priority. All payments initiated on All Stars Arena are routed through <strong>Razorpay Software Private Limited</strong>, India's foremost PCI-DSS Level 1 certified payment aggregator.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-sport-500" />
              <span>Multi-Layer Financial Safeguards</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="font-black text-slate-900 dark:text-white block mb-1">Zero Card Storage</span>
                We do not store credit card numbers, CVVs, expiry dates, or UPI MPINs on any database or server.
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="font-black text-slate-900 dark:text-white block mb-1">Bank-Grade 256-Bit TLS</span>
                End-to-end Transport Layer Security (TLS 1.3) protects checkout transmissions against interception.
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="font-black text-slate-900 dark:text-white block mb-1">Arena Wallet PIN</span>
                Every wallet transaction and refund balance deduction requires your confidential 4-digit security PIN.
              </div>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <span className="font-black text-slate-900 dark:text-white block mb-1">Automated 4-Hour Refunds</span>
                Cancellations made 4+ hours before kick-off automatically credit to your wallet within 60 seconds.
              </div>
            </div>
          </div>
        </section>

        {/* 4. Turf CCTV, Match Highlights & Player Privacy */}
        <section id="cctv" className="footy-card p-6 sm:p-8 space-y-4 scroll-mt-36">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center font-black text-sm">
              4
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Turf CCTV, Match Highlights &amp; Video Recordings
            </h2>
          </div>

          <p>
            All Stars Arena operates closed-circuit high-definition sports cameras and VAR systems covering our pitches and venue perimeters beside Zora Mall, Raipur.
          </p>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <Camera className="w-4 h-4 text-sport-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">Safety &amp; Fair-Play Surveillance:</strong> High-definition video recording operates 24/7 across playing pitches, reception, parking bays, and spectator corridors to uphold player security, resolve disputes, and deter vandalism.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <Eye className="w-4 h-4 text-sport-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">Restricted Locker Room Privacy:</strong> Under no circumstances are video cameras positioned inside player changing rooms, shower cubicles, or restrooms. These private zones are 100% camera-free.
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <CheckCircle2 className="w-4 h-4 text-sport-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 dark:text-white">Player Match Highlights:</strong> Registered players may access and download clips of goals, saves, and match summaries. Match raw camera files are routinely cycled and permanently erased every 14 days unless required for an ongoing security review.
              </div>
            </div>
          </div>
        </section>

        {/* 5. Cloud Storage, AWS Infrastructure & Security */}
        <section id="storage" className="footy-card p-6 sm:p-8 space-y-4 scroll-mt-36">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center font-black text-sm">
              5
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Cloud Storage &amp; Infrastructure Security
            </h2>
          </div>

          <p>
            All digital records are hosted on fault-tolerant, Tier-4 data centers managed by <strong>Amazon Web Services (AWS)</strong> in the Asia-Pacific (Mumbai, India) region to ensure data sovereignty under Indian law.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <Server className="w-4 h-4 text-sport-500" />
              <h4 className="font-extrabold text-slate-900 dark:text-white">AES-256 Storage</h4>
              <p className="text-slate-600 dark:text-slate-400">
                Server-side encryption across Amazon S3 buckets for all media, avatars, and invoices.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <Shield className="w-4 h-4 text-sport-500" />
              <h4 className="font-extrabold text-slate-900 dark:text-white">Firewall &amp; DDoS</h4>
              <p className="text-slate-600 dark:text-slate-400">
                AWS WAF and Shield protection defend our slot booking engine against unauthorized probing.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <Lock className="w-4 h-4 text-sport-500" />
              <h4 className="font-extrabold text-slate-900 dark:text-white">Strict Access Control</h4>
              <p className="text-slate-600 dark:text-slate-400">
                Strict role-based least-privilege policies; engineers cannot access plain player credentials.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Cookies, Local Storage & Session Data */}
        <section id="cookies" className="footy-card p-6 sm:p-8 space-y-4 scroll-mt-36">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center font-black text-sm">
              6
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Cookies &amp; Local Browser Storage
            </h2>
          </div>

          <p>
            We use essential browser cookies and local storage tokens strictly to maintain your session integrity:
          </p>

          <ul className="space-y-2 text-xs list-disc pl-5">
            <li>
              <strong>Theme Preference:</strong> Stores whether you prefer Dark Mode or Light Mode in your local browser cache (`theme-store`).
            </li>
            <li>
              <strong>Authentication &amp; Session:</strong> Keeps you securely logged in to your turf booking dashboard between page refreshes.
            </li>
            <li>
              <strong>Support &amp; Account Preferences:</strong> Remembers your security and notification preferences so your settings remain consistent across sessions.
            </li>
          </ul>
        </section>

        {/* 7. Underage Athletes & Minor Privacy */}
        <section id="minors" className="footy-card p-6 sm:p-8 space-y-4 scroll-mt-36">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center font-black text-sm">
              7
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Youth Ballers &amp; Minor Privacy Policy (Under 18)
            </h2>
          </div>

          <p>
            All Stars Arena encourages youth participation in sports. For ballers under the age of 18, account creation and slot booking must be conducted with the consent of a parent or legal guardian.
          </p>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            If we discover that personal data of a minor has been collected without verifiable parental consent, we will promptly delete that data or request proper parental authorization. Parents can review or request deletion of their child's records by reaching out to our privacy desk.
          </p>
        </section>

        {/* 8. Account Deletion & Player Data Rights */}
        <section id="erasure" className="footy-card p-6 sm:p-8 space-y-4 scroll-mt-36">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center font-black text-sm">
              8
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Your Data Protection Rights &amp; Account Erasure
            </h2>
          </div>

          <p>
            Under India's Digital Personal Data Protection (DPDP) Act and international standards, you have unequivocal rights over your information:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-white block mb-0.5">Right to Access &amp; Portability:</strong>
              Download a complete export of your match history, player statistics, and billing invoices.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-white block mb-0.5">Right to Rectification:</strong>
              Update incorrect contact details, profile avatars, or notification preferences in 1-click.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-white block mb-0.5">Right to Withdraw Consent:</strong>
              Opt out of marketing WhatsApp and SMS updates at any time via SMS reply or account settings.
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <strong className="text-slate-900 dark:text-white block mb-0.5">Right to Complete Erasure:</strong>
              Request permanent deletion of your profile, player stats, and associated phone records.
            </div>
          </div>

          {/* Account Deletion Callout Box */}
          <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-3">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-extrabold text-sm uppercase">
              <Trash2 className="w-4 h-4" />
              <span>How to Request Permanent Account Erasure</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              To request full erasure of your account, email our Data Privacy Officer with your registered phone number, or speak to our desk team. Erasure requests are processed within <strong>48 business hours</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="mailto:privacy@allstarsarena.com?subject=Account%20Erasure%20Request%20-%20All%20Stars%20Arena"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email privacy@allstarsarena.com</span>
              </a>
              <button
                onClick={openCallModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Support (1800-123-4567)</span>
              </button>
            </div>
          </div>
        </section>

        {/* 9. Data Protection Officer & Grievance Redressal */}
        <section id="dpo" className="footy-card p-6 sm:p-8 space-y-5 scroll-mt-36">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center font-black text-sm">
              9
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Data Protection Officer &amp; Grievance Redressal
            </h2>
          </div>

          <p>
            For any concerns, questions regarding this Privacy Policy, or grievances related to personal data handling, contact our designated Grievance &amp; Privacy Officer:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <Mail className="w-4 h-4 text-sport-500" />
              <h4 className="font-extrabold text-slate-900 dark:text-white">Email Address</h4>
              <a
                href="mailto:privacy@allstarsarena.com"
                className="text-sport-600 dark:text-sport-400 hover:underline font-bold block"
              >
                privacy@allstarsarena.com
              </a>
              <span className="text-[10px] text-slate-500 block">Typical response: Under 24h</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <Phone className="w-4 h-4 text-sport-500" />
              <h4 className="font-extrabold text-slate-900 dark:text-white">Phone Support</h4>
              <button
                onClick={openCallModal}
                className="text-sport-600 dark:text-sport-400 hover:underline font-bold text-left cursor-pointer block"
              >
                1800-123-4567 (Toll Free)
              </button>
              <span className="text-[10px] text-slate-500 block">Mon - Sun: 8 AM - 11 PM IST</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <MapPin className="w-4 h-4 text-sport-500" />
              <h4 className="font-extrabold text-slate-900 dark:text-white">Physical Venue</h4>
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                Beside Zora Mall, Raipur, Chhattisgarh 492006, India
              </p>
              <span className="text-[10px] text-slate-500 block">Walk-in Arena Desk Available</span>
            </div>
          </div>
        </section>

      </div>

      {/* Bottom Cross-Navigation & Legal Hub Links */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-4 text-center">
        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white uppercase tracking-tight">
          Explore Other Official Legal Policies
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Need details regarding our 4-hour cancellation rule, footwear guidelines, or physical injury liability?
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            onClick={() => openLegalModal('terms')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-sport-500 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>Terms of Use &amp; Refunds</span>
          </button>
          <button
            onClick={() => openLegalModal('risk')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-amber-500 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer shadow-sm"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Athletic Risk Disclosure</span>
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sport-500 hover:bg-sport-600 text-slate-950 font-black text-xs transition-all shadow-md shadow-sport-500/20"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Arena Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
