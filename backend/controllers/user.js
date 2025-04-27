const User = require('../models/user');
const upload = require('../middleware/uploadMiddleware'); 
// Create a new user
exports.createUser = [
  upload.single('image'),
  async (req, res) => {
    try {
      const { firstName, lastName, employeeId, nic, birthDate, designation, marriedStatus, age } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

      const user = new User({ firstName, lastName, employeeId, nic, birthDate, designation, marriedStatus, age, imageUrl });
      await user.save();
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
];

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Get single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update a user
exports.updateUser = [
  upload.single('image'),
  async (req, res) => {
    try {
      const updateData = { ...req.body };
      if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;

      const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      res.json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
];

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};