import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ShieldAlert, QrCode } from 'lucide-react';

export default function Logo({ size = 'default', showSubtext = true, linkTo = '/' }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const content = (
    <div className="flex items-center gap-2.5 group">
      <div className={`relative flex items-center justify-center rounded-lg bg-shield-900 border border-emerald-500/30 transition-all duration-200 group-hover:border-emerald-500/60 shadow-sm ${
        isLarge ? 'w-11 h-11' : isSmall ? 'w-8 h-8' : 'w-9 h-9'
      }`}>
        {/* Subtle emerald corner highlight */}
        <div className="absolute inset-0 bg-emerald-500/10 rounded-lg"></div>
        <Shield className={`text-emerald-400 relative z-10 ${
          isLarge ? 'w-6 h-6' : isSmall ? 'w-4 h-4' : 'w-5 h-5'
        }`} />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <QrCode className={`text-emerald-300 opacity-60 ${
            isLarge ? 'w-3 h-3' : isSmall ? 'w-2 h-2' : 'w-2.5 h-2.5'
          }`} />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-bold tracking-tight text-white ${
            isLarge ? 'text-xl' : isSmall ? 'text-sm' : 'text-base'
          }`}>
            QR<span className="text-emerald-400">SHIELD</span>
          </span>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            SEC
          </span>
        </div>
        {showSubtext && !isSmall && (
          <span className="text-[10.5px] tracking-wider uppercase text-shield-dim font-medium">
            Threat Defense Platform
          </span>
        )}
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-flex focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
