import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, MessageSquare, PhoneCall, Shield, FileText, HelpCircle } from 'lucide-react';
import { useSupportStore } from '../../store/useSupportStore';
import { ArenaEcosystemRadar } from './ArenaEcosystemRadar';

const FAQ_DATA = [
  // 1. Bookings
  {
    id: 'b1',
    category: 'Bookings',
    question: 'How does turf slot booking work at All Stars Arena?',
    answer: 'Browse available pickup games and pitch slots on our app, select your preferred time slot (morning 6 AM to midnight 12 AM), and complete checkout via Razorpay or Arena Wallet. You will immediately receive a digital check-in QR code and SMS/WhatsApp confirmation.',
  },
  {
    id: 'b2',
    category: 'Bookings',
    question: 'Can I cancel or reschedule my turf slot?',
    answer: 'Yes! If you cancel at least 4 hours before your scheduled kick-off time, 100% of your booking amount is instantly refunded to your Arena Wallet. Cancellations within 4 hours are non-refundable as pitches are exclusively reserved for your squad.',
  },
  {
    id: 'b3',
    category: 'Bookings',
    question: 'Can I join as a solo player if I don’t have a full team?',
    answer: 'Absolutely! All Stars Arena specializes in pickup community matches. You can join open community squads looking for strikers, defenders, or goalkeepers. Our community manager organizes balanced teams on-site.',
  },

  // 2. Payments & Wallet
  {
    id: 'p1',
    category: 'Payments',
    question: 'What payment methods are supported on All Stars Arena?',
    answer: 'We support all major payment modes via Razorpay: UPI (Google Pay, PhonePe, Paytm, BHIM), Debit/Credit Cards (Visa, Mastercard, RuPay), Net Banking across 50+ banks, and 1-click Arena Wallet payments.',
  },
  {
    id: 'p2',
    category: 'Payments',
    question: 'How does Arena Wallet work and how secure is it?',
    answer: 'Arena Wallet enables lightning-fast checkouts without gateway drop-offs. Refunds from eligible cancellations credit instantly into your wallet. Every wallet debit is protected by your personal 4-digit security PIN.',
  },
  {
    id: 'p3',
    category: 'Payments',
    question: 'How do I transfer Arena Wallet balance back to my bank account?',
    answer: 'You can request a wallet-to-bank payout anytime from Profile > Wallet > Withdraw. Payouts are verified and credited to your original bank account within 3–5 working days.',
  },

  // 3. Turf Rules & Equipment
  {
    id: 'r1',
    category: 'Rules',
    question: 'What footwear is permitted on the 5G synthetic turf?',
    answer: 'Permitted: Turf shoes with rubber studs (TF), indoor court shoes (IC), or standard athletic sneakers. STRICTLY PROHIBITED: Metal studs (SG) and long molded plastic cleats (FG). Metal studs tear the turf carpet and significantly increase ankle and knee injury risk.',
  },
  {
    id: 'r2',
    category: 'Rules',
    question: 'Are matches recorded on CCTV and can I get match highlights?',
    answer: 'Yes! Our arena is equipped with HD sports cameras. Every match is recorded for security and player analytics. Registered players can download match highlights and goal clips from the app within 24 hours of match completion.',
  },
  {
    id: 'r3',
    category: 'Rules',
    question: 'What happens if it rains heavily during my booked slot?',
    answer: 'Our synthetic pitch has specialized sub-base gravel drainage and remains 100% playable in light to moderate rain. If extreme weather, lightning, or severe storms occur, the Arena Manager will pause play or reschedule your slot free of charge.',
  },

  // 4. Account & Player Rating
  {
    id: 'a1',
    category: 'Account',
    question: 'How is the Player OVR / ELO Rating calculated?',
    answer: 'Your player OVR rating is calculated dynamically based on matches played, win rate, goals scored, clean sheets, and MVP community votes awarded after each game. It helps matchmakers place you in competitive, balanced pickup games.',
  },
  {
    id: 'a2',
    category: 'Account',
    question: 'How can I update my profile or request complete account deletion?',
    answer: 'You can update your profile name, picture, and contact details from Profile Settings. To delete your account and wipe all personal data, send an email to privacy@allstarsarena.com or submit a request via our Chat Support module.',
  },
];

const CATEGORIES = ['All', 'Bookings', 'Payments', 'Rules', 'Account'];

