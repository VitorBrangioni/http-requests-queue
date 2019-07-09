const { Router } = require('express');
const bodyParser = require('body-parser');
const count = require('./count').router;
const router = Router();

router.use(bodyParser.json({limit: '10mb'}));
router.use('/count', count);

exports.router = router;