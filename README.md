# QR Shield — Cybersecurity Platform (Frontend Foundation)

QR Shield is a cybersecurity web platform built to combat **Quishing** (QR code phishing), malicious redirect chains, and weaponized barcode infrastructure.

---

## Visual & Architecture Foundation

This stage establishes the complete frontend visual and routing architecture:
- **Design System:** Dark charcoal/near-black cybersecurity SaaS aesthetic with emerald security accents, amber warnings, and rose/red threat indicators.
- **State & Routing:** Full multi-page React Router v6 navigation with dedicated public site navigation and security console sidebar.
- **Analytics:** Integrated Recharts telemetry visualizations (scan frequency distribution, threat category breakdowns).
- **Responsive Layout:** Desktop, tablet, and mobile support.

---

## Pages & Routes

| Route | View Name | Description |
| :--- | :--- | :--- |
| `/` | **Landing Page** | Public front page with hero, SVG security scanner visual, feature showcase, 4-step protocol, and threat statistics. |
| `/dashboard` | **Security Overview** | Metrics cards (Total, Safe, Suspicious, Dangerous), 7-day scan frequency chart, recent scan activity log, and quick actions. |
| `/scanner` | **QR Scanner Studio** | Optical camera viewport placeholder with reticle, drag-and-drop file uploader visual, and operational instructions. |
| `/url-checker` | **URL Inspector** | Deep URL inspection form with sample payloads, security overview, and multi-hop redirect explanation. |
| `/history` | **Scan History** | Comprehensive audit log table with filter tabs (All, Safe, Suspicious, Dangerous), search, risk scores, and full report view modals. |
| `/threat-intelligence` | **Threat Intelligence** | Live telemetry counters, threat vector distribution donut chart, DEFCON level indicator, and malicious domain activity list. |
| `/security-guide` | **Security Guide** | Quishing educational handbook covering attack anatomies, payment scams, redirect cloaking, and 5 safety rules. |

---

## Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS 3.4
- **Routing:** React Router DOM 6
- **Icons:** Lucide React
- **Data Visualization:** Recharts

---

## Commands to Run

```bash
# Install dependencies (already executed)
npm install

# Start Vite local development server
npm run dev

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
