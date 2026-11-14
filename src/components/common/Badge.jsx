import React from 'react';
import { RISK_LEVELS } from '../../utils/constants';

export default function Badge({ status, size = 'md', className = '' }) {
  const normalized = status ? status.toUpperCase() : 'SAFE';
  const config = RISK_LEVELS[normalized] || {
    label: status,
    badgeClass: 'bg-shield-800 text-shield-muted border-shield-700',
    dotClass: 'bg-shield-muted',
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md border font-mono uppercase tracking-wider ${
        config.badgeClass
      } ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
      <span>{config.label}</span>
    </span>
  );
}
