const express = require('express');
const routes = require('./routes');
// const database = require('./config/database');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();

    // database.connect();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
