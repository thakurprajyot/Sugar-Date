const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const imageController = require('../controllers/imageController');

router.post('/upload', upload.single('image'), imageController.uploadImage);

module.exports = router;
