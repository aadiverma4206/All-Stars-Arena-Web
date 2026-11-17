import React from 'react';
import { FileText, Clock, ShieldCheck, Video, Ban } from 'lucide-react';

export const TermsConditionsContent = () => {
  return (
    <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
      {/* Terms Banner */}
      <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-start gap-3">
        <FileText className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-extrabold text-slate-900 dark:text-white text-base">Terms &amp; Conditions of Service</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Governing turf reservations, wallet refunds, ground rules, and community conduct at All Stars Arena
          </p>
        </div>
      </div>

      {/* 1. Acceptance of Terms */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-black">1</span>
          Acceptance of Terms
        </h5>
        <p>
          By creating an account, reserving a pitch slot, entering our sports facility beside Zora Mall (Raipur), or accessing our web and mobile applications, you formally agree to comply with and be legally bound by these Terms &amp; Conditions.
        </p>
      </section>

      {/* 2. Turf Booking & Slot Confirmation */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-black">2</span>
          Turf Booking &amp; Slot Allocation
        </h5>
        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
          <p>• Bookings are subject to real-time court availability on our 5G synthetic turf and floodlit courts.</p>
          <p>• A slot reservation is officially confirmed only upon successful Razorpay payment authorization or Arena Wallet debit.</p>
          <p>• Players must present the digital Booking QR Code at the arena check-in counter 10 minutes prior to slot start time.</p>
        </div>
      </section>

      {/* 3. Cancellation & Refund Policy */}
      <section className="space-y-3">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-black">3</span>
          Cancellation &amp; Refund Policy (4-Hour Rule)
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-1.5">
            <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> ≥ 4 Hours Before Match
            </span>
            <p className="text-xs font-bold text-slate-900 dark:text-white">100% Full Refund to Arena Wallet</p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Cancellations made 4 or more hours before the scheduled slot are credited instantly (100%) to your Arena Wallet with zero cancellation deductions.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-1.5">
            <span className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <Ban className="w-4 h-4" /> &lt; 4 Hours Before Match
            </span>
            <p className="text-xs font-bold text-slate-900 dark:text-white">Non-Refundable</p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              Cancellations within 4 hours are strictly non-refundable as the pitch is blocked exclusively for your squad and cannot be re-allocated.
            </p>
          </div>
        </div>
      </section>

      {/* 4. On-Field Conduct & Safety */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-black">4</span>
          On-Field Conduct &amp; Zero Tolerance Policy
        </h5>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          All Stars Arena promotes fair play, friendship, and intense community sports. Strict penalties apply for violations:
        </p>
        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 pl-4 list-disc">
          <li><strong>Zero Tolerance for Violence:</strong> Physical brawls, threats, offensive slurs, or referee intimidation will result in permanent ban without refund.</li>
          <li><strong>No Chewing Gum, Smoking or Alcohol:</strong> Strictly prohibited across all turf areas, dugouts, and changing rooms.</li>
          <li><strong>Proper Turf Footwear:</strong> Turf shoes (TF rubber) or flat trainers only. Metal studs are strictly forbidden.</li>
        </ul>
      </section>

      {/* 5. Account Security & Wallet PIN */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-black">5</span>
          Account Security &amp; Arena Wallet PIN
        </h5>
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 dark:text-slate-400">
            You are exclusively responsible for maintaining the confidentiality of your account login credentials, OTPs, and your 4-digit Arena Wallet security PIN. All Stars Arena will never ask for your PIN via phone, SMS, or WhatsApp.
          </p>
        </div>
      </section>

      {/* 6. Live Streaming & Media Rights */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-black">6</span>
          CCTV Recording, Match Replays &amp; Media Rights
        </h5>
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
          <Video className="w-5 h-5 text-sport-500 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Our arena is equipped with HD CCTV cameras and smart video sensors to record matches for security, player analytics, MVP weekly highlights, and tournament playback. By playing at the arena, ballers grant All Stars Arena a non-exclusive license to use anonymized gameplay clips for community highlight reels on our official app and social channels.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsConditionsContent;
