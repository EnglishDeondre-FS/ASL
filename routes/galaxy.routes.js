const express = require('express');
const fs = require('fs');
const { Galaxy, Star } = require('../models/models');
const { createUploadMiddleware } = require('../multer-config'); // Import the middleware creator

const router = express.Router();
const upload = createUploadMiddleware();

router.post('/', async (req, res) => {
  try {
    const galaxy = await Galaxy.create(req.body);
    res.status(201).json(galaxy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const galaxies = await Galaxy.findAll({ include: Star });
    res.status(200).json(galaxies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const galaxy = await Galaxy.findByPk(req.params.id, { include: Star });
    if (!galaxy) return res.status(404).json({ error: 'Galaxy not found' });
    res.json(galaxy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Galaxy.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (updated === 0) {
      return res.status(404).json({ error: 'Galaxy not found' });
    }

    const updatedGalaxy = await Galaxy.findByPk(req.params.id);

    res.json(updatedGalaxy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Galaxy.destroy({ where: { id: req.params.id } });
    if (deleted === 0) {
      return res.status(404).json({ error: 'Galaxy not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/image', (req, res, next) => {
  req.params.resourceType = 'galaxies';
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const galaxy = await Galaxy.findByPk(req.params.id);
      if (!galaxy) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(404).json({ error: 'Galaxy not found' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      const imageUrl = `/images/galaxies/${req.params.id}/${req.file.filename}`;
      galaxy.imageUrl = imageUrl;
      await galaxy.save();

      res.json({ message: 'Image uploaded successfully', imageUrl: imageUrl });
    } catch (err) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ error: err.message });
    }
  });
});

module.exports = router;
