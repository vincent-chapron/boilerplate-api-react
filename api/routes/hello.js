import express from 'express';

let routes = express.Router();

routes.get('/:name', (req, res, next) => {
    res.json({name: `hello ${req.params.name} !`});
});

export default routes;
