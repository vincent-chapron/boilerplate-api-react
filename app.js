'use strict';

const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');

const apiConfiguration = require('./configuration/api');
const serverConfigurationClass = require('./configuration/server');
const apiRoutes = require('./api/routes');
const frontRoutes = require('./front/routes');

const app = express();
const serverConfiguration = new serverConfigurationClass();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'front', 'views'));

app.use(serverConfiguration.redirectToSSL());
app.use(serverConfiguration.historyApiFallback());
app.use(bodyParser.json());
app.use(apiConfiguration.prefix, apiRoutes);
app.use(frontRoutes);
app.use(express.static(path.join(__dirname, 'front', 'public')));

if (serverConfiguration.credentials !== null) {
    console.log(serverConfiguration.credentials);
    const httpsServer = https.createServer(serverConfiguration.credentials, app);
    httpsServer.listen(serverConfiguration.httpsPort);
}

const httpServer = http.createServer(app);
httpServer.listen(serverConfiguration.httpPort);
