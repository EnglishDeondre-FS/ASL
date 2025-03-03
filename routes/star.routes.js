const express = require('express');
const fs = require('fs');
const { Star, Planet } = require('../models/models');
const { createUploadMiddleware } = require('../multer-config');

const router = express.Router();

const upload = createUploadMiddleware();

router.post('/', async (req, res) => {
  try {
    const star = await Star.create(req.body);
    res.status(201).json(star);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const stars = await Star.findAll({ include: Planet });
    res.status(200).json(stars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const star = await Star.findByPk(req.params.id, { include: Planet });
    if (!star) return res.status(404).json({ error: 'Star not found' });
    res.json(star);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Star.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (updated === 0) {
      return res.status(404).json({ error: 'Star not found' });
    }

    const updatedStar = await Star.findByPk(req.params.id);

    res.json(updatedStar);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Star.destroy({ where: { id: req.params.id } });
    if (deleted === 0) {
      return res.status(404).json({ error: 'Star not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/image', (req, res, next) => {
  req.params.resourceType = 'stars';
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const star = await Star.findByPk(req.params.id);
      if (!star) {
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(404).json({ error: 'Star not found' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
      }

      const imageUrl = `/images/stars/${req.params.id}/${req.file.filename}`;
      star.imageUrl = imageUrl;
      await star.save();

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
