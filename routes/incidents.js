const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidents');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/', isAuthenticated, validation.incidentRules(), validation.checkData, controller.createIncident);
router.put('/:id', isAuthenticated, validation.incidentRules(), validation.checkData, controller.updateIncident);
router.delete('/:id', isAuthenticated, controller.deleteIncident);

module.exports = router;