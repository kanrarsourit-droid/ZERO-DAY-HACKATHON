import React from 'react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'neutral', // 'safe' | 'warning' | 'danger' | 'neutral'
  badgeText,
}) {
  const variantStyles = {
    neutral: {
      border: 'border-shield-border hover:border-shield-600',
      iconBg: 'bg-shield-800 text-shield-muted border-shield-700',
      valueColor: 'text-white',
    },
    safe: {
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      valueColor: 'text-emerald-400',
    },
    warning: {
      border: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      valueColor: 'text-amber-400',
    },
    danger: {
      border: 'border-rose-500/20 hover:border-rose-500/40',
      iconBg: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      valueColor: 'text-rose-400',
    },
  };

  const style = variantStyles[variant] || variantStyles.neutral;

  return (
    <div className={`rounded-xl bg-shield-850 p-5 border transition-all duration-200 ${style.border}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-shield-muted">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg border ${style.iconBg}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className={`text-2xl font-bold font-mono tracking-tight ${style.valueColor}`}>
          {value}
        </span>
        {badgeText && (
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-shield-800 text-shield-dim border border-shield-700">
            {badgeText}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="text-xs text-shield-muted mt-2 flex items-center gap-1.5">
          {subtitle}
        </p>
      )}
    </div>
  );
}
