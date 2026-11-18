const express = require('express');
const controller = require('../controller/maquinaController');

const router = express.Router();

router.post('/', controller.cadastrar);
router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.patch('/:id', controller.atualizar);
router.delete('/:id', controller.excluir);

module.exports = router;