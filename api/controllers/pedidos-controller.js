const mysql = require('../mysql')

exports.getPedidos = async (req, res, next) => {
	try {
		const result = await mysql.execute(`
          SELECT pedidos.id_pedido,
              pedidos.quantidade,
              produtos.id_produto,
              produtos.nome,
              produtos.preco
              FROM pedidos
              INNER JOIN produtos
              ON produtos.id_produto = pedidos.id_produto;
          `)
		const response = {
			pedidos: result.map((pedido) => {
				return {
					id_pedido: pedido.id_pedido,
					quantidade: pedido.quantidade,
					produto: {
						id_pedido: pedido.id_pedido,
						nome: pedido.nome,
						preco: pedido.preco,
					},
					request: {
						type: 'GET',
						description:
							'Retorna os detalhes de um pedido específico',
						url:
							process.env.URL_API + 'pedidos/' + pedido.id_pedido,
					},
				}
			}),
		}

		return res.status(200).send(response)
	} catch (error) {
		return res.status(500).send({ error: error })
	}
}

exports.postPedidos = async (req, res, next) => {
	try {
		const query = 'SELECT * FROM produtos WHERE id_produto = ?'
		const result = await mysql.execute(query, [req.body.id_produto])
		if (result.length == 0) {
			return res.status(404).send({
				mensagem: 'Produto não encontrado',
			})
		}
		const response = {
			message: 'Pedido inserido com sucesso',
			pedidoCriado: {
				id_pedido: result.id_pedido,
				id_produto: req.body.id_produto,
				quantidade: req.body.quantidade,
				request: {
					type: 'GET',
					description: 'Retorna todos os pedidos',
					url: process.env.URL_API + 'pedidos',
				},
			},
		}
		return res.status(201).send(response)
	} catch (error) {
		return res.status(500).send({ error: error })
	}
}

exports.getOnePedido = async (req, res, next) => {
	try {
		const query = 'SELECT * FROM pedidos WHERE id_pedido = ?;'
		const result = await mysql.execute(query, [req.params.id_pedido])
		if (result.lenght == 0) {
			return res.status(404).send({
				message: 'Não foi encontrado pedido com esse ID',
			})
		}
		const response = {
			pedido: {
				id_pedido: result[0].id_pedido,
				id_produto: result[0].id_produto,
				quantidade: result[0].quantidade,
				request: {
					type: 'GET',
					description: 'Retorna um pedido',
					url: process.env.URL_API + 'pedidos',
				},
			},
		}
		return res.status(200).send(response)
	} catch (error) {
		return res.status(500).send({ error: error })
	}
}

exports.deletePedidos = async (req, res, next) => {
	try {
		const query = 'DELETE FROM pedidos WHERE id_pedido = ?'
		await mysql.execute(query, [req.body.id_pedido])
		const response = {
			message: 'Pedido removido com sucesso',
			request: {
				type: 'POST',
				description: 'Insere um pedido',
				url: process.env.URL_API + 'pedidos',
				body: {
					id_produto: 'Number',
					quantidade: 'Number',
				},
			},
		}
		res.status(202).send(response)
	} catch (error) {
		return res.status(500).send({ error: error })
	}
}
