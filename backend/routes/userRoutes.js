import express from 'express';
import { getMe } from '../controllers/userController.js';
import { getMyProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/me', getMe);
router.get('/my-products', getMyProducts);

export default router;
