import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./backend/config/database.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ 1. API ROUTES FIRST
app.get("/test-db", async (req, res) => {
  try {
    const [result] = await sequelize.query("SELECT 1 + 1 AS result");
    res.json({
      message: "DB connection successful",
      data: result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "DB connection failed",
      error: error.message
    });
  }
});

// ✅ 2. STATIC FILES
app.use(express.static(path.join(__dirname, "dist")));

// ❗ 3. SPA FALLBACK (LAST)
app.use((req, res, next) => {
  if (req.method !== "GET") return next();

  const acceptHeader = req.headers.accept || "";

  if (acceptHeader.includes("text/html")) {
    return res.sendFile(path.join(__dirname, "dist", "index.html"));
  }

  next();
});

// ✅ 4. START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});