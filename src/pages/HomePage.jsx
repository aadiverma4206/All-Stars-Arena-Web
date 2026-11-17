import React from 'react';
import { Star, MapPin, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import FootballKickLoader from '../components/common/FootballKickLoader';
import FootballScene from '../components/football3d/FootballScene';
import AllStarsLogo from '../components/common/AllStarsLogo';
import HeroRiverFlow from '../components/common/HeroRiverFlow';
import HelpCenterSection from '../components/support/HelpCenterSection';
import { useThemeStore } from '../store/useThemeStore';

export const HomePage = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

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
      avatar: 'AB',
      color: 'bg-emerald-600',
      role: 'Weekend Striker',
      location: 'Raipur (Beside Zola Mall)',
      text: 'I love playing football, so being able to pick and choose when to play is the best thing ever. The 5G pitch beside Zola Mall is top quality. If I could give 10 stars, I would.'
    },
    {
      name: 'Prithivi',
      avatar: 'PR',
      color: 'bg-indigo-600',
      role: 'Regular Baller',
      location: 'Raipur (VIP Road)',
      text: "Without All Stars Arena, I would've been depressed after moving to a new city and not having a group to play with. Now I have a solid weekly squad under the floodlights."
    },
    {
      name: 'Prashant',
      avatar: 'PS',
      color: 'bg-purple-600',
      role: 'Tournament Organizer',
      location: 'Raipur (Shankar Nagar)',
      text: 'I have actually turned into a bit of a football addict, trying to get 3 or 4 games in per week under their night floodlights. The pitch maintenance is unmatched.'
    },
    {
      name: 'Sameer Verma',
      avatar: 'SV',
      color: 'bg-amber-600',
      role: '5v5 Futsal Captain',
      location: 'Raipur (Devendra Nagar)',
      text: 'Best synthetic turf in Chhattisgarh by a mile! No knee burns, high rebound perimeter nets, and the official size-5 match balls provided are top-tier.'
    },
    {
      name: 'Ritesh Tiwari',
      avatar: 'RT',
      color: 'bg-rose-600',
      role: 'Goalkeeper',
      location: 'Raipur (Samta Colony)',
      text: 'The 350+ LUX stadium lights make night games feel like Champions League nights. Zero flickering, perfect visibility, and plenty of safe parking space.'
    },
    {
      name: 'Aman Sharma',
      avatar: 'AS',
      color: 'bg-teal-600',
      role: 'Basketball Player',
      location: 'Raipur (Pandri)',
      text: 'Having a dedicated basketball court alongside the football turf is a game changer for Raipur. Grip on the court is great and the hoops are regulation height.'
    },
    {
      name: 'Ankit Agrawal',
      avatar: 'AA',
      color: 'bg-blue-600',
      role: 'Midfield Playmaker',
      location: 'Raipur (Telibandha)',
      text: 'Super easy slot booking. We booked a 9 PM to 11 PM slot for our corporate team match, and the staff had the bibs, water, and balls ready before we even stepped in.'
    },
    {
      name: 'Siddharth Jain',
      avatar: 'SJ',
      color: 'bg-cyan-600',
      role: 'Casual Baller',
      location: 'Raipur (Civil Lines)',
      text: 'The air-conditioned changing rooms and clean showers are a blessing after an intense 60-minute game. Premium amenities right next to Zola Mall.'
    },
    {
      name: 'Tushar Sahu',
      avatar: 'TS',
      color: 'bg-orange-600',
      role: 'Futsal Enthusiast',
      location: 'Raipur (Kapa)',
      text: 'Great community vibe! If you are solo and dont have a full team, people here welcome you to join pickup games. Made so many good friends here.'
    },
    {
      name: 'Kunal Kashyap',
      avatar: 'KK',
      color: 'bg-emerald-700',
      role: 'Sunday League Striker',
      location: 'Raipur (Tatibandh)',
      text: 'We host our Sunday 7v7 league matches here every weekend. The drainage system is insane — even after heavy rains, the pitch is playable in 15 minutes.'
    },
    {
      name: 'Harshita Patel',
      avatar: 'HP',
      color: 'bg-fuchsia-600',
      role: 'Women’s Team Forward',
      location: 'Raipur (VIP Estate)',
      text: 'Very safe and welcoming venue for women footballers. Security, dedicated locker rooms, and well-lit surroundings make it the best sports facility in town.'
    },
    {
      name: 'Rohit Deshmukh',
      avatar: 'RD',
      color: 'bg-violet-600',
      role: 'Weekend Defender',
      location: 'Raipur (Mowa)',
      text: 'The turf cushioning is very gentle on ankles and knees. Playing 2 hours here feels effortless compared to hard grounds. Highly recommended to everyone in Raipur!'
    }
  ];

  const col1Reviews = [reviews[0], reviews[3], reviews[6], reviews[9]];
  const col2Reviews = [reviews[1], reviews[4], reviews[7], reviews[10]];
  const col3Reviews = [reviews[2], reviews[5], reviews[8], reviews[11]];

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
          <div className="lg:col-span-5 flex items-center justify-center relative min-h-[280px] sm:min-h-[360px] md:min-h-[420px] lg:min-h-[480px] w-full">
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
      <section id="stats" className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#011f13] p-6 sm:p-14 border border-emerald-800/40 text-white text-center shadow-2xl scroll-mt-24">
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

      {/* 5. REVIEWS SECTION - STRAIGHT 3D ELEVATION FLOATING SHOWCASE */}
      <section id="reviews" className="space-y-6 sm:space-y-10 text-center px-1 scroll-mt-24">
        <div>
          <span className="text-xs font-black text-rose-500 uppercase tracking-widest block">REVIEWS</span>
          <h2 className="text-xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mt-1">
            What our community have to say
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            Real ballers, real intensity, real community. Explore reviews floating live across our stadium wall.
          </p>
        </div>

        {/* Floating Columns Container */}
        <div className="relative h-[620px] sm:h-[700px] overflow-hidden select-none">
          {/* Top & Bottom Atmospheric Ambient Fades */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-slate-50 dark:from-[#011410] to-transparent z-20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-slate-50 dark:from-[#011410] to-transparent z-20" />

          {/* Straight Upright Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 h-full items-start">
            
            {/* Column 1: Floats UP */}
            <div className="relative h-full">
              <div className="flex flex-col gap-5 sm:gap-6 animate-marquee-up col-hover-pause">
                {[...col1Reviews, ...col1Reviews].map((rev, idx) => (
                  <div
                    key={`col1-${idx}`}
                    className="group/card relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#031c17] border border-slate-200/90 dark:border-emerald-900/50 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_4px_10px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.7)] hover:shadow-[0_24px_48px_-12px_rgba(16,185,129,0.3)] dark:hover:shadow-[0_24px_50px_-12px_rgba(16,185,129,0.45)] hover:border-emerald-500/60 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 space-y-4 flex flex-col justify-between text-left shrink-0"
                  >
                    {/* 3D Specular Light Sheen Overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500/0 via-emerald-500/5 to-white/10 dark:to-emerald-400/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center space-x-1 text-amber-400 drop-shadow-[0_1px_2px_rgba(245,158,11,0.3)]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 italic leading-relaxed">
                        "{rev.text}"
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs text-white shadow-md ring-2 ring-white/80 dark:ring-white/15 shrink-0 ${rev.color}`}>
                        {rev.avatar}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                          {rev.name}
                        </h4>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 dark:text-slate-400 block truncate">
                          {rev.role} • {rev.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Floats DOWN (ak upar aur ak niche) */}
            <div className="relative h-full">
              <div className="flex flex-col gap-5 sm:gap-6 animate-marquee-down col-hover-pause">
                {[...col2Reviews, ...col2Reviews].map((rev, idx) => (
                  <div
                    key={`col2-${idx}`}
                    className="group/card relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#031c17] border border-slate-200/90 dark:border-emerald-900/50 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_4px_10px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.7)] hover:shadow-[0_24px_48px_-12px_rgba(16,185,129,0.3)] dark:hover:shadow-[0_24px_50px_-12px_rgba(16,185,129,0.45)] hover:border-emerald-500/60 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 space-y-4 flex flex-col justify-between text-left shrink-0"
                  >
                    {/* 3D Specular Light Sheen Overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500/0 via-emerald-500/5 to-white/10 dark:to-emerald-400/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center space-x-1 text-amber-400 drop-shadow-[0_1px_2px_rgba(245,158,11,0.3)]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 italic leading-relaxed">
                        "{rev.text}"
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs text-white shadow-md ring-2 ring-white/80 dark:ring-white/15 shrink-0 ${rev.color}`}>
                        {rev.avatar}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                          {rev.name}
                        </h4>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 dark:text-slate-400 block truncate">
                          {rev.role} • {rev.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Floats UP (third wala aur upar ja rha hai) */}
            <div className="hidden lg:block relative h-full">
              <div className="flex flex-col gap-5 sm:gap-6 animate-marquee-up-alt col-hover-pause">
                {[...col3Reviews, ...col3Reviews].map((rev, idx) => (
                  <div
                    key={`col3-${idx}`}
                    className="group/card relative p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#031c17] border border-slate-200/90 dark:border-emerald-900/50 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_4px_10px_-2px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.7)] hover:shadow-[0_24px_48px_-12px_rgba(16,185,129,0.3)] dark:hover:shadow-[0_24px_50px_-12px_rgba(16,185,129,0.45)] hover:border-emerald-500/60 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 space-y-4 flex flex-col justify-between text-left shrink-0"
                  >
                    {/* 3D Specular Light Sheen Overlay */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500/0 via-emerald-500/5 to-white/10 dark:to-emerald-400/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="space-y-3 relative z-10">
                      <div className="flex items-center space-x-1 text-amber-400 drop-shadow-[0_1px_2px_rgba(245,158,11,0.3)]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 italic leading-relaxed">
                        "{rev.text}"
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs text-white shadow-md ring-2 ring-white/80 dark:ring-white/15 shrink-0 ${rev.color}`}>
                        {rev.avatar}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                          {rev.name}
                        </h4>
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 dark:text-slate-400 block truncate">
                          {rev.role} • {rev.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. THREE PILLARS SECTION */}
      <section id="ethos" className="footy-card p-5 sm:p-12 space-y-8 sm:space-y-10 scroll-mt-24">
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
      </section>

      {/* 7. ALL STARS ARENA LOCATION — EXCLUSIVELY BESIDE ZOLA MALL, RAIPUR */}
      <section id="pitches" className="footy-card p-6 sm:p-12 space-y-8 scroll-mt-24">
        
        {/* Venue Location Hero Banner */}
        <div className="rounded-3xl p-6 sm:p-10 bg-[#011f13] border border-emerald-800/40 text-white shadow-2xl space-y-6">
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

      {/* 8. HELP & SUPPORT AND LEGAL INFORMATION HUB */}
      <HelpCenterSection />

    </div>
  );
};

export default HomePage;
