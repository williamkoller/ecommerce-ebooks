// importando o Express para uma constante chamada express
const express = require('express');
// Iniciando o Express Router em uma constante chamada router
const router = express.Router();
const mysql = require('../mysql').pool;
// Inicia o Multer
const multer = require('multer');
const login = require('../middleware/login');


const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function(req, file, callback) {
        callback(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

// Salva todos os upload na pasta uploads
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

/**
 * Retorna todos os produtos
 */
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM produtos',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod => {
                        return {
                            id_produto: prod.id_produto,
                            nome: prod.nome,
                            preco: prod.preco,
                            imagem_produto: prod.imagem_produto,
                            request: {
                                type: 'GET',
                                description: 'Retorna os detalhes de um produto específico',
                                url: 'http://localhost:3000/produtos/' + prod.id_produto
                            }
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )
    })
});

/**
 * Insere um produto
 */
router.post('/', login.obrigatorio, upload.single('produto_imagem'), (req, res, next) => {
    console.log(req.file);
    console.log(req.usuario);
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO produtos (nome, preco, imagem_produto) VALUES (?,?, ?)', [
                req.body.nome,
                req.body.preco,
                req.file.path
            ],

            // callback
            (error, result, field) => {
                conn.release(); // libera a conexão
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    message: 'Produto inserido com sucesso',
                    produtoCriado: {
                        id_produto: result.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        imagem_produto: req.file.path,
                        request: {
                            type: 'GET',
                            description: 'Retorna todos os produtos',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }
                return res.status(201).send(response);

            }
        )
    })

});

/**
 * Return um produto exclusivo
 */
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;', [req.params.id_produto],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.lenght == 0) {
                    return res.status(404).send({
                        message: 'Não foi encontrado produto com esse ID'
                    })
                }
                const response = {
                    produto: {
                        id_produto: result[0].id_produto,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        imagem_produto: result[0].imagem_produto,
                        request: {
                            type: 'GET',
                            description: 'Retorna um produto',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }
                return res.status(200).send(response);
            }
        )
    })
});

/**
 * Alterar um produto
 */
router.patch('/', login.obrigatorio, (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE produtos
             SET nome = ?,
                preco = ?
                WHERE id_produto = ?`, [
                req.body.nome,
                req.body.preco,
                req.body.id_produto
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                const response = {
                    message: 'Produto atualizado com sucesso',
                    produtoatualizado: {
                        id_produto: req.body.id_produto,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        request: {
                            type: 'GET',
                            description: 'Retorna os detalhes de um produto específico',
                            url: 'http://localhost:3000/produtos/' + req.body.id_produto
                        }
                    }
                }
                return res.status(202).send(response);

            }
        )
    })
})

/**
 * Deletando um produto
 */
router.delete('/', login.obrigatorio, (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM produtos WHERE id_produto = ?', [req.body.id_produto],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    message: 'Produto removido com sucesso',
                    request: {
                        type: 'POST',
                        description: 'Insere um produto',
                        url: 'http://localhost:3000/produtos',
                        body: {
                            nome: 'String',
                            preco: 'Number'
                        }
                    }
                }
                res.status(202).send(response)
            }
        )
    })
})

module.exports = router;