# rules.md — House Help Connect Coding Standards & Rules

> These rules apply to ALL code written for this project. Claude must follow these exactly. Satyam reviews all code against these standards.

---

## 1. General Rules

- **Language:** JavaScript (ES6+). No TypeScript unless explicitly requested.
- **No `var`:** Always use `const` or `let`.
- **Arrow functions** preferred over `function` declarations in components and callbacks.
- **Async/Await** over `.then().catch()` chains.
- **No inline styles** — use Tailwind classes exclusively on frontend.
- **No hardcoded secrets** — all sensitive values go in `.env`.
- **No console.log in production** — use a logger utility (morgan on backend).
- **All inputs validated** on both frontend (React Hook Form) and backend (express-validator).

---

## 2. File & Folder Naming

| Type | Convention | Example |
|------|-----------|---------|
| React Components | PascalCase | `WorkerCard.jsx` |
| Pages | PascalCase | `UserDashboard.jsx` |
| Hooks | camelCase with `use` prefix | `useAuth.js` |
| Services | camelCase | `workerService.js` |
| Utils | camelCase | `generateToken.js` |
| Backend routes | camelCase | `workerRoutes.js` |
| Backend models | PascalCase | `Worker.js` |
| Backend controllers | camelCase | `workerController.js` |
| Constants | UPPER_SNAKE_CASE | `WORKER_CATEGORIES` |

---

## 3. React / Frontend Rules

- **One component per file.** No multi-component files.
- **Functional components only.** No class components.
- **Props destructured** in function signature: `const Card = ({ title, image }) => {}`
- **Default exports** for pages and components.
- **Named exports** for utilities and hooks.
- **Custom hooks** for reusable logic (data fetching, form handling, socket events).
- **Redux Toolkit** for global state — no prop drilling beyond 2 levels.
- **React Hook Form** for all forms — no uncontrolled inputs.
- **Axios instance** from `services/api.js` — never call `fetch()` directly.
- **Error boundaries** on all dashboard pages.
- **Lazy loading** with `React.lazy` + `Suspense` for all page-level components.
- **Loading states** must use skeleton loaders, not spinners alone.

### Tailwind Rules
- Use **responsive prefixes** (`sm:`, `md:`, `lg:`, `xl:`) for all layout properties.
- Mobile-first design — base styles are for mobile, scale up with prefixes.
- **Glassmorphism** pattern: `bg-white/10 backdrop-blur-md border border-white/20`
- **Gradient text:** `bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent`
- Custom colors defined in `tailwind.config.js` under `extend.colors`.

### Animation Rules (Framer Motion)
- Use `motion.div` variants for page transitions.
- Stagger children animations with `staggerChildren` in parent variant.
- Keep animation durations between `0.2s` and `0.6s`.
- Use `whileHover` and `whileTap` for interactive elements.
- All cards must have hover lift effect: `whileHover={{ y: -4, scale: 1.02 }}`

---

## 4. Backend Rules

- **MVC pattern strictly:** routes → controllers → models. No business logic in routes.
- **Async error handling:** wrap all async controller functions in try/catch or use `express-async-handler`.
- **Global error middleware** must be the last middleware in `server.js`.
- **Never expose `password`** field in any API response — always `.select('-password')`.
- **Paginate all list endpoints** — never return unlimited arrays.
- **Rate limiting** on auth endpoints (max 5 requests/15 min).
- **CORS** configured for specific origins only (no wildcard in production).
- **Helmet** enabled for HTTP security headers.
- **Input sanitization** on all user-provided data before DB write.

### API Response Format
All API responses must follow this format:
```json
{
  "success": true,
  "message": "Workers fetched successfully",
  "data": { ... },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Worker not found",
  "error": "Not Found"
}
```

### HTTP Status Codes
| Scenario | Code |
|----------|------|
| Success | 200 |
| Created | 201 |
| Bad Request | 400 |
| Unauthorized | 401 |
| Forbidden | 403 |
| Not Found | 404 |
| Server Error | 500 |

---

## 5. Authentication Rules

