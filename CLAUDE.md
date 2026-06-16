# CLAUDE.md — House Help Connect

## Project Identity
- **Name:** House Help Connect
- **Type:** Full-Stack MERN Web Application
- **Purpose:** Marketplace platform to find, book, and manage home help workers (Maids, Cooks, Nurses, Babysitters, Caretakers, Drivers, Gardeners, etc.)
- **Owner:** Satyam
- **Contact:** ishansri13.work@gmail.com

---

## Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| React.js (Vite) | UI framework |
| React Router DOM v6 | Client-side routing |
| Tailwind CSS v3 | Styling |
| Framer Motion | Animations |
| Axios | HTTP client |
| Redux Toolkit | Global state management |
| React Hook Form | Form handling |
| Socket.io-client | Real-time chat & notifications |
| Chart.js + react-chartjs-2 | Admin analytics |
| React Toastify | Toast notifications |
| React DatePicker | Date/time picking |
| Cloudinary (via SDK) | Image hosting |

### Backend
| Tool | Purpose |
|------|---------|
| Node.js + Express.js | API server |
| MongoDB + Mongoose | Database |
| JWT (jsonwebtoken) | Authentication |
| Bcryptjs | Password hashing |
| Multer | File upload middleware |
| Cloudinary SDK | Cloud image storage |
| Socket.io | Real-time events |
| Nodemailer | Email notifications |
| Stripe / Razorpay | Payment processing |
| Express Validator | Input validation |
| Cors, Helmet, Morgan | Security & logging middleware |
| Dotenv | Environment variables |

### AI Features (ONE feature — MVP scope)
| Tool | Purpose |
|------|---------|
| Google Gemini API (gemini-1.5-flash) | AI-generated worker bio on profile creation |

### Skipped (post-MVP)
- Socket.io (real-time chat/notifications)
- Redux Toolkit → using Context API
- Google Maps API
- Razorpay / Stripe payments
- Complex recommendation systems
- Real-time notifications
- Multilingual support

### DevOps / CI/CD
| Tool | Purpose |
|------|---------|
| GitHub | Version control |
| Vercel | Frontend deployment |
| Render | Backend deployment |
| MongoDB Atlas | Cloud database |
| GitHub Actions | CI/CD pipeline |

---

## Folder Structure

```
house-help-connect/
├── frontend/                        # React Vite app
│   ├── public/
│   ├── src/
│   │   ├── assets/                  # Images, icons, fonts
│   │   ├── components/              # Reusable UI components
│   │   │   ├── common/              # Navbar, Footer, Sidebar, Modal, Button
│   │   │   ├── cards/               # WorkerCard, BookingCard, ReviewCard
│   │   │   ├── forms/               # LoginForm, BookingForm, ReviewForm
│   │   │   ├── loaders/             # SkeletonLoader, Spinner
│   │   │   ├── chat/                # ChatBox, ChatBubble, AIChatbot
│   │   │   └── dashboard/           # StatCard, ChartWrapper, DataTable
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── WorkerProfile.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   └── ResetPassword.jsx
│   │   │   ├── user/
│   │   │   │   ├── UserDashboard.jsx
│   │   │   │   ├── MyBookings.jsx
│   │   │   │   ├── Favorites.jsx
│   │   │   │   ├── Notifications.jsx
│   │   │   │   ├── UserProfile.jsx
│   │   │   │   └── Settings.jsx
│   │   │   ├── worker/
│   │   │   │   ├── WorkerDashboard.jsx
│   │   │   │   ├── WorkerProfile.jsx
│   │   │   │   ├── Availability.jsx
│   │   │   │   ├── BookingRequests.jsx
│   │   │   │   ├── Earnings.jsx
│   │   │   │   └── WorkerSettings.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── ManageUsers.jsx
│   │   │       ├── ManageWorkers.jsx
│   │   │       ├── ManageBookings.jsx
│   │   │       └── ManageReviews.jsx
│   │   ├── store/                   # Redux Toolkit slices
│   │   │   ├── store.js
│   │   │   ├── authSlice.js
│   │   │   ├── workerSlice.js
│   │   │   ├── bookingSlice.js
│   │   │   └── notificationSlice.js
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── utils/                   # Helper functions
│   │   ├── services/                # Axios API service calls
│   │   │   ├── api.js               # Axios instance
│   │   │   ├── authService.js
│   │   │   ├── workerService.js
│   │   │   ├── bookingService.js
│   │   │   └── aiService.js
│   │   ├── context/                 # Socket context, Theme context
│   │   ├── constants/               # App constants, category list
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/                         # Express.js API
│   ├── config/
│   │   ├── db.js                    # MongoDB connection
│   │   ├── cloudinary.js            # Cloudinary setup
│   │   └── socket.js                # Socket.io setup
│   ├── models/
│   │   ├── User.js
│   │   ├── Worker.js
│   │   ├── Admin.js
│   │   ├── Booking.js
│   │   ├── Review.js
│   │   ├── Payment.js
│   │   ├── Notification.js
│   │   ├── Chat.js
│   │   ├── Message.js
│   │   ├── Favorite.js
│   │   └── Coupon.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── workerController.js
│   │   ├── bookingController.js
│   │   ├── reviewController.js
│   │   ├── paymentController.js
│   │   ├── notificationController.js
│   │   ├── chatController.js
│   │   ├── adminController.js
│   │   └── aiController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── workerRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── paymentRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── adminRoutes.js
│   │   └── aiRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verify
│   │   ├── roleMiddleware.js        # Role-based access
│   │   ├── uploadMiddleware.js      # Multer + Cloudinary
│   │   ├── errorMiddleware.js       # Global error handler
│   │   └── rateLimiter.js           # API rate limiting
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── sendEmail.js
│   │   ├── aiHelper.js              # Gemini API calls
│   │   └── pagination.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .github/
│   └── workflows/
│       ├── frontend-deploy.yml      # Vercel CI/CD
│       └── backend-deploy.yml       # Render CI/CD
│
├── CLAUDE.md                        # This file
├── memory.md                        # Project memory/knowledge base
├── logs.md                          # Development log
└── rules.md                         # Coding standards
```

