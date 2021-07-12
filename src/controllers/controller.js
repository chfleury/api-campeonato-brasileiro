const connection = require('../config/database');

class Controller {
  async fetchTimes(req, res) {
    connection.connect();

    connection.query(
      'SELECT * FROM campeoes_brasileiro',
      function (err, rows, fields) {
        if (err) {
          console.log(err);
        }
        res.json(rows);
      }
    );

    connection.end();
  }
}

module.exports = new Controller();
