const express = require('express');
const router = express.Router();
const trucksController = require('../controllers/trucks');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', trucksController.getAllTrucks);
router.get('/:id', trucksController.getTruckById);
router.post('/', isAuthenticated, validation.truckRules(), validation.checkData, trucksController.createTruck);
router.put('/:id', isAuthenticated, validation.truckRules(), validation.checkData, trucksController.updateTruck);
router.delete('/:id', isAuthenticated, trucksController.deleteTruck);

module.exports = router;