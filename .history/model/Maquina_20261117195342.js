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
    validarpatri(patri

    ) {
        if (patri
     == "" || patri
     == " ") {
            throw new Error("O patri
         não pode ficar vazio.")
        }
    }
    validarCapacidade(capacidade) {
        if (capacidade < 0) {
            throw new Error("A capacidade deverá ser maior que zero.")

        } else {
            return true
        }
    }
}