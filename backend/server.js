import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { sequelize } from './models/index.js';
import vendorRoutes from './routes/vendorRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();

const app = express();

// 🔹 Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Middleware
app.use(cors());
app.use(express.json());

/* =======================================================
   ✅ 1. TEST DB ROUTE (VERY IMPORTANT)
======================================================= */
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

/* =======================================================
   ✅ 2. API ROUTES
======================================================= */
app.use('/api/vendors', vendorRoutes);
app.use('/api/products', productRoutes);

/* =======================================================
   ✅ 3. HEALTH CHECK (for AWS)
======================================================= */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

/* =======================================================
   ✅ 4. SERVE FRONTEND (React build)
======================================================= */
app.use(express.static(path.join(__dirname, "../dist")));

/* =======================================================
   ✅ 5. SPA FALLBACK (MUST BE LAST)
======================================================= */
app.use((req, res, next) => {
  if (req.method !== "GET") return next();

  const acceptHeader = req.headers.accept || "";

  if (acceptHeader.includes("text/html")) {
    return res.sendFile(path.join(__dirname, "../dist", "index.html"));
  }

  next();
});

/* =======================================================
   ✅ 6. START SERVER + DB CONNECTION
======================================================= */
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced successfully");

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error connecting to the database:", error);
  });