---

## Roles & Permissions

| Action | User | Worker | Admin |
|--------|------|--------|-------|
| Browse workers | ✅ | ✅ | ✅ |
| Book a worker | ✅ | ❌ | ❌ |
| Accept/reject bookings | ❌ | ✅ | ✅ |
| Write reviews | ✅ | ❌ | ❌ |
| Approve worker profiles | ❌ | ❌ | ✅ |
| View analytics | ❌ | ❌ | ✅ |
| Block users | ❌ | ❌ | ✅ |
| AI chatbot | ✅ | ✅ | ✅ |

---

## Database Models (Summary)

- **User:** name, email, password, phone, avatar, role, location, favorites[], bookings[], isVerified
- **Worker:** userId, category, skills[], languages[], experience, hourlyRate, availability{}, photos[], rating, totalReviews, bio, isApproved, isVerified, earnings
- **Booking:** userId, workerId, date, time, hours, address, notes, status[pending/accepted/completed/cancelled], paymentMethod, amount
- **Review:** userId, workerId, bookingId, rating, comment, aiSummary
- **Payment:** bookingId, userId, workerId, amount, method, status, transactionId, invoice
- **Notification:** userId, type, message, isRead, createdAt
- **Chat:** participants[], lastMessage, updatedAt
- **Message:** chatId, senderId, text, timestamp, isRead
- **Favorite:** userId, workerId
- **Coupon:** code, discount, expiryDate, usageLimit, usedCount

---

## API Endpoints Summary

### Auth
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/forgot-password
- POST /api/auth/reset-password/:token
- POST /api/auth/verify-otp

### Workers
- GET /api/workers (search + filter + pagination)
- GET /api/workers/:id
- POST /api/workers/create
- PUT /api/workers/:id
- DELETE /api/workers/:id

### Bookings
- POST /api/bookings
- GET /api/bookings/user
- GET /api/bookings/worker
- PUT /api/bookings/:id/status
- DELETE /api/bookings/:id

### Reviews
- POST /api/reviews
- GET /api/reviews/worker/:workerId
- GET /api/reviews/summary/:workerId (AI summary)

### AI
- POST /api/ai/chat
- POST /api/ai/recommend
- POST /api/ai/generate-bio
- POST /api/ai/summarize-reviews
- POST /api/ai/voice-search

### Admin
- GET /api/admin/dashboard
- GET /api/admin/users
- GET /api/admin/workers
- PUT /api/admin/workers/:id/approve
- DELETE /api/admin/users/:id

---

## Environment Variables Required

### Backend (.env)
```
PORT=5000
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GEMINI_API_KEY=
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASS=
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=
VITE_STRIPE_PUBLISHABLE_KEY=
VITE_RAZORPAY_KEY_ID=
VITE_GEMINI_API_KEY=
VITE_GOOGLE_MAPS_API_KEY=
```

---

## CI/CD Pipeline

### Frontend → Vercel
- Trigger: push to `main` branch
- Build: `npm run build` in `/frontend`
- Output: `dist/`
- Auto-deploy on merge

### Backend → Render
- Trigger: push to `main` branch
- Build: `npm install` in `/backend`
- Start: `node server.js`
- Health check: `GET /api/health`

### Database → MongoDB Atlas
- M0 Free tier (dev) → M10+ (prod)
- IP Whitelist: 0.0.0.0/0 for Render

---

## Coding Conventions
- See `rules.md` for full details
- Component names: PascalCase
- File names: camelCase for utils, PascalCase for components
- API routes: kebab-case
- Environment variables: UPPER_SNAKE_CASE
- No hardcoded secrets in code — always use .env

---

## What Claude Must NOT Do
- Never commit .env files
- Never hardcode API keys
- Never break existing routes without updating all consumers
- Never skip input validation on API endpoints
- Never expose password fields in API responses
- Never use `var` — use `const`/`let` only
- Never write inline styles when Tailwind class exists
