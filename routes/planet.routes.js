const express = require('express') ;
const { Planet } = require('../models/models');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const planet = await Planet.create(req.body);
    res.status(201).json(planet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const planets = await Planet.findAll();
  res.json(planets);
});

router.get('/:id', async (req, res) => {
  const planet = await Planet.findByPk(req.params.id);
  if (!planet) return res.status(404).json({ error: 'Planet not found' });
  res.json(planet);
});

router.put('/:id', async (req, res) => {
  const updated = await Planet.update(req.body, { where: { id: req.params.id } });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Planet.destroy({ where: { id: req.params.id } });
  res.status(204).send();
});

module.exports = router;
