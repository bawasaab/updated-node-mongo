var express = require('express');
var router = express.Router();
var UsersRouter = require('./UsersRouter');
var PatientRouter = require('./PatientRouter');
var DoctorRouter = require('./DoctorRouter');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', UsersRouter);
router.use('/patients', PatientRouter);
router.use('/doctors', DoctorRouter);

module.exports = router;
