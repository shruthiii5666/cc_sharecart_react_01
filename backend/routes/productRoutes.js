import express from 'express';
import { getAllProducts, createProduct, getMyProducts, updateProductStatus, getProductById } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.patch('/:id/status', updateProductStatus);
router.get('/:id', getProductById); // make sure to define specific routes before generic ones, my-products needs to be separate

export default router;
