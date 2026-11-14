import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  UploadCloud,
  ArrowRight,
  Shield,
  Link2,
  Info,
  Scan,
  RotateCcw,
} from 'lucide-react';
import CameraScanner from '../components/scanner/CameraScanner';
import ImageUploadScanner from '../components/scanner/ImageUploadScanner';
import ScanResultPanel from '../components/scanner/ScanResultPanel';
import DemoNotice from '../components/common/DemoNotice';
import { parseQRPayload } from '../utils/qrPayloadParser';
import { APP_ROUTES } from '../utils/constants';

export default function ScannerPage() {
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' | 'upload'
  const [scanResult, setScanResult] = useState(null);

  const handleScanSuccess = (decodedText, source) => {
    const parsed = parseQRPayload(decodedText);
    setScanResult({
      parsedPayload: parsed,
      source: source || 'Scanner',
      timestamp: new Date().toISOString(),
    });
  };

  const handleReset = () => {
    setScanResult(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setScanResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-shield-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Scan className="w-7 h-7 text-emerald-400" />
            QR Scanner Studio
          </h1>
          <p className="text-sm text-shield-muted mt-1">
            Capture barcodes directly via optical camera or upload stored raster image files for sandbox payload extraction.
          </p>
        </div>

        {/* Manual URL entry shortcut */}
        <Link
          to={APP_ROUTES.URL_CHECKER}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-shield-850 hover:bg-shield-800 text-shield-muted hover:text-white border border-shield-700 text-xs font-mono transition-colors self-start sm:self-auto"
        >
          <Link2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Manual URL Entry</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Development Stage Notice */}
      <DemoNotice
        title="FUNCTIONAL SCANNER ENGINE ACTIVE"
        message="Client-side barcode symbology decoding is active. Optical camera scanning and raster image decoding operate in an isolated zero-trust sandbox without executing remote destinations."
      />

      {/* Main Scanner Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Scanner / Uploader / Result Panel (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Tab Selector (Hidden if result is showing, or accessible via reset) */}
          {!scanResult ? (
            <div className="flex items-center gap-2 p-1 rounded-lg bg-shield-900 border border-shield-border w-fit font-mono text-xs">
              <button
                type="button"
                onClick={() => handleTabChange('camera')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'camera'
                    ? 'bg-shield-800 text-white border border-shield-700 shadow-sm'
                    : 'text-shield-muted hover:text-white'
                }`}
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Live Camera Stream</span>
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('upload')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'upload'
                    ? 'bg-shield-800 text-white border border-shield-700 shadow-sm'
                    : 'text-shield-muted hover:text-white'
                }`}
              >
                <UploadCloud className="w-4 h-4 text-emerald-400" />
                <span>Upload Image File</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-2 rounded-lg bg-shield-900 border border-shield-border font-mono text-xs">
              <span className="text-shield-dim text-[11px] px-2">
                ACTIVE VERDICT VIEW
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-shield-800 hover:bg-shield-750 text-white border border-shield-700 text-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-shield-muted" />
                <span>Scan New Code</span>
              </button>
            </div>
          )}

          {/* Result Panel or Active Scanner View */}
          {scanResult ? (
            <ScanResultPanel
              parsedResult={scanResult.parsedPayload}
              scanSource={scanResult.source}
              onReset={handleReset}
            />
          ) : (
            <>
              {activeTab === 'camera' && (
                <CameraScanner onScanSuccess={handleScanSuccess} />
              )}

              {activeTab === 'upload' && (
                <ImageUploadScanner onScanSuccess={handleScanSuccess} />
              )}
            </>
          )}
        </div>

        {/* Right Column: Instructions & Security Features (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* How Scanning Works Card */}
          <div className="p-5 rounded-xl bg-shield-850 border border-shield-border space-y-4">
            <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-emerald-400" />
              How Scanning Works
            </h3>

            <ol className="space-y-3 text-xs text-shield-muted leading-relaxed font-sans">
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-emerald-400 font-bold">1.</span>
                <span>
                  <strong className="text-white">Isolate Symbology:</strong> QR pattern is decoded client-side into raw character payload.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-emerald-400 font-bold">2.</span>
                <span>
                  <strong className="text-white">Zero-Click Sandbox:</strong> The destination URL is never executed in your local browser engine.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-emerald-400 font-bold">3.</span>
                <span>
                  <strong className="text-white">Redirect Trace:</strong> Server-side crawlers follow redirect chains (bit.ly, t.co) to reveal the real host.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="font-mono text-emerald-400 font-bold">4.</span>
                <span>
                  <strong className="text-white">Threat Verdict:</strong> Domain age, SSL configuration, and blacklists are calculated into a risk score.
                </span>
              </li>
            </ol>
          </div>

          {/* Quick Manual URL Inspection Box */}
          <div className="p-5 rounded-xl bg-shield-850 border border-shield-border space-y-3">
            <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-white flex items-center gap-2">
              <Link2 className="w-4 h-4 text-shield-muted" />
              Prefer Raw URL Analysis?
            </h3>
            <p className="text-xs text-shield-muted leading-relaxed">
              If you already have the target web link or received a suspicious SMS link, evaluate it directly in the URL Checker.
            </p>
            <Link
              to={APP_ROUTES.URL_CHECKER}
              className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              <span>Open URL Threat Inspector</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Security Best Practice Notice */}
          <div className="p-4 rounded-xl bg-shield-900 border border-shield-700 text-xs font-mono text-shield-dim space-y-1">
            <span className="text-amber-400 font-semibold uppercase block">[SECURITY ADVISORY]</span>
            <p>
              Always inspect physical stickers on municipal parking meters, scooters, and restaurant tables for signs of physical tampering.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
