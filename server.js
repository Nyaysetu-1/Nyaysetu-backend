import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import reportRoutes from "./routes/reportRoutes.js";
import uploadApi from "./routes/uploadApi.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reports", reportRoutes);
app.use("/api/upload", uploadApi);

app.get("/", (req, res) => {
  res.send("✅ NyaySetu Backend is Running...");
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});