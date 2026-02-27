import { openConnection } from "../connection.js";

export async function upFornecedor() {
  const db = await openConnection();

  await db.run(
    `CREATE TABLE IF NOT EXISTS fornecedores (
            id_fornecedor INTEGER PRIMARY KEY AUTOINCREMENT,
            cnpj TEXT UNIQUE NOT NULL,
            razao_social TEXT NOT NULL,
            endereco TEXT NOT NULL,
            email TEXT NOT NULL,
            contato TEXT NOT NULL
            )`,
  );

  await db.close();
}

export async function downFornecedor() {
  const db = await openConnection();

  await db.run(`DROP TABLE IF EXISTS fornecedores`);

  await db.close();
}
