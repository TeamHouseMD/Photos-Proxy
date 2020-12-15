const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');
const client = require('./router/')

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const app = express();

app.use(morgan('dev'));
app.use(express.static(PUBLIC_DIR));

app.get('/loaderio-da775ca393b463698d924dd5f047a5aa.txt', (req, res) => {
	res.sendFile(path.join(__dirname, '../loaderio.txt'));
})

// Middleware to catch any IDs that are in the Redis cache
app.use((req, res, next) => {
	console.log('req middleware: ', req);
	next();
})

// Handling asset requests for webpack bundles by passing off requests to the bundles router
app.use('/bundles', router.bundles);
// Handling AJAX requests to the API by passing off requests to the api router
app.use('/api', router.api);

module.exports = app;
