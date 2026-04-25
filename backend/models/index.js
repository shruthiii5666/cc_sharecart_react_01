import sequelize from '../config/database.js';
import Vendor from './Vendor.js';
import Product from './Product.js';

// Define relationships
Vendor.hasMany(Product, { foreignKey: 'vendorId', onDelete: 'CASCADE' });
Product.belongsTo(Vendor, { foreignKey: 'vendorId' });

export { sequelize, Vendor, Product };
