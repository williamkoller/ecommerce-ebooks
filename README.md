# API - REST / Node.js

## Desenvolvendo API - REST com protocolos HTTP = ["GET", "DELETE", "PATCH", "POST"]

#### Utilizando algumas ferramentas
<ul>
  <li>Postman - API</li>
  <li>BodyParser - Trabalha com dados Simples</li>
  <li>Express - API Node.js</li>
  <li>Morgan - Retorna o verbo HTTP</li>
  <li>Multer - Trabalha com imagens</li>
  <li>MySQL - Database</li>
  <li>NodeMon - Trabalha com "DotEnv"</li>
</ul>

##### Baixando imagem do hub.docker.com
```
docker pull mariadb
```

##### Utilizando docker para conexao com Database Mariadb 

```
docker run -p 3306:3306 --name mysql-mariadb -e MYSQL_ROOT_PASSWORD=root -d mariadb   
```
