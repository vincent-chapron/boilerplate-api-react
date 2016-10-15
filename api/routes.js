import express from 'express';

import helloRoutes from './routes/hello';

let routes = express.Router();

/**
 * USE YOUR ROUTES HERE
 */
routes.use('/hello', helloRoutes);

export default routes;
