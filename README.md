# House Help Connect

A full-stack marketplace web application to find, book, and manage home help workers — Maids, Cooks, Nurses, Babysitters, Caretakers, Drivers, Gardeners, and more.

**Live Demo:** [https://frontend-alpha-gules-82.vercel.app](https://frontend-alpha-gules-82.vercel.app)

---

## Features

### For Customers
- Browse and search workers by category, city, rating, price, and experience
- View detailed worker profiles with photos, skills, availability, and reviews
- Book workers with date, time, and duration
- Save favorites and manage bookings
- User dashboard with booking history

### For Workers
- Create a professional profile with photos and skills
- AI-generated bio using Google Gemini API
- Manage availability and booking requests
- Accept, reject, or complete bookings
- Earnings dashboard

### For Admins
- Approve or reject worker profiles
- Manage all users, workers, and bookings
- Platform analytics dashboard
- Block/unblock users

---

## Tech Stack

**Frontend**
- React.js (Vite) + React Router v6
- Tailwind CSS + Framer Motion
- Axios + React Hook Form
- Context API for state management

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (image storage)
- Google Gemini API (AI bio generation)
- Multer (file uploads)

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- Google AI Studio account (for Gemini API)

### Clone the Repository

```bash
git clone https://github.com/Satyam-344/house-help-connect.git
cd house-help-connect
```

### Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## Project Structure

```
house-help-connect/
├── frontend/          # React + Vite app
│   └── src/
│       ├── pages/     # Route-level components
│       ├── components/# Reusable UI components
│       ├── services/  # Axios API calls
│       ├── context/   # Auth context
│       └── utils/     # Helper functions
│
└── backend/           # Express.js API
    ├── controllers/   # Route handlers
    ├── models/        # Mongoose schemas
    ├── routes/        # API routes
    ├── middleware/     # Auth, upload, error handling
    └── utils/         # Token, email, AI helpers
```

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user or worker |
| POST | `/api/auth/login` | Login |
| GET | `/api/workers` | Search workers with filters |
| GET | `/api/workers/:id` | Get worker profile |
| POST | `/api/bookings` | Create booking |
| PUT | `/api/bookings/:id/status` | Update booking status |
| POST | `/api/ai/generate-bio` | AI worker bio generation |
| GET | `/api/admin/dashboard` | Admin analytics |

---

## Database Models

- **User** — Authentication, profile, roles (user/worker/admin)
- **Worker** — Category, skills, availability, earnings, rating
- **Booking** — Status lifecycle: pending → accepted → completed
- **Review** — Rating + comment, auto-updates worker average rating
- **Favorite** — User-saved workers
- **Notification** — In-app alerts

---

## Deployment

### Backend (Render)
The `render.yaml` in the repo root auto-configures the Render web service. Set the required environment variables in the Render dashboard.

### Frontend (Vercel)
The `frontend/vercel.json` handles SPA routing rewrites. Set `VITE_API_URL` to your backend URL in Vercel environment variables.

### Create Admin Account
After deploying, run:
```bash
cd backend
node scripts/makeAdmin.js your@email.com
```

---

## Screenshots

| Landing Page | Search | Worker Profile |
|---|---|---|
| Browse categories and search workers | Filter by category, city, rating | View profile, book, leave reviews |

---

## License

MIT License — feel free to use this project for learning or personal use.

---

**Developer:** Satyam Srivastava  
**Contact:** ishansri13.work@gmail.com  
**GitHub:** [Satyam-344](https://github.com/Satyam-344)
