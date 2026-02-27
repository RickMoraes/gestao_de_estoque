import ProdutoService from "../services/ProdutoService.js";

class ProdutoController {
  async index(req, res) {
    try {
      const produtos = await ProdutoService.buscarTodosProdutos();
      return res.status(200).json({
        total_de_produtos: produtos.length,
        msg: "Aqui está a lista de produtos: ",
        dados: produtos,
      });
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async store(req, res) {
    try {
      const { nome, descricao, preco, quantidade, fk_fornecedor } = req.body;
      const produto = await ProdutoService.criarProduto(
        nome,
        descricao,
        preco,
        quantidade,
        fk_fornecedor,
      );
      return res
        .status(201)
        .json({ msg: "Produto registrado!", dados: produto });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const produto = await ProdutoService.buscarPorId(id);
      return res.status(200).json({ produto });
    } catch (erro) {
      return res.status(404).json({ erro: erro.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, preco, quantidade, fk_fornecedor } = req.body;

      const produtoAtualizado = await ProdutoService.atualizarProduto({
        id,
        nome,
        descricao,
        preco,
        quantidade,
        fk_fornecedor,
      });

      return res
        .status(200)
        .json({ msg: "Produto atualizado!", dados: produtoAtualizado });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id_produto } = req.params;
      await ProdutoService.deletarProduto(id_produto);
      return res.status(200).json({ msg: "Produto deletado!" });
    } catch (erro) {
      console.log(erro);
      return res.status(400).json({ erro: erro.message });
    }
  }
}

export default new ProdutoController();
