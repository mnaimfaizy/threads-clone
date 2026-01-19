# Threads Clone

A full‑stack Threads-style social app built with Next.js App Router, Clerk authentication, MongoDB, and UploadThing.

## Features

- Email/social auth with Clerk
- Onboarding flow and profile management
- Thread creation, replies, and activity feed
- Communities (organizations) synced from Clerk webhooks
- Image uploads via UploadThing
- Responsive layout with Tailwind + shadcn/ui

## Tech Stack

- Next.js (App Router)
- React, TypeScript
- Clerk (auth, organizations, webhooks)
- MongoDB + Mongoose
- UploadThing (file uploads)
- Tailwind CSS, Radix UI

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Copy the example file and fill in your secrets:

```bash
cp .env.example .env.local
```

Required variables:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `MONGODB_URL`

Optional (but required if you use the webhook route):

- `NEXT_CLERK_WEBHOOK_SECRET`

UploadThing (required for image uploads):

- `UPLOADTHING_SECRET`
- `UPLOADTHING_APP_ID`

Where to get the values:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
  - Go to the Clerk dashboard → your application → API Keys.
- `NEXT_CLERK_WEBHOOK_SECRET`
  - Clerk dashboard → Webhooks → Add endpoint:
    - URL: `http://localhost:3000/api/webhook/clerk`
  - Copy the signing secret shown after creating the endpoint.
- `MONGODB_URL`
  - Create a MongoDB Atlas cluster → Database Access (create a user) → Network Access (allow your IP).
  - In Atlas, click “Connect” → “Drivers” → copy the connection string and replace the username/password.
- `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`
  - UploadThing dashboard → your app → API keys.

### 3) Run the app

```bash
npm run dev
```

Open http://localhost:3000.

## Clerk Setup Notes

- Create a Clerk application and copy the publishable/secret keys.
- Enable Organizations if you want community features.
- Add a webhook endpoint in the Clerk dashboard pointing to:
  - `http://localhost:3000/api/webhook/clerk`
  - Paste the webhook secret into `NEXT_CLERK_WEBHOOK_SECRET`.

## UploadThing Setup

- Create an UploadThing app and add the API keys to `.env.local`.
- Uploads use the `media` route defined in the file router.

## MongoDB

- Provide a valid `MONGODB_URL` connection string.
- The app connects automatically on server actions and page loads.

## Scripts

- `npm run dev` – start development server
- `npm run build` – build for production
- `npm run start` – start production server
- `npm run lint` – run linting

## Deployment

Deploy on Vercel or your preferred platform. Ensure all environment variables are set in the deployment environment.
