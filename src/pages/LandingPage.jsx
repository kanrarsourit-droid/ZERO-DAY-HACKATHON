import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  QrCode,
  Scan,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Lock,
  Layers,
  Search,
  Eye,
  CheckCircle2,
  FileWarning,
  Zap,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { APP_ROUTES } from '../utils/constants';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-shield-950 text-shield-text flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section id="hero" className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden border-b border-shield-border">
          {/* Subtle background grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

          {/* Ambient security accent aura (emerald only, subtle) */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[340px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Value Proposition & CTAs */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Security Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>NEXT-GEN QR SCAM & QUISHING DETECTION</span>
                </div>

                {/* Hero Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                  Scan Smart. <br />
                  <span className="text-emerald-400">Stay Safe.</span>
                </h1>

                {/* Supporting Text */}
                <p className="text-lg text-shield-muted max-w-2xl leading-relaxed">
                  Cybercriminals weaponize physical QR codes to execute quishing attacks, credential theft, and malicious redirects. QR Shield intercepts and decrypts embedded URLs, analyzes redirect hops, and delivers instant risk scores before your device is compromised.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    to={APP_ROUTES.SCANNER}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-shield-950 font-mono text-sm font-semibold tracking-wider uppercase transition-all shadow-lg shadow-emerald-950/40"
                  >
                    <Scan className="w-4 h-4" />
                    <span>Scan a QR Code</span>
                  </Link>

                  <a
                    href="#features"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-shield-900 hover:bg-shield-850 text-white border border-shield-700 font-mono text-sm font-medium tracking-wider uppercase transition-colors"
                  >
                    <Search className="w-4 h-4 text-shield-muted" />
                    <span>Explore Features</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="pt-6 border-t border-shield-border/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-mono text-shield-dim">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Multi-hop Unfurling
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Domain Reputation Scoring
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Zero Threat Transmission
                  </span>
                </div>
              </div>

              {/* Right Column: Custom CSS/SVG QR Security Visual */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md">
                  {/* Outer security frame */}
                  <div className="rounded-2xl bg-shield-900 border border-shield-700/80 p-6 shadow-2xl relative overflow-hidden">
                    
                    {/* Top status bar */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-shield-800 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-white font-medium">INSPECTION ENGINE</span>
                      </div>
                      <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        MONITORING ACTIVE
                      </span>
                    </div>

                    {/* QR Code Matrix Graphic with Security Overlay */}
                    <div className="relative bg-shield-950 border border-shield-800 rounded-xl p-6 flex flex-col items-center justify-center">
                      
                      {/* Stylized Security QR Code SVG */}
                      <div className="relative w-56 h-56 flex items-center justify-center">
                        <svg
                          viewBox="0 0 200 200"
                          className="w-full h-full text-shield-dim"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Corner Target 1 (Top Left) */}
                          <rect x="15" y="15" width="46" height="46" rx="6" stroke="#10B981" strokeWidth="4" />
                          <rect x="27" y="27" width="22" height="22" rx="3" fill="#10B981" />
                          
                          {/* Corner Target 2 (Top Right) */}
                          <rect x="139" y="15" width="46" height="46" rx="6" stroke="#10B981" strokeWidth="4" />
                          <rect x="151" y="27" width="22" height="22" rx="3" fill="#10B981" />
                          
                          {/* Corner Target 3 (Bottom Left) */}
                          <rect x="15" y="139" width="46" height="46" rx="6" stroke="#10B981" strokeWidth="4" />
                          <rect x="27" y="151" width="22" height="22" rx="3" fill="#10B981" />
                          
                          {/* QR Data Pattern Dots */}
                          <g fill="#475569" opacity="0.8">
                            <rect x="75" y="20" width="10" height="10" rx="2" />
                            <rect x="95" y="20" width="10" height="10" rx="2" />
                            <rect x="115" y="20" width="10" height="10" rx="2" />
                            <rect x="75" y="40" width="10" height="10" rx="2" />
                            <rect x="115" y="40" width="10" height="10" rx="2" />

                            <rect x="20" y="75" width="10" height="10" rx="2" />
                            <rect x="40" y="75" width="10" height="10" rx="2" />
                            <rect x="20" y="95" width="10" height="10" rx="2" />
                            <rect x="20" y="115" width="10" height="10" rx="2" />
                            
                            <rect x="145" y="75" width="10" height="10" rx="2" />
                            <rect x="165" y="95" width="10" height="10" rx="2" />
                            <rect x="145" y="115" width="10" height="10" rx="2" />

                            <rect x="75" y="145" width="10" height="10" rx="2" />
                            <rect x="95" y="145" width="10" height="10" rx="2" />
                            <rect x="115" y="145" width="10" height="10" rx="2" />
                            <rect x="75" y="165" width="10" height="10" rx="2" />
                            <rect x="165" y="165" width="10" height="10" rx="2" />
                          </g>

                          {/* Center Shield Interceptor Node */}
                          <rect x="70" y="70" width="60" height="60" rx="8" fill="#0D1117" stroke="#10B981" strokeWidth="2" />
                        </svg>

                        {/* Central Shield Icon Inside Matrix */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="p-3 bg-shield-900 rounded-lg border border-emerald-500/40 shadow-md">
                            <Shield className="w-8 h-8 text-emerald-400" />
                          </div>
                        </div>

                        {/* Horizontal Scanning Laser Bar */}
                        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_#10B981]" />
                      </div>

                      {/* URL Inspection Banner below QR */}
                      <div className="w-full mt-4 p-3 rounded-lg bg-shield-900 border border-shield-700 font-mono text-[11px] text-shield-muted">
                        <div className="flex items-center justify-between text-shield-dim mb-1">
                          <span>INTERCEPTED DESTINATION</span>
                          <span className="text-emerald-400">STATUS: VERIFIED</span>
                        </div>
                        <div className="text-white truncate font-medium">
                          https://auth.company-portal.internal/login
                        </div>
                      </div>
                    </div>

                    {/* Threat Metric Counters */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="p-2.5 rounded-lg bg-shield-950 border border-shield-800 text-center font-mono">
                        <span className="text-[10px] text-shield-dim uppercase block">Zero-Trust Latency</span>
                        <span className="text-sm font-bold text-white">42ms</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-shield-950 border border-shield-800 text-center font-mono">
                        <span className="text-[10px] text-shield-dim uppercase block">Calculated Risk</span>
                        <span className="text-sm font-bold text-emerald-400">4 / 100</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= FEATURES SECTION ================= */}
        <section id="features" className="py-20 lg:py-28 border-b border-shield-border bg-shield-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Core Defense Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Comprehensive Threat Analysis for Every Scanned Code
              </h2>
              <p className="text-base text-shield-muted">
                Standard mobile cameras blindly open QR destinations without validation. QR Shield inserts a proactive verification gate to inspect URLs before execution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-xl bg-shield-850 border border-shield-border hover:border-shield-600 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Quishing Defense Engine</h3>
                <p className="text-sm text-shield-muted leading-relaxed">
                  Detects deceptive QR phishing designed to impersonate banks, logistics providers, or authentication services, stopping credential harvest campaigns.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-xl bg-shield-850 border border-shield-border hover:border-shield-600 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Multi-Hop Redirect Unfurling</h3>
                <p className="text-sm text-shield-muted leading-relaxed">
                  Traces the complete redirection path through shorteners, cloaked gateways, and affiliate chains to evaluate the actual end destination.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-xl bg-shield-850 border border-shield-border hover:border-shield-600 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Domain Reputation Heuristics</h3>
                <p className="text-sm text-shield-muted leading-relaxed">
                  Evaluates domain age, typo-squatting markers, unusual TLDs (.top, .click, .biz), and blacklist status to identify suspicious infrastructure.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-xl bg-shield-850 border border-shield-border hover:border-shield-600 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Payment Hijack Interception</h3>
                <p className="text-sm text-shield-muted leading-relaxed">
                  Detects fraudulent sticker overlays on municipal parking meters, restaurant tables, and physical POS terminals redirecting payments to attackers.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="p-6 rounded-xl bg-shield-850 border border-shield-border hover:border-shield-600 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Calculated Risk Index</h3>
                <p className="text-sm text-shield-muted leading-relaxed">
                  Translates multi-dimensional threat telemetry into a plain-English, 0–100 risk score with clear guidance on whether to proceed or abort.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="p-6 rounded-xl bg-shield-850 border border-shield-border hover:border-shield-600 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <FileWarning className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Audit History & Telemetry</h3>
                <p className="text-sm text-shield-muted leading-relaxed">
                  Stores comprehensive scan history and indicators of compromise (IoCs) to track threat trends across organizations and devices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS SECTION ================= */}
        <section id="how-it-works" className="py-20 lg:py-28 border-b border-shield-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Inspection Protocol
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Four Layers of Verification
              </h2>
              <p className="text-base text-shield-muted">
                How QR Shield isolates and scores barcode payloads before your device interacts with remote servers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="p-6 rounded-xl bg-shield-900 border border-shield-border relative">
                <span className="text-2xl font-mono font-bold text-emerald-400 mb-4 block">01</span>
                <h3 className="text-base font-semibold text-white mb-2">Capture or Upload</h3>
                <p className="text-sm text-shield-muted leading-relaxed">
                  Scan via camera lens, upload saved screenshots, or manually enter suspicious destination strings into the console.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-xl bg-shield-900 border border-shield-border relative">
                <span className="text-2xl font-mono font-bold text-emerald-400 mb-4 block">02</span>
                <h3 className="text-base font-semibold text-white mb-2">Target Extraction</h3>
                <p className="text-sm text-shield-muted leading-relaxed">
                  Decodes barcode symbology in a sandbox, extracting raw text, IP addresses, or uniform resource locators without executing scripts.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-xl bg-shield-900 border border-shield-border relative">
                <span className="text-2xl font-mono font-bold text-emerald-400 mb-4 block">03</span>
                <h3 className="text-base font-semibold text-white mb-2">Deep Threat Evaluation</h3>
                <p className="text-sm text-shield-muted leading-relaxed">
                  Follows redirect cascades, cross-checks against threat intelligence databases, and computes domain security heuristics.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-xl bg-shield-900 border border-shield-border relative">
                <span className="text-2xl font-mono font-bold text-emerald-400 mb-4 block">04</span>
                <h3 className="text-base font-semibold text-white mb-2">Verdict & Advisory</h3>
                <p className="text-sm text-shield-muted leading-relaxed">
                  Issues a clear Safe, Suspicious, or Dangerous verdict with a 0-100 risk score and prevents accidental navigation to scam pages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY QR SECURITY MATTERS ================= */}
        <section className="py-20 lg:py-28 border-b border-shield-border bg-shield-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Critical Threat Landscape
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Why QR Security Demands Immediate Attention
                </h2>
                <div className="space-y-4 text-sm text-shield-muted leading-relaxed">
                  <p>
                    Unlike traditional web hyperlinks, human eyes cannot read or verify what domain a QR code matrix points to before triggering the camera.
                  </p>
                  <p>
                    Attackers exploit this blind spot by pasting counterfeit QR stickers over legitimate payment terminals, public transit kiosks, parking meters, and enterprise multi-factor authentication notices.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 p-3.5 rounded-lg bg-shield-850 border border-shield-700">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Physical Sticker Replacement Attacks</h4>
                      <p className="text-xs text-shield-muted mt-0.5">
                        Fraudsters paste printed stickers directly over genuine merchant codes to silently siphon customer funds.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-lg bg-shield-850 border border-shield-700">
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Bypassing Email Gateway Filters</h4>
                      <p className="text-xs text-shield-muted mt-0.5">
                        Phishing emails embed QR codes inside PDF attachments or images, completely evading traditional text scanners.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics & Metrics Panel */}
              <div className="lg:col-span-6">
                <div className="p-8 rounded-2xl bg-shield-850 border border-shield-700 space-y-6">
                  <h3 className="text-lg font-mono font-semibold uppercase tracking-wider text-white border-b border-shield-800 pb-3">
                    Threat Vector Telemetry
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-shield-900 border border-shield-800">
                      <span className="text-3xl font-mono font-bold text-rose-400">+587%</span>
                      <p className="text-xs font-mono text-shield-muted mt-1 uppercase">Quishing Incidents YoY</p>
                    </div>

                    <div className="p-4 rounded-xl bg-shield-900 border border-shield-800">
                      <span className="text-3xl font-mono font-bold text-amber-400">89%</span>
                      <p className="text-xs font-mono text-shield-muted mt-1 uppercase">Bypass Standard Scanners</p>
                    </div>

                    <div className="p-4 rounded-xl bg-shield-900 border border-shield-800">
                      <span className="text-3xl font-mono font-bold text-emerald-400">&lt; 100ms</span>
                      <p className="text-xs font-mono text-shield-muted mt-1 uppercase">QR Shield Pre-Check</p>
                    </div>

                    <div className="p-4 rounded-xl bg-shield-900 border border-shield-800">
                      <span className="text-3xl font-mono font-bold text-white">0 Reroutes</span>
                      <p className="text-xs font-mono text-shield-muted mt-1 uppercase">Zero-Trust Sandbox</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-shield-900/80 border border-shield-800 text-xs font-mono text-shield-dim">
                    <span className="text-emerald-400 font-semibold uppercase mr-2">[RECOMMENDATION]</span>
                    Always route unfamiliar QR codes through QR Shield before opening the payload in mobile Safari, Chrome, or banking apps.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= FINAL CALL TO ACTION ================= */}
        <section className="py-20 lg:py-24 border-b border-shield-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to Inspect Your First QR Code?
            </h2>
            <p className="text-base text-shield-muted max-w-xl mx-auto">
              Launch the security console to test suspicious barcodes, check shortened URLs, or review recent threat intelligence trends.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link
                to={APP_ROUTES.SCANNER}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-shield-950 font-mono text-sm font-semibold tracking-wider uppercase transition-all shadow-lg shadow-emerald-950/40"
              >
                <Scan className="w-4 h-4" />
                <span>Launch Scanner Studio</span>
              </Link>
              <Link
                to={APP_ROUTES.DASHBOARD}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-shield-900 hover:bg-shield-850 text-white border border-shield-700 font-mono text-sm font-medium tracking-wider uppercase transition-colors"
              >
                <span>Open Security Dashboard</span>
                <ArrowRight className="w-4 h-4 text-shield-muted" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
