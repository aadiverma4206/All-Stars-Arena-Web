import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Clock, Mail, MapPin, Copy, Check, Send, X, PhoneCall, Headphones, CheckCircle2 } from 'lucide-react';
import { useSupportStore } from '../../store/useSupportStore';

export const CallSupportModal = () => {
  const { isCallModalOpen, closeCallModal, openChat } = useSupportStore();

  const [copiedKey, setCopiedKey] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [issueType, setIssueType] = useState('Turf Booking Query');
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape & Lock background scrolling
  useEffect(() => {
    if (!isCallModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeCallModal();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCallModalOpen, closeCallModal]);

  if (!isCallModalOpen) return null;

  const copyToClipboard = (text, key) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.trim().length < 10) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCallbackRequested(true);
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCallModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#031d17] border border-slate-200 dark:border-emerald-900/60 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#021712]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sport-500/10 text-sport-500 flex items-center justify-center">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-sport-500">
                  Direct Line &amp; Hotline
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  All Stars Arena Call Support
                </h3>
              </div>
            </div>
            <button
              onClick={closeCallModal}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Toll-Free Master Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    Toll-Free Priority
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-bold">
                    <Clock className="w-3.5 h-3.5 text-sport-500" /> 8:00 AM – 11:00 PM IST
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-mono">
                  1800-123-4567
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Instant connect for pitch booking emergencies, floodlight alerts &amp; slot assistance.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="tel:18001234567"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-sport-500 text-slate-950 font-black text-xs uppercase flex items-center justify-center gap-2 hover:bg-sport-400 transition-colors shadow-lg shadow-sport-500/20"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <button
                  onClick={() => copyToClipboard('18001234567', 'tollfree')}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  title="Copy toll-free number"
                >
                  {copiedKey === 'tollfree' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey === 'tollfree' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Direct Contacts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Direct Phone */}
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start justify-between">
                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase text-[10px] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-sport-500" /> Direct Arena Mobile
                  </span>
                  <div className="font-black text-slate-900 dark:text-white text-sm font-mono">+91 98765 43210</div>
                  <span className="text-[11px] text-slate-500">Turf Manager On-Duty desk</span>
                </div>
                <button
                  onClick={() => copyToClipboard('+919876543210', 'phone')}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                  {copiedKey === 'phone' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Email Support */}
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start justify-between">
                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase text-[10px] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sport-500" /> Official Email Desk
                  </span>
                  <div className="font-black text-slate-900 dark:text-white text-sm">support@allstarsarena.com</div>
                  <span className="text-[11px] text-slate-500">Disputes &amp; invoice records</span>
                </div>
                <button
                  onClick={() => copyToClipboard('support@allstarsarena.com', 'email')}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                  {copiedKey === 'email' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Office Address */}
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sport-500 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs">
                  <span className="font-black text-slate-900 dark:text-white uppercase text-[10px]">
                    Turf Head Office &amp; Arena Complex
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    VIP Road, Near Airport Circle, Raipur, Chhattisgarh 492006 (Beside Zora Mall)
                  </p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard('VIP Road, Near Airport Circle, Raipur, Chhattisgarh 492006 (Beside Zora Mall)', 'address')}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer shrink-0"
              >
                {copiedKey === 'address' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Instant Callback Request Form */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#021712] border border-slate-200 dark:border-slate-800/80 space-y-4">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-sport-500" />
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase">
                  Request an Instant Callback
                </h4>
              </div>

              {callbackRequested ? (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <strong className="block font-bold">Callback Scheduled!</strong>
                    <span>An Arena Support specialist will call you at <strong>{phoneNumber}</strong> within 15 minutes.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCallbackSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-sport-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                        Topic of Inquiry
                      </label>
                      <select
                        value={issueType}
                        onChange={(e) => setIssueType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-sport-500"
                      >
                        <option value="Turf Booking Query">Turf Booking Query</option>
                        <option value="Cancellation / Refund">Cancellation / Refund</option>
                        <option value="Arena Wallet PIN / Top-Up">Arena Wallet PIN / Top-Up</option>
                        <option value="Tournament / Corporate Booking">Tournament / Corporate Booking</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !phoneNumber}
                    className="w-full py-2.5 rounded-xl bg-sport-500 text-slate-950 font-black text-xs uppercase flex items-center justify-center gap-2 hover:bg-sport-400 disabled:opacity-50 transition-colors cursor-pointer shadow-md shadow-sport-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Scheduling Callback...' : 'Request Callback'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#021712] flex items-center justify-between text-xs">
            <span className="text-slate-500">Need online real-time help?</span>
            <button
              onClick={() => {
                closeCallModal();
                openChat();
              }}
              className="text-sport-500 dark:text-sport-400 font-extrabold hover:underline cursor-pointer"
            >
              Open Live Chat Support →
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CallSupportModal;
