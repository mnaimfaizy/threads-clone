# Threads Clone

A full-stack social media application inspired by Meta's Threads, built with modern web technologies. This platform enables users to create posts (threads), engage in discussions, join communities, and connect with other users.

## Features

### Authentication & User Management

- **Secure Authentication**: Email/social login powered by Clerk
- **User Onboarding**: Complete profile setup with image upload, bio, and username
- **Profile Management**: Edit profile information and view user activity
- **Organization Switcher**: Seamlessly switch between personal and community contexts

### Core Functionality

- **Thread Creation**: Post threads with text content (min. 3 characters)
- **Nested Comments**: Reply to threads with unlimited nesting levels
- **Activity Feed**: Real-time notifications when users reply to your threads
- **Thread Deletion**: Remove your own threads and all nested replies
- **User Search**: Find other users with search and pagination
- **Community Discovery**: Browse and join communities with search functionality

### Communities (Organizations)

- **Community Creation**: Automatically synced from Clerk organizations via webhooks
- **Community Threads**: Post on behalf of communities
- **Member Management**: View community members and manage memberships
- **Community Profiles**: Dedicated pages showing threads and member lists

### UI/UX

- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark Theme**: Sleek dark mode interface
- **Navigation**: Top bar, left sidebar, right sidebar, and bottom bar (mobile)
- **Image Uploads**: Profile pictures via UploadThing
- **Pagination**: Efficient loading for large lists (users, communities, threads)

## Tech Stack

### Frontend

- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **UI Components**: Radix UI primitives (tabs, labels, slots)
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

### Backend

- **Runtime**: Next.js Server Actions & API Routes
- **Database**: MongoDB with Mongoose 9 ODM
- **Authentication**: Clerk v6 (email, social providers, organizations)
- **File Storage**: UploadThing v7 (image uploads)
- **Webhooks**: Svix (Clerk webhook verification)

### Developer Tools

- **Package Manager**: npm/yarn/pnpm
- **Linting**: ESLint
- **CSS Processing**: PostCSS, Autoprefixer

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

- `UPLOADTHING_TOKEN`

Where to get the values:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
  - Go to the Clerk dashboard → your application → API Keys.
- `NEXT_CLERK_WEBHOOK_SECRET`
  - Clerk dashboard → Webhooks → Add endpoint:
    - URL: `http://localhost:3000/api/webhook/clerk`
  - Copy the signing secret shown after creating the endpoint.
- `MONGODB_URL`
  - Create a MongoDB Atlas cluster → Database Access (create a user) → Network Access (allow your IP).
  - In Atlas, click "Connect" → "Drivers" → copy the connection string and replace the username/password.
- `UPLOADTHING_TOKEN`
  - UploadThing dashboard → your app → API Keys → V7 tab → copy the token.

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

## Project Structure

```
threads-clone/
├── app/
│   ├── (auth)/              # Authentication routes
│   │   ├── layout.tsx       # Auth layout wrapper
│   │   ├── onboarding/      # User onboarding flow
│   │   ├── sign-in/         # Clerk sign-in page
│   │   └── sign-up/         # Clerk sign-up page
│   ├── (root)/              # Main application routes
│   │   ├── layout.tsx       # Root layout with navigation
│   │   ├── page.tsx         # Home feed
│   │   ├── activity/        # User activity/notifications
│   │   ├── communities/     # Community listings & details
│   │   ├── create-thread/   # Thread creation page
│   │   ├── profile/[id]/    # User profile pages
│   │   ├── search/          # User search
│   │   └── thread/[id]/     # Thread detail with comments
│   ├── api/
│   │   ├── uploadthing/     # UploadThing file upload routes
│   │   └── webhook/clerk/   # Clerk webhook handler
│   └── globals.css          # Global styles
├── components/
│   ├── cards/               # Card components (Thread, User, Community)
│   ├── forms/               # Form components (Post, Comment, Profile)
│   ├── shared/              # Shared UI (Topbar, Sidebars, etc.)
│   └── ui/                  # shadcn/ui base components
├── constants/
│   └── index.js             # App constants (sidebar links, tabs)
├── lib/
│   ├── actions/             # Server actions (user, thread, community)
│   ├── models/              # Mongoose schemas (User, Thread, Community)
│   ├── validations/         # Zod validation schemas
│   ├── mongoose.ts          # MongoDB connection utility
│   ├── uploadthing.ts       # UploadThing client helpers
│   └── utils.ts             # Utility functions
├── public/assets/           # Static assets (icons, images)
├── middleware.ts            # Clerk auth middleware
└── .env.local               # Environment variables (not committed)
```

## Pages & Routes

