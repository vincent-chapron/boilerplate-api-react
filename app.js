var fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey  = fs.readFileSync('/etc/letsencrypt/live/chapron.io/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/chapron.io/cert.pem', 'utf8');

const request = require('request');

const credentials = {key: privateKey, cert: certificate};
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) => {
	if (req.protocol === 'http') {
		res.writeHead(301, {'Location': `https://${req.get('host')}${req.url}`});
		res.end();
	} else {
		next();
	}
});
app.use(bodyParser.json());

/*
 * LOGIC HERE 
 */
app.get('/', (req, res, next) => {
	res.json({success: true});
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);
