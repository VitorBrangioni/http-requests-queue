require('console-stamp')(console, '[HH:MM:ss.l]');

const fs = require('fs');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { router } = require('./api');
const app = express();

app.set('port', (process.env.PORT || 3000));

app.use(cors());
app.use('/api', router);

app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});