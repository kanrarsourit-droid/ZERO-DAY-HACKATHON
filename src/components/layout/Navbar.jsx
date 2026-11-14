import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ArrowRight, ExternalLink } from 'lucide-react';
import Logo from '../common/Logo';
import { APP_ROUTES } from '../../utils/constants';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '#hero', route: APP_ROUTES.HOME },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Threat Intel', route: APP_ROUTES.THREAT_INTELLIGENCE },
    { label: 'Security Guide', route: APP_ROUTES.SECURITY_GUIDE },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-shield-border bg-shield-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo size="default" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((item) => {
              if (item.route) {
                return (
                  <Link
                    key={item.label}
                    to={item.route}
                    className="px-3 py-2 text-sm font-medium text-shield-muted hover:text-white transition-colors rounded-md hover:bg-shield-850"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-shield-muted hover:text-white transition-colors rounded-md hover:bg-shield-850"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-shield-muted hover:text-white transition-colors rounded-md border border-transparent hover:border-shield-700"
              title="Authentication will be enabled in later stages"
            >
              Sign In
            </button>
            <Link
              to={APP_ROUTES.DASHBOARD}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-md bg-emerald-500 hover:bg-emerald-400 text-shield-950 transition-all duration-200 shadow-sm"
            >
              Launch Console
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-shield-muted hover:text-white hover:bg-shield-850 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-shield-border bg-shield-900/95 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => {
              if (item.route) {
                return (
                  <Link
                    key={item.label}
                    to={item.route}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm font-medium text-shield-muted hover:text-white hover:bg-shield-850 rounded-md"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-shield-muted hover:text-white hover:bg-shield-850 rounded-md"
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-shield-border flex flex-col gap-2">
            <button
              type="button"
              className="w-full text-center py-2 text-xs font-mono uppercase tracking-wider text-shield-muted border border-shield-700 rounded-md"
            >
              Sign In
            </button>
            <Link
              to={APP_ROUTES.DASHBOARD}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-mono uppercase tracking-wider font-semibold rounded-md bg-emerald-500 text-shield-950"
            >
              Launch Console
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
