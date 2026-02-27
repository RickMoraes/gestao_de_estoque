import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Converte a URL do módulo para um caminho de arquivo real (padrão WHATWG)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Resolve o caminho do banco de dados partindo do diretório atual
const dbPath = resolve(__dirname, "../../gestao_de_estoque.db");

export async function openConnection() {
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
}
