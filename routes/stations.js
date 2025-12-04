const express = require('express');
const router = express.Router();
const controller = require('../controllers/stations');

router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/', controller.createStation);
router.put('/:id', controller.updateStation);
router.delete('/:id', controller.deleteStation);

module.exports = router;