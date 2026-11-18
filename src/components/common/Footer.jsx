import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AllStarsLogo from './AllStarsLogo';
import { useSupportStore } from '../../store/useSupportStore';

export const Footer = () => {
  const { openLegalModal, openCallModal, openChat } = useSupportStore();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      if (id !== 'top') {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 120);
      }
      return;
    }

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
      <div className="max-w-[1600px] w-full mx-auto px-3 sm:px-6 lg:px-12 space-y-8">
        
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
              <li><button onClick={() => scrollTo('basketball-freestyle')} className="hover:text-sport-500 transition-colors cursor-pointer text-left">3D Basketball Freestyle</button></li>
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
            <button 
              onClick={() => scrollTo('top')}
              className="text-left cursor-pointer focus:outline-none block"
              aria-label="All Stars Arena - Scroll to top"
            >
              <AllStarsLogo size="md" showText={true} inverted={true} />
            </button>
            <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
              Premier Pickup Football &amp; Arena Management • Beside Zora Mall, Raipur, Chhattisgarh.
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
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] font-bold text-slate-500 gap-3 text-center sm:text-left">
          <span className="leading-relaxed">2026 © All Stars Arena (Raipur). All rights reserved • Powered by <strong className="text-slate-300">Botivate</strong></span>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <button onClick={() => openLegalModal('terms')} className="hover:text-white hover:underline cursor-pointer">
              Terms of use
            </button>
            <Link to="/privacy-policy" className="hover:text-white hover:underline cursor-pointer">
              Privacy policy
            </Link>
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
