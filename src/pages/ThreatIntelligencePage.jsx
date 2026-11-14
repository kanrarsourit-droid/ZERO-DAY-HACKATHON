import React from 'react';
import {
  ShieldAlert,
  Globe,
  Radio,
  AlertTriangle,
  TrendingUp,
  Server,
  Layers,
  Activity,
  FileCode,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import RiskScoreGauge from '../components/common/RiskScoreGauge';
import DemoNotice from '../components/common/DemoNotice';
import {
  DEMO_THREAT_CATEGORIES,
  DEMO_MALICIOUS_DOMAINS,
} from '../utils/constants';

function CustomPieTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-shield-900 border border-shield-700 p-2.5 rounded-lg shadow-xl font-mono text-xs">
        <p className="font-semibold text-white">{data.name}</p>
        <p className="text-emerald-400 mt-0.5">
          {data.count} incidents ({data.percentage}%)
        </p>
      </div>
    );
  }
  return null;
}

export default function ThreatIntelligencePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-shield-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <ShieldAlert className="w-7 h-7 text-rose-500" />
            Threat Intelligence & Quishing Observability
          </h1>
          <p className="text-sm text-shield-muted mt-1">
            Real-time tracking of weaponized QR infrastructure, compromised payment destinations, and phishing trends.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-lg bg-shield-900 border border-shield-700 text-shield-muted self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Feed Status: Live Ingestion</span>
        </div>
      </div>

      {/* Demo Notice */}
      <DemoNotice
        title="ILLUSTRATIVE INTEL DATA"
        message="Threat telemetry, domain detections, and IOC tables displayed here are mock demonstration feeds for UI visualization. Live community signatures and OSINT feeds will be activated during API integration."
      />

      {/* High-Level Threat Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Active Campaigns"
          value="142"
          icon={Radio}
          variant="danger"
          badgeText="Active"
          subtitle="Monitored quishing operations"
        />

        <StatCard
          title="Flagged Malicious Domains"
          value="1,894"
          icon={Globe}
          variant="warning"
          badgeText="+38 this week"
          subtitle="Flagged in zero-day registry"
        />

        <StatCard
          title="Tampered POS / Meters"
          value="87"
          icon={AlertTriangle}
          variant="danger"
          badgeText="Physical"
          subtitle="Counterfeit payment stickers"
        />

        <StatCard
          title="Mean Time To Intercept"
          value="38ms"
          icon={Activity}
          variant="safe"
          badgeText="SLA < 100ms"
          subtitle="Real-time URL unfurling speed"
        />
      </div>

      {/* Threat Breakdown Grid: Chart + Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Category Breakdown (8 cols) */}
        <div className="lg:col-span-8 p-6 rounded-xl bg-shield-850 border border-shield-border space-y-5">
          <div className="flex items-center justify-between border-b border-shield-border pb-3">
            <div>
              <h2 className="text-base font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Threat Vector Distribution
              </h2>
              <p className="text-xs text-shield-muted mt-0.5">
                Proportion of identified malicious payloads by tactical classification.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Donut Chart */}
            <div className="sm:col-span-5 h-56 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Pie
                    data={DEMO_THREAT_CATEGORIES}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="count"
                  >
                    {DEMO_THREAT_CATEGORIES.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Progress Bars */}
            <div className="sm:col-span-7 space-y-3 font-mono text-xs">
              {DEMO_THREAT_CATEGORIES.map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex justify-between items-center text-shield-muted">
                    <span className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-white">{cat.name}</span>
                    </span>
                    <span>{cat.percentage}% ({cat.count})</span>
                  </div>
                  <div className="w-full h-1.5 bg-shield-900 rounded-full overflow-hidden border border-shield-800">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${cat.percentage}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Quishing Severity Meter (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-xl bg-shield-850 border border-shield-border space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-white flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-rose-500" />
              Global Threat Level
            </h3>
            <p className="text-xs text-shield-muted leading-relaxed font-sans">
              Evaluated based on automated sensor honeypots and reported quishing occurrences worldwide.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-shield-900 border border-rose-500/30 text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-semibold block">
              DEFCON / ELEVATED
            </span>
            <span className="text-4xl font-mono font-extrabold text-white block">
              TIER 2
            </span>
            <p className="text-[11px] text-shield-dim font-mono">
              High density of physical parking payment scams reported across major metropolitan hubs.
            </p>
          </div>

          <div className="text-xs font-mono text-shield-dim p-3 rounded-lg bg-shield-950 border border-shield-800">
            <span className="text-emerald-400 font-bold block mb-1">AUTOMATED COUNTERMEASURE:</span>
            Aggressive link expansion and SSL verification enforced on all inbound barcode inputs.
          </div>
        </div>

      </div>

      {/* Malicious Domain Activity Table */}
      <div className="rounded-xl bg-shield-850 border border-shield-border overflow-hidden">
        <div className="p-5 border-b border-shield-border">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-rose-400" />
            Top Malicious Domains & Quishing C2 Nodes
          </h2>
          <p className="text-xs text-shield-muted mt-0.5">
            Repeatedly identified phishing hostnames extracted from physical and digital QR codes.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-sm">
            <thead className="bg-shield-900/90 text-[11px] uppercase tracking-wider text-shield-dim border-b border-shield-border">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Flagged Host / Domain</th>
                <th className="px-5 py-3.5 font-semibold">Category</th>
                <th className="px-5 py-3.5 font-semibold">Incident Detections</th>
                <th className="px-5 py-3.5 font-semibold">First Seen</th>
                <th className="px-5 py-3.5 font-semibold">Risk Score</th>
                <th className="px-5 py-3.5 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-shield-border text-xs">
              {DEMO_MALICIOUS_DOMAINS.map((item) => (
                <tr key={item.domain} className="hover:bg-shield-800/40 transition-colors">
                  <td className="px-5 py-4 font-semibold text-white">
                    {item.domain}
                  </td>
                  <td className="px-5 py-4 text-shield-muted">
                    <span className="px-2 py-0.5 rounded bg-shield-900 border border-shield-700 text-[11px]">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-shield-muted">
                    {item.detections} scans
                  </td>
                  <td className="px-5 py-4 text-shield-dim">
                    {item.firstSeen}
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-bold text-rose-400">
                      {item.risk}/100
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Badge status="DANGEROUS" size="sm" />
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
