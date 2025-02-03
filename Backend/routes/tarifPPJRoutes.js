const express = require('express');
const {
    getAllTarifPPJ,
    addTarifPPJ,
    updateTarifPPJ,
    deleteTarifPPJ,
} = require('../controllers/tarifPPJController');

const router = express.Router();

router.get('/', getAllTarifPPJ);
router.post('/', addTarifPPJ);
router.put('/:id', updateTarifPPJ);
router.delete('/:id', deleteTarifPPJ);

module.exports = router;