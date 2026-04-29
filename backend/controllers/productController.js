import { Product, User } from '../models/index.js';
import { Op } from 'sequelize';

export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    
    const whereClause = { status: 'ACTIVE' };
    
    // Auto expire products logic before fetching
    await Product.update(
      { status: 'EXPIRED' },
      { where: { status: 'ACTIVE', expiry_date: { [Op.lt]: new Date() } } }
    );
    
    if (category) {
      whereClause.category = category;
    }
    
    const products = await Product.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'Seller', attributes: ['id', 'name'] }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category, quantity, unit, price, cost, expiry_date, description, seller_id } = req.body;
    
    const newProduct = await Product.create({
      name, category, quantity, unit, price, cost, expiry_date, description, seller_id, status: 'ACTIVE'
    });
    
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const { seller_id, status } = req.query;
    
    if (!seller_id) {
      return res.status(400).json({ message: 'seller_id is required' });
    }
    
    const whereClause = { seller_id };
    if (status) {
      whereClause.status = status;
    }
    
    const products = await Product.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'Buyer', attributes: ['id', 'name'] }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateProductStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    product.status = status;
    await product.save();
    
    res.json({ message: 'Product status updated', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: [
        { model: User, as: 'Seller', attributes: ['id', 'name'] }
      ]
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
