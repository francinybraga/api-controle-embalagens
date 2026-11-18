const {
  listarOperador,
  buscarOperadorId,
  criarOperador,
  atualizarOperador,
  excluirOperador,
} = require('../repository/operadorRepository');
const operador = require('../model/Operador');

const camposPermitidos = ['nome', 'patrimonio', 'status'];

function validarCorpo(body, exigirCampo = false) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return ['O corpo da requisição deve ser um objeto JSON.'];
  }
  const desconhecidos = Object.keys(body).filter((campo) => !camposPermitidos.includes(campo));
  if (desconhecidos.length) {
    return [`Campos não permitidos: ${desconhecidos.join(', ')}.`];
  }
  if (exigirCampo && Object.keys(body).length === 0) {
    return ['Informe ao menos um campo para atualizar.'];
  }
  return [];
}

async function listar(req, res) {
  try {
    const operadorlistaroperador = await listaroperador();
    return res.status(200).json(operadorlistaroperador);
  } catch (error) {
    console.error('Erro ao listar operadorlistaroperador:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao listar operadorlistaroperador.' });
  }
}

async function buscar(req, res) {
  try {
    if (!operador.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const operador = await buscaroperadorId(Number(req.params.id));
    if (!operador) {
      return res.status(404).json({ mensagem: 'operador não encontrado.' });
    }
    return res.status(200).json(operador);
  } catch (error) {
    console.error('Erro ao buscar operador:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao buscar operador.' });
  }
}

async function cadastrar(req, res) {
  try {
    const errosCorpo = validarCorpo(req.body, camposPermitidos);
    if (errosCorpo.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros: errosCorpo });
    }

    const operador = new operador(req.body);
    const erros = operador.validar();
    if (erros.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    const operadorCriado = await criaroperador(operador);
    return res.status(201).json(operadorCriado);
  } catch (error) {
    console.error('Erro ao cadastrar operador:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao cadastrar operador.' });
  }
}

async function atualizar(req, res) {
  try {
    if (!operador.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const id = Number(req.params.id);
    const errosCorpo = validarCorpo(req.body, camposPermitidos, true);
    if (errosCorpo.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros: errosCorpo });
    }

    const operadorExistente = await buscaroperadorId(id);
    if (!operadorExistente) {
      return res.status(404).json({ mensagem: 'operador não encontrado.' });
    }

    const operadorValidado = new operador({ ...operadorExistente, ...req.body });
    const erros = operadorValidado.validar();
    if (erros.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    const operadorAtualizado = await atualizaroperador(id, req.body);
    return res.status(200).json(operadorAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar operador:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao atualizar operador.' });
  }
}

async function excluir(req, res) {
  try {
    if (!operador.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const id = Number(req.params.id);
    const operador = await buscaroperadorId(id);
    if (!operador) {
      return res.status(404).json({ mensagem: 'operador não encontrado.' });
    }

    await excluiroperador(id);
    return res.status(200).json({ mensagem: 'operador excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir operador:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao excluir operador.' });
  }
}

module.exports = { listar, buscar, cadastrar, atualizar, excluir };
