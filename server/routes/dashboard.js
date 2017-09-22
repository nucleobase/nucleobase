const express = require('express');
const middleware = require('../middleware');
const path = require('path');

const router = express.Router();

router.route('/')
  .get(middleware.auth.profile, middleware.auth.verify, (req, res) => {
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

router.route('/profile')
  .get(middleware.auth.profile, middleware.auth.verify, (req, res) => {
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

router.route('/schedule')
  .get(middleware.auth.profile, middleware.auth.verify, (req, res) => {
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

router.route('/trainers')
  .get(middleware.auth.profile, middleware.auth.verify, (req, res) => {
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

router.route('/clients')
  .get(middleware.auth.profile, middleware.auth.verify, (req, res) => {
    res.sendFile(path.join(__dirname + '/../../public/dist/index.html'));
  });

module.exports = router;