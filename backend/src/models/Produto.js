class Produto {
    constructor({ nome, descricao, preco, quantidade, fk_fornecedor }) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidade = quantidade;
        this.fk_fornecedor = fk_fornecedor;
    }
}