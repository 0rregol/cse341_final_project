const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidents');

router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/', controller.createIncident);
router.put('/:id', controller.updateIncident);
router.delete('/:id', controller.deleteIncident);

module.exports = router;