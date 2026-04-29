import { User } from '../models/index.js';

export const getMe = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
    
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'phone', 'email']
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
