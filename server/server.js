import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",") || ["http://localhost:5173"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json({ limit: "20kb" }));

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
    },
    subject: { type: String, required: true, trim: true, maxlength: 180 },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
  },
  { timestamps: true },
);
const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

app.get("/api/health", (_req, res) =>
  res.json({ success: true, message: "Portfolio API is running." }),
);

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body || {};
    if (
      ![name, email, subject, message].every(
        (v) => typeof v === "string" && v.trim(),
      )
    ) {
      return res.status(400).json({ message: "Please complete all fields." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res
        .status(400)
        .json({ message: "Please enter a valid email address." });
    if (mongoose.connection.readyState !== 1)
      return res.status(503).json({
        message:
          "Contact database is not configured yet. Please use the email link instead.",
      });
    await Message.create({ name, email, subject, message });
    return res
      .status(201)
      .json({ success: true, message: "Message saved successfully." });
  } catch (error) {
    console.error("Contact form error:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
});

const port = process.env.PORT || 5000;
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection failed:", err.message));
} else {
  console.warn(
    "MONGO_URI is missing. Contact form database storage is disabled.",
  );
}
app.listen(port, () => console.log(`Portfolio API running on port ${port}`));
