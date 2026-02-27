import { openConnection } from "../connection.js";

export async function upProduto() {
  const db = await openConnection();

  await db.run(
    `CREATE TABLE IF NOT EXISTS produtos (
            id_produto INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT NOT NULL,
            preco DECIMAL(8, 2) NOT NULL,
            quantidade INTEGER NOT NULL,
            fk_fornecedor INT,
            FOREIGN KEY (fk_fornecedor) REFERENCES fornecedores(id_fornecedor)
            )`,
  );

  await db.close();
}

export async function downProduto() {
  const db = await openConnection();

  await db.run(`DROP TABLE IF EXISTS produtos`);

  await db.close();
}
