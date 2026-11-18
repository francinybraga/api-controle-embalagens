const conexao = require('../database/conexao')

async function listarEmbalagem() {
    const [linhas] = await conexao.execute('SELECT * FROM ')
    
}