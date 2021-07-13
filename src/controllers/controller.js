const connection = require('../config/database');

class Controller {
  async fetchTimes(req, res) {
    connection.query(
      'SELECT * FROM campeoes_brasileiro',
      function (err, rows, fields) {
        if (err) {
          console.log(err);
        }
        res.json(rows);
      }
    );
  }

  async timesComMaisDe2Titulos(req, res) {
    const query =
      'SELECT vencedor, count(vencedor) AS vitórias FROM campeoes_brasileiro GROUP BY vencedor HAVING COUNT(vencedor) > 2 ORDER BY COUNT(vencedor) DESC';

    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log(err);
      }
      res.json(rows);
    });
  }

  async x(req, res) {
    const query =
      'SELECT artilheiros AS artilheiro, COUNT(artilheiros) AS vezes FROM campeoes_brasileiro GROUP BY artilheiros';

    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log(err);
      }
      var data = [];
      var array = [];
      rows.forEach((element) => {
        var str = element.artilheiro;

        array.push(...(str.match(/\(.+?\)/g) || []));
      });

      var counts = {};
      for (var i = 0; i < array.length; i++) {
        counts[array[i]] = 1 + (counts[array[i]] || 0);
      }

      var sortable = [];
      for (var x in counts) {
        sortable.push([x, counts[x]]);
      }

      sortable.sort(function (a, b) {
        return b[1] - a[1];
      });

      sortable.forEach((element) => {
        data.push({
          time: element[0].slice(1, -1),
          artilheiros: element[1],
        });
      });

      res.json(data);
    });
  }
}

module.exports = new Controller();
