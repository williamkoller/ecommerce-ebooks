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
    const pedido = {
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        message: 'O pedido foi criado',
        pedidoCriado: pedido
    });
});

/**
 * Retorna os dados de um pedido
 */
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_pedido
    res.status(200).send({
        message: 'Detalhes do pedido',
        id_produto: id
    })


});

/**
 * Deletando um pedido
 */
router.delete('/:id_produto', (req, res, next) => {
    res.status(200).send({
        message: 'Pedido excluido'
    })
})

module.exports = router;