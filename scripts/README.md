# Database Seeding Guide

This guide explains how to seed your MongoDB database with test data for the Threads Clone application.

## What Gets Seeded

The seed script creates:

- **3 Test Users** with profiles
- **3 Communities** with members
- **30+ Threads** (10+ per user)
- **40+ Comments** on various threads

## Prerequisites

1. MongoDB database (local or Atlas)
2. Environment variable `MONGODB_URL` set in `.env`

## Installation

First, install the required dev dependency:

```bash
npm install tsx --save-dev
```

## Running the Seed Script

```bash
npm run seed
```

## Seed Data Overview

### Users

1. **John Doe** (@johndoe)
   - Bio: Software engineer passionate about web development
   - Clerk ID: `user_test_1`

2. **Sarah Smith** (@sarahsmith)
   - Bio: Product designer who loves creating beautiful UX
   - Clerk ID: `user_test_2`

3. **Mike Johnson** (@mikejohnson)
   - Bio: Full-stack developer and tech blogger
   - Clerk ID: `user_test_3`

### Communities

1. **Web Developers** (@webdevs)
   - Focus: Web development knowledge sharing

2. **Design Systems** (@designsystems)
   - Focus: Design systems and component libraries

3. **Next.js Developers** (@nextjsdevs)
   - Focus: Next.js and modern React patterns

## Important Notes

### Clerk Integration

⚠️ **Important**: The seed script creates users with specific Clerk user IDs (`user_test_1`, `user_test_2`, `user_test_3`). These IDs won't match real Clerk users unless you:

1. Create test users in Clerk with these exact IDs, OR
2. Sign in with Clerk and manually update the user IDs in the seed script to match your Clerk users

### Viewing Seeded Data

After seeding:

1. Sign in to the application with your Clerk account
2. You should see threads from the seeded users on the home page
3. Navigate to communities and search pages to see all seeded data

### Customizing Seed Data

To customize the seed data:

1. Edit `scripts/seed.ts`
2. Modify the user, community, or thread data
3. Run `npm run seed` again

**Warning**: Running the seed script will **delete all existing data** from your database before creating new data.

## Troubleshooting

### Connection Errors

If you get a MongoDB connection error:

- Verify `MONGODB_URL` in your `.env` file
- Ensure MongoDB is running (if using local instance)
- Check network connectivity (if using MongoDB Atlas)

### Import Errors

If you get TypeScript/import errors:

- Make sure you have `tsx` installed: `npm install tsx --save-dev`
- Verify your `tsconfig.json` includes the scripts folder

### No Data Appearing

If you don't see the seeded data:

- The seeded users have different Clerk IDs than your logged-in user
- You can view threads from other users on the home page
- Check MongoDB directly to confirm data was created

## Production Usage

⚠️ **Never run this seed script in production!**

It will delete all existing data. This script is for **development and testing only**.

## Alternative: Manual Testing

Instead of using the seed script, you can:

1. Create users through the onboarding flow
2. Manually create threads and communities
3. Invite other developers to test with you

## Clean Up

To remove all seeded data:

1. Use MongoDB Compass or Studio 3T to connect to your database
2. Delete documents from the `users`, `threads`, and `communities` collections
3. Or run the seed script again (it clears data before seeding)
