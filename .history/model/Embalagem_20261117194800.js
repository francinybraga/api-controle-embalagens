export class Embalagem {
    constructor(id_embalagem, descricao, material, capacidade) {
        this.id_embalagem = id_embalagem;
        this.descricao = descricao;
        this.material = material;
        this.capacidade = capacidade
    }
    validarDecricao(descricao){
        if(descricao < 3) {
        throw new console.error("A descrição deverá possuir ao menor três caracteres");
        } else {
            return true
        }
    }
    validarMaterial() {
        if(material)
    }
}