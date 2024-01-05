const User = require('../models/usermodel');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');


exports.register = async (req, res) => {
  try {
    const { login, password } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (login && typeof login === 'string' && password && typeof password === 'string' && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {

      const existingUser = await User.findOne({ login });
      if (existingUser) {
        if (req.file) {
          const filePath = req.file.path;
          fs.unlinkSync(filePath);
        }
        return res.status(409).send({ message: 'User with this login already exists.' });
      }

      const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename });
      res.status(201).json('Created user ' + user.login + ' id =' + user._id);

    } else {
    
      if (req.file) {
        const filePath = req.file.path;
        fs.unlinkSync(filePath);
      }

      res.status(400).json({ message: 'Bad request' });
    }

  } catch (error) {
   
    res.status(500).json({ message: error.message });
  }
}


exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (login && typeof login === 'string' && password && typeof password === 'string') {
      const user = await User.findOne({ login })
      if (!user) {
        res.status(400).json({ message: 'Login or password is incorrect!' })
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = {};
          req.session.user.id = user._id;
          req.session.user.login = user.login;

          res.status(200).json({ message: 'Login successful', id: user._id })
        } else {
          res.status(400).json({ message: 'Login or password is incorrect!' })
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: error })
  }
};

exports.getUser = async (req, res) => {
  if (req.session.user) {
    res.json(req.session.user); 
  } 
};


exports.userLogout = async (req, res) => {

  req.session.destroy();

  res.json({message: 'You are logged out'});



}

