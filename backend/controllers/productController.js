import { Product, Vendor } from '../models/index.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ include: Vendor });
    res.json(products);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, { include: Vendor });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

export const createProduct = async (req, res) => {
  try {
    const { vendorId } = req.body;
    if (!vendorId) return res.status(400).json({ message: 'vendorId is required' });
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.update(req.body);
    res.json(product);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) { res.status(500).json({ error: error.message }); }
};
