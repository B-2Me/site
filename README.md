
# BTWO.ME Portfolio: Digital Architecture

**Status:** Phase 2 Complete (Logic, Integrations, & Domain Live)
**Architecture:** Static Frontend (GitHub Pages) + Edge Backend (Supabase)
**Design Theme:** "The Blueprint" (Technical, Schematic, Structural)
**Live Site:** [btwo.me](https://btwo.me)

## 📋 Project Overview

`BTWO.ME` is a "Headless" portfolio that uses **GitHub Repositories as the CMS**. It is designed to be low-maintenance, high-performance, and architecturally transparent.

### The Tech Stack

* **Frontend:** Next.js 16 (App Router)
* **Hosting:** GitHub Pages (Static Export) on Apex Domain
* **Database:** Supabase (PostgreSQL)
* **Backend Logic:** Supabase Edge Functions (Deno)
* **Email Infrastructure:** Resend (via `contact` subdomain)
* **Scheduling:** Cal.com (Embedded React)
* **Styling:** Tailwind CSS + Lucide Icons
* **State Management:** TanStack Query

---

## ⚖️ Architectural Decisions & Trade-offs

We chose a **Static + Edge** architecture to balance cost, performance, and complexity.

| Decision | The Benefit | The Trade-off | The Solution |
| --- | --- | --- | --- |
| **GitHub Pages** | Free, infinite scaling, 100% uptime. | No server-side runtime. | Use **Supabase Edge Functions** for logic. |
| **GitHub as CMS** | Code is content; no manual blog writing. | API Rate Limits & Private Repos. | **Edge Scraper** with Personal Access Token (PAT). |
| **Subdomain Email** | Isolates domain reputation (`contact.btwo.me`). | Requires DNS config. | **Resend** mapped to subdomain + Reply-To logic. |
| **Client-Side Admin** | Simple "Access Key" gate for `/console`. | Not cryptographic security. | Acceptable for triggering public sync functions. |

---

## 🔐 Configuration: Variables & Secrets

This project relies on a specific set of keys distributed across the Frontend (Next.js), the CI/CD Pipeline (GitHub), and the Backend (Supabase).

### 1. Local / Frontend Variables (`.env.local`)

*These are built into the static HTML. Do not store sensitive backend keys here.*

```bash
# Connection to Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# The "Password" to unlock the /console page
NEXT_PUBLIC_ADMIN_KEY="your-secret-session-password"

```

### 2. GitHub Repository Secrets

*Required for the Build Pipeline to function.*
> Go to: Settings $\rightarrow$ Secrets and variables $\rightarrow$ Actions.

| Secret Name | Value |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Same as local |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same as local |
| `NEXT_PUBLIC_ADMIN_KEY` | Same as local (Ensures Console works in Prod) |

### 3. Supabase Edge Secrets

*These live securely on the server side. Used by Deno functions.*
Set these using the CLI: `npx supabase secrets set KEY=VALUE`

| Secret Name | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | A GitHub Personal Access Token (Classic) with `repo` scope. Allows the scraper to see private repos. |
| `RESEND_API_KEY` | API Key from Resend.com. Allows the `send-email` function to dispatch messages. |

---

## 🏗️ 1. Installation & Setup

### Step A: System Requirements

* Node.js 20+
* Supabase CLI (`npm install -g supabase`)
* Docker (Optional, for local backend testing)

### Step B: Install All Dependencies

Run this command to install the core framework plus all integrations added during development:

```bash
npm install @supabase/supabase-js @tanstack/react-query @calcom/embed-react lucide-react clsx tailwind-merge

```

### Step C: Asset Handling (Custom Domain vs. GitHub Subdomain)

**Configuration (`next.config.ts`):**

We use an empty `repoName` because we are hosting on a custom domain (`btwo.me`). If you were to revert to `username.github.io/repo`, you would need to populate the `repoName` string.

```typescript
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = ''; // Ensure this matches your repo name IF using default GitHub Pages URL

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? repoName : '',
  assetPrefix: isProd ? repoName : '',
  images: {
    unoptimized: true,
  },
  // Inject build timestamp
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

export default nextConfig;

```

### Step D: Exclude Edge Functions (`tsconfig.json`)

To prevent Next.js from trying to compile Deno code (which causes build failures), we must exclude the `supabase` folder.

```json
{
  "compilerOptions": { ... },
  "exclude": ["node_modules", "supabase"]
}

```

---

## ⚡ 2. Backend Architecture (Edge Functions)

We use **Supabase Edge Functions** to bridge the gap between our static frontend and third-party APIs.

### Function A: `sync-projects`

* **Trigger:** Manual button press in `/console` or Cron Job.
* **Logic:** Fetches `GITHUB_TOKEN`, scrapes repos with topic `showcase-b2me` (public & private), and updates the database cache.

### Function B: `send-email`

* **Trigger:** Contact Form on the home page.
* **Logic:**
1. **Honeypot Check:** Checks a hidden `phone_number` field. If filled (by a bot), returns 200 OK but sends nothing.
2. **Dispatch:** Uses `RESEND_API_KEY` to email the site owner.
3. **Identity:** Sends from `system@contact.btwo.me` but sets `Reply-To` as the visitor's email.



---

## 💾 3. Database Schema

Run this in the Supabase **SQL Editor** to create the caching layer.

```sql
-- 1. Project Cache Table (Stores GitHub JSON)
create table project_cache (
  id bigint generated by default as identity primary key,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  repo_data jsonb not null
);

-- 2. Security (RLS)
alter table project_cache enable row level security;

-- 3. Policy: Public Read (Frontend can read cache)
create policy "Public Read Access" on project_cache for select using ( true );

-- 4. Policy: System Update (Only Edge Functions can write)
create policy "System Update" on project_cache for all using ( auth.role() = 'service_role' );

```

---

## 🖥️ 4. Key Frontend Features

### The Command Console (`/console`)

A hidden administrative route.

* **Gatekeeper:** Checks if user input matches `NEXT_PUBLIC_ADMIN_KEY`.
* **Function:** Provides a UI to view system logs and manually trigger the `sync-projects` Edge Function without needing CLI access.

### The Scheduler (Cal.com)

* **Integration:** Uses `@calcom/embed-react`.
* **Trigger:** The "Initialize Sync" buttons in the Services section trigger a modal popup.
* **UX:** Keeps the user on the site while booking.

### The Spam Trap (Honeypot)

* **Implementation:** The Contact form includes a hidden input named `phone_number`.
* **Defense:** CSS hides this from humans (`class="hidden"`). Bots scanning HTML will fill it. The backend silently rejects any request where this field is not empty.

---

## 🏷️ 5. CMS Strategy: GitHub Topics

Repositories are controlled via **GitHub Topics**. The Edge Function looks for specific tags to categorize and display your work.

**Adding Topics:** Go to your Repo  About (Gear Icon)  Topics.

### 1. The Triggers (Must Have)

| Tag | Purpose | Behavior |
| --- | --- | --- |
| `showcase-b2me` | **Ingestion Trigger** | **REQUIRED.** The scraper IGNORES any repo without this tag. |
| `featured-b2me` | **Hero Placement** | Pins the repo to the "Featured" section (Top of Grid). |

### 2. Lifecycle Stage (`stage-*`)

*Defines the current state of the project's existence.*

| Tag | Phase | Visual / Behavior |
| --- | --- | --- |
| `stage-planning` | Blueprint | Repo exists but is in research/design phase. |
| `stage-developing` | Construction | Active work. Displays "WIP" warning or yellow badge. |
| `stage-maintaining` | Production | Feature-complete & stable (LTS). Displays green "Stable" badge. |
| `stage-deprecated` | End-of-Life | No longer supported. Displays as greyed out/archived. |

### 3. Target Platform (`arch-*`)

*Defines the hardware or environment the software is built for.*

| Tag | Concept | Example Use Case |
| --- | --- | --- |
| `arch-embedded` | Hardware/IoT | Raspberry Pi, Arduino, Custom PCBs, Firmware. |
| `arch-mobile` | Handheld | iOS, Android, React Native, Flutter. |
| `arch-desktop` | Workstation | Electron, Tauri, Native Windows/Linux apps. |
| `arch-web` | Browser | Next.js, React, WebAssembly. |
| `arch-cli` | Terminal | Command line tools, Scripts, Daemons. |

### 4. Tech Stack (Standard Tags)

*We use standard GitHub language tags for filtering (no prefix needed).*

* `nextjs`, `python`, `golang`, `typescript`, `docker`, `kubernetes`

---

## 🔐 6. Authentication: The "Access Key" System (Phase 3 Spec)

We use a **"Wallet-First"** identity model. The user is identified by a cryptographic key (Access Key), not necessarily an email.

### The Logic

1. **Guest Arrival:** User is anonymous.
2. **Account Creation:** System generates a random 32-byte hex string (The "Access Key").
* *Under the hood:* We create a Supabase User (Anonymous) and store this Key in their `user_metadata`.


3. **Login:** User pastes their Access Key.
* *Action:* We call a Supabase Edge Function `verify-key`. It searches for the user with that key in metadata and issues a Session Token.



### The Recovery Mechanism

Since losing the Access Key means losing the account, we offer a "Link Method."

* **Feature:** "Secure my Account."
* **Action:** User provides an Email.
* **Logic:** We upgrade the Supabase Anonymous User to an Authenticated User (Email/Password).
* **Result:** User can now login with **EITHER** the Access Key (Legacy) **OR** Email/Password (Recovery).

---

## 🎨 7. Design System: "The Digital Architect"

**Visual Identity:** Structural, schematic, transparent.

* **Primary Color:** Blueprint Blue (`#0047AB` or dark slate).
* **Accent:** Neon Cyan (Energy/Active states).
* **Typography:**
* *Headers:* Monospace (Courier Prime, Roboto Mono) - Technical feel.
* *Body:* Inter / San Francisco - Readability.


* **Imagery:**
* **Concept:** The "Coronado Bridge" (San Diego) rendered as a schematic blueprint.
* **Prompt Keyword:** *“Coronado bridge San Diego, architectural blueprint style, cyan lines on dark blue grid paper, circuit board traces integration, technical annotations.”*



---

## 💻 8. Development Workflows & Testing

We utilize three distinct environments to ensure stability.

### A. The "Hybrid" Workflow (Speed Mode)

*Best for: Daily frontend development, UI tweaks.*

* **Concept:** Local Frontend connects to Live Development Database.
* **Pros:** Zero setup, instant start.
* **Cons:** Risky (modifying live dev data).
* **Command:** `npm run dev`
* **Config:** `.env.local` points to `NEXT_PUBLIC_SUPABASE_URL` (Cloud).

### B. The "Local-First" Workflow (Safety Mode)

*Best for: Backend logic, database migrations, offline work.*

* **Concept:** Run the entire stack (DB + Auth + Edge) inside Docker on your laptop.
* **Pros:** 100% safe, no internet required, realistic Edge testing.
* **Cons:** Requires Docker running.

**Setup Instructions:**

1. **Install Docker Desktop.**
2. **Initialize:** `npx supabase init`
3. **Start Stack:** `npx supabase start` (Spins up local instance at `localhost:54321`)
4. **Sync Schema:** `npx supabase db pull` (Downloads cloud schema to local file).
5. **Switch Context:** Update `.env.local` to point to `http://127.0.0.1:54321`.

### C. The Deployment Pipeline (Production)

* **Trigger:** Push to `main` branch.
* **Action:** GitHub Action builds static HTML and deploys to `btwo.me`.
* **Config:** See Step 1D.

---

## 🗺️ 9. Feature Roadmap

### Phase 1: Infrastructure (Complete)

* [x] Next.js Clean Build
* [x] Supabase Project Setup
* [x] CI/CD Pipeline & Custom Domain (`btwo.me`)

### Phase 2: Logic & Integration (Complete)

* [x] **Edge Function:** `sync-projects` (Private Repo Support added).
* [x] **Admin Console:** Secure client-side gate for triggers.
* [x] **Communication:** Resend Integration with Subdomain (`contact.btwo.me`) & Spam Protection.
* [x] **Service Integration:** Services list connected to Cal.com modal.

### Phase 3: User Accounts (Future)

* [ ] **Configuration Abstraction:** Move site-specific strings (Cal.com handles, Brand names, Repo paths) to Environment Variables for easier portability.
* [ ] **Access Key Auth:** Implement the generation/login flow (Wallet-First identity).
* [ ] **Recovery:** Add "Link Email" functionality to secure the Access Key.
* [ ] **Business Cards:** Physical cards with QR code mapping to the landing page.
