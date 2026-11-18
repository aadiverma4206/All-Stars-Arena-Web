import React from 'react';
import { Shield, Lock, Database, Trash2, UserCheck, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyContent = () => {
  return (
    <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3">
        <Shield className="w-5 h-5 text-sport-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-extrabold text-slate-900 dark:text-white text-base">Privacy Policy</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Effective Date: November 2026 • Official Document for All Stars Arena (Raipur) Users &amp; Athletes
          </p>
        </div>
      </div>

      {/* 1. Introduction */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center text-xs font-black">1</span>
          Introduction &amp; Commitment to Privacy
        </h5>
        <p>
          At <strong>All Stars Arena</strong>, we respect your personal privacy and are committed to safeguarding the personal data you share with us. This Privacy Policy outlines our transparent data practices concerning how we collect, utilize, store, encrypt, and manage your information across our website and mobile application services.
        </p>
      </section>

      {/* 2. Information Collection */}
      <section className="space-y-3">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center text-xs font-black">2</span>
          Information We Collect
        </h5>
        <p>To provide high-quality pickup matches and turf booking services, we collect essential details:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-black uppercase text-sport-500 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" /> Identity &amp; Profile
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Full Name, Verified Mobile Number (OTP authentication), Email Address, and Avatar / Profile Picture.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1">
            <span className="text-xs font-black uppercase text-sport-500 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" /> Device &amp; Location
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Precise GPS/device location to discover nearby available turfs, match slots, and local community pickup games.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Payment Security & Processing */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center text-xs font-black">3</span>
          Payment Security (Razorpay Integration)
        </h5>
        <p>
          All Stars Arena does <strong>not</strong> store your credit/debit card numbers or UPI MPINs on our servers. All financial transactions are processed securely through <strong>Razorpay</strong>, India’s leading PCI-DSS Level 1 compliant payment gateway.
        </p>
        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pl-4 list-disc">
          <li>Supports UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, Net Banking, and Arena Wallet.</li>
          <li>Protected with 256-bit bank-grade TLS/SSL encrypted communication channels.</li>
          <li>Arena Wallet transactions require your personal 4-digit security PIN for authorization.</li>
        </ul>
      </section>

      {/* 4. Information Usage */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center text-xs font-black">4</span>
          How We Use Your Information
        </h5>
        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-sport-500 shrink-0 mt-0.5" />
            <span><strong>Turf Slot Reservations:</strong> Scheduling confirmed pitch bookings at our Raipur arena beside Zora Mall.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-sport-500 shrink-0 mt-0.5" />
            <span><strong>Player Rating (OVR/ELO):</strong> Calculating sports performance, goals scored, and MVP leaderboard statistics.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-sport-500 shrink-0 mt-0.5" />
            <span><strong>CCTV Match Playback:</strong> Providing registered players with HD match highlights and VAR video clips from our arena cameras.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-sport-500 shrink-0 mt-0.5" />
            <span><strong>Notifications &amp; Alerts:</strong> WhatsApp &amp; SMS alerts regarding match reminders, cancellations, and slot reschedules.</span>
          </div>
        </div>
      </section>

      {/* 5. Data Storage & Security */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center text-xs font-black">5</span>
          Data Storage &amp; Infrastructure Security
        </h5>
        <p>
          Your data is stored in high-security cloud environments protected by industry standards:
        </p>
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center gap-3">
          <Lock className="w-6 h-6 text-sport-500 shrink-0" />
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <strong>Amazon Web Services (AWS S3):</strong> Encrypted buckets with AES-256 server-side encryption for profile photos and match camera footage. All communication is routed through SSL/TLS certificates.
          </p>
        </div>
      </section>

      {/* 6. Account & Personal Data Deletion */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-sport-500/10 text-sport-600 dark:text-sport-400 flex items-center justify-center text-xs font-black">6</span>
          Account Deletion &amp; Data Rights
        </h5>
        <p>
          You retain full ownership of your data. You may request complete account deletion and erasure of your profile, ratings, and stored files at any time.
        </p>
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-3">
          <Trash2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300">
            <span>To request account erasure, email our Data Privacy Officer at </span>
            <a href="mailto:privacy@allstarsarena.com" className="font-bold text-rose-600 dark:text-rose-400 underline">
              privacy@allstarsarena.com
            </a>
            <span>. We process deletion requests within 48 business hours.</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyContent;
