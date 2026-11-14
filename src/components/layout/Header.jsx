import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, QrCode, Shield, Bell, Terminal, Search } from 'lucide-react';
import { APP_ROUTES } from '../../utils/constants';

export default function Header({ onMenuClick }) {
  return (
    <header className="h-16 border-b border-shield-border bg-shield-900/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left side: Hamburger button + Breadcrumb / Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-shield-muted hover:text-white hover:bg-shield-850"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-shield-dim">
          <span className="text-emerald-400 font-semibold">QR-SHIELD</span>
          <span>/</span>
          <span className="text-shield-muted">SECURITY OPERATIONS CONSOLE</span>
        </div>
      </div>

      {/* Right side: Quick Action Button + Security Status Pill */}
      <div className="flex items-center gap-3">
        {/* Quick action button to scan a QR code */}
        <Link
          to={APP_ROUTES.SCANNER}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-shield-950 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-150 shadow-sm"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Scan QR Code</span>
        </Link>

        {/* Threat feed badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-shield-950 border border-shield-800 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span className="text-shield-muted">Feeds:</span>
          <span className="text-white font-medium">Synchronized</span>
        </div>

        {/* Status indicator icon */}
        <div className="w-8 h-8 rounded-lg bg-shield-800 border border-shield-700 flex items-center justify-center text-shield-muted">
          <Shield className="w-4 h-4 text-emerald-400" />
        </div>
      </div>
    </header>
  );
}
