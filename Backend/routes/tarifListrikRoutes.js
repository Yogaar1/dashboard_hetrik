const express = require('express');
const {
    getAllTarifListrik,
    addTarifListrik,
    updateTarifListrik,
    deleteTarifListrik,
} = require('../controllers/tarifListrikController');

const router = express.Router();

router.get('/', getAllTarifListrik);
router.post('/', addTarifListrik);
router.put('/:id', updateTarifListrik);
router.delete('/:id', deleteTarifListrik);

module.exports = router;