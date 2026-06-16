---
name: project-house-help-connect
description: House Help Connect MERN app — stack, architecture decisions, credential status, deployment targets
metadata:
  type: project
---

Full-stack MERN marketplace for hiring home help workers (Maids, Cooks, Nurses, Babysitters, etc.). Started 2026-06-16.

**Stack:** React (Vite) + Tailwind + Framer Motion + Redux Toolkit | Node/Express + MongoDB + Socket.io | Gemini AI | Cloudinary | Razorpay + Stripe

**Deployment:** Frontend → Vercel | Backend → Render | DB → MongoDB Atlas | CI/CD → GitHub Actions

**Why:** Inspired by Urban Company/Airbnb UX. Target market: India. Three roles: User, Worker, Admin.

**Key decisions:**
- Vite (not CRA), Redux Toolkit (not Context), Gemini API (primary AI), Cloudinary (not S3), Razorpay + Stripe (dual payment)
- Socket.io for real-time chat and notifications
- JWT in HTTP-only cookies (not localStorage)
- Soft delete for users (isDeleted flag, not actual delete)

**Phase roadmap:** Foundation MVP → Core Features → Advanced (AI, maps, voice) → Deployment

**How to apply:** When working on this project, check memory.md and logs.md in the project root for current credential status and feature progress.

[[feedback_purplle_project]]
