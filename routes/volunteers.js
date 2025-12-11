const express = require('express');
const router = express.Router();
const volunteersController = require('../controllers/volunteers');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', volunteersController.getAllVolunteers);
router.get('/:id', volunteersController.getVolunteerById);
router.post('/', isAuthenticated, validation.volunteerRules(), validation.checkData, volunteersController.createVolunteer);
router.put('/:id', isAuthenticated, validation.volunteerRules(), validation.checkData,volunteersController.updateVolunteer);
router.delete('/:id', isAuthenticated, volunteersController.deleteVolunteer);

module.exports = router;