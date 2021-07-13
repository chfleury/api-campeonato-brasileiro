const { Router } = require('express');
const Controller = require('./controllers/controller');
const routes = new Router();

routes.get('/', Controller.fetchTimes);
routes.get('/time_com_mais_de_dois_titulos', Controller.timesComMaisDe2Titulos);
routes.get('/x', Controller.x);
routes.get('/y', Controller.y);
routes.get('/z', Controller.z);

module.exports = routes;
