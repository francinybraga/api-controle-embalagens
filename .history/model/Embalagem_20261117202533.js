export class Embalagem {
    constructor(id_embalagem, descricao, material, capacidade) {
        this.id_embalagem = id_embalagem;
        this.descricao = descricao;
        this.material = material;
        this.capacidade = capacidade
    }
    validarDecricao(descricao) {
        if (descricao < 3) {
            throw new Error("A descrição deverá possuir ao menor três caracteres");
        } else {
            return true
        }
    }
    validarMaterial(material) {
        if (material == "" || material == " ") {
            throw new Error("O material não pode ficar vazio.")
        }
    }
    validarCapacidade(capacidade) {
        if (capacidade < 0) {
            throw new Error("A capacidade deverá ser maior que zero.")

        } else {
            return true
        }
    }
    validarID(id_embalagem)
}