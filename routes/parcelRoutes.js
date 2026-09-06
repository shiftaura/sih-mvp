const router = require('express').Router();

router.get('/', async (req, res) => {
    res.status(200).json({ success: true, data: { message: "Parcel routes are working" } });
});

router.get('/:parcelId', async (req, res) => {
    const { parcelId } = req.params;
    res.status(200).json({ success: true, data: { message: `Parcel ID: ${parcelId}` } });
});
router.post('/', async (req, res) => {
    const { parcelData } = req.body;
    res.status(201).json({ success: true, data: { message: "Parcel created successfully", parcelData } });
});

router.get('/:parcelId/owners', async (req, res) => {
    const { parcelId } = req.params;
    res.status(200).json({ success: true, data: { message: `Owners of Parcel ID: ${parcelId}` } });
});

module.exports = router;