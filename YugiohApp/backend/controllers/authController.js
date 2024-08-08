const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function registerUser(req, res) {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser
};

