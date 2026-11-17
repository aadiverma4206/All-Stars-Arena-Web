import React from 'react';
import { AlertTriangle, CloudRain, HeartPulse, Footprints } from 'lucide-react';

export const RiskDisclosureContent = () => {
  return (
    <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
      {/* Risk Alert Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-extrabold text-slate-900 dark:text-white text-base">Athletic Risk Disclosure &amp; Sports Safety</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Important Sports Safety Information • Please read before stepping onto the pitch at All Stars Arena
          </p>
        </div>
      </div>

      {/* 1. Assumption of Athletic Risk */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-black">1</span>
          Inherent Risks of Sports Activities
        </h5>
        <p>
          Participation in competitive 5v5/7v7 football, futsal, and basketball inherently involves physical exertion, rapid directional changes, and high-intensity contact. By booking a slot or playing on our turf, players acknowledge and voluntarily assume all risks, including but not limited to:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            • Ankle sprains, knee ligament strain (ACL/MCL)
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            • Muscle cramps, hamstring pulls, and tendonitis
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            • Accidental collisions with players or perimeter nets
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            • Ball impact bruises and superficial turf friction burns
          </div>
        </div>
      </section>

      {/* 2. Physical Fitness & Preparation */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-black">2</span>
          Physical Fitness &amp; Hydration Guidelines
        </h5>
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
          <HeartPulse className="w-5 h-5 text-sport-500 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
            <p><strong>Pre-Match Warm-up:</strong> All ballers are strongly advised to perform dynamic stretches and joint warm-ups 10 minutes prior to match kick-off.</p>
            <p><strong>Continuous Hydration:</strong> Raipur weather can be hot and humid. Maintain adequate hydration before, during, and after play. Fresh electrolyte drinks are available at the arena desk.</p>
            <p><strong>Medical Disclosure:</strong> Players with pre-existing cardiovascular conditions, respiratory ailments, or recent surgeries must consult their physician before participating.</p>
          </div>
        </div>
      </section>

      {/* 3. Mandatory Equipment & Footwear Rules */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-black">3</span>
          Mandatory Footwear Standards
        </h5>
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3">
          <Footprints className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
            <p><strong>Permitted Footwear:</strong> Turf shoes (TF with multiple small rubber studs), flat indoor court shoes (IC), or standard athletic running sneakers.</p>
            <p className="font-bold text-rose-600 dark:text-rose-400">
              STRICTLY PROHIBITED: Metal studs (SG), long molded plastic studs (FG), and bare feet. Metal studs ruin the 5G synthetic carpet and significantly increase knee twisting injuries.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Weather Conditions & Stoppages */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-black">4</span>
          Weather Conditions &amp; Match Pausing
        </h5>
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
          <CloudRain className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Our turf features world-class sub-base drainage and operates seamlessly during standard rainfall. However, in the event of severe lightning, thunder, violent storms, or power grid alerts, the on-ground Arena Manager reserves the absolute right to pause play immediately or reschedule the slot for player safety.
          </p>
        </div>
      </section>

      {/* 5. Limitation of Liability */}
      <section className="space-y-2">
        <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-black">5</span>
          Limitation of Liability
        </h5>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          All Stars Arena, its management, staff, and technology partners (Botivate) shall not be held liable for any personal bodily injuries, accidental fractures, medical emergencies, or loss/theft of personal belongings (mobile phones, smartwatches, wallets, boots) on the pitch or inside changing facilities. Players are advised to secure valuables in personal lockers. First aid kits and emergency ice packs are stationed at the main registration counter.
        </p>
      </section>
    </div>
  );
};

export default RiskDisclosureContent;
