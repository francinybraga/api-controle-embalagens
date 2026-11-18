export class Embalagem {
    constructor(id_embalagem, descricao, material, capacidade) {
        this.id_embalagem = id_embalagem;
        this.descricao = descricao;
        this.material = material;
        this.capacidade = capacidade
    }
    validarDecricao(){
        if(this.descricao < 3) {
            return throw new console.error("A descrição deverá possuir ao menor tr");
            
        }
    }
}