const express = require('express');
const routes = require('./routes');
const database = require('./config/database');

/// Classe principal da aplicação
class App {
  /// No método constructor, que será iniciado assim que a classe App for instanciada
  /// É executado tudo que precisamos qunado a aplicacao inicia
  constructor() {
    // Instanciando o express
    this.server = express();

    // Usando o express.json
    this.server.use(express.json());

    // Usando as routes
    this.server.use(routes);

    // Fazendo a conexão com o MySQL
    database.connect();
  }
}

module.exports = new App().server;
