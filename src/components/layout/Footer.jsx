import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Terminal, Activity, Github } from 'lucide-react';
import Logo from '../common/Logo';
import { APP_ROUTES } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="border-t border-shield-border bg-shield-950 text-shield-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand and Description */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="default" />
            <p className="text-sm text-shield-muted max-w-md leading-relaxed">
              QR Shield is an advanced QR code scam detection and URL threat intelligence platform designed to neutralize malicious redirects, credential phishing, and quishing vectors before damage occurs.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-shield-dim">
              <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-shield-900 border border-shield-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Threat Engine Online
              </span>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-shield-900 border border-shield-800">
                <Lock className="w-3 h-3 text-shield-muted" />
                Zero-Trust Analysis
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to={APP_ROUTES.DASHBOARD} className="hover:text-emerald-400 transition-colors">
                  Overview Console
                </Link>
              </li>
              <li>
                <Link to={APP_ROUTES.SCANNER} className="hover:text-emerald-400 transition-colors">
                  QR Scanner Studio
                </Link>
              </li>
              <li>
                <Link to={APP_ROUTES.URL_CHECKER} className="hover:text-emerald-400 transition-colors">
                  URL Threat Inspector
                </Link>
              </li>
              <li>
                <Link to={APP_ROUTES.HISTORY} className="hover:text-emerald-400 transition-colors">
                  Scan History & Reports
                </Link>
              </li>
              <li>
                <Link to={APP_ROUTES.THREAT_INTELLIGENCE} className="hover:text-emerald-400 transition-colors">
                  Threat Intelligence Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Security Resources */}
          <div>
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white mb-4">
              Security & Intel
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to={APP_ROUTES.SECURITY_GUIDE} className="hover:text-emerald-400 transition-colors">
                  Quishing Defense Guide
                </Link>
              </li>
              <li>
                <span className="text-shield-dim cursor-not-allowed">
                  API Documentation (Upcoming)
                </span>
              </li>
              <li>
                <span className="text-shield-dim cursor-not-allowed">
                  Signature Database (Upcoming)
                </span>
              </li>
              <li>
                <span className="text-shield-dim cursor-not-allowed">
                  Browser Extension (Upcoming)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-shield-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-shield-dim">
          <p>© {new Date().getFullYear()} QR Shield Security. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Built for Zero-Day Threat Mitigation</span>
            <span className="text-shield-700">•</span>
            <span>Frontend Preview v0.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
