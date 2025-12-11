const { body, validationResult } = require('express-validator');

const validate = {};


validate.volunteerRules = () => {
  return [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Must be a valid email address'),
    body('badgeNumber').notEmpty().withMessage('Badge number is required'),
    body('stationId').notEmpty().withMessage('Station ID is required')
  ];
};

validate.truckRules = () => {
  return [
    body('plateNumber').notEmpty().withMessage('Plate number is required'),
    body('brand').notEmpty().withMessage('Brand is required'),
    body('model').notEmpty().withMessage('Model is required'),
    body('year').isInt({ min: 1900, max: 2025 }).withMessage('Year must be a valid number'),
    body('status').isIn(['Active', 'Maintenance', 'Repair', 'Retired']).withMessage('Status must be: Active, Maintenance, Repair, or Retired')
  ];
};


validate.stationRules = () => {
  return [
    body('name').notEmpty().withMessage('Station name is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('phone').isLength({ min: 8 }).withMessage('Phone number must be at least 8 digits')
  ];
};


validate.incidentRules = () => {
  return [
    body('type').notEmpty().withMessage('Incident type is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('date').isISO8601().withMessage('Date must be in YYYY-MM-DD format'),
    body('status').isIn(['Active', 'Closed']).withMessage('Status must be Active or Closed')
  ];
};


validate.checkData = (req, res, next) => {
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    // RÚBRICA: Retorna error 400 si la validación falla
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;