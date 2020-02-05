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

##### Tratamentos de errors
###### Quando não encontra a rota 

```
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

```
###### Envio da mensagem

```
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            message: error.message
        }
    })
});

```
##### Baixando imagem do hub.docker.com
```
docker pull mariadb
```

##### Utilizando docker para conexao com Database Mariadb 

```
docker run -p 3306:3306 --name mysql-mariadb -e MYSQL_ROOT_PASSWORD=root -d mariadb   
```
