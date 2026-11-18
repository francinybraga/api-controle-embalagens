const {
  listarEmbalagem,
  buscarembalaPorId,
  criarembala,
  atualizarembala,
  excluirembala,
} = require('../repository/embalaRepository');
const embala = require('../model/embala');

const camposPermitidos = ['nome', 'patrimonio', 'situacao'];

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
    const EmbalagemlistarEmbalagem = await listarEmbalagem();
    return res.status(200).json(EmbalagemlistarEmbalagem);
  } catch (error) {
    console.error('Erro ao listar EmbalagemlistarEmbalagem:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao listar EmbalagemlistarEmbalagem.' });
  }
}

async function buscar(req, res) {
  try {
    if (!embala.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const embala = await buscarembalaPorId(Number(req.params.id));
    if (!embala) {
      return res.status(404).json({ mensagem: 'embala não encontrado.' });
    }
    return res.status(200).json(embala);
  } catch (error) {
    console.error('Erro ao buscar embala:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao buscar embala.' });
  }
}

async function cadastrar(req, res) {
  try {
    const errosCorpo = validarCorpo(req.body, camposPermitidos);
    if (errosCorpo.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros: errosCorpo });
    }

    const embala = new embala(req.body);
    const erros = embala.validar();
    if (erros.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    const embalaCriado = await criarembala(embala);
    return res.status(201).json(embalaCriado);
  } catch (error) {
    console.error('Erro ao cadastrar embala:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao cadastrar embala.' });
  }
}

async function atualizar(req, res) {
  try {
    if (!embala.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const id = Number(req.params.id);
    const errosCorpo = validarCorpo(req.body, camposPermitidos, true);
    if (errosCorpo.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros: errosCorpo });
    }

    const embalaExistente = await buscarembalaPorId(id);
    if (!embalaExistente) {
      return res.status(404).json({ mensagem: 'embala não encontrado.' });
    }

    const embalaValidado = new embala({ ...embalaExistente, ...req.body });
    const erros = embalaValidado.validar();
    if (erros.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    const embalaAtualizado = await atualizarembala(id, req.body);
    return res.status(200).json(embalaAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar embala:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao atualizar embala.' });
  }
}

async function excluir(req, res) {
  try {
    if (!embala.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const id = Number(req.params.id);
    const embala = await buscarembalaPorId(id);
    if (!embala) {
      return res.status(404).json({ mensagem: 'embala não encontrado.' });
    }

    await excluirembala(id);
    return res.status(200).json({ mensagem: 'embala excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir embala:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao excluir embala.' });
  }
}

module.exports = { listar, buscar, cadastrar, atualizar, excluir };
