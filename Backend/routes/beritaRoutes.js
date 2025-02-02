const express = require('express');
const { getAllBerita, addBerita, updateBerita, deleteBerita } = require('../controllers/beritaController');

const router = express.Router();

router.get('/', getAllBerita);
router.post('/', addBerita);
router.put('/:id', updateBerita);
router.delete('/:id', deleteBerita);

module.exports = router;