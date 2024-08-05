const express = require('express');
const router = express.Router();
const { uploadAllImages } = require('../controllers/flickrController');

router.post('/upload', async (req, res) => {
  try {
    await uploadAllImages();
    res.status(200).send('Images uploaded successfully.');
  } catch (error) {
    res.status(500).send('Error uploading images.');
  }
});

module.exports = router;
