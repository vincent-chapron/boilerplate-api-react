'use strict';

const express = require('express');

const helloRoutes = require('./routes/hello');

let routes = express.Router();

/**
 * USE YOUR ROUTES HERE
 */
routes.use('/hello', helloRoutes);

module.exports = routes;
