export const APP_ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  SCANNER: '/scanner',
  URL_CHECKER: '/url-checker',
  HISTORY: '/history',
  THREAT_INTELLIGENCE: '/threat-intelligence',
  SECURITY_GUIDE: '/security-guide',
};

export const RISK_LEVELS = {
  SAFE: {
    label: 'Safe',
    color: 'emerald',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dotClass: 'bg-emerald-400',
    borderClass: 'border-emerald-500/30',
  },
  SUSPICIOUS: {
    label: 'Suspicious',
    color: 'amber',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dotClass: 'bg-amber-400',
    borderClass: 'border-amber-500/30',
  },
  DANGEROUS: {
    label: 'Dangerous',
    color: 'rose',
    badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    dotClass: 'bg-rose-400',
    borderClass: 'border-rose-500/30',
  },
};

// Clearly labelled demonstration data for the dashboard and history
export const DEMO_STATS = {
  totalScans: 1428,
  safeScans: 1184,
  suspiciousScans: 172,
  dangerousScans: 72,
  scansToday: 49,
  threatsBlockedToday: 6,
};

export const DEMO_SCAN_HISTORY = [
  {
    id: 'SCN-8092',
    date: '2026-11-14 18:42',
    url: 'https://verify-account-portal.auth-security-update.net/login',
    domain: 'auth-security-update.net',
    source: 'QR Camera Scan',
    riskScore: 94,
    status: 'DANGEROUS',
    threatType: 'Credential Phishing',
    redirects: 3,
  },
  {
    id: 'SCN-8091',
    date: '2026-11-14 17:15',
    url: 'https://menu.metro-bistro-downtown.com/fall-2026',
    domain: 'metro-bistro-downtown.com',
    source: 'QR Image Upload',
    riskScore: 8,
    status: 'SAFE',
    threatType: 'Clean Destination',
    redirects: 0,
  },
  {
    id: 'SCN-8090',
    date: '2026-11-14 16:30',
    url: 'http://tracking-fastdelivery-express.biz/parcel-id=98214',
    domain: 'tracking-fastdelivery-express.biz',
    source: 'Manual URL Entry',
    riskScore: 78,
    status: 'SUSPICIOUS',
    threatType: 'Fake Delivery Notification',
    redirects: 2,
  },
  {
    id: 'SCN-8089',
    date: '2026-11-14 15:02',
    url: 'https://conference.tech-innovations2026.org/agenda',
    domain: 'tech-innovations2026.org',
    source: 'QR Camera Scan',
    riskScore: 12,
    status: 'SAFE',
    threatType: 'Clean Destination',
    redirects: 1,
  },
  {
    id: 'SCN-8088',
    date: '2026-11-14 14:18',
    url: 'https://pay-parking-fee-quick.info/session/c7104a?gate=4',
    domain: 'pay-parking-fee-quick.info',
    source: 'QR Image Upload',
    riskScore: 91,
    status: 'DANGEROUS',
    threatType: 'Fake Parking Meter Payment Scam',
    redirects: 2,
  },
  {
    id: 'SCN-8087',
    date: '2026-11-14 12:45',
    url: 'https://rewards-bonus-claim.top/spin-win',
    domain: 'rewards-bonus-claim.top',
    source: 'QR Camera Scan',
    riskScore: 86,
    status: 'DANGEROUS',
    threatType: 'Lottery / Survey Scam',
    redirects: 4,
  },
  {
    id: 'SCN-8086',
    date: '2026-11-14 11:10',
    url: 'https://transit.cityauthority.gov/schedules/line-4',
    domain: 'cityauthority.gov',
    source: 'QR Camera Scan',
    riskScore: 4,
    status: 'SAFE',
    threatType: 'Verified Public Authority',
    redirects: 0,
  },
  {
    id: 'SCN-8085',
    date: '2026-11-14 09:32',
    url: 'https://short.link/xyz881?ref=promo_sticker',
    domain: 'short.link',
    source: 'QR Image Upload',
    riskScore: 54,
    status: 'SUSPICIOUS',
    threatType: 'Obfuscated Link Shortener',
    redirects: 2,
  },
];

export const DEMO_ANALYTICS_DATA = [
  { day: 'Mon', safe: 140, suspicious: 18, dangerous: 9 },
  { day: 'Tue', safe: 165, suspicious: 24, dangerous: 12 },
  { day: 'Wed', safe: 190, suspicious: 15, dangerous: 7 },
  { day: 'Thu', safe: 210, suspicious: 32, dangerous: 14 },
  { day: 'Fri', safe: 235, suspicious: 28, dangerous: 11 },
  { day: 'Sat', safe: 120, suspicious: 35, dangerous: 10 },
  { day: 'Sun', safe: 124, suspicious: 20, dangerous: 9 },
];

export const DEMO_THREAT_CATEGORIES = [
  { name: 'Credential Phishing', count: 48, percentage: 41, color: '#EF4444' },
  { name: 'Fake Payment Gateways', count: 29, percentage: 25, color: '#F97316' },
  { name: 'Malicious Redirections', count: 22, percentage: 19, color: '#F59E0B' },
  { name: 'Drive-by Downloads / Malware', count: 11, percentage: 9, color: '#DC2626' },
  { name: 'Social Engineering / Surveys', count: 7, percentage: 6, color: '#E11D48' },
];

export const DEMO_MALICIOUS_DOMAINS = [
  { domain: 'auth-security-update.net', detections: 24, firstSeen: '2 days ago', risk: 96, category: 'Phishing' },
  { domain: 'pay-parking-fee-quick.info', detections: 19, firstSeen: '4 days ago', risk: 92, category: 'Payment Fraud' },
  { domain: 'rewards-bonus-claim.top', detections: 15, firstSeen: '1 week ago', risk: 88, category: 'Scam' },
  { domain: 'bank-identity-reverification.cc', detections: 12, firstSeen: '3 days ago', risk: 98, category: 'Phishing' },
  { domain: 'express-delivery-check.click', detections: 9, firstSeen: '5 days ago', risk: 84, category: 'Smishing/Quishing' },
];
