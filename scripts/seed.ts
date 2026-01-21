/**
 * MongoDB Seed Script for Threads Clone
 *
 * This script seeds the database with test data:
 * - 3 users
 * - 3 communities
 * - 10+ threads per user
 * - Comments on threads
 *
 * Usage:
 * 1. Make sure MONGODB_URL is set in .env.local
 * 2. Run: npm run seed
 */

import { config } from "dotenv";
import { resolve } from "path";
import mongoose from "mongoose";
import User from "../lib/models/user.model";
import Thread from "../lib/models/thread.model";
import Community from "../lib/models/community.model";

// Load environment variables from .env.local (Next.js convention)
config({ path: resolve(process.cwd(), ".env.local") });

// Test Users Data
const users = [
  {
    id: "user_test_1",
    username: "johndoe",
    name: "John Doe",
    bio: "Software engineer passionate about web development and open source. Love building scalable applications with Next.js and React.",
    image: "https://placehold.co/400x400/2563eb/ffffff.png?text=JD",
    onboarded: true,
  },
  {
    id: "user_test_2",
    username: "sarahsmith",
    name: "Sarah Smith",
    bio: "Product designer who loves creating beautiful and intuitive user experiences. Coffee enthusiast ☕",
    image: "https://placehold.co/400x400/7c3aed/ffffff.png?text=SS",
    onboarded: true,
  },
  {
    id: "user_test_3",
    username: "mikejohnson",
    name: "Mike Johnson",
    bio: "Full-stack developer | Tech blogger | Gaming enthusiast 🎮 | Always learning something new",
    image: "https://placehold.co/400x400/059669/ffffff.png?text=MJ",
    onboarded: true,
  },
];

// Test Communities Data
const communities = [
  {
    id: "community_test_1",
    username: "webdevs",
    name: "Web Developers",
    bio: "A community for web developers to share knowledge, tips, and best practices. All skill levels welcome!",
    image: "https://placehold.co/400x400/dc2626/ffffff.png?text=WD",
  },
  {
    id: "community_test_2",
    username: "designsystems",
    name: "Design Systems",
    bio: "Discussing design systems, component libraries, and creating consistent user experiences across platforms.",
    image: "https://placehold.co/400x400/ea580c/ffffff.png?text=DS",
  },
  {
    id: "community_test_3",
    username: "nextjsdevs",
    name: "Next.js Developers",
    bio: "Everything about Next.js - App Router, Server Components, Server Actions, and modern React patterns.",
    image: "https://placehold.co/400x400/0891b2/ffffff.png?text=NJ",
  },
];

// Thread content templates
const threadTemplates = [
  {
    text: "Just finished migrating my project to Next.js 15! The new App Router is amazing. Server Components make everything so much faster. 🚀",
    likes: 45,
  },
  {
    text: "Hot take: TypeScript strict mode should be the default for all new projects. It saves so much debugging time in the long run.",
    likes: 32,
  },
  {
    text: "Does anyone have experience with MongoDB indexes? My queries are getting slow as the data grows. Looking for optimization tips!",
    likes: 28,
  },
  {
    text: "Just discovered the power of Server Actions in Next.js. No more API routes for simple mutations! This is a game changer. 🎯",
    likes: 56,
  },
  {
    text: "Reminder: Always add loading and error states to your React components. Your users will thank you! ✨",
    likes: 41,
  },
  {
    text: "Working on a new design system for our app. Color palettes are harder than they look! Any favorite tools for generating accessible color schemes?",
    likes: 23,
  },
  {
    text: "Finally wrapped up that feature I've been working on for weeks. Time to celebrate with some coffee! ☕ What are you all working on?",
    likes: 37,
  },
  {
    text: "Pro tip: Use React Hook Form with Zod for form validation. The developer experience is incredible and type safety is built-in.",
    likes: 64,
  },
  {
    text: "Anyone else excited about the new React Compiler? Auto-memoization without useMemo and useCallback everywhere? Sign me up!",
    likes: 71,
  },
  {
    text: "Debugging a weird CSS issue for 3 hours only to find out I had a typo in the class name. Classic developer moment 😅",
    likes: 89,
  },
  {
    text: "Just read an amazing article on Web Vitals optimization. Reduced my LCP from 4s to 1.2s! Performance matters.",
    likes: 44,
  },
  {
    text: "Question: What's your preferred state management solution in 2026? Still using Redux or have you moved to something else?",
    likes: 52,
  },
  {
    text: "Tailwind CSS has completely changed how I write styles. I can't imagine going back to traditional CSS files now.",
    likes: 67,
  },
  {
    text: "Deployed my first app using Docker containers today! The learning curve was steep but totally worth it. 🐳",
    likes: 38,
  },
  {
    text: "Remember: Premature optimization is the root of all evil. Make it work first, then make it fast. 💯",
    likes: 55,
  },
];

