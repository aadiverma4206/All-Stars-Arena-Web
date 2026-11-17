import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, AlertTriangle, FileText } from 'lucide-react';
import { useSupportStore } from '../../store/useSupportStore';
import PrivacyPolicyContent from './PrivacyPolicyContent';
import RiskDisclosureContent from './RiskDisclosureContent';
import TermsConditionsContent from './TermsConditionsContent';

export const LegalModal = () => {
  const { legalModal, closeLegalModal, setLegalTab } = useSupportStore();
  const { isOpen, activeTab } = legalModal;

  // Close on Escape & Lock background scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLegalModal();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeLegalModal]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'risk', label: 'Risk Disclosure', icon: AlertTriangle },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLegalModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-white dark:bg-[#031d17] border border-slate-200 dark:border-emerald-900/60 rounded-3xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#021712]">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-sport-500">
                Official Legal &amp; Governance Center
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                All Stars Arena Legal Information
              </h3>
            </div>
            <button
              onClick={closeLegalModal}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 px-4 sm:px-6 pt-3 pb-2 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#031d17] overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setLegalTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-sport-500 text-slate-950 shadow-md shadow-sport-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 overscroll-contain">
            {activeTab === 'privacy' && <PrivacyPolicyContent />}
            {activeTab === 'risk' && <RiskDisclosureContent />}
            {activeTab === 'terms' && <TermsConditionsContent />}
          </div>

          {/* Footer Bar */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#021712] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
            <span>All Stars Arena • Beside Zora Mall, Raipur, Chhattisgarh 492006</span>
            <button
              onClick={closeLegalModal}
              className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-emerald-900/40 text-white font-bold hover:bg-sport-500 hover:text-slate-950 transition-colors cursor-pointer"
            >
              I Understand &amp; Agree
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LegalModal;
