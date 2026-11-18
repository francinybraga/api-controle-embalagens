const {
  listarmaquina,
  buscarmaquinalistarmaquinaId,
  criarmaquinalistarmaquina,
  atualizarmaquinalistarmaquina,
  excluirmaquinalistarmaquina,
} = require('../repository/maquinalistarmaquinaRepository');
const maquinalistarmaquina = require('../model/maquinalistarmaquina');

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
    const maquinalistarmaquinalistarmaquina = await listarmaquina();
    return res.status(200).json(maquinalistarmaquinalistarmaquina);
  } catch (error) {
    console.error('Erro ao listar maquinalistarmaquinalistarmaquina:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao listar maquinalistarmaquinalistarmaquina.' });
  }
}

async function buscar(req, res) {
  try {
    if (!maquinalistarmaquina.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const maquinalistarmaquina = await buscarmaquinalistarmaquinaId(Number(req.params.id));
    if (!maquinalistarmaquina) {
      return res.status(404).json({ mensagem: 'maquinalistarmaquina não encontrado.' });
    }
    return res.status(200).json(maquinalistarmaquina);
  } catch (error) {
    console.error('Erro ao buscar maquinalistarmaquina:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao buscar maquinalistarmaquina.' });
  }
}

async function cadastrar(req, res) {
  try {
    const errosCorpo = validarCorpo(req.body, camposPermitidos);
    if (errosCorpo.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros: errosCorpo });
    }

    const maquinalistarmaquina = new maquinalistarmaquina(req.body);
    const erros = maquinalistarmaquina.validar();
    if (erros.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    const maquinalistarmaquinaCriado = await criarmaquinalistarmaquina(maquinalistarmaquina);
    return res.status(201).json(maquinalistarmaquinaCriado);
  } catch (error) {
    console.error('Erro ao cadastrar maquinalistarmaquina:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao cadastrar maquinalistarmaquina.' });
  }
}

async function atualizar(req, res) {
  try {
    if (!maquinalistarmaquina.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const id = Number(req.params.id);
    const errosCorpo = validarCorpo(req.body, camposPermitidos, true);
    if (errosCorpo.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros: errosCorpo });
    }

    const maquinalistarmaquinaExistente = await buscarmaquinalistarmaquinaId(id);
    if (!maquinalistarmaquinaExistente) {
      return res.status(404).json({ mensagem: 'maquinalistarmaquina não encontrado.' });
    }

    const maquinalistarmaquinaValidado = new maquinalistarmaquina({ ...maquinalistarmaquinaExistente, ...req.body });
    const erros = maquinalistarmaquinaValidado.validar();
    if (erros.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    const maquinalistarmaquinaAtualizado = await atualizarmaquinalistarmaquina(id, req.body);
    return res.status(200).json(maquinalistarmaquinaAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar maquinalistarmaquina:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao atualizar maquinalistarmaquina.' });
  }
}

async function excluir(req, res) {
  try {
    if (!maquinalistarmaquina.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const id = Number(req.params.id);
    const maquinalistarmaquina = await buscarmaquinalistarmaquinaPorId(id);
    if (!maquinalistarmaquina) {
      return res.status(404).json({ mensagem: 'maquinalistarmaquina não encontrado.' });
    }

    await excluirmaquinalistarmaquina(id);
    return res.status(200).json({ mensagem: 'maquinalistarmaquina excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir maquinalistarmaquina:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao excluir maquinalistarmaquina.' });
  }
}

module.exports = { listar, buscar, cadastrar, atualizar, excluir };
