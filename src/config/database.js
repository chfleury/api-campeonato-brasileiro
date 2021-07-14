const mysql = require('mysql');

/// Arquivo de configuração da conexão com o MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'teste_medipreco',
});

module.exports = connection;
