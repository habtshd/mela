# Mela Special Needs — Modern Pediatric Care & Management Platform

A modern, fully interactive, frontend-only web application and clinical management system built for **Mela Special Needs**.

This prototype combines the organization's public-facing family website and private management platform in one cohesive application. Designed specifically to present the proposed software to Mela's leadership and demonstrate its clinical, operational, and financial value.

---

## 🚀 Quick Start (Running Locally)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Open **`http://localhost:5173`** in your browser.

### 3. Production Build
```bash
npm run build
npm run preview
```

---

## 🎭 Live Presentation Personas (1-Click Switcher)

A persistent **Demo Bar** at the top of the interface enables the presenter to switch perspectives instantly during a live pitch:

1. **👑 Administrator (`Dr. Hanna Vance`)**
   - Access: `/dashboard`
   - Clinical director overview: live metrics, appointment volume charts, therapy specialty breakdown, recent center audit trail, child intake, staff rosters, billing balances, and reports.

2. **🩺 Therapist (`Michael Chen, MS, OTR/L`)**
   - Access: `/dashboard` & `/sessions`
   - Senior Pediatric Occupational Therapist view: personal daily caseload, appointment schedule, SOAP clinical note entry (Subjective, Objective, Assessment, Plan), and goal milestone updates.

3. **👨‍👩‍👧 Parent / Guardian (`Sarah Jenkins`)**
   - Access: `/parent`
   - Guardian of Liam Jenkins (Age 6, Autism Spectrum Support): upcoming sessions, attending therapist contact, live IEP goal mastery progress bars, shared therapist session notes, printable superbill receipts, simulated online payments, and direct messaging with the therapist.

---

## 🌟 Application Map & Key Features

### 🌐 Public Website
- **`/` — Homepage:** Compelling hero section, trust indicators (140+ empowered children, licensed specialists), care philosophy cards, featured therapy programs, and intake evaluation modals.
- **`/about` — About Mela:** Holistic pediatric vision, sensory-affirming clinical standards, and core values.
- **`/services` — Therapy & Services:** Deep-dive into Occupational Therapy, Speech & Language, ABA, Sensory Integration Gym, and Pediatric Physical Therapy with a 4-step roadmap from intake to home diet.
- **`/team` — Specialists:** Clinical profiles with board credentials (OTR/L, CCC-SLP, BCBA, DPT, Psy.D.), active caseloads, and direct contact options.
- **`/programs` — Group Activities & Clubs:** Weekend sensory explorer clubs, peer playmaker social groups, and school readiness cohorts.
- **`/gallery` — Sensory Architecture Tour:** Interactive photo tour and specifications of Sensory Gym Alpha, Speech Pods, and Snoezelen Multi-Sensory Lounges.
- **`/faq` — Parent FAQs:** Searchable and categorized accordion answers for referrals, superbills, evaluations, and IEP collaboration.
- **`/contact` — Contact & Intake Form:** Interactive intake form with real-time feedback toast, clinic hours, phone hotline, and facility location map.

### 🔐 Sign-In Experience
- **`/login` — Demo Authentication Simulation:** Realistic login screen with show/hide password, remember me, 1-click persona quick selection cards, and a functional password recovery simulation modal.

### 📊 Private Clinical Management Platform
- **`/dashboard` — Administrator Dashboard:** Metric cards (Children, Programs, Today's sessions, Staff, Outstanding revenue), weekly appointment volume bar chart, caseload specialty donut chart, today's appointment queue with check-in toggles, and real-time activity audit feed.
- **`/children` — Children Management:** Grid/Table directory with live search and filter by diagnosis, status, and therapist. Detailed child profile modal featuring emergency contacts, sensory triggers, IEP goals with progress %, appointment history, and full Add/Edit/Archive/Delete flows.
- **`/therapists` — Specialist Staff Directory:** Clinical profiles, weekly hours, room assignments, and assigned caseload lists.
- **`/appointments` — Scheduling & Calendar:** Multi-view calendar (**Week, Day, Month, List**) with date navigation, room filter, booking modal, and reschedule/cancellation flows.
- **`/sessions` — Therapy Sessions & SOAP Notes:** Standardized clinical notes (Subjective, Objective, Assessment, Plan), milestone markers, progress score metrics, and a **Printable Progress Report Preview** with clinic letterhead.
- **`/admin-programs` — Program & Cohort Admin:** Curriculum management, student enrollment progress bars, and capacity limits.
- **`/billing` — Billing & Invoices:** Superbill invoice directory, payment status indicators (Paid, Pending, Overdue), and a **Record Payment Demonstration** that updates balances in real-time.
- **`/reports` — Analytics & Reports:** Goal progress distribution, attendance retention curves, and a **Client-Side CSV Export** download for clinical audits.
- **`/settings` — Platform Preferences:** Center address, state license #, automated SMS/email reminder toggles, and a **Demo Data Reset** action.
- **`/parent` — Parent Portal:** Dedicated, personalized guardian experience strictly filtered to Liam Jenkins.

---

## 🛠️ Technology Stack

- **React 19 & TypeScript:** Strict typing for models (Children, Therapists, Appointments, Goals, Sessions, Invoices).
- **Vite:** High-performance local development and optimized production build.
- **Tailwind CSS:** Welcoming healthcare visual identity using teal, emerald, slate, and coral accents.
- **Lucide React:** High-fidelity clinical and operational icons.
- **Recharts:** Interactive bar charts, area charts, and donut charts.
- **LocalStorage State Engine:** Any newly added child, booked appointment, recorded payment, or updated session persists in the demo.
- **Demo Data Reset:** A single click resets the application to the pristine initial presentation state anytime.

---

## 🔒 Demo Privacy & Safety Notice

- All records, names, phone numbers, and clinical narratives are **fictional** samples created specifically for presentation purposes.
- Does not connect to live backend servers, external databases, or actual payment processors.
