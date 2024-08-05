const { createFlickr } = require('flickr-sdk');
const fs = require('fs');
const path = require('path');
const UploadedImage = require('../models/UploadedImages');

// Initialize Flickr client with API credentials
const { upload } = createFlickr({
  consumerKey: process.env.FLICKR_API_KEY,
  consumerSecret: process.env.FLICKR_API_SECRET,
  oauthToken: process.env.FLICKR_OAUTH_TOKEN,
  oauthTokenSecret: process.env.FLICKR_OAUTH_TOKEN_SECRET,
});

// Function to upload image to Flickr
async function uploadImageToFlickr(imagePath, title = 'Yu-Gi-Oh! Card Image', tags = 'Yu-Gi-Oh!') {
  try {
    const id = await upload(imagePath, {
      title,
      description: tags,
    });

    // Extract the photo ID from the result
    return id;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// Function to upload all images
async function uploadAllImages() {
  const imageDir = path.join(__dirname, '..', 'images'); // Directory where images are stored locally
  const imageFiles = fs.readdirSync(imageDir);

  for (const file of imageFiles) {
    const imagePath = path.join(imageDir, file);
    const imageUrl = `https://images.ygoprodeck.com/images/cards/${path.parse(file).name}.jpg`; // Adjust according to your image URL pattern
    
    const alreadyUploaded = await UploadedImage.findOne({ where: { imageUrl } });

    if (!alreadyUploaded) {
      try {
        const photoId = await uploadImageToFlickr(imagePath);
        await UploadedImage.create({ imageUrl, photoId });
        console.log(`Uploaded ${file} to Flickr with ID: ${photoId}`);
      } catch (error) {
        console.error(`Error uploading ${file}:`, error);
      }
    } else {
      console.log(`Image ${file} already uploaded.`);
    }
  }
}

module.exports = {
  uploadAllImages,
};
