const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out");
});

router.use('/volunteers', require('./volunteers'));
router.use('/trucks', require('./trucks'));
router.use('/stations', require('./stations'));
router.use('/incidents', require('./incidents'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;