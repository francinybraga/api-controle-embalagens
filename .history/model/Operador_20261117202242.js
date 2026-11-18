export class Operador {
    constructor(id_operador, nome, matriculas, turno) {
        this.id_operador = id_operador;
        this.nome = nome;
        this.matriculas = matriculas;
        this.turno = turno
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
        } else {
            return true
        }
    }
    validarStatus(status) {
        if (status == "" || status == " ") {
            throw new Error("O status não pode ficar vazia.")
        } else {
            return true
        }
    }
}