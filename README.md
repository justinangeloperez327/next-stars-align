# Stars Align

Stars Align is the Next.js implementation of the existing React job-board frontend.

## Stack

- Next.js 16.3.8 (App Router)
- React 19.3.0
- Tailwind CSS 4.3.3
- Redux Toolkit + React Redux
- Headless UI + Heroicons
- Axios
- tsParticles

## Features

The application carries forward the feature set from `react-stars-align`:

- public job browsing and job details
- employee registration and login
- employer registration and login
- employee profile, education, and experience management
- job applications and application success flow
- applied-jobs view and filtering
- employer dashboard
- employer job creation, editing, deletion, and applicant views
- employer application review, accept, and reject flows
- companies feature modules
- role-based employee, employer, admin, public, and auth route guards

## Environment

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

The default example matches the `/api/*` routes in `express-stars-align`.

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```
