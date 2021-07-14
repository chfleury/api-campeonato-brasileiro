const connection = require('../config/database');

class Controller {
  /// Os times com mais de dois títulos brasileiros
  async timesComMaisDe2Titulos(req, res) {
    const query =
      'SELECT vencedor, count(vencedor) AS vitórias FROM campeoes_brasileiro GROUP BY vencedor HAVING COUNT(vencedor) > 2 ORDER BY COUNT(vencedor) DESC';

    // Fazendo a busca no DB com a query declarada acima
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log(err);
      }
      res.json(rows);
    });
  }

  /// O time com mais artilheiros em todos os campeonatos
  async timeComMaisArtilheiros(req, res) {
    const query =
      'SELECT artilheiros AS artilheiro, COUNT(artilheiros) AS vezes FROM campeoes_brasileiro GROUP BY artilheiros';

    // Fazendo a busca no DB com a query declarada acima
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log(err);
      }
      var data = [];
      var array = [];
      rows.forEach((element) => {
        var str = element.artilheiro;
        // Usando Regex para pegar apenas o nome dos times exemplo, Fábio (Santos) Roger(Flamengo) irá ser adicionado ao array como ['Santos', 'Flamengo']
        array.push(...(str.match(/\(.+?\)/g) || []));
      });

      var counts = {};
      // Contando quais os times são os com mais artilheiros
      for (var i = 0; i < array.length; i++) {
        counts[array[i]] = 1 + (counts[array[i]] || 0);
      }

      // Passando de objeto para array para poder ordenar os times com mais artilheiros
      var sortable = [];
      for (var x in counts) {
        sortable.push([x, counts[x]]);
      }

      // ordenando os dados
      sortable.sort(function (a, b) {
        return b[1] - a[1];
      });

      // Formatando os dados já ordenados e tirando os Parenteses do nome do time
      sortable.forEach((element) => {
        data.push({
          time: element[0].slice(1, -1),
          artilheiros: element[1],
        });
      });

      // Retornando os dados
      res.json(data);
    });
  }

  ///Os cinco (5) principais artilheiros da história do campeonato
  async cincoPrincipaisArtilheiros(req, res) {
    const query = 'SELECT artilheiros, gols FROM campeoes_brasileiro';

    /// Fazendo a busca no DB com a query declarada acima
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log(err);
      }

      var data = [];
      var counts = {};

      // Excluindo os times da string dos artilheiros e adicionando num array
      // Ex: Flávio (Santos) Roger (Flamento) vira um array temp = ['Flávio', 'Roger']
      rows.forEach((element) => {
        var str = element.artilheiros.replace(/ *\([^)]*\) */g, ',');
        var temp = str.split(',');
        temp.pop();

        // Para cada vez que o nome do artilheiro aparece, incrementa-se seus gols
        temp.forEach((e) => {
          counts[e] = element.gols + (counts[e] || 0);
        });
      });

      // Passando de objeto para array para que possa ser feita a ordenação
      var sortable = [];
      for (var x in counts) {
        sortable.push([x, counts[x]]);
      }

      // Ordenando os dados
      sortable.sort(function (a, b) {
        return b[1] - a[1];
      });

      // Formatando os dados
      for (var i = 0; i < 5; i++) {
        data.push({
          artilheiro: sortable[i][0],
          gols: sortable[i][1],
        });
      }

      // Retornando os dados
      res.json(data);
    });
  }

  /// O time com mais vice-campeonatos da história
  async timeComMaisViceCampeonatos(req, res) {
    const query =
      'SELECT vice, COUNT(vice) AS vezes FROM campeoes_brasileiro GROUP BY vice ORDER BY COUNT(vice) DESC LIMIT 1;';

    /// Fazendo a busca no DB com a query declarada acima
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log(err);
      }
      res.json(rows[0]);
    });
  }

  /// Os times que mais ficaram classificados entre os quatro primeiros colocados, porém nunca venceram o campeonato brasileiro
  async classificadosQueNuncaVenceram(req, res) {
    // Segue a query utilizada:

    // SELECT time, COUNT(time) AS vezes
    // (
    // (SELECT vice AS time FROM campeoes_brasileiro )
    // UNION ALL
    // (SELECT terceiro_colocado  FROM campeoes_brasileiro )
    // UNION ALL
    // (SELECT quarto_colocado FROM campeoes_brasileiro)
    // )
    // AS t WHERE time NOT IN
    // (
    // SELECT vencedor AS time FROM campeoes_brasileiro
    // )
    // GROUP BY time ORDER BY COUNT(time) DESC

    const query =
      'SELECT time, COUNT(time) AS vezes FROM ( (SELECT vice AS time FROM campeoes_brasileiro ) UNION ALL (SELECT terceiro_colocado  FROM campeoes_brasileiro ) UNION ALL (SELECT quarto_colocado FROM campeoes_brasileiro) ) AS t WHERE time NOT IN ( SELECT vencedor AS time FROM campeoes_brasileiro ) GROUP BY time ORDER BY COUNT(time) DESC';

    // Consumindo a DB
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log(err);
      }
      res.json(rows);
    });
  }

  /// A lista de artilheiros que possuem determinada quantidade de gols
  async artilheirosPorGols(req, res) {
    // Capturando os query params com o número de gols para fazer a consulta
    const gols = req.query.gols;

    // Checando se foi passada a quantidade para a requisição
    if (!gols) {
      return res
        .status(400)
        .json({ message: 'Erro, informe a quantidade de gols' });
    }

    // Consumindo a DB
    const query = 'SELECT artilheiros, gols FROM campeoes_brasileiro';
    connection.query(query, function (err, rows, fields) {
      if (err) {
        console.log(err);
      }

      var data = [];
      var counts = {};

      // Percorrendo toda a lista que retornou da DB
      rows.forEach((element) => {
        // Excluindo os times da string dos artilheiros e adicionando num array
        // Ex: Flávio (Santos) Roger (Flamento) vira um array temp = ['Flávio', 'Roger']
        var str = element.artilheiros.replace(/ *\([^)]*\) */g, ',');
        var temp = str.split(',');
        temp.pop();

        // Para cada jogador encontrato, é incrementado a quantidade de seus respectivos gols
        temp.forEach((e) => {
          counts[e] = element.gols + (counts[e] || 0);
        });
      });

      // Após calculada a quantidade de gols de cada jogador, irá percorrer objeto e filtrar apenas os jogadores
      // com a qunatidade de gols enviada pelo query param
      for (var x in counts) {
        if (counts[x] == gols) {
          data.push({ artilheiro: x, numero_de_gols: counts[x] });
        }
      }

      // Retorna os dados
      res.json(data);
    });
  }
}

module.exports = new Controller();