// Comment templates
const commentTemplates = [
  "Great point! I totally agree with this.",
  "This is really helpful, thanks for sharing!",
  "I had the same issue last week. Here's what worked for me...",
  "Interesting perspective! Never thought about it that way.",
  "Can you share more details about your approach?",
  "This is exactly what I needed to hear today!",
  "Amazing work! Keep it up 👏",
  "I've been following this pattern and it's been working great.",
  "Thanks for the tip! Going to try this in my project.",
  "This deserves more attention. Really useful information.",
];

async function seed() {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;

    if (!MONGODB_URL) {
      throw new Error("MONGODB_URL is not defined in environment variables");
    }

    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URL);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await User.deleteMany({});
    await Thread.deleteMany({});
    await Community.deleteMany({});
    console.log("✅ Cleared existing data");

    // Create users
    console.log("👥 Creating users...");
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create communities
    console.log("🏘️  Creating communities...");
    const createdCommunities = await Community.insertMany(
      communities.map((community, index) => ({
        ...community,
        createdBy: createdUsers[index % createdUsers.length]._id,
        members: [
          createdUsers[index % createdUsers.length]._id,
          createdUsers[(index + 1) % createdUsers.length]._id,
        ],
      })),
    );
    console.log(`✅ Created ${createdCommunities.length} communities`);

    // Update users with communities
    for (let i = 0; i < createdUsers.length; i++) {
      await User.findByIdAndUpdate(createdUsers[i]._id, {
        $push: {
          communities: {
            $each: [
              createdCommunities[i % createdCommunities.length]._id,
              createdCommunities[(i + 1) % createdCommunities.length]._id,
            ],
          },
        },
      });
    }

    // Create threads
    console.log("💬 Creating threads...");
    const allThreads = [];

    for (const user of createdUsers) {
      // Create 10-12 threads per user
      const numThreads = 10 + Math.floor(Math.random() * 3);

      for (let i = 0; i < numThreads; i++) {
        const template = threadTemplates[i % threadTemplates.length];
        const randomCommunity =
          Math.random() > 0.5
            ? createdCommunities[
                Math.floor(Math.random() * createdCommunities.length)
              ]
            : null;

        const thread = await Thread.create({
          text: template.text,
          author: user._id,
          community: randomCommunity?._id,
          createdAt: new Date(
            Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
          ), // Random date within last 30 days
        });

        allThreads.push(thread);

        // Update user's threads
        await User.findByIdAndUpdate(user._id, {
          $push: { threads: thread._id },
        });

        // Update community's threads if applicable
        if (randomCommunity) {
          await Community.findByIdAndUpdate(randomCommunity._id, {
            $push: { threads: thread._id },
          });
        }
      }
    }

    console.log(`✅ Created ${allThreads.length} threads`);

    // Add comments to threads
    console.log("💭 Adding comments to threads...");
    let commentCount = 0;

    for (const thread of allThreads.slice(0, 20)) {
      // Add comments to first 20 threads
      const numComments = 1 + Math.floor(Math.random() * 4); // 1-4 comments per thread

      for (let i = 0; i < numComments; i++) {
        const randomUser =
          createdUsers[Math.floor(Math.random() * createdUsers.length)];
        const commentText =
          commentTemplates[Math.floor(Math.random() * commentTemplates.length)];

        const comment = await Thread.create({
          text: commentText,
          author: randomUser._id,
          parentId: thread._id.toString(),
          createdAt: new Date(
            thread.createdAt.getTime() + Math.random() * 24 * 60 * 60 * 1000,
          ), // After parent thread
        });

        // Update parent thread
        await Thread.findByIdAndUpdate(thread._id, {
          $push: { children: comment._id },
        });

        commentCount++;
      }
    }

    console.log(`✅ Added ${commentCount} comments`);

    console.log("\n🎉 Seed completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Communities: ${createdCommunities.length}`);
    console.log(`   Threads: ${allThreads.length}`);
    console.log(`   Comments: ${commentCount}`);
    console.log("\n🔐 Test User Credentials:");
    console.log("   You'll need to sign in with Clerk using any email.");
    console.log("   After signing in, you can view the seeded data.");
    console.log("\n💡 Note: These are the Clerk user IDs in the seed data:");
    users.forEach((user, index) => {
      console.log(
        `   ${index + 1}. ${user.name} (@${user.username}) - ID: ${user.id}`,
      );
    });
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB");
  }
}

// Run seed function
seed()
  .then(() => {
    console.log("✅ Seed script completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Seed script failed:", error);
    process.exit(1);
  });
