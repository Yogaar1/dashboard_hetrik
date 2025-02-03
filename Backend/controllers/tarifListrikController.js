const { TarifDasarListrik } = require("../models"); 

exports.getAllTarifListrik = async (req, res) => {
    try {
        const tarifListrik = await TarifDasarListrik.findAll();

        const tarifListrikFormatted = tarifListrik.map(item => ({
            ...item.dataValues,
            tarif_listrik: parseFloat(item.tarif_listrik).toFixed(2),
        }));

        res.status(200).json(tarifListrikFormatted);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Failed to fetch data' });
    }
};

exports.addTarifListrik = async (req, res) => {
    const { jenis_daya, nilai_daya, tarif_listrik, tanggal_dibuat } = req.body;

    if (!jenis_daya || !nilai_daya || !tarif_listrik || !tanggal_dibuat) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newTarif = await TarifDasarListrik.create({
            jenis_daya,
            nilai_daya,
            tarif_listrik,
            tanggal_dibuat,
        });

        res.status(201).json({ message: 'Data successfully added.', id: newTarif.id });
    } catch (err) {
        console.error('Error adding data:', err);
        res.status(500).json({ message: 'Failed to add data.' });
    }
};

exports.updateTarifListrik = async (req, res) => {
    const { id } = req.params;
    const { jenis_daya, nilai_daya, tarif_listrik, tanggal_dibuat } = req.body;

    if (!jenis_daya || !nilai_daya || !tarif_listrik || !tanggal_dibuat) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const [updated] = await TarifDasarListrik.update(
            { jenis_daya, nilai_daya, tarif_listrik, tanggal_dibuat },
            { where: { id } }
        );

        if (updated === 0) {
            return res.status(404).json({ message: 'Data not found.' });
        }

        res.status(200).json({ message: 'Data successfully updated.' });
    } catch (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ message: 'Failed to update data.' });
    }
};

exports.deleteTarifListrik = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await TarifDasarListrik.destroy({ where: { id } });

        if (deleted === 0) {
            return res.status(404).json({ message: 'Data not found.' });
        }

        res.status(200).json({ message: 'Data successfully deleted.' });
    } catch (err) {
        console.error('Error deleting data:', err);
        res.status(500).json({ message: 'Failed to delete data.' });
    }
};