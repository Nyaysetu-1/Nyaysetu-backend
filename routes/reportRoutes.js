import express from "express";
import Report from "../models/reportModel.js";

const router = express.Router();

// Submit report
router.post("/", async (req, res) => {
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    res.status(201).json({ message: "✅ Report submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to submit report" });
  }
});

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch reports" });
  }
});

export default router;