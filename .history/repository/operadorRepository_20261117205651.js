const conexao = require('../database/conexao')

export async function listarOperador() {
    const [linhas] = await conexao.execute('SELECT * FROM operador ORDEM BY id_operador')
    return linhas;
}

export async function buscarOperadorId(id_operador) {
    const [linhas] = await conexao.execute('SELECT * FROM operador WHERE id_operador = ?', [id]);
    return linhas[0] || null
}

export async function criarOperador(operador) {
    const [resultado] = await conexao.execute('INSERT INTO operador (id_operador, nome, matriculas, turno) VALUES (?, ?, ?, ?)', [operador.nome, operador.matricula, operador.turno]);
    return buscarOperadorId(resultado.insertId)
}

export async function atualizarOperador(id, operador) {
    const sql = "UPDATE embalagens SET descricao = ?, material = ?, turno = ?"
    const [resultado] = await conexao.execute(sql, [
        operador.nome,
        operador.matricula,
        operador.turno,
        id
    ])
    return resultado.affectedRows;
}

export async function excluirOperador(id) {
    const sql = "DELETE FROM operador WHERE id_operador = ?";
    const [resultado] = await conexao.execute(sql, [id])
    return resultado.affectedRows;
}