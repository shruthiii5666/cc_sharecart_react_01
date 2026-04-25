import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// ✅ 1. Create connection
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// ✅ 2. ADD IT HERE (RIGHT AFTER CREATION)
sequelize.authenticate()
  .then(() => console.log("✅ DB connected successfully"))
  .catch(err => console.error("❌ DB connection error:", err));

// ✅ 3. Export
export default sequelize;