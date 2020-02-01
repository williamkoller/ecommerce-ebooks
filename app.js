const express = require('express');
const app = express();
const morgan = require('morgan');

const routeProducts = require('./routes/products');
const routeRequests = require('./routes/requests');

app.use(morgan('dev'));
app.use('/products', routeProducts);
app.use('/requests', routeRequests);

// Quando não encontra a rota, entra aqui:
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            message: error.message
        }
    })
});
module.exports = app;