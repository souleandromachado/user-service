const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!['aluno', 'professor'].includes(role)) return res.status(400).json({ error: 'Role inválido' });

  const hash = await bcrypt.hash(password, 10);
  const [user] = await User.create({ name, email, password: hash, role });
  res.status(201).json(user);
});

router.get('/', authMiddleware, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.put('/:id', authMiddleware, async (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = password ? await bcrypt.hash(password, 10) : undefined;

  const userData = { name, email, role };
  if (hash) userData.password = hash;

  await User.update(req.params.id, userData);
  res.json({ success: true });
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await User.remove(req.params.id);
  res.json({ success: true });
});

module.exports = router;
