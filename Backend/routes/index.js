const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const beritaRoutes = require('./beritaRoutes');
const tarifListrikRoutes = require('./tarifListrikRoutes');
const tarifPPJRoutes = require('./tarifPPJRoutes');

//base routes
router.use('/auth', authRoutes);
router.use('/berita', beritaRoutes);
router.use('/tarif-listrik', tarifListrikRoutes);
router.use('/tarif-ppj', tarifPPJRoutes);

module.exports = router;