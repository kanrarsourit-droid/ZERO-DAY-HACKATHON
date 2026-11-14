import React, { useState } from 'react';
import {
  History,
  Search,
  Filter,
  Eye,
  X,
  ExternalLink,
  Shield,
  Layers,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import Badge from '../components/common/Badge';
import RiskScoreGauge from '../components/common/RiskScoreGauge';
import DemoNotice from '../components/common/DemoNotice';
import { DEMO_SCAN_HISTORY } from '../utils/constants';

export default function HistoryPage() {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScan, setSelectedScan] = useState(null);

  const filteredScans = DEMO_SCAN_HISTORY.filter((scan) => {
    const matchesStatus =
      filterStatus === 'ALL' || scan.status.toUpperCase() === filterStatus;
    const matchesSearch =
      scan.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-shield-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <History className="w-7 h-7 text-emerald-400" />
            Scan History & Audit Logs
          </h1>
          <p className="text-sm text-shield-muted mt-1">
            Historical repository of analyzed barcodes, extracted destinations, and computed threat reports.
          </p>
        </div>
      </div>

      {/* Demo Notice */}
      <DemoNotice
        title="SAMPLE AUDIT LOGS"
        message="The log records below represent pre-configured mock entries to demonstrate reporting views, risk gauges, and filtering capabilities."
      />

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-shield-dim absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by URL, domain, or scan ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-shield-900 border border-shield-700 rounded-lg text-xs font-mono text-white placeholder:text-shield-dim focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-shield-900 border border-shield-border font-mono text-xs overflow-x-auto">
          {['ALL', 'SAFE', 'SUSPICIOUS', 'DANGEROUS'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-shield-800 text-white border border-shield-700'
                  : 'text-shield-muted hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Scans Table */}
      <div className="rounded-xl bg-shield-850 border border-shield-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-sm">
            <thead className="bg-shield-900/90 text-[11px] uppercase tracking-wider text-shield-dim border-b border-shield-border">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Scan Date</th>
                <th className="px-5 py-3.5 font-semibold">Destination URL / Domain</th>
                <th className="px-5 py-3.5 font-semibold">Threat Category</th>
                <th className="px-5 py-3.5 font-semibold">Risk Score</th>
                <th className="px-5 py-3.5 font-semibold">Status</th>
                <th className="px-5 py-3.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-shield-border">
              {filteredScans.length > 0 ? (
                filteredScans.map((scan) => (
                  <tr key={scan.id} className="hover:bg-shield-800/40 transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap text-xs text-shield-muted">
                      <div>{scan.date.split(' ')[0]}</div>
                      <div className="text-[11px] text-shield-dim">{scan.date.split(' ')[1]} UTC</div>
                    </td>

                    <td className="px-5 py-4 max-w-xs sm:max-w-md">
                      <div className="text-white font-medium truncate text-xs">
                        {scan.domain}
                      </div>
                      <div className="text-shield-dim text-[11px] truncate mt-0.5">
                        {scan.url}
                      </div>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-xs text-shield-muted">
                      <span className="px-2 py-0.5 rounded bg-shield-900 border border-shield-700 text-[11px]">
                        {scan.threatType}
                      </span>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <RiskScoreGauge score={scan.riskScore} size="compact" />
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <Badge status={scan.status} size="sm" />
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedScan(scan)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-shield-800 hover:bg-shield-750 text-white border border-shield-700 hover:border-emerald-500/50 text-xs font-mono transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                        <span>View Report</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-5 py-8 text-center text-xs text-shield-dim font-mono">
                    No scan records match the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Report Slideout / Modal */}
      {selectedScan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-shield-900 border border-shield-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-shield-border pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-shield-dim uppercase">Security Report</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-shield-800 text-shield-muted border border-shield-700">
                    {selectedScan.id}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Target Inspection Analysis
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedScan(null)}
                className="p-1.5 rounded-lg text-shield-dim hover:text-white hover:bg-shield-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Risk Gauge in Modal */}
            <RiskScoreGauge score={selectedScan.riskScore} />

            {/* Target Breakdown */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-shield-950 border border-shield-800 space-y-1">
                <span className="text-shield-dim uppercase text-[10px]">Destination URL:</span>
                <p className="text-white break-all font-mono">{selectedScan.url}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-shield-950 border border-shield-800">
                  <span className="text-shield-dim uppercase text-[10px] block">Ingestion Source:</span>
                  <span className="text-white font-medium">{selectedScan.source}</span>
                </div>
                <div className="p-3 rounded-lg bg-shield-950 border border-shield-800">
                  <span className="text-shield-dim uppercase text-[10px] block">Redirect Hops:</span>
                  <span className="text-white font-medium">{selectedScan.redirects} Intermediate Hops</span>
                </div>
                <div className="p-3 rounded-lg bg-shield-950 border border-shield-800">
                  <span className="text-shield-dim uppercase text-[10px] block">Classified Category:</span>
                  <span className="text-white font-medium">{selectedScan.threatType}</span>
                </div>
                <div className="p-3 rounded-lg bg-shield-950 border border-shield-800">
                  <span className="text-shield-dim uppercase text-[10px] block">Final Verdict:</span>
                  <Badge status={selectedScan.status} size="sm" />
                </div>
              </div>
            </div>

            {/* Advisory note */}
            <div className="p-3.5 rounded-lg bg-shield-850 border border-shield-700 text-xs text-shield-muted leading-relaxed">
              <span className="text-white font-semibold block mb-1">Analyst Recommendation:</span>
              {selectedScan.status === 'DANGEROUS' && (
                <span className="text-rose-400">
                  CRITICAL: Do not navigate to this destination or enter authentication credentials. The domain exhibits strong phishing markers.
                </span>
              )}
              {selectedScan.status === 'SUSPICIOUS' && (
                <span className="text-amber-400">
                  WARNING: Exercise caution. Multiple redirects or link masking detected. Verify the sender before proceeding.
                </span>
              )}
              {selectedScan.status === 'SAFE' && (
                <span className="text-emerald-400">
                  VERIFIED: No malicious indicators detected. Destination matches known legitimate certificates and infrastructure.
                </span>
              )}
            </div>

            {/* Close Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedScan(null)}
                className="px-4 py-2 rounded-lg bg-shield-800 hover:bg-shield-750 text-white font-mono text-xs font-medium border border-shield-700 transition-colors"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
