import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronDown, ChevronUp, MapPin, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import FootballKickLoader from '../components/common/FootballKickLoader';
import FootballScene from '../components/football3d/FootballScene';
import AllStarsLogo from '../components/common/AllStarsLogo';
import HeroRiverFlow from '../components/common/HeroRiverFlow';
import { useThemeStore } from '../store/useThemeStore';

export const HomePage = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const [openFaq, setOpenFaq] = useState(null);

  const scrollToSection = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const reviews = [
    {
      name: 'Abhinav',
      location: 'Raipur (Beside Zola Mall)',
      text: 'I love playing football, so being able to pick and choose when to play is the best thing ever. The 5G pitch beside Zola Mall is top quality. If I could give 10 stars, I would.'
    },
    {
      name: 'Prithivi',
      location: 'Raipur (VIP Road)',
      text: "Without All Stars Arena, I would've been depressed after moving to a new city and not playing football for a while as well as not having a group to play with."
    },
    {
      name: 'Prashant',
      location: 'Raipur (Shankar Nagar)',
      text: 'I have actually turned into a bit of a football addict, trying to get 3 or 4 games in per week under their night floodlights.'
    }
  ];

  const faqs = [
    {
      q: 'How does All Stars Arena work?',
      a: 'Simply browse open pick-up games and pitches at our arena beside Zola Mall, choose your slot, and turn up at the pitch to play with passionate local ballers!'
    },
    {
      q: 'How can I join a game?',
      a: 'Check out our arena pitches directory right below, pick a slot at our venue beside Zola Mall, and connect directly with local organizers and pitch managers.'
    },
    {
      q: 'Can anybody participate?',
      a: 'Yes! All Stars Arena is open to all skill levels, from beginners looking for casual kickabouts to seasoned players looking for intense 5v5 futsal or 7v7 matches.'
    },
    {
      q: 'Where is All Stars Arena located and what are the timings?',
      a: 'All Stars Arena is located right beside Zola Mall, Raipur, Chhattisgarh 492006. The venue operates 7 days a week from 06:00 AM to 12:00 AM (Midnight) with floodlit pitches and free dedicated parking.'
    }
  ];

  return (
    <div className="space-y-10 sm:space-y-16 py-4">

      {/* 1. HERO SECTION */}
      <section 
        id="top" 
        className={`relative rounded-2xl sm:rounded-3xl overflow-hidden min-h-[520px] lg:min-h-[640px] flex items-center p-5 sm:p-12 border shadow-2xl scroll-mt-24 transition-colors duration-300 ${
          isDark 
            ? 'bg-[#011410] text-white border-emerald-900/40 shadow-black/80' 
            : 'bg-gradient-to-br from-emerald-50 via-white to-slate-50 text-slate-900 border-emerald-200/70 shadow-emerald-500/5'
        }`}
      >
        <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
          isDark 
            ? 'bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.12)_0%,_rgba(1,20,16,0.85)_60%,_#011410_100%)]' 
            : 'bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.1)_0%,_transparent_70%)]'
        }`} />
        <div className={`absolute inset-0 [background-size:32px_32px] pointer-events-none transition-opacity duration-300 ${
          isDark 
            ? 'bg-[radial-gradient(#22c55e_1px,transparent_1px)] opacity-5' 
            : 'bg-[radial-gradient(#16a34a_1px,transparent_1px)] opacity-10'
        }`} />

        {/* Ambient Organic River Flow at the Bottom (Under the Football) */}
        <HeroRiverFlow />

        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase font-sans leading-tight text-slate-900 dark:text-white">
              PLAY FOOTBALL & BASKETBALL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sport-500 via-amber-400 to-sky-400">
                WHENEVER YOU WANT
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1 justify-center lg:justify-start">
              <Button 
                variant="primary" 
                size="lg" 
                icon={Play} 
                onClick={() => scrollToSection('pitches')}
                className="w-full sm:w-auto px-6 shadow-xl shadow-sport-500/20 cursor-pointer"
              >
                Start Playing
              </Button>
              
              {/* Football Kick Juggling Animation */}
              <div className="flex items-center justify-center p-1 bg-transparent select-none">
                <FootballKickLoader size="lg" />
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Football Only */}
          <div className="lg:col-span-5 flex items-center justify-center relative min-h-[320px] sm:min-h-[420px] lg:min-h-[500px] w-full">
            <FootballScene />
          </div>
        </div>
      </section>

      {/* 2. AS FEATURED ON & WELCOME SECTION */}
      <section id="about" className="footy-card p-6 sm:p-12 space-y-8 text-center scroll-mt-24">
        <div className="space-y-4">
          <span className="text-xs font-black tracking-widest text-slate-400 uppercase">AS FEATURED ON</span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all">
            <div className="text-base sm:text-xl font-black tracking-tighter text-slate-900 dark:text-white border-2 border-current px-2 sm:px-3 py-1">B B C</div>
            <div className="text-base sm:text-xl font-serif font-black tracking-tight text-slate-900 dark:text-white">The Telegraph</div>
            <div className="text-base sm:text-xl font-serif italic font-bold text-slate-900 dark:text-white">London Evening Standard</div>
            <div className="text-base sm:text-xl font-sans font-bold text-slate-900 dark:text-white">Manchester Evening News</div>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800 max-w-3xl mx-auto">
          <div className="flex justify-center pb-2">
            <AllStarsLogo size="xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Welcome to All Stars Arena
          </h2>
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
            We make playing casual football easy for thousands of football lovers around Raipur. Our simple app gets you playing football on a pitch beside Zola Mall faster than you can say tiki-taka. We pride ourselves in being the home of well organised games, dodgy bicycle kicks and last minute winners.
          </p>
        </div>
      </section>

      {/* 3. THE STATS NEVER LIE SECTION */}
      <section id="stats" className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#011410] p-6 sm:p-14 border border-emerald-900/40 text-white text-center shadow-2xl scroll-mt-24">
        <h2 className="text-xl sm:text-4xl font-black uppercase tracking-tight mb-8 sm:mb-10">The Stats Never Lie</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
          <div>
            <span className="text-2xl sm:text-5xl font-black text-white">001K<span className="text-rose-500">+</span></span>
            <span className="block text-[9px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mt-1">REGISTERED PLAYERS</span>
          </div>
          <div>
            <span className="text-2xl sm:text-5xl font-black text-white">001K<span className="text-rose-500">+</span></span>
            <span className="block text-[9px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mt-1">GAMES PLAYED</span>
          </div>
          <div>
            <span className="text-2xl sm:text-5xl font-black text-white">001K<span className="text-rose-500">+</span></span>
            <span className="block text-[9px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mt-1">MAX SPOTS AVAILABLE</span>
          </div>
          <div>
            <span className="text-2xl sm:text-5xl font-black text-white">001K<span className="text-rose-500">+</span></span>
            <span className="block text-[9px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mt-1">ACTIVE PLAYERS MONTHLY</span>
          </div>
        </div>
      </section>

      {/* 4. FIND. BOOK. PLAY. 3-STEP SECTION */}
      <section id="how-it-works" className="footy-card p-6 sm:p-14 space-y-8 sm:space-y-10 text-center scroll-mt-24">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase">Where the football magic happens</h2>
          <p className="text-xs font-bold text-slate-400 uppercase">Best pitches to play football</p>
          <h3 className="text-2xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight pt-1">Find. Book. Play.</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3 hover:border-sport-500/40 transition-all">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sport-500/10 text-sport-500 flex items-center justify-center mx-auto text-2xl sm:text-3xl">⚽</div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">1. Find</h4>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Find your nearest football pitch with a quick scroll.</p>
          </div>
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3 hover:border-amber-500/40 transition-all">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto text-2xl sm:text-3xl">👆</div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">2. Book</h4>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Book your next game, with a few clicks.</p>
          </div>
          <div className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3 hover:border-sky-500/40 transition-all">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center mx-auto text-2xl sm:text-3xl">👏</div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">3. Play</h4>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Play your best game. Have fun. Feel good.</p>
          </div>
        </div>
      </section>

      {/* 5. REVIEWS SECTION */}
      <section id="reviews" className="space-y-6 sm:space-y-8 text-center px-1 scroll-mt-24">
        <div>
          <span className="text-xs font-black text-rose-500 uppercase tracking-widest block">REVIEWS</span>
          <h2 className="text-xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mt-1">
            What our community have to say
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="footy-card p-5 sm:p-6 space-y-4 text-left flex flex-col justify-between hover:border-sport-500/40 transition-all shadow-md">
              <div className="space-y-3">
                <div className="flex text-amber-400 space-x-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />)}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 italic leading-relaxed">"{rev.text}"</p>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white block">{rev.name}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{rev.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. THREE PILLARS & FAQ SECTION */}
      <section id="faq" className="footy-card p-5 sm:p-12 space-y-8 sm:space-y-10 scroll-mt-24">
        {/* Three Pillars */}
        <div className="space-y-4 text-center">
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase">Our ethos is built around three pillars</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs font-bold pt-2">
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-l-4 border-sport-500 text-left">
              <span className="block text-sport-500 font-black text-sm mb-1">Accessibility</span>
              <p className="text-slate-600 dark:text-slate-300">Click away from playing football anywhere.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-l-4 border-amber-500 text-left">
              <span className="block text-amber-500 font-black text-sm mb-1">Social Integration</span>
              <p className="text-slate-600 dark:text-slate-300">Enriching communities through sports.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border-l-4 border-sky-500 text-left">
              <span className="block text-sky-500 font-black text-sm mb-1">Wellbeing</span>
              <p className="text-slate-600 dark:text-slate-300">Stronger physically &amp; mentally.</p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="w-full space-y-5 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center">
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Any questions? We got you.</h3>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold mt-2">Our FAQ section is a great place to start if you've got a question.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="footy-card p-4 sm:p-5 rounded-2xl cursor-pointer hover:border-sport-500/40 transition-all select-none" 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white flex-1">{faq.q}</h4>
                  {openFaq === idx ? <ChevronUp className="w-4 h-4 text-sport-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                </div>
                {openFaq === idx && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-slate-600 dark:text-slate-300 font-semibold mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 leading-relaxed"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ALL STARS ARENA LOCATION — EXCLUSIVELY BESIDE ZOLA MALL, RAIPUR */}
      <section id="pitches" className="footy-card p-6 sm:p-12 space-y-8 scroll-mt-24">
        
        {/* Venue Location Hero Banner */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#031c17] via-[#011410] to-[#031c17] border border-sport-500/30 text-white shadow-2xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sport-500/10 border border-sport-500/30 text-sport-400 text-xs font-black uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>OFFICIAL ARENA LOCATION</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                All Stars Arena — Raipur
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-semibold max-w-2xl leading-relaxed flex items-center space-x-1.5">
                <span className="text-sport-400 font-bold">📍 Address:</span>
                <span>Beside Zola Mall, Raipur, Chhattisgarh 492006</span>
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-col gap-2.5">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>🟢 OPEN TODAY • 06:00 AM – 12:00 AM</span>
              </div>
              <a 
                href="https://maps.google.com/?q=Zola+Mall+Raipur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-sport-500 hover:bg-sport-600 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-sport-500/20 cursor-pointer"
              >
                <span>🗺️ Get Directions on Maps</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Key Arena Features Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-black block">💡 Lighting</span>
              <span className="text-xs font-extrabold text-white">350+ LUX Night LED</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-black block">🎥 Quality</span>
              <span className="text-xs font-extrabold text-white">FIFA 5G Synthetic Turf</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-black block">🚗 Parking</span>
              <span className="text-xs font-extrabold text-white">Free Dedicated 50+ Bays</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-black block">🚿 Facilities</span>
              <span className="text-xs font-extrabold text-white">AC Changing Rooms</span>
            </div>
          </div>
        </div>

        {/* Venue Facilities */}
        <div className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-4">
          <h4 className="font-black text-base text-slate-900 dark:text-white uppercase flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-sport-500" />
            <span>Raipur Arena Facilities &amp; Amenities</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <div className="flex items-start space-x-2">
              <span className="text-sport-500 font-black">•</span>
              <span>Air-Conditioned Player Changing Rooms &amp; Showers</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-sport-500 font-black">•</span>
              <span>Free Dedicated 50+ Vehicle Parking Space</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-sport-500 font-black">•</span>
              <span>350+ LUX Stadium Floodlights for Night Matches</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-sport-500 font-black">•</span>
              <span>Official Thermally Bonded Size-5 Match Balls Provided</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-sport-500 font-black">•</span>
              <span>Sub-Base Drainage (100% Playable in Monsoon)</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-sport-500 font-black">•</span>
              <span>Sports Hydration, Drinks &amp; First Aid Desk</span>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};

export default HomePage;
