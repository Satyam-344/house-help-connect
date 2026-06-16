# memory.md — House Help Connect Project Memory

> This file tracks all key decisions, resolved issues, architectural choices, and knowledge accumulated during this project's development. Update after every major milestone.

---

## Project Genesis
- **Started:** 2026-06-16
- **Owner:** Satyam (ishansri13.work@gmail.com)
- **Goal:** Full-stack MERN marketplace for home help workers
- **Inspiration:** Urban Company, Airbnb UI/UX standards
- **Deadline:** TBD

---

## Architecture Decisions

### Decision 1: Vite over CRA
- **Choice:** React + Vite (not Create React App)
- **Reason:** Faster HMR, smaller bundle, modern toolchain
- **Date:** 2026-06-16

### Decision 2: Redux Toolkit over Context API
- **Choice:** Redux Toolkit for global state
- **Reason:** Complex multi-role app with bookings, auth, notifications — Context would require too many nested providers
- **Date:** 2026-06-16

### Decision 3: Gemini API as primary AI
- **Choice:** Google Gemini API (gemini-1.5-flash) as primary
- **Reason:** Free tier available, fast responses, multimodal capability for future features
- **Fallback:** OpenAI GPT-4o-mini
- **Date:** 2026-06-16

### Decision 4: Cloudinary for image storage
- **Choice:** Cloudinary over AWS S3
- **Reason:** Free tier sufficient for MVP, simpler SDK, built-in transformations for worker photos
- **Date:** 2026-06-16

### Decision 5: Socket.io for real-time
- **Choice:** Socket.io for chat and notifications
- **Reason:** Widely supported, works with Express, handles reconnection automatically
- **Date:** 2026-06-16

### Decision 6: Render for backend hosting
- **Choice:** Render free tier (can upgrade)
- **Reason:** Easy Node.js deployment, GitHub integration, free SSL
- **Note:** Render free tier sleeps after 15 min inactivity — use paid plan for production
- **Date:** 2026-06-16

### Decision 7: Dual payment support
- **Choice:** Both Stripe (international) + Razorpay (India)
- **Reason:** Target market is India, Razorpay supports UPI/NetBanking. Stripe for international
- **Date:** 2026-06-16

---

## Credentials Tracker (DO NOT store actual values here — track what's been obtained)

| Service | Status | Notes |
|---------|--------|-------|
| MongoDB Atlas | ⬜ Pending | Need cluster URI |
| Cloudinary | ⬜ Pending | Need cloud_name, api_key, api_secret |
| Gemini API | ⬜ Pending | Need GEMINI_API_KEY from Google AI Studio |
| OpenAI API | ⬜ Pending | Optional fallback |
| Stripe | ⬜ Pending | Need publishable + secret key |
| Razorpay | ⬜ Pending | Need key_id + key_secret |
| Gmail SMTP | ⬜ Pending | Need app password |
| Google Maps API | ⬜ Pending | For nearby workers feature |
| Vercel Account | ⬜ Pending | For frontend deployment |
| Render Account | ⬜ Pending | For backend deployment |
| GitHub Repo | ⬜ Pending | Need repo URL |

---

## Feature Status Tracker

### Phase 1 — Foundation (MVP)
- [x] Project scaffolding (frontend + backend)
- [x] MongoDB models
- [x] JWT auth (register/login/role-based)
- [x] Worker listing with filters
- [x] Search page
- [x] Booking system (basic)
- [x] User dashboard
- [x] Worker dashboard
- [x] Admin dashboard (basic)

### Phase 2 — Core Features
- [ ] Reviews + ratings (backend done, UI partial)
- [x] Image upload (Cloudinary — backend done, form in WorkerSetup)
- [x] AI bio generator (Gemini — backend + frontend done in WorkerSetup)
- [ ] Notifications system — SKIPPED (post-MVP)

### Phase 3 — Advanced Features
- [ ] Smart recommendation engine
- [ ] Voice search
- [ ] Google Maps / nearby workers
- [ ] Dark mode
- [ ] Multilingual support (EN, HI, BN, TA, TE)
- [ ] OTP verification
- [ ] Referral system
- [ ] Coupon codes
- [ ] Email notifications
- [ ] Invoice generation

### Phase 4 — Deployment & CI/CD
- [ ] GitHub Actions setup
- [ ] Vercel frontend deploy
- [ ] Render backend deploy
- [ ] MongoDB Atlas production cluster
- [ ] Environment variables configured
- [ ] Domain setup (optional)

---

## Known Issues & Bugs

| ID | Description | Status | Resolved Date |
|----|-------------|--------|--------------|
| — | No issues yet | — | — |

---

## API Keys Location
- Backend keys → `backend/.env` (never commit)
- Frontend keys → `frontend/.env` (never commit)
- Both .env files listed in `.gitignore`

---

## Deployment URLs (fill when deployed)
- **Frontend (Vercel):** TBD
- **Backend (Render):** TBD
- **MongoDB Atlas:** TBD
- **Admin Panel:** TBD

---

## Important Notes
- Worker profiles require Admin approval before appearing in search
- Free Render tier sleeps after 15 min — use `/api/health` ping for uptime monitoring
- Gemini API free tier: 15 requests/min — implement debouncing on AI features
- Socket.io must share the same HTTP server as Express (not separate ports)
- Razorpay only works with Indian bank accounts for payouts
