import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import DashboardLayout from '../components/layout/DashboardLayout';
import DashboardPage from '../pages/DashboardPage';
import ScannerPage from '../pages/ScannerPage';
import UrlCheckerPage from '../pages/UrlCheckerPage';
import HistoryPage from '../pages/HistoryPage';
import ThreatIntelligencePage from '../pages/ThreatIntelligencePage';
import SecurityGuidePage from '../pages/SecurityGuidePage';
import { APP_ROUTES } from '../utils/constants';

// Clean 404 security fallback
function NotFoundPage() {
  return (
    <div className="min-h-screen bg-shield-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 rounded-xl bg-shield-900 border border-shield-700 max-w-md w-full space-y-4">
        <span className="font-mono text-3xl font-bold text-rose-400 block">404</span>
        <h2 className="text-lg font-bold text-white">Route Not Found</h2>
        <p className="text-xs text-shield-muted font-sans">
          The requested endpoint does not exist or has been quarantined by security policies.
        </p>
        <div className="pt-2">
          <a
            href={APP_ROUTES.HOME}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-shield-950 font-mono text-xs font-semibold uppercase"
          >
            Return to Safety
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path={APP_ROUTES.HOME} element={<LandingPage />} />

      {/* Security Operations Console / Dashboard Routes with Sidebar Layout */}
      <Route element={<DashboardLayout />}>
        <Route path={APP_ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={APP_ROUTES.SCANNER} element={<ScannerPage />} />
        <Route path={APP_ROUTES.URL_CHECKER} element={<UrlCheckerPage />} />
        <Route path={APP_ROUTES.HISTORY} element={<HistoryPage />} />
        <Route path={APP_ROUTES.THREAT_INTELLIGENCE} element={<ThreatIntelligencePage />} />
        <Route path={APP_ROUTES.SECURITY_GUIDE} element={<SecurityGuidePage />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
