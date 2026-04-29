import { Purchase, Product, User } from '../models/index.js';

export const createPurchase = async (req, res) => {
  try {
    const { product_id, buyer_id } = req.body;
    
    const product = await Product.findByPk(product_id);
    if (!product || product.status !== 'ACTIVE') {
      return res.status(400).json({ message: 'Product not available' });
    }
    
    const newPurchase = await Purchase.create({
      product_id,
      buyer_id,
      quantity: product.quantity,
      price: product.price,
      seller_id: product.seller_id
    });
    
    product.status = 'SOLD';
    product.buyer_id = buyer_id;
    product.sold_at = new Date();
    await product.save();
    
    res.status(201).json({ message: 'Purchase successful', purchase: newPurchase });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMyPurchases = async (req, res) => {
  try {
    const { buyer_id } = req.query;
    
    if (!buyer_id) {
      return res.status(400).json({ message: 'buyer_id is required' });
    }
    
    const purchases = await Purchase.findAll({
      where: { buyer_id },
      include: [
        { model: Product, as: 'Product' },
        { model: User, as: 'Seller', attributes: ['name'] }
      ],
      order: [['created_at', 'DESC']]
    });
    
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
