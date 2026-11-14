import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Search,
  ExternalLink,
  AlertTriangle,
  ShieldAlert,
  Globe,
  FileText,
  Lock,
  Terminal,
  Shield,
  Info,
} from 'lucide-react';
import { APP_ROUTES } from '../../utils/constants';

export default function ScanResultPanel({ parsedResult, onReset, scanSource = 'Camera' }) {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  if (!parsedResult) return null;

  const { type, rawContent, extractedUrl, domain, protocol } = parsedResult;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(rawContent);
      } else {
        // Fallback for older/restricted environments
        const textArea = document.createElement('textarea');
        textArea.value = rawContent;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleAnalyseUrl = () => {
    if (extractedUrl) {
      // Navigate to URL Checker and prefill the URL via router state
      navigate(APP_ROUTES.URL_CHECKER, {
        state: { targetUrl: extractedUrl },
      });
    }
  };

  return (
    <div className="rounded-2xl bg-shield-900 border border-emerald-500/30 p-6 sm:p-7 shadow-2xl space-y-6 animate-fadeIn">
      {/* Result Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-shield-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
                Scan Completed
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-shield-800 text-shield-dim border border-shield-700">
                Source: {scanSource}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">
              QR Barcode Extracted
            </h2>
          </div>
        </div>

        {/* Payload Type Badge */}
        <div className="self-start sm:self-auto">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium border ${type.badgeClass}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${type.dotClass}`} />
            <span>{type.label}</span>
          </span>
        </div>
      </div>

      {/* Mandatory Security Notice: Destination NOT yet analysed */}
      <div className="p-3.5 rounded-lg bg-shield-950 border border-shield-800 text-xs text-shield-muted flex items-start gap-3">
        <div className="p-1 rounded bg-shield-900 text-shield-dim shrink-0 mt-0.5">
          <Info className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="leading-relaxed">
          <span className="font-mono font-semibold text-shield-text mr-1.5 uppercase">
            [SECURITY STATUS]
          </span>
          QR code decoded successfully. The destination has not yet been security-analysed.
          {type.canAnalyseUrl && (
            <span className="text-shield-dim block mt-1">
              Do not visit this URL until domain reputation and redirect chains are inspected.
            </span>
          )}
        </div>
      </div>

      {/* Payload Type Specific Guidance / Alert */}
      {type.id === 'DANGEROUS_SCHEME' && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-1">
          <div className="flex items-center gap-2 font-mono font-semibold uppercase tracking-wider text-rose-400">
            <ShieldAlert className="w-4 h-4" />
            <span>High-Risk URI Detected & Quarantined</span>
          </div>
          <p className="leading-relaxed text-rose-200">
            This QR payload contains a script or filesystem URI (<code>{protocol || 'disallowed'}:</code>). Such schemes are frequently weaponized for cross-site scripting (XSS), local data theft, or remote code execution. QR Shield has neutralized active execution.
          </p>
        </div>
      )}

      {type.id === 'CUSTOM_SCHEME' && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
          <div className="flex items-center gap-2 font-mono font-semibold uppercase tracking-wider text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <span>Untrusted Application Handler</span>
          </div>
          <p className="leading-relaxed text-amber-200">
            This QR code attempts to launch a system handler (protocol: <code>{protocol || 'custom'}:</code>). Opening external application handlers from unverified physical codes can initiate fraudulent calls, SMS toll charges, or unauthorized device configurations.
          </p>
        </div>
      )}

      {type.id === 'HTTP_URL' && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
          <div className="flex items-center gap-2 font-mono font-semibold uppercase tracking-wider text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <span>Unencrypted HTTP Protocol</span>
          </div>
          <p className="leading-relaxed text-amber-200">
            This URL uses unencrypted transport (<code>http://</code>). Data transmitted to this destination is subject to packet sniffing and man-in-the-middle tampering.
          </p>
        </div>
      )}

      {/* Extracted Content Display (Safely presented in a sanitized, non-executable block) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-shield-dim">
          <span className="uppercase tracking-wider">Decoded Content Payload</span>
          <span>{rawContent.length} characters</span>
        </div>

        <div className="relative rounded-xl bg-shield-950 border border-shield-700/80 p-4 font-mono text-xs text-shield-text overflow-hidden group">
          {/* Hostname callout for URLs */}
          {domain && (
            <div className="mb-2 pb-2 border-b border-shield-800 text-[11px] flex items-center justify-between text-shield-dim">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                Target Host: <strong className="text-white font-mono">{domain}</strong>
              </span>
              <span className="text-[10px] uppercase font-semibold text-shield-dim">
                Protocol: {protocol}
              </span>
            </div>
          )}

          {/* Raw Text Box (Safely textContent rendered, zero HTML execution) */}
          <div className="max-h-48 overflow-y-auto break-all whitespace-pre-wrap select-all font-mono leading-relaxed text-emerald-300/90 selection:bg-emerald-500/30 selection:text-white">
            {rawContent}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-shield-border">
        {/* Reset / Scan Another */}
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-shield-800 hover:bg-shield-750 text-white border border-shield-700 font-mono text-xs uppercase tracking-wider transition-colors order-2 sm:order-1"
        >
          <RotateCcw className="w-3.5 h-3.5 text-shield-muted" />
          <span>Scan Another Code</span>
        </button>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5 order-1 sm:order-2">
          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-medium border transition-all ${
              copied
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-shield-850 hover:bg-shield-800 text-shield-text border-shield-700 hover:border-shield-600'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-shield-muted" />
                <span>Copy Payload</span>
              </>
            )}
          </button>

          {/* Analyse URL Button (Enabled only for HTTP/HTTPS URLs) */}
          {type.canAnalyseUrl && (
            <button
              type="button"
              onClick={handleAnalyseUrl}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-shield-950 font-mono text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Analyse URL</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
