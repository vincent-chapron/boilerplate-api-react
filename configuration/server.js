'use strict';

const fs = require('fs');
const path = require('path');
const history = require('connect-history-api-fallback');
const fileStreamRotator = require('file-stream-rotator');
const logger = require('morgan');

const apiConfiguration = require('./api'); 

class ServerConfiguration {

    constructor() {
        let encoding = process.env.APP_ENCODING || 'utf-8';
        let privateKeyFilePath = process.env.APP_PRIVATEKEY || 'privatekey.pem';
        let certificateFilePath = process.env.APP_CERTIFICATE || 'cert.pem';

        this.httpPort = process.env.APP_PORT || '8080';
        this.httpsPort = process.env.APP_SSL_PORT || '8443';
        try {
            let privateKey  = fs.readFileSync(privateKeyFilePath, this.encoding);
            let certificate = fs.readFileSync(certificateFilePath, this.encoding);

            this.credentials = {key: privateKey, cert: certificate};
        } catch (exception) {
            this.credentials = null;
        }
    }

    redirectToSSL() {
        return (req, res, next) => {
            if (this.credentials !== null && req.protocol === 'http') {
                res.writeHead(301, { 'Location': `https://${req.get('host')}${req.url}` });
                res.end();
            } else {
                next();
            }
        };
    }

    historyApiFallback() {
        let matchRoutes = new RegExp(`^${apiConfiguration.prefix}/?.*$`);

        return history({
            rewrites: [{
                from: matchRoutes,
                to: context => context.parsedUrl.path
            }]
        });
    }

    logger(logDirectory) {
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

        let accessLogStream = fileStreamRotator.getStream({
            date_format: 'YYYYMMDD',
            filename: path.join(logDirectory, 'access-%DATE%.log'),
            frequency: 'daily',
            verbose: false
        });

        if ('NODE_ENV' in process.env && process.env.NODE_ENV === 'production') {
            return logger('tiny', {stream: accessLogStream});
        } else {
            return logger('dev');
        }
    }

}

module.exports = new ServerConfiguration();
