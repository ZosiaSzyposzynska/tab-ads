const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUploads');


router.get('/ads', AdsController.getAll);

router.get('/ads/:id', AdsController.getById);

router.post('/ads', imageUpload.single('image'), authMiddleware, AdsController.addNewAd);

router.put('/ads/:id', imageUpload.single('image'), authMiddleware, AdsController.updateAd);

router.delete('/ads/:id', authMiddleware, AdsController.deleteAd); 

router.get('/search/:searchPhrase', AdsController.searchAdsByTitle);

module.exports = router;