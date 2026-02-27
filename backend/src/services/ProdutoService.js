import ProdutoRepository from "../repositories/ProdutoRepository.js";

class ProdutoService {
  static async buscarTodosProdutos() {
    const produtos = await ProdutoRepository.trazerTodosProdutos();
    if (produtos.length === 0) {
      throw new Error("Nenhum produto encontrado.");
    }
    return produtos;
  }

  static async criarProduto(nome, descricao, preco, quantidade, fk_fornecedor) {
    if (
      !nome ||
      !descricao ||
      preco == null ||
      quantidade == null ||
      !fk_fornecedor
    ) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    return await ProdutoRepository.registrarProduto(
      nome,
      descricao,
      preco,
      quantidade,
      fk_fornecedor,
    );
  }

  static async buscarPorId(id) {
    const produto = await ProdutoRepository.buscarProdutoPorId(id);
    if (!produto) {
      console.log("produto: ", produto);
      throw new Error("Produto não encontrado.");
    }
    return produto;
  }

  static async atualizarProduto({
    id,
    nome,
    descricao,
    preco,
    quantidade,
    fk_fornecedor,
  }) {
    if (
      !nome ||
      !descricao ||
      preco == null ||
      quantidade == null ||
      !fk_fornecedor
    ) {
      throw new Error("Todos os campos são obrigatórios para atualização.");
    }

    return await ProdutoRepository.atualizarRegistros({
      id,
      nome,
      descricao,
      preco,
      quantidade,
      fk_fornecedor,
    });
  }

  static async deletarProduto(id_produto) {
    const linhasAfetadas = await ProdutoRepository.apagarRegistroDeProduto(id_produto);
    if (linhasAfetadas === 0) {
      throw new Error("Produto não encontrado para exclusão.");
    }
  }
}

export default ProdutoService;
