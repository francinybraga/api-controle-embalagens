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
    validarMatricula(matricula) {
        if (matricula == "" || matricula == " ") {
            throw new Error("A matricula não pode ficar vazio.")
        } else {
            return true
        }
    }
    validarTurno(turno) {
        if (turno == "" || turno == " ") {
            throw new Error("O turno não pode ficar vazia.")
        } else {
            return true
        }
    }
}