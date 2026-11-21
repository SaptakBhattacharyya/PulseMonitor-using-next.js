# PulseMonitor

PulseMonitor is a full-stack website monitoring and uptime tracking platform built with Next.js (App Router), TypeScript, Tailwind CSS, Recharts, and MongoDB Atlas. It enables developers and teams to monitor API endpoints and websites in real time, record historical latency and HTTP status logs, track incidents, and visualize 7-day uptime performance through an intuitive dashboard.

---

## Features

- Real-Time Uptime Monitoring: Continuously pings configured HTTP/HTTPS endpoints with custom timeouts and intervals.
- Live Performance Analytics: Visualizes uptime percentages and 7-day latency trends using Recharts area charts and donut gauges.
- Incident Management System: Automatically identifies downtime, categorizes incident severity (Minor, Major, Critical), and logs resolution duration.
- Historical Check Logging: Persists every health check with status codes, latency in milliseconds, and error messages to MongoDB.
- Scheduled Automation: Features a secure cron API endpoint ready for triggers from cron-job.org or Vercel Cron.
- Instant Search and Filtering: Filter monitors by health status and search endpoints instantly from the dashboard.
- Responsive Interface: Designed with a modern, glassmorphic forest-and-cream aesthetic optimized for desktop, tablet, and mobile displays.

---

## Tech Stack

- Framework: Next.js 16 (App Router, React 19, Turbopack)
- Language: TypeScript
- Database: MongoDB Atlas
- Object Data Modeling: Mongoose
- Styling: Tailwind CSS
- Data Visualization: Recharts
- Iconography: Lucide React
- Schema Validation: Zod

---

## Repository Structure

```
PulseMonitor-using-next.js/
|-- README.md
|-- pulse-monitor/
    |-- app/
    |   |-- (dashboard)/
    |   |   |-- page.tsx
    |   |   |-- monitors/page.tsx
    |   |   |-- incidents/page.tsx
    |   |   |-- analytics/page.tsx
    |   |   |-- status-pages/page.tsx
    |   |   |-- settings/page.tsx
    |   |   |-- help/page.tsx
    |   |   |-- layout.tsx
    |   |-- api/
    |   |   |-- cron/check-monitors/route.ts
    |   |   |-- incidents/route.ts
    |   |   |-- monitors/
    |   |       |-- route.ts
    |   |       |-- check/route.ts
    |   |       |-- [id]/
    |   |           |-- route.ts
    |   |           |-- check/route.ts
    |   |-- layout.tsx
    |   |-- globals.css
    |-- components/
    |   |-- dashboard/
    |   |   |-- add-monitor-modal.tsx
    |   |   |-- monitors-table.tsx
    |   |   |-- recent-incidents.tsx
    |   |   |-- sidebar.tsx
    |   |   |-- stats-card.tsx
    |   |   |-- topbar.tsx
    |   |   |-- uptime-section.tsx
    |   |-- providers/
    |       |-- monitor-provider.tsx
    |-- context/
    |   |-- MonitorContext.tsx
    |-- lib/
    |   |-- mongodb.ts
    |   |-- monitor-data.ts
    |   |-- monitor-service.ts
    |   |-- monitoring-engine.ts
    |-- models/
    |   |-- Incident.ts
    |   |-- Monitor.ts
    |   |-- MonitoringLog.ts
    |-- package.json
    |-- tsconfig.json
    |-- next.config.ts
```

---

## Getting Started

### Prerequisites

- Node.js version 20.x or higher
- npm or yarn package manager
- A MongoDB Atlas cluster or local MongoDB instance

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SaptakBhattacharyya/PulseMonitor-using-next.js.git
   cd PulseMonitor-using-next.js/pulse-monitor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file inside the `pulse-monitor` directory:
   ```env
   # MongoDB Connection String
   MONGODB_URI=your_mongodb_connection_string

   # Secret token for scheduled cron executions
   CRON_SECRET=your_secure_cron_secret_token
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## API Reference

### Monitors API

- `GET /api/monitors`: Retrieve all monitors sorted by creation date.
- `POST /api/monitors`: Create and save a new monitor to the database.
- `PATCH /api/monitors/:id`: Update existing monitor settings (name, URL, interval, status).
- `DELETE /api/monitors/:id`: Delete a monitor and remove it from database tracking.
- `POST /api/monitors/check`: Validate and test reachability of a URL before adding.
- `POST /api/monitors/:id/check`: Execute an immediate on-demand health check for a monitor and record log history.

### Incidents API

- `GET /api/incidents`: Fetch all logged incidents.
- `GET /api/incidents?status=Ongoing`: Fetch active unresolved incidents.
- `GET /api/incidents?status=Resolved`: Fetch resolved incident history.
- `GET /api/incidents?severity=Critical`: Filter incidents by severity level (Minor, Major, or Critical).

### Cron Monitoring API

- `GET /api/cron/check-monitors`: Authenticated endpoint triggered by background cron schedulers to test all active monitors and update records. Requires `Authorization: Bearer <CRON_SECRET>` header.

---

## Deployment to Vercel

1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click "Import Project".
3. Select your `PulseMonitor-using-next.js` repository.
4. Set the **Root Directory** to `pulse-monitor`.
5. Under **Environment Variables**, provide:
   - `MONGODB_URI`
   - `CRON_SECRET`
6. In MongoDB Atlas, ensure **Network Access** allows connections from anywhere (`0.0.0.0/0`).
7. Click **Deploy**.

---

## License

This project is licensed under the MIT License.
