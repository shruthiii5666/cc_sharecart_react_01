import { Vendor, Product } from '../models/index.js';

export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll();
    res.json(vendors);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id, { include: Product });
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    res.json(vendor);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

export const createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json(vendor);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

export const loginVendor = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    // Simple mock login: find a vendor whose description contains the phone number
    const vendors = await Vendor.findAll();
    const vendor = vendors.find(v => v.description && v.description.includes(phoneNumber));
    
    if (vendor) {
      res.json(vendor);
    } else {
      res.status(404).json({ message: 'Vendor not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    await vendor.update(req.body);
    res.json(vendor);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

export const deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByPk(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });
    await vendor.destroy();
    res.json({ message: 'Vendor deleted successfully' });
  } catch (error) { res.status(500).json({ error: error.message }); }
};
