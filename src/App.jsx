import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import HomePage from './pages/HomePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import { useThemeStore } from './store/useThemeStore';
import ErrorBoundary from './components/common/ErrorBoundary';
import ScrollToTop from './components/common/ScrollToTop';

function App() {
  const { applyTheme, listenToSystemChanges } = useThemeStore();

  useEffect(() => {
    applyTheme();
    const cleanupTheme = listenToSystemChanges();
    return () => {
      if (cleanupTheme) cleanupTheme();
    };
  }, [applyTheme, listenToSystemChanges]);

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
          {/* Any other unknown route redirects directly to the Home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
