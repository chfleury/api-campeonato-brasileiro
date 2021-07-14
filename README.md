# Teste Medipreço



## Endpoints
Todos os endpoints tem nomes longos para facilitar e distingui-los entre si

Os times com mais de dois títulos brasileiros:<br />
**/time_com_mais_de_dois_titulos**
 
O time com mais artilheiros em todos os campeonatos:<br />
**/time_com_mais_artilheiros**
 
Os cinco (5) principais artilheiros da história do campeonato:<br />
  **/cinco_principais_artilheiros**
 
O time com mais vice-campeonatos da história:<br />
**/time_com_mais_vice_campeonatos**
 
Os times que mais ficaram classificados entre os quatro primeiros colocados, porém nunca venceram o campeonato brasileiro:<br />
**/classificados_que_nunca_venceram**
 
A lista de artilheiros que possuem determinada quantidade de gols:<br />
**/artilheiros_por_gols?gols=32**

## Arquivos
* **./Controllers/controller.js**: Arquivo onde são feitas todas as chamadas e tratamentos dos dados 
* **./routes.js**: Arquivo onde ficam todas as rotas de endpoints da aplicação 
* **./Config/database.js** Arquivo onde é feita a configuração do MySQL 
* **./src/app.js** Arquivo onde o express é iniciado e a conexão com a DB é feita 
* **./src/index.js** Arquivo index da aplicação

## Arquivo SQL
O arquivo  **teste_medipreco.sql** se encontra na pasta raiz da aplicação.<br />
Por conveniencia, apenas usei um conversor de svg para sql para obter a base de dados.

## Dependencias
Nesse projeto foram utilizadas apenas as dependencias do Express e MySQL

## Como executar a aplicação
1. Clone esse repositório para sua máquina
1. Após efetuar o clone, execute **npm install** na pasta raiz do projeto para instalar todas as dependencias
1. Para iniciar a aplicação, execute o comando **node ./src/index.js** na pasta raiz do projeto<br />
A aplicação está usando a porta 3333, pode ser mudadada no arquivo src/index.js

