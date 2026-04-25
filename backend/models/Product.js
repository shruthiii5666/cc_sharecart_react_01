import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  originalPrice: { type: DataTypes.DECIMAL(10, 2) },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  unit: { type: DataTypes.STRING, defaultValue: 'units' },
  expiryDate: { type: DataTypes.DATE },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.TEXT }
}, { timestamps: true });

export default Product;
