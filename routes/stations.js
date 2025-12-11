const express = require('express');
const router = express.Router();
const controller = require('../controllers/stations');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/', isAuthenticated, validation.stationRules(), validation.checkData, controller.createStation);
router.put('/:id', isAuthenticated,validation.stationRules(), validation.checkData, controller.updateStation);
router.delete('/:id', isAuthenticated, controller.deleteStation);

module.exports = router;