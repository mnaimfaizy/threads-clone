import mongoose from "mongoose";

let isConnected = false; // variable to check if mongoose is connected

export const connectToDB = async (): Promise<void> => {
  // Set strict query mode for better performance
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is not defined in environment variables");
  }

  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });

    isConnected = db.connections[0].readyState === 1;

    if (isConnected) {
      console.log("✅ MongoDB connected successfully");
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};
