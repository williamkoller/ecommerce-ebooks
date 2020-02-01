// importando o Express para uma constante chamada express
const express = require('express');
// Iniciando o Express Router em uma constante chamada router
const router = express.Router();

/**
 * Return todos os pedidos
 */
router.get('/', (req, res, next) => {
    res.status(200).send({
        message: 'Retorna os pedidos'
    });
});

/**
 * Insere um pedido
 */
router.post('/', (req, res, next) => {
    res.status(201).send({
        message: 'O pedido foi criado'
    });
});

/**
 * Retorna os dados de um pedido
 */
router.get('/:id_request', (req, res, next) => {
    const id = req.params.id_request
    res.status(200).send({
        message: 'Detalhes do pedido',
        id_request: id
    })


});

/**
 * Deletando um pedido
 */
router.delete('/:id_request', (req, res, next) => {
    res.status(200).send({
        message: 'Pedido excluido'
    })
})

module.exports = router;