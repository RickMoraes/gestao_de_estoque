import { openConnection } from "../database/connection.js";

class FornecedorRepository {
  static async trazerTodosFornecedores() {
    const db = await openConnection();
    try {
      const fornecedores = await db.all(
        `SELECT id_fornecedor, cnpj, razao_social, endereco, email, contato FROM fornecedores`,
      );

      return fornecedores;
    } finally {
      await db.close();
    }
  }

  static async registrarFornecedor(cnpj, razao_social, endereco, email, contato) {
    const db = await openConnection();

    const result = await db.run(
      `INSERT INTO fornecedores (cnpj, razao_social, endereco, email, contato) VALUES (?,?,?,?,?)`,
      [cnpj, razao_social, endereco, email, contato],
    );
    await db.close();

    return {
      id: result.lastID,
      cnpj,
      razao_social,
      endereco,
      email,
      contato,
    };
  }

  static async buscarFornecedorPorId(id) {
    const db = await openConnection();

    const fornecedor = await db.get(`SELECT * FROM fornecedores WHERE id = ?`, [id]);
    await db.close();

    return fornecedor;
  }
  
  static async atualizarRegistros({ id_fornecedor, cnpj, razao_social, endereco, email, contato }) {
    const db = await openConnection();

    await db.run(
      `UPDATE fornecedores SET cnpj = ?, razao_social = ?, endereco = ?, email = ?, contato = ? WHERE id_fornecedor = ?`,
      [cnpj, razao_social, endereco, email, contato, id_fornecedor],
    );
  
    const fornecedorAtualizado = await db.get(
      `SELECT * FROM fornecedores WHERE id_fornecedor =?`,
      [id_fornecedor],
    );

    await db.close();

    return fornecedorAtualizado;
  }

  static async apagarRegistroDeFornecedor(id) {
    const db = await openConnection();

    const result = await db.run(`DELETE FROM fornecedores WHERE id = ?`, [id]);
    await db.close();

    return result.changes;
  }
}

export default FornecedorRepository;
