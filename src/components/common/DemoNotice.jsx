import React from 'react';
import { Info, AlertCircle } from 'lucide-react';

export default function DemoNotice({
  title = 'DEMONSTRATION ENVIRONMENT',
  message = 'All scans, telemetry, risk scores, and threat indicators on this page are sample demonstration data for interface verification. They do not reflect live production scanning results.',
  className = '',
}) {
  return (
    <div className={`flex items-start gap-3 p-3.5 rounded-lg border border-shield-700 bg-shield-900/80 text-shield-muted ${className}`}>
      <div className="p-1 rounded bg-shield-800 text-shield-dim shrink-0 mt-0.5">
        <Info className="w-4 h-4 text-emerald-400" />
      </div>
      <div className="text-xs leading-relaxed">
        <span className="font-mono font-semibold text-shield-text mr-2 uppercase tracking-wide">
          [{title}]
        </span>
        <span className="text-shield-dim">{message}</span>
      </div>
    </div>
  );
}
