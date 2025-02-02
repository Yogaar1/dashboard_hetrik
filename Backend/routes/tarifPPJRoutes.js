const express = require('express');
const {
    getAllTarifPPJ,
    addTarifPPJ,
    updateTarifPPJ,
    deleteTarifPPJ,
} = require('../controllers/tarifPPJController');

const router = express.Router();

// Route for getting all PPJ tariffs
router.get('/', getAllTarifPPJ);

// Route for adding a new PPJ tariff
router.post('/', addTarifPPJ);

// Route for updating a PPJ tariff
router.put('/:id', updateTarifPPJ);

// Route for deleting a PPJ tariff
router.delete('/:id', deleteTarifPPJ);

module.exports = router;
