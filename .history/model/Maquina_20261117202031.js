export class Maquina {
    constructor(id_maquina, nome, patrimonio, status) {
        this.id_maquina = id_maquina;
        this.nome = nome;
        this.patrimonio = patrimonio;
        this.status = status
    }
        validarNome(nome) {
        if (nome < 3) {
            throw new Error("O nome deverá possuir ao menor três caracteres");
        } else {
            return true
        }
    }
    validarPatrimonio(patrimonio) {
        if (patrimonio == "" || patrimonio == " ") {
            throw new Error("O patrimonio não pode ficar vazio.")
        }
    }
    validarCapacidade(capacidade) {
        if (capacidade == "" || capacidade == " ") {
            throw new Error("O capacidade não pode ficar vazio.")
        }
    }
}