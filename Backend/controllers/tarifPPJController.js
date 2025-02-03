const { TarifPPJ } = require("../models");  

exports.getAllTarifPPJ = async (req, res) => {
    try {
        const tarifPPJ = await TarifPPJ.findAll();

        const tarifPPJFormatted = tarifPPJ.map(item => ({
            ...item.dataValues,
            rate_ppj: parseFloat(item.rate_ppj).toFixed(2),
        }));

        res.status(200).json(tarifPPJFormatted);
    } catch (err) {
        console.error('Error fetching PPJ tariffs:', err);
        res.status(500).json({ message: 'Failed to fetch data' });
    }
};

exports.addTarifPPJ = async (req, res) => {
    const { provinsi, wilayah, rate_ppj, tanggal_dibuat } = req.body;

    if (!provinsi || !wilayah || !rate_ppj || !tanggal_dibuat) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newTarifPPJ = await TarifPPJ.create({
            provinsi,
            wilayah,
            rate_ppj: parseFloat(rate_ppj),
            tanggal_dibuat
        });

        res.status(201).json({ message: 'Data added successfully', id: newTarifPPJ.id });
    } catch (err) {
        console.error('Error adding PPJ tariff:', err);
        res.status(500).json({ message: 'Failed to add data' });
    }
};

exports.updateTarifPPJ = async (req, res) => {
    const { id } = req.params;
    const { provinsi, wilayah, rate_ppj, tanggal_dibuat } = req.body;

    if (!provinsi || !wilayah || !rate_ppj || !tanggal_dibuat) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const [updated] = await TarifPPJ.update(
            { provinsi, wilayah, rate_ppj: parseFloat(rate_ppj), tanggal_dibuat },
            { where: { id } }
        );

        if (updated === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.status(200).json({ message: 'Data updated successfully' });
    } catch (err) {
        console.error('Error updating PPJ tariff:', err);
        res.status(500).json({ message: 'Failed to update data' });
    }
};

exports.deleteTarifPPJ = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await TarifPPJ.destroy({ where: { id } });

        if (deleted === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }

        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (err) {
        console.error('Error deleting PPJ tariff:', err);
        res.status(500).json({ message: 'Failed to delete data' });
    }
};