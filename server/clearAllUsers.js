import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/userModel.js"; // Adjust path as needed

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI); // Debug print

async function clearAllUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const result = await User.deleteMany({});
    console.log(`Deleted ${result.deletedCount} user(s).`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error clearing users:", error);
    process.exit(1);
  }
}

clearAllUsers();
