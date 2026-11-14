import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  QrCode,
  Globe,
  History,
  ShieldAlert,
  BookOpen,
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  X,
} from 'lucide-react';
import Logo from '../common/Logo';
import { APP_ROUTES } from '../../utils/constants';

export default function Sidebar({ isOpen, onClose }) {
  const navItems = [
    {
      name: 'Overview',
      path: APP_ROUTES.DASHBOARD,
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: 'QR Scanner',
      path: APP_ROUTES.SCANNER,
      icon: QrCode,
      badge: 'Core',
    },
    {
      name: 'URL Checker',
      path: APP_ROUTES.URL_CHECKER,
      icon: Globe,
      badge: null,
    },
    {
      name: 'Scan History',
      path: APP_ROUTES.HISTORY,
      icon: History,
      badge: '8',
    },
    {
      name: 'Threat Intelligence',
      path: APP_ROUTES.THREAT_INTELLIGENCE,
      icon: ShieldAlert,
      badge: 'Live',
    },
    {
      name: 'Security Guide',
      path: APP_ROUTES.SECURITY_GUIDE,
      icon: BookOpen,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-shield-900 border-r border-shield-border flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div>
          <div className="h-16 flex items-center justify-between px-5 border-b border-shield-border">
            <Logo size="default" linkTo={APP_ROUTES.DASHBOARD} />
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-md text-shield-muted hover:text-white hover:bg-shield-850"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="px-3 py-4">
            <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-shield-dim px-3 mb-2">
              Navigation
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'text-shield-muted hover:text-white hover:bg-shield-850 border border-transparent'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-shield-800 text-shield-dim border border-shield-700">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Platform Status and Link to Landing */}
        <div className="p-4 border-t border-shield-border space-y-3">
          {/* Security Engine Health Box */}
          <div className="p-3 rounded-lg bg-shield-950/80 border border-shield-800">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-mono text-shield-dim">Engine Status</span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-shield-dim">
              Zero-Trust heuristic model v2.4 initialized.
            </p>
          </div>

          {/* Back to Landing Page link */}
          <Link
            to={APP_ROUTES.HOME}
            className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-mono text-shield-muted hover:text-white bg-shield-850 hover:bg-shield-800 rounded-md border border-shield-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Public Site
          </Link>
        </div>
      </aside>
    </>
  );
}
