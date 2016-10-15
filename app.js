import path from 'path';
import http from 'http';
import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';

import apiRoutes from './api/routes';
import frontRoutes from './front/routes';
import serverConfiguration from './configuration/server';
import { handleRender } from './configuration/react';
import { PREFIX } from './configuration/api';

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'front', 'views'));

app.use(favicon(path.join(__dirname, 'front', 'public', 'favicon.ico')));
app.use(serverConfiguration.logger(path.join(__dirname, 'logs')));
app.use(serverConfiguration.redirectToSSL());
app.use(handleRender);
/**
 * historyApiFallback not necessary if react server rending is enable.
 * app.use(serverConfiguration.historyApiFallback());
 */
app.use(bodyParser.json());
app.use(PREFIX, apiRoutes);
app.use(frontRoutes);
app.use(express.static(path.join(__dirname, 'front', 'public')));

if (serverConfiguration.credentials !== null) {
    const httpsServer = https.createServer(serverConfiguration.credentials, app);
    httpsServer.listen(serverConfiguration.httpsPort, err => {
        (err) ? console.log('ERROR: ', err) : console.log('HTTPS RUNNING ON PORT', serverConfiguration.httpsPort);
    });
}

const httpServer = http.createServer(app);
httpServer.listen(serverConfiguration.httpPort, err => {
    (err) ? console.log('ERROR: ', err) : console.log('HTTP RUNNING ON PORT', serverConfiguration.httpPort);
});
