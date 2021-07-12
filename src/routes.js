const { Router } = require('express');
const Controller = require('./controllers/controller');
const routes = new Router();

routes.get('/', Controller.fetchTimes);

module.exports = routes;
