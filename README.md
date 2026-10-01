# Stars Align

Stars Align is a Next.js App Router frontend for the Stars Align job platform.

## Architecture

This project is intentionally structured as a Next.js application rather than a port of the previous CRA frontend.

- App Router pages and nested layouts define the route structure.
- React Server Components are the default.
- Server Actions handle authentication and mutations.
- Authentication is stored in HTTP-only cookies instead of localStorage.
- Server-side layouts enforce employee, employer, and admin access.
- Server-side data access lives in `src/lib`.
- URL search parameters drive public and applied-job filtering.
- Tailwind CSS 4 provides styling without a legacy Tailwind config.
- Redux, Axios, React Router, CRACO, and copied CRA feature/service/slice layers are not used.

## Environment

Create `.env.local`:

```env
API_URL=http://localhost:5000/api
```

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```
