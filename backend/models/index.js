import sequelize from '../config/database.js';
import User from './User.js';
import Product from './Product.js';
import Purchase from './Purchase.js';

// Define relationships
User.hasMany(Product, { foreignKey: 'seller_id', as: 'SellingProducts' });
Product.belongsTo(User, { foreignKey: 'seller_id', as: 'Seller' });

User.hasMany(Product, { foreignKey: 'buyer_id', as: 'BoughtProducts' });
Product.belongsTo(User, { foreignKey: 'buyer_id', as: 'Buyer' });

User.hasMany(Purchase, { foreignKey: 'buyer_id', as: 'Purchases' });
Purchase.belongsTo(User, { foreignKey: 'buyer_id', as: 'Buyer' });

User.hasMany(Purchase, { foreignKey: 'seller_id', as: 'Sales' });
Purchase.belongsTo(User, { foreignKey: 'seller_id', as: 'Seller' });

Product.hasMany(Purchase, { foreignKey: 'product_id', as: 'Purchases' });
Purchase.belongsTo(Product, { foreignKey: 'product_id', as: 'Product' });

export { sequelize, User, Product, Purchase };
