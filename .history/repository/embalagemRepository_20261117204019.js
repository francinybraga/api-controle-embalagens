const conexao = require('../database/conexao')

async function listarEmbalagem() {
    const [linhas] = await conexao.execute('SELECT * FROM embalagem ORDEM BY id_embalagem')
    return linhas;
}

async function buscarEmbalagemId(id_embalagem) {
    const [linhas] = await conexao.execute('SELECT * FROM embalagens WHERE id_embalagens = ?', [id]);
    return linhas[0] || null
}

async function criarEmbalagem(embalagem) {
    const [resultado] = await conexao.execute('INSERT INTO embalagem (id_embalagem, descricao, material, capacidade) VALUES (?, ?, ?, ?)');
    [embalagem.nome, embalagem]
} 