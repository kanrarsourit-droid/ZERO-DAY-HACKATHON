import React from 'react';
import {
  BookOpen,
  Shield,
  AlertTriangle,
  CreditCard,
  Layers,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  Lock,
} from 'lucide-react';

export default function SecurityGuidePage() {
  return (
    <div className="space-y-8 max-w-5xl">
      {/* Page Header */}
      <div className="pb-3 border-b border-shield-border">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <BookOpen className="w-7 h-7 text-emerald-400" />
          QR Cybersecurity & Quishing Defense Guide
        </h1>
        <p className="text-sm text-shield-muted mt-1 max-w-3xl">
          Comprehensive operational handbook explaining QR attack vectors, visual inspection techniques, and defensive protocols for individuals and enterprise teams.
        </p>
      </div>

      {/* Guide Navigation / Quick Jump */}
      <div className="p-4 rounded-xl bg-shield-850 border border-shield-border flex flex-wrap gap-2 text-xs font-mono">
        <a href="#quishing" className="px-3 py-1.5 rounded bg-shield-900 border border-shield-700 text-shield-muted hover:text-white hover:border-emerald-500/50 transition-colors">
          1. Understanding Quishing
        </a>
        <a href="#payment-scams" className="px-3 py-1.5 rounded bg-shield-900 border border-shield-700 text-shield-muted hover:text-white hover:border-emerald-500/50 transition-colors">
          2. Fake Payment Codes
        </a>
        <a href="#redirects" className="px-3 py-1.5 rounded bg-shield-900 border border-shield-700 text-shield-muted hover:text-white hover:border-emerald-500/50 transition-colors">
          3. Malicious Redirects
        </a>
        <a href="#identification" className="px-3 py-1.5 rounded bg-shield-900 border border-shield-700 text-shield-muted hover:text-white hover:border-emerald-500/50 transition-colors">
          4. How to Spot Tampering
        </a>
        <a href="#safety-tips" className="px-3 py-1.5 rounded bg-shield-900 border border-shield-700 text-shield-muted hover:text-white hover:border-emerald-500/50 transition-colors">
          5. Core Safety Rules
        </a>
      </div>

      {/* ================= 1. QR Phishing (Quishing) ================= */}
      <section id="quishing" className="p-6 sm:p-8 rounded-2xl bg-shield-850 border border-shield-border space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">Section 01</span>
            <h2 className="text-xl font-bold text-white">Understanding QR Phishing (&ldquo;Quishing&rdquo;)</h2>
          </div>
        </div>

        <p className="text-sm text-shield-muted leading-relaxed font-sans">
          <strong>Quishing</strong> (QR Code Phishing) is a targeted social engineering vector where threat actors replace traditional email hyperlinks with two-dimensional optical barcodes. Because most email security gateways analyze plain text and HTML anchors rather than scanning and parsing embedded image barcodes, quishing payloads frequently bypass traditional corporate mail filters.
        </p>

        <div className="p-4 rounded-xl bg-shield-900 border border-shield-700 space-y-2">
          <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
            Common Quishing Pretexts:
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-shield-muted">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>&ldquo;Update your Multi-Factor Authenticator app&rdquo;</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>&ldquo;Your package delivery failed - scan to reschedule&rdquo;</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>&ldquo;Annual payroll or benefits open enrollment verification&rdquo;</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>&ldquo;Critical cloud tenant session expiration notice&rdquo;</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ================= 2. Fake Payment QR Codes ================= */}
      <section id="payment-scams" className="p-6 sm:p-8 rounded-2xl bg-shield-850 border border-shield-border space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">Section 02</span>
            <h2 className="text-xl font-bold text-white">Fake Payment QR Codes & Physical Overlays</h2>
          </div>
        </div>

        <p className="text-sm text-shield-muted leading-relaxed font-sans">
          One of the fastest growing physical cybercrime methods involves attackers printing adhesive stickers with identical branding and pasting them over legitimate barcodes on:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-shield-900 border border-shield-700">
            <h4 className="text-sm font-semibold text-white mb-1">Municipal Parking Meters</h4>
            <p className="text-xs text-shield-muted">
              Motorists scan what they assume is the city payment app, but are redirected to a cloned credit card harvesting form.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-shield-900 border border-shield-700">
            <h4 className="text-sm font-semibold text-white mb-1">Restaurant Table Ordering</h4>
            <p className="text-xs text-shield-muted">
              Patrons scan stickers placed over table placards, transferring payments directly into an attacker-controlled gateway.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-shield-900 border border-shield-700">
            <h4 className="text-sm font-semibold text-white mb-1">Electric Vehicle / Scooters</h4>
            <p className="text-xs text-shield-muted">
              Charging stations and public rental vehicles frequently suffer overlay attacks that drain bank accounts.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 3. Malicious QR Redirects ================= */}
      <section id="redirects" className="p-6 sm:p-8 rounded-2xl bg-shield-850 border border-shield-border space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">Section 03</span>
            <h2 className="text-xl font-bold text-white">Malicious Redirect Chains & Cloaking</h2>
          </div>
        </div>

        <p className="text-sm text-shield-muted leading-relaxed font-sans">
          Advanced scammers conceal malicious destinations behind legitimate link shorteners or compromised cloud platforms. A typical cloaked redirection path looks like:
        </p>

        <div className="p-4 rounded-xl bg-shield-950 border border-shield-800 font-mono text-xs space-y-2">
          <div className="flex items-center gap-2 text-shield-dim">
            <span className="px-2 py-0.5 rounded bg-shield-900 border border-shield-800 text-white">HOP 1</span>
            <span>https://bit.ly/3xParkingService (Shortened disguise)</span>
          </div>
          <div className="flex items-center gap-2 text-amber-400 pl-4 border-l border-shield-700">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">HOP 2</span>
            <span>https://us-east1.cloudfunctions.net/redirect-gateway (Intermediary cloaker)</span>
          </div>
          <div className="flex items-center gap-2 text-rose-400 pl-8 border-l border-shield-700">
            <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">HOP 3</span>
            <span>https://fake-city-parking-pay.top/steal-credentials (Active Phishing Payload)</span>
          </div>
        </div>

        <p className="text-xs text-shield-dim">
          QR Shield automatically follows each hop in a sandbox, extracting the true terminal destination before displaying risk telemetry.
        </p>
      </section>

      {/* ================= 4. How to Spot Tampering ================= */}
      <section id="identification" className="p-6 sm:p-8 rounded-2xl bg-shield-850 border border-shield-border space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">Section 04</span>
            <h2 className="text-xl font-bold text-white">Physical & Digital Red Flags</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-shield-900 border border-rose-500/20 space-y-2">
            <span className="text-xs font-mono text-rose-400 font-semibold uppercase flex items-center gap-1.5">
              <XCircle className="w-4 h-4" />
              Suspicious Indicators
            </span>
            <ul className="text-xs text-shield-muted space-y-1.5 list-disc list-inside">
              <li>Visible sticker edges or peeling corners over printed signs</li>
              <li>Mismatched fonts, low-resolution logos, or crooked alignment</li>
              <li>Domains ending in high-abuse TLDs (.top, .click, .loan, .biz)</li>
              <li>Requests to download an APK or mobile configuration profile</li>
              <li>Urgent demands for debit card PIN or credit card security codes</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-shield-900 border border-emerald-500/20 space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-semibold uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Legitimate Traits
            </span>
            <ul className="text-xs text-shield-muted space-y-1.5 list-disc list-inside">
              <li>Directly printed on original metal or laminated official surface</li>
              <li>Clean domain matching the exact brand (e.g. *.gov, *.edu, verified *.com)</li>
              <li>Displays SSL/TLS certificate issued by recognized authority</li>
              <li>Does not require external application installs or permission grants</li>
              <li>Validated and verified by QR Shield before interaction</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= 5. Core Safety Rules ================= */}
      <section id="safety-tips" className="p-6 sm:p-8 rounded-2xl bg-shield-850 border border-shield-border space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">Section 05</span>
            <h2 className="text-xl font-bold text-white">5 Golden Rules for QR Safety</h2>
          </div>
        </div>

        <div className="space-y-3 font-sans">
          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-shield-900 border border-shield-700">
            <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold shrink-0">
              1
            </span>
            <div>
              <h4 className="text-sm font-semibold text-white">Never scan unverified paper overlays</h4>
              <p className="text-xs text-shield-muted mt-0.5">
                Feel the surface of the sign. If there is a raised sticker pasted over the original QR code, report it to the establishment immediately.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-shield-900 border border-shield-700">
            <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold shrink-0">
              2
            </span>
            <div>
              <h4 className="text-sm font-semibold text-white">Preview the destination URL before opening</h4>
              <p className="text-xs text-shield-muted mt-0.5">
                Never enable &ldquo;Automatically open websites&rdquo; in your camera settings. Always inspect the domain string first.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-shield-900 border border-shield-700">
            <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold shrink-0">
              3
            </span>
            <div>
              <h4 className="text-sm font-semibold text-white">Beware of QR codes in unexpected emails</h4>
              <p className="text-xs text-shield-muted mt-0.5">
                Banks, employers, and government services virtually never require scanning a QR code inside an email to verify identity or account access.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-shield-900 border border-shield-700">
            <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold shrink-0">
              4
            </span>
            <div>
              <h4 className="text-sm font-semibold text-white">Never approve app installation requests from QR codes</h4>
              <p className="text-xs text-shield-muted mt-0.5">
                Malicious QR codes often trigger automatic downloads of rogue APKs or mobile device management (MDM) profiles.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-lg bg-shield-900 border border-shield-700">
            <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold shrink-0">
              5
            </span>
            <div>
              <h4 className="text-sm font-semibold text-white">Run suspect codes through QR Shield</h4>
              <p className="text-xs text-shield-muted mt-0.5">
                When in doubt, capture a screenshot or copy the link into QR Shield to obtain an objective risk score and redirect analysis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
