var express = require('express');
var router = express.Router();
var apiRoutes = require('../api/apiRoutes');

router.use('/api', apiRoutes);

/* GET home page. */
router.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../output/index.html'));
});

module.exports = router;
