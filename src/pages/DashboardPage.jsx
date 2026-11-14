import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  QrCode,
  Scan,
  TrendingUp,
  ExternalLink,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  Activity,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import DemoNotice from '../components/common/DemoNotice';
import {
  APP_ROUTES,
  DEMO_STATS,
  DEMO_SCAN_HISTORY,
  DEMO_ANALYTICS_DATA,
} from '../utils/constants';

// Custom dark styled tooltip for Recharts
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-shield-900 border border-shield-700 p-3 rounded-lg shadow-xl font-mono text-xs space-y-1">
        <p className="font-semibold text-white mb-1.5 uppercase">{label} Activity</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between gap-4">
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span className="font-bold text-white">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function DashboardPage() {
  const recentScans = DEMO_SCAN_HISTORY.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-shield-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Security Overview
          </h1>
          <p className="text-sm text-shield-muted mt-1">
            Real-time telemetry, threat detection counters, and recent inspection activities.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={APP_ROUTES.SCANNER}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-shield-950 font-mono text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            <Scan className="w-4 h-4" />
            <span>Scan QR Code</span>
          </Link>
          <Link
            to={APP_ROUTES.URL_CHECKER}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-shield-850 hover:bg-shield-800 text-white border border-shield-700 font-mono text-xs font-medium uppercase tracking-wider transition-colors"
          >
            <span>Analyze URL</span>
          </Link>
        </div>
      </div>

      {/* Demo Data Notice */}
      <DemoNotice
        title="DEMONSTRATION METRICS"
        message="The metrics, charts, and scan logs shown below represent pre-seeded sample data for testing the UI. Live scans will populate dynamically once the backend pipeline is enabled."
      />

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Scans"
          value={DEMO_STATS.totalScans.toLocaleString()}
          icon={QrCode}
          variant="neutral"
          badgeText="All Time"
          subtitle={`${DEMO_STATS.scansToday} scans processed today`}
        />

        <StatCard
          title="Safe Verifications"
          value={DEMO_STATS.safeScans.toLocaleString()}
          icon={ShieldCheck}
          variant="safe"
          badgeText="82.9%"
          subtitle="Clean domains & authentic links"
        />

        <StatCard
          title="Suspicious Flags"
          value={DEMO_STATS.suspiciousScans.toLocaleString()}
          icon={AlertTriangle}
          variant="warning"
          badgeText="12.0%"
          subtitle="Obfuscated / high-hop redirects"
        />

        <StatCard
          title="Dangerous Blocked"
          value={DEMO_STATS.dangerousScans.toLocaleString()}
          icon={ShieldAlert}
          variant="danger"
          badgeText="5.1%"
          subtitle={`${DEMO_STATS.threatsBlockedToday} threats quarantined today`}
        />
      </div>

      {/* Security Statistics Chart Section */}
      <div className="rounded-xl bg-shield-850 border border-shield-border p-5 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              7-Day Scan Frequency & Threat Distribution
            </h2>
            <p className="text-xs text-shield-muted mt-0.5">
              Aggregated daily scan verdicts categorized by threat severity level.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-shield-dim">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span>
            <span>Safe</span>
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 ml-2"></span>
            <span>Suspicious</span>
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 ml-2"></span>
            <span>Dangerous</span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={DEMO_ANALYTICS_DATA}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1F293D" vertical={false} />
              <XAxis
                dataKey="day"
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                fontFamily="monospace"
              />
              <YAxis
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                fontFamily="monospace"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="safe" name="Safe" fill="#10B981" radius={[3, 3, 0, 0]} />
              <Bar dataKey="suspicious" name="Suspicious" fill="#F59E0B" radius={[3, 3, 0, 0]} />
              <Bar dataKey="dangerous" name="Dangerous" fill="#EF4444" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Scan Activity Table */}
      <div className="rounded-xl bg-shield-850 border border-shield-border overflow-hidden">
        <div className="p-5 border-b border-shield-border flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-shield-muted" />
              Recent Scan Activity
            </h2>
            <p className="text-xs text-shield-muted mt-0.5">
              Latest inspections processed through the platform.
            </p>
          </div>
          <Link
            to={APP_ROUTES.HISTORY}
            className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>View Full History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono">
            <thead className="bg-shield-900/80 text-[11px] uppercase tracking-wider text-shield-dim border-b border-shield-border">
              <tr>
                <th className="px-5 py-3 font-semibold">Scan ID</th>
                <th className="px-5 py-3 font-semibold">Destination URL / Host</th>
                <th className="px-5 py-3 font-semibold">Source</th>
                <th className="px-5 py-3 font-semibold">Risk Score</th>
                <th className="px-5 py-3 font-semibold">Verdict</th>
                <th className="px-5 py-3 font-semibold text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-shield-border">
              {recentScans.map((scan) => (
                <tr key={scan.id} className="hover:bg-shield-800/50 transition-colors">
                  <td className="px-5 py-3.5 text-xs font-medium text-shield-muted">
                    {scan.id}
                  </td>
                  <td className="px-5 py-3.5 text-xs max-w-xs sm:max-w-md truncate">
                    <div className="text-white font-medium truncate">{scan.domain}</div>
                    <div className="text-shield-dim text-[11px] truncate">{scan.url}</div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-shield-muted">
                    {scan.source}
                  </td>
                  <td className="px-5 py-3.5 text-xs">
                    <span className={`font-bold ${
                      scan.riskScore > 65 ? 'text-rose-400' : scan.riskScore > 25 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {scan.riskScore}/100
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs">
                    <Badge status={scan.status} size="sm" />
                  </td>
                  <td className="px-5 py-3.5 text-xs text-shield-dim text-right whitespace-nowrap">
                    {scan.date.split(' ')[1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