export const HelpCenterSection = () => {
  const { openChat, openCallModal, openLegalModal } = useSupportStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFaqIds, setOpenFaqIds] = useState(['b1', 'b2']);

  const toggleFaq = (id) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const col1 = useMemo(() => filteredFaqs.filter((_, i) => i % 2 === 0), [filteredFaqs]);
  const col2 = useMemo(() => filteredFaqs.filter((_, i) => i % 2 === 1), [filteredFaqs]);

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'Bookings':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30';
      case 'Payments':
        return 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border border-purple-500/30';
      case 'Rules':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30';
      case 'Account':
        return 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30';
      default:
        return 'bg-sport-500/15 text-sport-600 dark:text-sport-400 border border-sport-500/30';
    }
  };

  const renderFaqCard = (faq) => {
    const isOpen = openFaqIds.includes(faq.id);
    return (
      <div
        key={faq.id}
        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
          isOpen
            ? 'bg-white dark:bg-slate-900/90 border-sport-500/60 dark:border-sport-500/50 shadow-md shadow-sport-500/5 ring-1 ring-sport-500/20'
            : 'bg-white/80 dark:bg-slate-900/50 border-slate-200/90 dark:border-slate-800/80 hover:border-sport-500/40 hover:bg-white dark:hover:bg-slate-900/80 shadow-xs'
        }`}
      >
        <button
          onClick={() => toggleFaq(faq.id)}
          className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 cursor-pointer focus:outline-none group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider shrink-0 w-fit ${getCategoryBadgeClass(
                faq.category
              )}`}
            >
              {faq.category}
            </span>
            <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-sport-500 transition-colors leading-snug">
              {faq.question}
            </span>
          </div>
          <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-sport-500 group-hover:bg-sport-500/10 transition-colors shrink-0 mt-0.5">
            {isOpen ? (
              <ChevronUp className="w-3.5 h-3.5 text-sport-500" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </div>
        </button>

        {isOpen && (
          <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20">
            <p>{faq.answer}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="faq" className="footy-card p-5 sm:p-12 space-y-10 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sport-500/10 border border-sport-500/30 text-sport-500 text-xs font-black uppercase tracking-widest">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>HELP &amp; SUPPORT AND LEGAL INFORMATION</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Frequently Asked Questions &amp; Support Hub
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
          Everything you need to know about turf bookings, Arena Wallet refunds, footwear rules, and 24/7 customer assistance.
        </p>
      </div>

      {/* Quick Action Support Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={openChat}
          className="p-4 rounded-2xl bg-gradient-to-br from-sport-500/15 via-sport-500/5 to-transparent border border-sport-500/40 hover:border-sport-500 text-left transition-all group cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-sport-500 text-slate-950 flex items-center justify-center font-black">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
              Live Bot
            </span>
          </div>
          <h4 className="font-black text-sm text-slate-900 dark:text-white uppercase group-hover:text-sport-500 transition-colors">
            Chat Support
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Instant automated answers for bookings &amp; refunds.
          </p>
        </button>

        <button
          onClick={openCallModal}
          className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-sport-500 text-left transition-all group cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-black">
              <PhoneCall className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              Toll-Free
            </span>
          </div>
          <h4 className="font-black text-sm text-slate-900 dark:text-white uppercase group-hover:text-sport-500 transition-colors">
            Call Support
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            1800-123-4567 • 8 AM to 11 PM IST direct support.
          </p>
        </button>

        <button
          onClick={() => openLegalModal('privacy')}
          className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-sport-500 text-left transition-all group cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-black">
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              Legal
            </span>
          </div>
          <h4 className="font-black text-sm text-slate-900 dark:text-white uppercase group-hover:text-sport-500 transition-colors">
            Privacy Policy
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Razorpay security, AWS S3 storage &amp; account rights.
          </p>
        </button>

        <button
          onClick={() => openLegalModal('terms')}
          className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-sport-500 text-left transition-all group cursor-pointer shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-black">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              Rules
            </span>
          </div>
          <h4 className="font-black text-sm text-slate-900 dark:text-white uppercase group-hover:text-sport-500 transition-colors">
            Terms of Use
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            4-hour refund rule, court conduct &amp; media rights.
          </p>
        </button>
      </div>

      {/* 3D Multi-Orbit Concentric Ecosystem Radar */}
      <ArenaEcosystemRadar />

      {/* Search Input Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by keyword (e.g. refund, boots, wallet, cancellation)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-sport-500 shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white absolute right-4 top-1/2 -translate-y-1/2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-sport-500 text-slate-950 shadow-md shadow-sport-500/20'
                : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordions Double Column Grid */}
      <div className="max-w-6xl mx-auto">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-100 dark:bg-slate-800/40 text-slate-500 text-xs">
            No questions found matching "{searchQuery}". Try a different keyword or ask our{' '}
            <button onClick={openChat} className="text-sport-500 font-bold underline cursor-pointer">
              Arena Support Bot
            </button>.
          </div>
        ) : (
          <>
            {/* Desktop / Tablet 2-Column Masonry */}
            <div className="hidden md:grid md:grid-cols-2 gap-4 items-start">
              <div className="space-y-4">
                {col1.map(renderFaqCard)}
              </div>
              <div className="space-y-4">
                {col2.map(renderFaqCard)}
              </div>
            </div>

            {/* Mobile 1-Column Sequential List */}
            <div className="md:hidden space-y-3">
              {filteredFaqs.map(renderFaqCard)}
            </div>
          </>
        )}
      </div>

      {/* Bottom Legal Quick Strip */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-500">
        <span>Need full legal disclosures?</span>
        <button
          onClick={() => openLegalModal('privacy')}
          className="text-sport-500 hover:underline cursor-pointer"
        >
          Privacy Policy
        </button>
        <span>•</span>
        <button
          onClick={() => openLegalModal('risk')}
          className="text-amber-500 hover:underline cursor-pointer"
        >
          Athletic Risk Disclosure
        </button>
        <span>•</span>
        <button
          onClick={() => openLegalModal('terms')}
          className="text-indigo-500 hover:underline cursor-pointer"
        >
          Terms of Use &amp; Refunds
        </button>
      </div>
    </section>
  );
};

export default HelpCenterSection;
