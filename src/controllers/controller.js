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

  async timesComMaisDe2Titulos(req, res) {
    connection.connect();

    const query =
      'SELECT vencedor, count(vencedor) AS vitórias FROM campeoes_brasileiro GROUP BY vencedor HAVING COUNT(vencedor) > 2 ORDER BY COUNT(vencedor) DESC';

    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log(err);
      }
      res.json(rows);
    });

    connection.end();
  }
}

module.exports = new Controller();
