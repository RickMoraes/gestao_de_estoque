import FornecedorRepository from "../repositories/FornecedorRepository.js";

class FornecedorService {
  static async buscarTodosFornecedores() {
    const fornecedores = await FornecedorRepository.trazerTodosFornecedores();
    if (fornecedores.length === 0) {
      throw new Error("Nenhum fornecedor encontrado.");
    }
    return fornecedores;
  }

  static async criarFornecedor(cnpj, razao_social, endereco, email, contato) {
    if (!cnpj || !razao_social || !endereco || !email || !contato) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    return await FornecedorRepository.registrarFornecedor(
      cnpj,
      razao_social,
      endereco,
      email,
      contato,
    );
  }

  static async buscarPorId(id) {
    const fornecedor = await FornecedorRepository.buscarFornecedorPorId(id);
    if (!fornecedor) {
      console.log("Fornecedor: ", fornecedor);
      throw new Error("Fornecedor não encontrado.");
    }
    return fornecedor;
  }

  static async atualizarFornecedor({
    id,
    cnpj,
    razao_social,
    endereco,
    email,
    contato,
  }) {
    if (!cnpj || !razao_social || !endereco || !email || !contato) {
      throw new Error("Todos os campos são obrigatórios para atualização.");
    }

    return await FornecedorRepository.atualizarRegistros({
      id,
      cnpj,
      razao_social,
      endereco,
      email,
      contato,
    });
  }

  static async deletarFornecedor(id) {
    const linhasAfetadas =
      await FornecedorRepository.apagarRegistroDeFornecedor(id);
    if (linhasAfetadas === 0) {
      throw new Error("Fornecedor não encontrado para exclusão.");
    }
  }
}

export default FornecedorService;
