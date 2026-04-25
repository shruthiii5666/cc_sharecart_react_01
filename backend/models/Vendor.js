import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Vendor = sequelize.define('Vendor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING },
  location: { type: DataTypes.STRING },
  image: { type: DataTypes.TEXT },
  description: { type: DataTypes.TEXT }
}, { timestamps: true });

export default Vendor;
