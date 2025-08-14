import express from "express";
import Report from "../models/Report.js";

const router = express.Router();

// ✅ Submit a report
router.post("/", async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const report = new Report({ title, description, imageUrl });
    await report.save();
    res.json({ message: "Report submitted successfully!", report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all reports (for admin)
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Approve a report
router.put("/:id/approve", async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Reject a report
router.put("/:id/reject", async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, { status: "rejected" }, { new: true });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Delete a report
router.delete("/:id", async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: "Report deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;