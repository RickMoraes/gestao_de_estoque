import { openConnection } from "../database/connection.js";

class ProdutoRepository {
  static async trazerTodosProdutos() {
    const db = await openConnection();
    try {
    const produtos = await db.all(`
    SELECT 
        p.id_produto, 
        p.nome, 
        p.descricao, 
        p.preco, 
        p.quantidade,
        f.razao_social AS fornecedor,
        f.cnpj AS cnpj,
        f.contato AS contato

    FROM produtos p
    INNER JOIN fornecedores f ON p.fk_fornecedor = f.id_fornecedor
`);
       
      console.log("produtos: ", produtos);
      return produtos;
    } finally {
      await db.close();
    }
  }

  static async registrarProduto(nome, descricao, preco, quantidade, fk_fornecedor) {
    const db = await openConnection();

    const result = await db.run(
      `INSERT INTO produtos (nome, descricao, preco, quantidade, fk_fornecedor) VALUES (?,?,?,?,?)`,
      [nome, descricao, preco, quantidade, fk_fornecedor],
    );
    await db.close();

    return {
      id_produto: result.lastID,
      nome,
      descricao,
      preco,
      quantidade,
      fk_fornecedor,
    };
  }

  static async buscarProdutoPorId(id) {
    const db = await openConnection();

    const produto = await db.get(`SELECT * FROM produtos WHERE id = ?`, [id_produto]);
    await db.close();

    return produto;
  }

  static async atualizarRegistros({
    id_produto,
    nome,
    descricao,
    preco,
    quantidade,
    fk_fornecedor,
  }) {
    const db = await openConnection();

    await db.run(
      `UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade = ?, fk_fornecedor = ? WHERE id = ?`,
      [nome, descricao, preco, quantidade, fk_fornecedor, id_produto],
    );

    const produtoAtualizado = await db.get(
      `SELECT * FROM produtos WHERE id =?`,
      [id_produto],
    );

    await db.close();

    return produtoAtualizado;
  }

  static async apagarRegistroDeProduto(id_produto) {
    const db = await openConnection();

    const result = await db.run(`DELETE FROM produtos WHERE id_produto = ?`, [id_produto]);
    await db.close();

    return result.changes;
  }
}

export default ProdutoRepository;
