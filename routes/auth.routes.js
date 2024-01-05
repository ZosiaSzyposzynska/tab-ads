const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUploads');


router.post('/register', imageUpload.single('avatar'),  auth.register);

router.post('/login', auth.login);

router.get('/user', authMiddleware, auth.getUser);

router.delete('/logout', authMiddleware, auth.userLogout );


module.exports = router;