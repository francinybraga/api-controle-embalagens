const {
  listaraquina,
  buscarmaquinaId,
  criarmaquina,
  atualizarmaquina,
  excluirmaquina,
} = require('../repository/maquinaRepository');
const maquina = require('../model/maquina');

const camposPermitidos = ['descricao', 'material', 'capacidade'];

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
    const maquinalistarmaquina = await listarmaquina();
    return res.status(200).json(maquinalistarmaquina);
  } catch (error) {
    console.error('Erro ao listar maquinalistarmaquina:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao listar maquinalistarmaquina.' });
  }
}

async function buscar(req, res) {
  try {
    if (!maquina.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const maquina = await buscarmaquinaId(Number(req.params.id));
    if (!maquina) {
      return res.status(404).json({ mensagem: 'maquina não encontrado.' });
    }
    return res.status(200).json(maquina);
  } catch (error) {
    console.error('Erro ao buscar maquina:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao buscar maquina.' });
  }
}

async function cadastrar(req, res) {
  try {
    const errosCorpo = validarCorpo(req.body, camposPermitidos);
    if (errosCorpo.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros: errosCorpo });
    }

    const maquina = new maquina(req.body);
    const erros = maquina.validar();
    if (erros.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    const maquinaCriado = await criarmaquina(maquina);
    return res.status(201).json(maquinaCriado);
  } catch (error) {
    console.error('Erro ao cadastrar maquina:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao cadastrar maquina.' });
  }
}

async function atualizar(req, res) {
  try {
    if (!maquina.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const id = Number(req.params.id);
    const errosCorpo = validarCorpo(req.body, camposPermitidos, true);
    if (errosCorpo.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros: errosCorpo });
    }

    const maquinaExistente = await buscarmaquinaId(id);
    if (!maquinaExistente) {
      return res.status(404).json({ mensagem: 'maquina não encontrado.' });
    }

    const maquinaValidado = new maquina({ ...maquinaExistente, ...req.body });
    const erros = maquinaValidado.validar();
    if (erros.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    const maquinaAtualizado = await atualizarmaquina(id, req.body);
    return res.status(200).json(maquinaAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar maquina:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao atualizar maquina.' });
  }
}

async function excluir(req, res) {
  try {
    if (!maquina.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const id = Number(req.params.id);
    const maquina = await buscarmaquinaPorId(id);
    if (!maquina) {
      return res.status(404).json({ mensagem: 'maquina não encontrado.' });
    }

    await excluirmaquina(id);
    return res.status(200).json({ mensagem: 'maquina excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir maquina:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao excluir maquina.' });
  }
}

module.exports = { listar, buscar, cadastrar, atualizar, excluir };
