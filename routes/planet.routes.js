const express = require('express');
const fs = require('fs');
const { Planet } = require('../models/models');
const { createUploadMiddleware } = require('../multer-config');

const router = express.Router();

const upload = createUploadMiddleware();

router.post('/', async (req, res) => {
  try {
    console.log(req.body);

    const planet = await Planet.create(req.body);
    res.status(201).json(planet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const planets = await Planet.findAll();
    res.status(200).json(planets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);
    if (!planet) return res.status(404).json({ error: 'Planet not found' });
    res.json(planet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Planet.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (updated === 0) {
      return res.status(404).json({ error: 'Planet not found' });
    }

    const updatedPlanet = await Planet.findByPk(req.params.id);

    res.json(updatedPlanet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Planet.destroy({ where: { id: req.params.id } });
    if (deleted === 0) {
      return res.status(404).json({ error: 'Planet not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/image', upload.single('image'), async (req, res) => {
  try {
    const planet = await Planet.findByPk(req.params.id);

    if (!planet) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ error: 'Planet not found' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageUrl = `/images/planets/${req.params.id}/${req.file.filename}`;
    planet.Image = imageUrl;
    await planet.save();

    res.json({ message: 'Image uploaded successfully', imageUrl: imageUrl });
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path); 
    }
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
