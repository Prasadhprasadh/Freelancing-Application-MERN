import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables
dotenv.config();

// Ensure environment variables are loaded
console.log("Mongo URI:", process.env.MONGO);  // Debug log to check if MONGO is loaded

const app = express();
mongoose.set("strictQuery", true);

// MongoDB connection function
const connect = async () => {
  try {
    if (!process.env.MONGO) {
      throw new Error("Mongo URI is not defined in environment variables.");
    }
    await mongoose.connect(process.env.MONGO);
    //await mongoose.connect("localhost:27017/freelancedb");
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};


// Middleware setup
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

// Start the server
app.listen(8800, () => {
  connect();  // Connect to MongoDB
  console.log("Backend server is running on port 8800!");
});
