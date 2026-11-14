import React from 'react';

export default function RiskScoreGauge({ score = 0, size = 'md', showLabel = true }) {
  // Clamp score between 0 and 100
  const normalizedScore = Math.min(100, Math.max(0, Number(score) || 0));

  let color = 'emerald';
  let statusText = 'Safe';
  let textColor = 'text-emerald-400';
  let barColor = 'bg-emerald-500';
  let bgTint = 'bg-emerald-500/10 border-emerald-500/20';

  if (normalizedScore > 65) {
    color = 'rose';
    statusText = 'Dangerous';
    textColor = 'text-rose-400';
    barColor = 'bg-rose-500';
    bgTint = 'bg-rose-500/10 border-rose-500/20';
  } else if (normalizedScore > 25) {
    color = 'amber';
    statusText = 'Suspicious';
    textColor = 'text-amber-400';
    barColor = 'bg-amber-500';
    bgTint = 'bg-amber-500/10 border-amber-500/20';
  }

  if (size === 'compact') {
    return (
      <div className="flex items-center gap-2">
        <div className="w-12 h-1.5 bg-shield-800 rounded-full overflow-hidden border border-shield-700">
          <div
            className={`h-full ${barColor}`}
            style={{ width: `${normalizedScore}%` }}
          />
        </div>
        <span className={`font-mono text-xs font-semibold ${textColor}`}>
          {normalizedScore}/100
        </span>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg border bg-shield-850/60 ${bgTint}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase font-mono tracking-wider text-shield-muted">
          Risk Assessment Score
        </span>
        <span className={`text-xs font-mono font-medium uppercase px-2 py-0.5 rounded border ${bgTint} ${textColor}`}>
          {statusText}
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className={`text-3xl font-mono font-bold tracking-tight ${textColor}`}>
          {normalizedScore}
        </span>
        <span className="text-xs font-mono text-shield-dim">/ 100 Risk Index</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-shield-900 rounded-full overflow-hidden border border-shield-700/80">
        <div
          className={`h-full transition-all duration-300 ${barColor}`}
          style={{ width: `${normalizedScore}%` }}
        />
      </div>

      {showLabel && (
        <div className="flex justify-between items-center text-[10px] font-mono text-shield-dim mt-1.5">
          <span>0 (Secure)</span>
          <span>50 (Moderate)</span>
          <span>100 (Critical)</span>
        </div>
      )}
    </div>
  );
}
