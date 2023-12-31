const Ad = require('../models/admodel');
const user = require('../models/usermodel');

const AdsController = {
  getAll: async (req, res) => {
    try {
      const ads = await Ad.find().populate('user');
      res.json(ads);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const ad = await Ad.findById(req.params.id).populate('user');
      if (ad) {
        res.json(ad);
      } else {
        res.status(404).json({ message: 'Ad not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addNewAd: async (req, res) => {
    const ad = new Ad(req.body);
    try {
      const newAd = await ad.save();
      res.status(201).json(newAd);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateAd: async (req, res) => {
    try {
      const updatedAd = await Ad.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(updatedAd);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteAd: async (req, res) => {
    try {
      await Ad.findByIdAndDelete(req.params.id);
      res.json({ message: 'Ad deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

 searchAdsByTitle: async (req, res) => {
  try {
    const searchPhrase = req.params.searchPhrase;
    const matchingAds = await Ad.find({ title: { $regex: searchPhrase}});
    res.json(matchingAds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
};


module.exports = AdsController;
