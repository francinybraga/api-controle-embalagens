const conexao = require('../database/conexao')

export async function listarMaquina() {
    const [linhas] = await conexao.execute('SELECT * FROM maquina ORDEM BY id_maquina')
    return linhas;
}

export async function buscarMaquinaId(id_maquina) {
    const [linhas] = await conexao.execute('SELECT * FROM embalagens WHERE id_embalagens = ?', [id]);
    return linhas[0] || null
}

export async function criarMaquina(maquina) {
    const [resultado] = await conexao.execute('INSERT INTO maquina (id_maquina, descricao, material, capacidade) VALUES (?, ?, ?, ?)', [maquina.descricao, maquina.material, maquina.capacidade]);
    return buscarmaquinaId(resultado.insertId)
}

export async function atualizarmaquina(id, maquina) {
    const sql = "UPDATE embalagens SET descricao = ?, material = ?, capacidade = ?"
    const [resultado] = await conexao.execute(sql, [
        maquina.descricao,
        maquina.material,
        maquina.capacidade,
        id
    ])
    return resultado.affectedRows;
}

export async function excluirmaquina(id) {
    const sql = "DELETE FROM maquina WHERE id_maquina = ?";
    const [resultado] = await conexao.execute(sql, [id])
    return resultado.affectedRows;
}