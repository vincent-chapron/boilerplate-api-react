'use strict';

const express = require('express');

let routes = express.Router();

routes.get('/', (req, res, next) => {
	res.render('index');
});

module.exports = routes;
