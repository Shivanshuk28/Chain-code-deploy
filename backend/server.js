import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import problemRoutes from "./routes/problem.js";
import submissionRoutes from "./routes/submission.js";
import nftRoutes from "./routes/nft.js";

dotenv.config();

const app = express();

// Add CORS middleware
app.use(cors());

// Request logging middleware
app.use(
  morgan(
    "[:date[iso]] :method :url :status :response-time ms - :res[content-length]"
  )
);

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/auth", authRoutes);
app.use("/problems", problemRoutes);
app.use("/submissions", submissionRoutes);
app.use("/nft", nftRoutes);

// Set the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