| Route               | Description                               |
| ------------------- | ----------------------------------------- |
| `/`                 | Home feed with all threads                |
| `/onboarding`       | New user profile setup                    |
| `/sign-in`          | Clerk authentication page                 |
| `/sign-up`          | Clerk registration page                   |
| `/create-thread`    | Create a new thread                       |
| `/thread/[id]`      | Thread detail with nested comments        |
| `/profile/[id]`     | User profile with threads & replies       |
| `/activity`         | Notifications for replies to your threads |
| `/search`           | Search for users                          |
| `/communities`      | Browse all communities                    |
| `/communities/[id]` | Community profile with threads & members  |

## Data Models

### User

- `id`: Clerk user ID
- `username`: Unique username
- `name`: Display name
- `image`: Profile picture URL
- `bio`: User biography
- `threads`: Array of thread references
- `onboarded`: Boolean flag for onboarding completion
- `communities`: Array of community references

### Thread

- `text`: Thread content (min. 3 characters)
- `author`: Reference to User
- `community`: Optional reference to Community
- `createdAt`: Timestamp
- `parentId`: String reference to parent thread (for comments)
- `children`: Array of child thread references

### Community

- `id`: Clerk organization ID
- `username`: Unique community identifier
- `name`: Display name
- `image`: Community logo
- `bio`: Community description
- `createdBy`: Reference to User
- `threads`: Array of thread references
- `members`: Array of user references

## Key Features Implementation

### Authentication Flow

1. User visits protected route → redirected to Clerk sign-in
2. After authentication → redirected to onboarding (if first time)
3. Complete profile → redirected to home feed
4. Middleware protects all routes except webhooks

### Webhook Sync (Communities)

- Clerk sends webhook events for organization changes
- Supported events: `organization.created`, `organization.updated`, `organization.deleted`
- Also handles: `organizationMembership.created/deleted`
- Syncs data to MongoDB Community model

### Thread Hierarchy

- Threads can have unlimited nesting depth
- Comments are threads with a `parentId`
- Recursive fetching loads entire comment trees
- Deleting a thread cascades to all children

## Configuration Files

- `next.config.js`: Next.js configuration (image domains, server actions)
- `tailwind.config.ts`: Tailwind CSS customization
- `tsconfig.json`: TypeScript compiler options
- `components.json`: shadcn/ui configuration
- `middleware.ts`: Clerk authentication middleware
- `.env.local`: Environment variables (see setup section)

## Development Tips

### Running Locally

1. Ensure MongoDB is accessible (check connection string)
2. Verify Clerk keys are valid
3. UploadThing keys required only if uploading images
4. Use `npm run dev` for hot-reload development

### Troubleshooting

- **"Missing Clerk Secret Key"**: Add keys to `.env.local`
- **"MONGODB_URL not found"**: Set MongoDB connection string
- **Mongoose timeout errors**: Check MongoDB network access & credentials
- **Webhook failures**: Verify webhook secret matches Clerk dashboard

### Adding New Features

- Server actions go in `lib/actions/`
- UI components in `components/`
- New routes in `app/(root)/` or `app/(auth)/`
- Database models in `lib/models/`
- Validation schemas in `lib/validations/`

## Recent Updates (January 2026)

### Major Dependency Updates

All dependencies have been updated to their latest versions:

- **Next.js**: Upgraded to v16.1.4
- **React**: Upgraded to v19.2.3
- **Clerk**: Upgraded to v6.36.8 (breaking changes - see below)
- **UploadThing**: Upgraded to v7.7.4 (breaking changes - see below)
- **Mongoose**: Upgraded to v9.1.4
- **All other dependencies**: Updated to latest compatible versions

### Breaking Changes - Clerk v6

Clerk v6 introduces several breaking changes:

1. **`currentUser()` replaced with `auth()`**: All server components now use `const { userId } = await auth()` instead of `const user = await currentUser()`
2. **`authMiddleware()` replaced with `clerkMiddleware()`**: Middleware has been simplified
3. **Async APIs**: `auth()` and `clerkClient()` are now async
4. **Configuration**: Updated middleware matcher patterns for Next.js 15+

### Breaking Changes - UploadThing v7

UploadThing v7 introduces:

1. **`UPLOADTHING_TOKEN` replaces `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`**: Single token now contains all app configuration
2. **Import path changes**: `generateReactHelpers` now imported from `@uploadthing/react` instead of `@uploadthing/react/hooks`
3. **`createNextRouteHandler` renamed to `createRouteHandler`**: Updated in route handlers
4. **Get token from dashboard**: Navigate to API Keys → V7 tab to get your token

### Next.js Configuration Updates

- **`experimental.serverActions`**: Changed from boolean to object with `bodySizeLimit`
- **`serverComponentsExternalPackages`**: Moved to top-level `serverExternalPackages`
- **Middleware**: Next.js 16 deprecates middleware in favor of "proxy" (warning shown but still functional)
