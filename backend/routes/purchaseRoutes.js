import express from 'express';
import { createPurchase, getMyPurchases } from '../controllers/purchaseController.js';

const router = express.Router();

router.post('/', createPurchase);
router.get('/my-purchases', getMyPurchases);

export default router;
