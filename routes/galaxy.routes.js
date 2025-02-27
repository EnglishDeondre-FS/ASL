const express = require('express');
const { Galaxy, Star } = require('../models/models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const galaxy = await Galaxy.create(req.body);
    res.status(201).json(galaxy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const galaxies = await Galaxy.findAll({ include: Star });
  res.json(galaxies);
});

router.get('/:id', async (req, res) => {
  const galaxy = await Galaxy.findByPk(req.params.id, { include: Star });
  if (!galaxy) return res.status(404).json({ error: 'Galaxy not found' });
  res.json(galaxy);
});

router.put('/:id', async (req, res) => {
  const updated = await Galaxy.update(req.body, { where: { id: req.params.id } });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Galaxy.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

module.exports = router;
