const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const UserController = require('../controllers/user');

     router.post('/signup', UserController.user_signup);
     router.post('/login/user', UserController.user_login);

        module.exports = router;