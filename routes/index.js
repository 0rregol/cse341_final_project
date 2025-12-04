const router = require('express').Router();

router.use('/', require('./swagger'));
router.get('/', (req, res) => { res.send('Fire Dept API Working'); });

router.use('/volunteers', require('./volunteers'));
router.use('/trucks', require('./trucks'));
router.use('/stations', require('./stations'));
router.use('/incidents', require('./incidents'));

module.exports = router;