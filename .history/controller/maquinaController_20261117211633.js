const {
  listarmaqui,
  buscarmaquiId,
  criarmaqui,
  atualizarmaqui,
  excluirmaqui,
} = require('../repository/maquiRepository');
const maqui = require('../model/maqui');

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
    const maquilistarmaqui = await listarmaqui();
    return res.status(200).json(maquilistarmaqui);
  } catch (error) {
    console.error('Erro ao listar maquilistarmaqui:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao listar maquilistarmaqui.' });
  }
}

async function buscar(req, res) {
  try {
    if (!maqui.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const maqui = await buscarmaquiId(Number(req.params.id));
    if (!maqui) {
      return res.status(404).json({ mensagem: 'maqui não encontrado.' });
    }
    return res.status(200).json(maqui);
  } catch (error) {
    console.error('Erro ao buscar maqui:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao buscar maqui.' });
  }
}

async function cadastrar(req, res) {
  try {
    const errosCorpo = validarCorpo(req.body, camposPermitidos);
    if (errosCorpo.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros: errosCorpo });
    }

    const maqui = new maqui(req.body);
    const erros = maqui.validar();
    if (erros.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    const maquiCriado = await criarmaqui(maqui);
    return res.status(201).json(maquiCriado);
  } catch (error) {
    console.error('Erro ao cadastrar maqui:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao cadastrar maqui.' });
  }
}

async function atualizar(req, res) {
  try {
    if (!maqui.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const id = Number(req.params.id);
    const errosCorpo = validarCorpo(req.body, camposPermitidos, true);
    if (errosCorpo.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros: errosCorpo });
    }

    const maquiExistente = await buscarmaquiId(id);
    if (!maquiExistente) {
      return res.status(404).json({ mensagem: 'maqui não encontrado.' });
    }

    const maquiValidado = new maqui({ ...maquiExistente, ...req.body });
    const erros = maquiValidado.validar();
    if (erros.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    const maquiAtualizado = await atualizarmaqui(id, req.body);
    return res.status(200).json(maquiAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar maqui:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao atualizar maqui.' });
  }
}

async function excluir(req, res) {
  try {
    if (!maqui.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const id = Number(req.params.id);
    const maqui = await buscarmaquiPorId(id);
    if (!maqui) {
      return res.status(404).json({ mensagem: 'maqui não encontrado.' });
    }

    await excluirmaqui(id);
    return res.status(200).json({ mensagem: 'maqui excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir maqui:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao excluir maqui.' });
  }
}

module.exports = { listar, buscar, cadastrar, atualizar, excluir };
