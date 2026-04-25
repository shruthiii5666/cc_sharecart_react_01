import express from 'express';
import { getVendors, getVendorById, createVendor, updateVendor, deleteVendor, loginVendor } from '../controllers/vendorController.js';

const router = express.Router();
router.post('/login', loginVendor);
router.get('/', getVendors);
router.get('/:id', getVendorById);
router.post('/', createVendor);
router.put('/:id', updateVendor);
router.delete('/:id', deleteVendor);

export default router;
