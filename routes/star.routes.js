const express = require('express');
const { Star, Planet } = require('../models/models');

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const star = await Star.create(req.body);
    res.status(201).json(star);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const stars = await Star.findAll({ include: Planet });
  res.json(stars);
});

router.get('/:id', async (req, res) => {
  const star = await Star.findByPk(req.params.id, { include: Planet });
  if (!star) return res.status(404).json({ error: 'Star not found' });
  res.json(star);
});

router.put('/:id', async (req, res) => {
  const updated = await Star.update(req.body, { where: { id: req.params.id } });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Star.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

module.exports = router;
