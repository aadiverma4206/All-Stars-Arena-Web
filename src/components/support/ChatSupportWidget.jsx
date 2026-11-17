import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, MapPin, CreditCard, RefreshCw, Calendar, PhoneCall } from 'lucide-react';
import { useSupportStore } from '../../store/useSupportStore';

const QUICK_SUGGESTIONS = [
  { id: 'booking', label: 'Issue with Booking', icon: Calendar },
  { id: 'refund', label: 'Refund Status', icon: RefreshCw },
  { id: 'wallet', label: 'Wallet Top-up Issue', icon: CreditCard },
  { id: 'location', label: 'Turf Location Inquiry', icon: MapPin },
];

const BOT_RESPONSES = {
  booking: `🏟️ **Booking Assistance:**
Your turf slot booking is confirmed instantly upon successful payment. 
• Check your booking status under your profile or SMS/WhatsApp confirmation.
• If payment was debited but the slot is not visible, it automatically syncs within 5 minutes.
• Please keep your 8-digit Booking ID ready when checking in at our रायपुर Arena.`,

  refund: `💳 **Refund & Cancellation Policy:**
• **≥ 4 Hours Before Match:** 100% full refund credited instantly to your **Arena Wallet** with zero cancellation fees.
• **< 4 Hours Before Match:** Slots are locked exclusively for your squad and are non-refundable.
• Bank refund requests (from wallet to source bank) are processed within 3–5 working days via Razorpay.`,

  wallet: `💰 **Arena Wallet Support:**
• Arena Wallet allows 1-click slot checkout with zero gateway delays.
• Every transaction requires your secret 4-digit security PIN.
• If money was deducted during top-up but balance hasn't updated, Razorpay auto-settles it within 15 minutes.
• Need to reset your PIN? Visit Profile > Wallet Security > Reset PIN.`,

  location: `📍 **Raipur Arena Location & Directions:**
• **Address:** Beside Zora Mall, VIP Road, Near Airport Circle, Raipur, Chhattisgarh 492006.
• **Timings:** Open 7 Days a week from 06:00 AM to 12:00 AM (Midnight).
• **Parking:** Free dedicated 50+ vehicle parking space right outside the turf gates.
• **Turf Type:** Official 5G FIFA Synthetic Turf with 350+ LUX stadium night lights.`,

  default: `👋 Thank you for messaging All Stars Arena Support! 
Our team is here to assist with bookings, tournament slots, and Arena Wallet payments. 
You can tap any of the quick suggestion chips above, or call our toll-free support line at **1800-123-4567** (8 AM – 11 PM IST).`,
};

export const ChatSupportWidget = () => {
  const { isChatOpen, closeChat, openCallModal } = useSupportStore();

  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello baller! 👋 Welcome to All Stars Arena Support. How can we assist you today with your booking, turf slot, or wallet?',
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [messages, isChatOpen]);

  const messageCounter = useRef(1);

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query || !query.trim()) return;

    messageCounter.current += 1;
    const currentId = messageCounter.current;

    const userMsg = {
      id: `user-${currentId}`,
      sender: 'user',
      text: query.trim(),
      time: 'Now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Bot automated response matching
    setTimeout(() => {
      let replyText = BOT_RESPONSES.default;
      const lower = query.toLowerCase();

      if (lower.includes('booking') || lower.includes('slot') || lower.includes('reserve')) {
        replyText = BOT_RESPONSES.booking;
      } else if (lower.includes('refund') || lower.includes('cancel') || lower.includes('money')) {
        replyText = BOT_RESPONSES.refund;
      } else if (lower.includes('wallet') || lower.includes('top-up') || lower.includes('pin') || lower.includes('balance')) {
        replyText = BOT_RESPONSES.wallet;
      } else if (lower.includes('location') || lower.includes('where') || lower.includes('address') || lower.includes('Zora') || lower.includes('raipur') || lower.includes('map')) {
        replyText = BOT_RESPONSES.location;
      }

      messageCounter.current += 1;
      const botMsg = {
        id: `bot-${messageCounter.current}`,
        sender: 'bot',
        text: replyText,
        time: 'Just now',
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuickChip = (suggestion) => {
    handleSend(suggestion.label);
  };

  return (
    <AnimatePresence>
      {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-3 sm:right-6 z-50 w-[94vw] sm:w-[410px] h-[550px] max-h-[82vh] bg-white dark:bg-[#021712] border border-slate-200 dark:border-emerald-900/60 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-sport-500 via-emerald-500 to-sport-600 text-slate-950 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-slate-950 text-sport-400 flex items-center justify-center font-black">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-sm tracking-tight leading-tight">Arena Support Bot</h4>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-900/80">
                    <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
                    <span>Online • Instant Help</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    closeChat();
                    openCallModal();
                  }}
                  className="p-2 rounded-xl hover:bg-slate-950/10 transition-colors text-slate-950"
                  title="Switch to Call Support"
                >
                  <PhoneCall className="w-4 h-4" />
                </button>
                <button
                  onClick={closeChat}
                  className="p-2 rounded-xl hover:bg-slate-950/10 transition-colors text-slate-950"
                  aria-label="Close Chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="p-2.5 bg-slate-100 dark:bg-[#031d17] border-b border-slate-200 dark:border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-bold text-slate-500 shrink-0 uppercase tracking-wider pl-1">
                Quick:
              </span>
              {QUICK_SUGGESTIONS.map((sug) => {
                const Icon = sug.icon;
                return (
                  <button
                    key={sug.id}
                    onClick={() => handleQuickChip(sug)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold whitespace-nowrap hover:bg-sport-500 hover:text-slate-950 transition-colors cursor-pointer"
                  >
                    <Icon className="w-3 h-3 text-sport-500" />
                    <span>{sug.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50 dark:bg-[#011410] text-xs">
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {isBot && (
                      <div className="w-7 h-7 rounded-full bg-sport-500/20 text-sport-500 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                        isBot
                          ? 'bg-white dark:bg-[#03231c] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-emerald-950'
                          : 'bg-sport-500 text-slate-950 font-medium rounded-tr-none'
                      }`}
                    >
                      <div className="whitespace-pre-line leading-relaxed">{msg.text}</div>
                      <span
                        className={`block text-[9px] mt-1 text-right ${
                          isBot ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900/60'
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>

                    {!isBot && (
                      <div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <div className="w-7 h-7 rounded-full bg-sport-500/20 text-sport-500 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-3 py-2 rounded-2xl bg-white dark:bg-[#03231c] border border-slate-200 dark:border-emerald-950 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sport-500 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-sport-500 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-sport-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white dark:bg-[#021712] border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-sport-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-sport-500 text-slate-950 font-black hover:bg-sport-400 disabled:opacity-40 transition-colors cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
  );
};

export default ChatSupportWidget;
