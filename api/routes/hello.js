'use strict';

const express = require('express');

let routes = express.Router();

routes.get('/:name', (req, res, next) => {
    res.json({name: `hello ${req.params.name} !`});
});

module.exports = routes;
