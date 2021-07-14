const { Router } = require('express');
const Controller = require('./controllers/controller');
const routes = new Router();

/// Aqui estão todas as rotas, e seus respectivos métodos no arquivo Controller.js

routes.get('/time_com_mais_de_dois_titulos', Controller.timesComMaisDe2Titulos);
routes.get('/time_com_mais_artilheiros', Controller.timeComMaisArtilheiros);
routes.get(
  '/cinco_principais_artilheiros',
  Controller.cincoPrincipaisArtilheiros
);
routes.get(
  '/time_com_mais_vice_campeonatos',
  Controller.timeComMaisViceCampeonatos
);
routes.get(
  '/classificados_que_nunca_venceram',
  Controller.classificadosQueNuncaVenceram
);
routes.get('/artilheiros_por_gols', Controller.artilheirosPorGols);

module.exports = routes;
