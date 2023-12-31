const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');


router.get('/ads', AdsController.getAll);

router.get('/ads/:id', AdsController.getById);

router.post('/ads', AdsController.addNewAd);

router.put('/ads/:id', AdsController.updateAd);

router.delete('/ads/:id', AdsController.deleteAd); 

router.get('/search/:searchPhrase', AdsController.searchAdsByTitle);

module.exports = router;