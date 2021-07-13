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

  async y(req, res) {
    connection.query(
      'SELECT artilheiros, gols FROM campeoes_brasileiro',
      function (err, rows, fields) {
        if (err) {
          console.log(err);
        }
        // var str = 'Ademar Pantera (Flamengo) César Maluco (Palmeiras)'.replace(
        //   / *\([^)]*\) */g,
        //   ','
        // );
        var data = [];
        var counts = {};

        rows.forEach((element) => {
          var str = element.artilheiros.replace(/ *\([^)]*\) */g, ',');
          var temp = str.split(',');
          temp.pop();

          temp.forEach((e) => {
            counts[e] = element.gols + (counts[e] || 0);

            // array.push({e:});
            // array[e]['gols'] += element['gols'] || {};
            // array.push(...({ artilheiro: e, gols: element.gols } || []));
          });
        });

        // var j = str.split(',');
        // j.pop();
        var sortable = [];
        for (var x in counts) {
          sortable.push([x, counts[x]]);
        }

        sortable.sort(function (a, b) {
          return b[1] - a[1];
        });

        for (var i = 0; i < 5; i++) {
          data.push({
            artilheiro: sortable[i][0],
            gols: sortable[i][1],
          });
        }
        res.json(data);
      }
    );
  }

  async z(req, res) {
    connection.query(
      'SELECT vice, COUNT(vice) AS vezes FROM campeoes_brasileiro GROUP BY vice ORDER BY COUNT(vice) DESC LIMIT 1;',
      function (err, rows, fields) {
        if (err) {
          console.log(err);
        }
        res.json(rows[0]);
      }
    );
  }
}

module.exports = new Controller();
