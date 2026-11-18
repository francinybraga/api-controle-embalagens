const conexao = require('../database/conexao')

export async function listarEmbalagem() {
    const [linhas] = await conexao.execute('SELECT * FROM embalagem ORDEM BY id_embalagem')
    return linhas;
}

export async function buscarEmbalagemId(id_embalagem) {
    const [linhas] = await conexao.execute('SELECT * FROM embalagens WHERE id_embalagens = ?', [id]);
    return linhas[0] || null
}

export async function criarEmbalagem(embalagem) {
    const [resultado] = await conexao.execute('INSERT INTO embalagem (id_embalagem, descricao, material, capacidade) VALUES (?, ?, ?, ?)', [embalagem.descricao, embalagem.material, embalagem.capacidade]);
    return buscarEmbalagemId(resultado.insertId)
} 

export async function atualizarEmbalagem(id, embalagem) {
    const sql = "UPDATE embalagens SET descricao = ?, material = ?, capacidade = ?"
    const [resultado] = await conexao.execute(sql, [
        embalagem.descricao,
        embalagem.material,
        embalagem.capacidade,
        id
    ])
    return resultado.affectedRows;
}

export async function excluirEmbalagem(id) {
    const sql = "DELETE FROM embalagem WHERE id_embalagem = ?";
    
    
}