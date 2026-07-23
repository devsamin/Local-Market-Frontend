# Local Mart frontend

Responsive React marketplace client built with Vite and Tailwind CSS.

## Local setup

1. Copy `.env.example` to `.env.local` and set `VITE_API_URL`.
2. Run `npm ci`.
3. Run `npm run dev`.

## Quality checks

```text
npm run lint
npm run build
```

Authentication, retries, token refresh, and API configuration are centralized in `src/services/api.js`. Buyer and seller routes are role protected in `src/router/router.jsx`.
