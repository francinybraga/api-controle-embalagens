const conexao = require('../database/conexao')

export async function listarMaquina() {
    const [linhas] = await conexao.execute('SELECT * FROM maquina ORDEM BY id_maquina')
    return linhas;
}

export async function buscarMaquinaId(id_maquina) {
    const [linhas] = await conexao.execute('SELECT * FROM maquina WHERE id_maquina = ?', [id]);
    return linhas[0] || null
}

export async function criarMaquina(maquina) {
    const [resultado] = await conexao.execute('INSERT INTO maquina (id_maquina, nome, patrimonio, status) VALUES (?, ?, ?, ?)', [maquina.nome, maquina.patrimonio, maquina.status]);
    return buscarMaquinaId(resultado.insertId)
}

export async function atualizarMaquina(id, maquina) {
    const sql = "UPDATE embalagens SET nome = ?, patrimonio = ?, status = ?"
    const [resultado] = await conexao.execute(sql, [
        maquina.nome,
        maquina.patrimonio,
        maquina.status,
        id
    ])
    return resultado.affectedRows;
}

export async function excluirMaquina(id) {
    const sql = "DELETE FROM maquina WHERE id_maquina = ?";
    const [resultado] = await conexao.execute(sql, [id])
    return resultado.affectedRows;
}