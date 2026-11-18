import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LegalModal from '../support/LegalModal';
import CallSupportModal from '../support/CallSupportModal';
import ChatSupportWidget from '../support/ChatSupportWidget';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#011410] text-slate-900 dark:text-slate-100 transition-colors w-full max-w-full overflow-x-hidden relative">
      <Navbar />
      <main className="flex-grow max-w-[1850px] w-full mx-auto px-3 sm:px-6 lg:px-8 pb-12 min-w-0">
        {children}
      </main>
      <Footer />

      {/* Global Help & Support and Legal Modals */}
      <LegalModal />
      <CallSupportModal />
      <ChatSupportWidget />
    </div>
  );
};

export default Layout;
