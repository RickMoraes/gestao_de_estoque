import FornecedorService from "../services/FornecedorService.js";

class FornecedorController {
  async index(req, res) {
    try {
      const fornecedores = await FornecedorService.buscarTodosFornecedores();
      return res.status(200).json({
        total_de_fornecedores: fornecedores.length,
        msg: "Aqui está a lista de Fornecedores: ",
        dados: fornecedores,
      });
    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async store(req, res) {
    try {
      const { cnpj, razao_social, endereco, email, contato } = req.body;
      const fornecedor = await FornecedorService.criarFornecedor(
        cnpj,
        razao_social,
        endereco,
        email,
        contato,
      );
      return res
        .status(201)
        .json({ msg: "Fornecedor registrado!", dados: fornecedor });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const fornecedor = await FornecedorService.buscarPorId(id);
      return res.status(200).json({ fornecedor });
    } catch (erro) {
      return res.status(404).json({ erro: erro.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { cnpj, razao_social, endereco, email, contato } = req.body;

      const fornecedorAtualizado = await FornecedorService.atualizarFornecedor({
        id,
        cnpj,
        razao_social,
        endereco,
        email,
        contato,
      });

      return res
        .status(200)
        .json({ msg: "Fornecedor atualizado!", dados: fornecedorAtualizado });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await FornecedorService.deletarFornecedor(id);
      return res.status(200).json({ msg: "Fornecedor deletado!" });
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  }
}

export default new FornecedorController();
