const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');
const ProdutoController = require('../controllers/produtos-controller');
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/uploads');
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
router.get('/', ProdutoController.getProdutos);
router.post('/', login.obrigatorio, upload.single('produto_imagem'), ProdutoController.postProduto);
router.get('/:id_produto', ProdutoController.getOneProduto);
router.patch('/', login.obrigatorio, ProdutoController.updateProduto);
router.delete('/', login.obrigatorio, ProdutoController.deleteProduto);

module.exports = router;