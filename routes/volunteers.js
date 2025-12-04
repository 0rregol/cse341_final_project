const express = require('express');
const router = express.Router();
const volunteersController = require('../controllers/volunteers');

router.get('/', volunteersController.getAllVolunteers);
router.get('/:id', volunteersController.getVolunteerById);
router.post('/', volunteersController.createVolunteer);
router.put('/:id', volunteersController.updateVolunteer);
router.delete('/:id', volunteersController.deleteVolunteer);

module.exports = router;