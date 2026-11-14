import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Globe,
  Search,
  Shield,
  Layers,
  Lock,
  AlertTriangle,
  CheckCircle,
  FileSearch,
  ArrowRight,
  Info,
  Server,
  Zap,
} from 'lucide-react';
import DemoNotice from '../components/common/DemoNotice';

export default function UrlCheckerPage() {
  const location = useLocation();
  const [inputUrl, setInputUrl] = useState(location.state?.targetUrl || '');

  useEffect(() => {
    if (location.state?.targetUrl) {
      setInputUrl(location.state.targetUrl);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Non-functional in this stage as instructed
  };

  const securityFeatures = [
    {
      title: 'Domain Age & Registration Integrity',
      description: 'Newly registered domains (< 30 days) are statistically correlated with throwaway phishing campaigns. Our engine queries registration timestamps and registrar history.',
      icon: Server,
    },
    {
      title: 'Typosquatting & Homoglyph Detection',
      description: 'Identifies lookalike internationalized domain names (IDNs) and subtle misspellings impersonating brands like PayPal, Apple, Google, or municipal agencies.',
      icon: Search,
    },
    {
      title: 'Multi-Hop Redirect Path Unfurling',
      description: 'Simulates safe HTTP GET/HEAD requests through headless gateways to trace shortened URLs (bit.ly, tinyurl) through all intermediaries down to the raw payload.',
      icon: Layers,
    },
    {
      title: 'SSL / TLS Certificate Inspection',
      description: 'Validates issuer authority, certificate validity windows, and domain name coverage to detect misconfigured or ephemeral free SSL certificates.',
      icon: Lock,
    },
    {
      title: 'High-Risk TLD & Keyword Flagging',
      description: 'Scans for disproportionately abused top-level domains (.top, .click, .loan, .xyz) and social engineering keywords such as "re-verify", "billing-alert", or "free-reward".',
      icon: AlertTriangle,
    },
    {
      title: 'Global Threat Intelligence Correlation',
      description: 'Cross-checks extracted hosts and IP addresses against active zero-day blacklists, phishing feeds, and malware distribution databases.',
      icon: Zap,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-2 border-b border-shield-border">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <Globe className="w-7 h-7 text-emerald-400" />
          URL Threat Inspector
        </h1>
        <p className="text-sm text-shield-muted mt-1">
          Perform in-depth domain reputation checks, redirect tracing, and heuristic phishing analysis on any destination address.
        </p>
      </div>

      {/* Stage Status Notice */}
      <DemoNotice
        title="INTERFACE STAGING"
        message="This interface demonstrates the URL input and security analysis architecture. Deep network inspection endpoints and threat heuristics will be integrated in subsequent development phases."
      />

      {/* Main URL Input Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-shield-850 border border-shield-border shadow-xl space-y-6">
        <div>
          <label htmlFor="url-input" className="block text-xs font-mono uppercase tracking-wider text-shield-dim mb-2">
            Target Destination or Suspicious Hyperlink
          </label>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-shield-dim">
                <Globe className="w-4 h-4" />
              </div>
              <input
                id="url-input"
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://verify-account-portal.auth-security-update.net/login"
                className="w-full pl-10 pr-4 py-3 bg-shield-950 border border-shield-700 rounded-lg text-white font-mono text-sm placeholder:text-shield-dim focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono text-xs font-semibold uppercase tracking-wider cursor-not-allowed transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Analyse URL (Stage 2)</span>
            </button>
          </form>
        </div>

        {/* Quick Sample URLs for Testing Interface */}
        <div className="pt-4 border-t border-shield-border/60">
          <span className="text-[11px] font-mono text-shield-dim uppercase tracking-wider block mb-2">
            Sample Verification Targets:
          </span>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <button
              type="button"
              onClick={() => setInputUrl('https://verify-account-portal.auth-security-update.net/login')}
              className="px-2.5 py-1 rounded bg-shield-900 hover:bg-shield-800 border border-shield-700 text-shield-muted hover:text-white transition-colors"
            >
              Phishing Demo
            </button>
            <button
              type="button"
              onClick={() => setInputUrl('https://pay-parking-fee-quick.info/session/c7104a?gate=4')}
              className="px-2.5 py-1 rounded bg-shield-900 hover:bg-shield-800 border border-shield-700 text-shield-muted hover:text-white transition-colors"
            >
              Fake Payment Demo
            </button>
            <button
              type="button"
              onClick={() => setInputUrl('https://cityauthority.gov/schedules/line-4')}
              className="px-2.5 py-1 rounded bg-shield-900 hover:bg-shield-800 border border-shield-700 text-shield-muted hover:text-white transition-colors"
            >
              Safe Transit Demo
            </button>
          </div>
        </div>
      </div>

      {/* Explanation of URL Security Analysis */}
      <div className="p-6 rounded-xl bg-shield-900/60 border border-shield-border space-y-3">
        <h2 className="text-base font-semibold text-white flex items-center gap-2">
          <FileSearch className="w-4 h-4 text-emerald-400" />
          How URL Threat Analysis Protects You
        </h2>
        <p className="text-sm text-shield-muted leading-relaxed">
          Malicious actors rarely direct victims straight to raw malware binaries. Instead, modern quishing campaigns construct multi-layered redirects using shorteners, intermediary cloud functions, and reverse proxies designed to deceive traditional browser filters. The QR Shield URL Inspector isolates the entire HTTP journey and produces a verifiable security audit before end-user execution.
        </p>
      </div>

      {/* Security Feature Overview Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-shield-dim">
          Threat Inspection Engine Features
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {securityFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-5 rounded-xl bg-shield-850 border border-shield-border hover:border-shield-600 transition-colors space-y-2.5"
              >
                <div className="w-9 h-9 rounded-lg bg-shield-800 border border-shield-700 flex items-center justify-center text-emerald-400">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-semibold text-white">{feat.title}</h4>
                <p className="text-xs text-shield-muted leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
