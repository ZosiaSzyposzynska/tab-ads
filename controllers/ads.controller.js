const Ad = require('../models/admodel');


  exports.getAll = async (req, res) => {
    try {
      const ads = await Ad.find().populate('user');
      res.json(ads);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  exports.getById = async (req, res) => {
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

  exports.addNewAd = async (req, res) => {
    const ad = new Ad(req.body);
    try {
      const newAd = await ad.save();
      res.status(201).json(newAd);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  exports.updateAd = async (req, res) => {
    try {
      const updatedAd = await Ad.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json(updatedAd);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  exports.deleteAd = async (req, res) => {
    try {
      await Ad.findByIdAndDelete(req.params.id);
      res.json({ message: 'Ad deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

 exports.searchAdsByTitle =  async (req, res) => {
  try {
    const searchPhrase = req.params.searchPhrase;
    const matchingAds = await Ad.find({ title: { $regex: searchPhrase}});
    res.json(matchingAds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

