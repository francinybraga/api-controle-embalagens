const {
  listarEmbalagem,
  buscarEmbalagemPorId,
  criarEmbalagem,
  atualizarembalagem,
  excluirembalagem,
} = require('../repository/embalagemRepository');
const embalagem = require('../model/embalagem');

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
    if (!embalagem.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const embalagem = await buscarembalagemPorId(Number(req.params.id));
    if (!embalagem) {
      return res.status(404).json({ mensagem: 'embalagem não encontrado.' });
    }
    return res.status(200).json(embalagem);
  } catch (error) {
    console.error('Erro ao buscar embalagem:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao buscar embalagem.' });
  }
}

async function cadastrar(req, res) {
  try {
    const errosCorpo = validarCorpo(req.body, camposPermitidos);
    if (errosCorpo.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros: errosCorpo });
    }

    const embalagem = new embalagem(req.body);
    const erros = embalagem.validar();
    if (erros.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    const embalagemCriado = await criarembalagem(embalagem);
    return res.status(201).json(embalagemCriado);
  } catch (error) {
    console.error('Erro ao cadastrar embalagem:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao cadastrar embalagem.' });
  }
}

async function atualizar(req, res) {
  try {
    if (!embalagem.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const id = Number(req.params.id);
    const errosCorpo = validarCorpo(req.body, camposPermitidos, true);
    if (errosCorpo.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros: errosCorpo });
    }

    const embalagemExistente = await buscarembalagemPorId(id);
    if (!embalagemExistente) {
      return res.status(404).json({ mensagem: 'embalagem não encontrado.' });
    }

    const embalagemValidado = new embalagem({ ...embalagemExistente, ...req.body });
    const erros = embalagemValidado.validar();
    if (erros.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    const embalagemAtualizado = await atualizarembalagem(id, req.body);
    return res.status(200).json(embalagemAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar embalagem:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao atualizar embalagem.' });
  }
}

async function excluir(req, res) {
  try {
    if (!embalagem.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const id = Number(req.params.id);
    const embalagem = await buscarembalagemPorId(id);
    if (!embalagem) {
      return res.status(404).json({ mensagem: 'embalagem não encontrado.' });
    }

    await excluirembalagem(id);
    return res.status(200).json({ mensagem: 'embalagem excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir embalagem:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao excluir embalagem.' });
  }
}

module.exports = { listar, buscar, cadastrar, atualizar, excluir };
