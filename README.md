# Stars Align

Stars Align is a full-stack job platform built entirely with Next.js.

There is no separate Express application and no frontend-to-backend HTTP service layer. The App Router owns rendering, authentication, data access, mutations, and protected file delivery.

## Stack

- Next.js 16.3.8 App Router
- React 19.3
- Tailwind CSS 4
- Prisma ORM 7.10
- PostgreSQL
- Server Components for reads
- Server Actions for mutations
- Signed HTTP-only cookie sessions

## Architecture

```text
src/
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── (employee)/
│   ├── (employer)/
│   ├── (admin)/
│   ├── resumes/[applicationId]/route.js
│   └── actions.js
├── components/
└── lib/
    ├── auth.js
    ├── data.js
    ├── password.js
    └── prisma.js

prisma/
└── schema.prisma
```

## Environment

Create `.env.local`:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
SESSION_SECRET=generate-a-long-random-secret
```

For Vercel, add the same two variables in **Project → Settings → Environment Variables**.

## Database setup

After creating a PostgreSQL database:

```bash
npm install
npm run db:migrate
```

This creates a development migration and applies it to your database.

## Development

```bash
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```

## Vercel

Deploy this repository directly to Vercel. No Express deployment and no `API_URL` environment variable are required.

Optional for rendering the public site, required for full functionality:

- `DATABASE_URL` — enables persistent application data
- `SESSION_SECRET` — enables authenticated sessions

If these are not configured, public pages still render. Database-backed lists use empty states instead of failing the request.

Resume files are currently stored in PostgreSQL with the application record, capped at 5 MB per upload.


## Production database migrations

Production deployments use committed Prisma migrations.

Vercel runs:

```bash
npm run vercel-build
```

which executes:

```bash
prisma generate
next build
```

The UI can deploy without a database connection. When a production database is configured, apply committed migrations separately with:

```bash
npm run db:deploy
```

