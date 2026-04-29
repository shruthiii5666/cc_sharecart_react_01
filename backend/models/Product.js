import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  expiry_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('ACTIVE', 'SOLD', 'EXPIRED'),
    defaultValue: 'ACTIVE'
  },
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  buyer_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  sold_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'PRODUCTS',
  timestamps: true, // creates created_at, updated_at
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Product;
