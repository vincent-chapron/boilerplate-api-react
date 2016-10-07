'use strict';

const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');

const serverConfigurationClass = require('./configuration/server');
const apiRoutes = require('./api/routes');
const frontRoutes = require('./front/routes');

const app = express();
const serverConfiguration = new serverConfigurationClass();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'front', 'views'));

app.use(serverConfiguration.redirectToSSL());
app.use(bodyParser.json());
app.use('/api', apiRoutes);
app.use('/', frontRoutes);

if (serverConfiguration.credentials !== null) {
	console.log(serverConfiguration.credentials);
	const httpsServer = https.createServer(serverConfiguration.credentials, app);
	httpsServer.listen(serverConfiguration.httpsPort);
}

const httpServer = http.createServer(app);
httpServer.listen(serverConfiguration.httpPort);
