const cloudinary = require('cloudinary');
const fs = require('fs');

cloudinary.config({
  cloud_name: 'your_cloud_name',
  api_key: 'your_api_key',
  api_secret: 'your_api_secret',
});

exports.uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.file.buffer, {
      folder: 'your_folder',
      public_id: req.file.originalname,
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