- **JWT in HTTP-only cookies** (not localStorage) for security.
- Access token expires: **7 days**.
- Refresh token expires: **30 days**.
- All protected routes must use `authMiddleware.js`.
- Role-based routes must use `roleMiddleware.js` after `authMiddleware.js`.
- Passwords hashed with **bcrypt, salt rounds = 12**.
- OTP expires in **10 minutes**.
- Password reset token expires in **1 hour**.

---

## 6. Database Rules

- **All Mongoose schemas** must have `timestamps: true`.
- **Required fields** explicitly marked in schema.
- **Indexes** on frequently queried fields: `email`, `category`, `location`, `rating`.
- **Populate** only needed fields — use `.select()` to limit projection.
- **Never delete** user/worker records — use `isDeleted: true` soft delete.
- **Transactions** for multi-document writes (booking + payment together).

---

## 7. Git & Version Control Rules

- **Branch naming:**
  - Features: `feature/worker-profile`
  - Bugfixes: `fix/booking-status`
  - Hotfixes: `hotfix/auth-token`
  - Releases: `release/v1.0.0`
- **Commit message format:**
  ```
  feat: add worker profile page
  fix: resolve booking status update bug
  chore: update dependencies
  docs: update API documentation
  style: fix navbar responsive layout
  refactor: move auth logic to middleware
  ```
- **Never commit:**
  - `.env` files
  - `node_modules/`
  - `dist/` or `build/`
  - `.DS_Store`
  - API keys or secrets

---

## 8. Security Rules

- **SQL/NoSQL Injection:** Use Mongoose's built-in type casting — never build queries with string concatenation.
- **XSS:** Sanitize all user inputs with `express-validator` + `xss-clean`.
- **CSRF:** Use SameSite cookie attribute.
- **Rate limiting** on all public endpoints.
- **File upload validation:** Only allow jpg, jpeg, png, webp. Max 5MB. Validate MIME type, not just extension.
- **JWT Secret** must be at least 32 characters, randomly generated.
- **Admin routes** require both auth + admin role check — never just role alone.

---

## 9. AI Integration Rules

- **Never expose AI API keys** to frontend — all AI calls go through backend `/api/ai/*` endpoints.
- **Debounce** AI chatbot input — minimum 500ms between requests.
- **Token limits:** Keep prompts concise — max 1000 tokens per request to control costs.
- **Fallback:** If Gemini fails, show graceful error message — never crash the UI.
- **AI-generated content** must be clearly labeled in the UI ("AI Generated").

---

## 10. Performance Rules

- **Lazy load** all route-level components.
- **Skeleton loaders** on all data-fetching components.
- **Debounce** search input — 300ms delay before API call.
- **Memoize** expensive computations with `useMemo`.
- **Virtualize** long lists (workers list) with `react-window` if >100 items.
- **Compress images** before upload — max 1MB for profile photos.
- **CDN** for all static assets via Cloudinary.
- **Backend:** Enable gzip compression with `compression` middleware.
- **Pagination** on all list endpoints — default 10 items per page.

---

## 11. Testing Rules (Future Phase)
- Unit tests: Jest + React Testing Library
- API tests: Supertest
- Min coverage: 70% on critical paths (auth, booking, payment)
- E2E: Playwright (Phase 4)

---

## 12. Deployment Rules

- **Never deploy directly from local** — all deploys go through GitHub Actions CI/CD.
- **Environment variables** set in Vercel dashboard and Render dashboard — never in code.
- **Production build** must pass linting before deploy.
- **Health check endpoint:** `GET /api/health` must return `200 OK` with `{ status: 'ok' }`.
- **Zero-downtime deploys** on Render using rolling deploy strategy.

---

## Contract: Claude's Responsibilities

When building this project, Claude must:
1. Follow every rule in this file without exception
2. Write complete, working code — no placeholders or TODOs unless explicitly agreed
3. Update `logs.md` after each major session
4. Update `memory.md` when architectural decisions are made
5. Always ask for credentials before writing code that needs them
6. Never invent fake API keys or database URIs
7. Warn Satyam before making any breaking changes to existing code
8. Test logic mentally before writing — no untested assumptions
