const {
  listarEquipamentos,
  buscarEquipamentoPorId,
  criarEquipamento,
  atualizarEquipamento,
  excluirEquipamento,
} = require('../repository/equipamentoRepository');
const Equipamento = require('../model/Equipamento');

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
    const equipamentos = await listarEquipamentos();
    return res.status(200).json(equipamentos);
  } catch (error) {
    console.error('Erro ao listar equipamentos:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao listar equipamentos.' });
  }
}

async function buscar(req, res) {
  try {
    if (!Equipamento.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const equipamento = await buscarEquipamentoPorId(Number(req.params.id));
    if (!equipamento) {
      return res.status(404).json({ mensagem: 'Equipamento não encontrado.' });
    }
    return res.status(200).json(equipamento);
  } catch (error) {
    console.error('Erro ao buscar equipamento:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao buscar equipamento.' });
  }
}

async function cadastrar(req, res) {
  try {
    const errosCorpo = validarCorpo(req.body, camposPermitidos);
    if (errosCorpo.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros: errosCorpo });
    }

    const equipamento = new Equipamento(req.body);
    const erros = equipamento.validar();
    if (erros.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    const equipamentoCriado = await criarEquipamento(equipamento);
    return res.status(201).json(equipamentoCriado);
  } catch (error) {
    console.error('Erro ao cadastrar equipamento:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao cadastrar equipamento.' });
  }
}

async function atualizar(req, res) {
  try {
    if (!Equipamento.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const id = Number(req.params.id);
    const errosCorpo = validarCorpo(req.body, camposPermitidos, true);
    if (errosCorpo.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros: errosCorpo });
    }

    const equipamentoExistente = await buscarEquipamentoPorId(id);
    if (!equipamentoExistente) {
      return res.status(404).json({ mensagem: 'Equipamento não encontrado.' });
    }

    const equipamentoValidado = new Equipamento({ ...equipamentoExistente, ...req.body });
    const erros = equipamentoValidado.validar();
    if (erros.length) {
      return res.status(400).json({ mensagem: 'Dados inválidos.', erros });
    }

    const equipamentoAtualizado = await atualizarEquipamento(id, req.body);
    return res.status(200).json(equipamentoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar equipamento:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao atualizar equipamento.' });
  }
}

async function excluir(req, res) {
  try {
    if (!Equipamento.validarId(req.params.id)) {
      return res.status(400).json({ mensagem: 'O ID deve ser um inteiro positivo.' });
    }

    const id = Number(req.params.id);
    const equipamento = await buscarEquipamentoPorId(id);
    if (!equipamento) {
      return res.status(404).json({ mensagem: 'Equipamento não encontrado.' });
    }

    await excluirEquipamento(id);
    return res.status(200).json({ mensagem: 'Equipamento excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir equipamento:', error);
    return res.status(500).json({ mensagem: 'Erro inesperado ao excluir equipamento.' });
  }
}

module.exports = { listar, buscar, cadastrar, atualizar, excluir };
