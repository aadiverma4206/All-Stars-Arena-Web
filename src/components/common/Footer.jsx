import React from 'react';
import AllStarsLogo from './AllStarsLogo';
import { useSupportStore } from '../../store/useSupportStore';

export const Footer = () => {
  const { openLegalModal, openCallModal, openChat } = useSupportStore();

  const scrollTo = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-900 dark:bg-[#011410] text-white pt-12 pb-8 transition-colors">
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        
        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-xs font-semibold text-slate-400">
          <div className="space-y-3">
            <h4 className="text-white font-extrabold uppercase text-xs tracking-wider">New to All Stars Arena?</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollTo('about')} className="hover:text-sport-500 transition-colors cursor-pointer text-left">What is All Stars Arena</button></li>
              <li><button onClick={() => scrollTo('how-it-works')} className="hover:text-sport-500 transition-colors cursor-pointer text-left">What to expect</button></li>
              <li><button onClick={() => openLegalModal('terms')} className="hover:text-sport-500 transition-colors cursor-pointer text-left">Code of conduct</button></li>
              <li><button onClick={openCallModal} className="hover:text-sport-500 transition-colors cursor-pointer text-left">Call Support (1800-123-4567)</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-extrabold uppercase text-xs tracking-wider">About All Stars Arena</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollTo('about')} className="hover:text-sport-500 transition-colors cursor-pointer text-left">Our story</button></li>
              <li><button onClick={() => scrollTo('stats')} className="hover:text-sport-500 transition-colors cursor-pointer text-left">Impact</button></li>
              <li><button onClick={() => scrollTo('how-it-works')} className="hover:text-sport-500 transition-colors cursor-pointer text-left">Play football &amp; basketball</button></li>
              <li><button onClick={() => scrollTo('pitches')} className="hover:text-sport-500 transition-colors cursor-pointer text-left">Pitches &amp; Venues</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-extrabold uppercase text-xs tracking-wider">Popular links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollTo('how-it-works')} className="hover:text-sport-500 transition-colors cursor-pointer text-left">Find games</button></li>
              <li><button onClick={() => scrollTo('pitches')} className="hover:text-sport-500 transition-colors cursor-pointer text-left">Game host</button></li>
              <li><button onClick={() => scrollTo('reviews')} className="hover:text-sport-500 transition-colors cursor-pointer text-left">Community reviews</button></li>
              <li><button onClick={() => scrollTo('faq')} className="hover:text-sport-500 transition-colors cursor-pointer text-left">Help Center &amp; FAQs</button></li>
              <li><button onClick={openChat} className="text-sport-400 font-bold hover:underline cursor-pointer text-left">Chat Support Bot</button></li>
            </ul>
          </div>

          {/* Official Brand Lockup & Powered by Botivate */}
          <div className="space-y-3">
            <AllStarsLogo size="md" />
            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              Premier Pickup Football &amp; Arena Management • Beside Zola Mall, Raipur, Chhattisgarh.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-200 text-xs font-black">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Powered by <strong className="text-sport-400">Botivate</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Ribbon */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] font-bold text-slate-500 gap-2">
          <span>2026 © All Stars Arena (Raipur). All rights reserved • Powered by <strong className="text-slate-300">Botivate</strong></span>
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => openLegalModal('terms')} className="hover:text-white hover:underline cursor-pointer">
              Terms of use
            </button>
            <button onClick={() => openLegalModal('privacy')} className="hover:text-white hover:underline cursor-pointer">
              Privacy policy
            </button>
            <button onClick={() => openLegalModal('risk')} className="hover:text-amber-400 hover:underline cursor-pointer">
              Risk disclosure
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
