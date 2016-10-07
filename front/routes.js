'use strict';

const express = require('express');

let routes = express.Router();

routes.get('/index.html', (req, res, next) => {
    res.render('index', {title: 'react + api boilerplate'});
});

module.exports = routes;
