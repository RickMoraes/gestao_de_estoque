import { upProduto, downProduto } from "./create_produtos_table.js";
import { upFornecedor, downFornecedor } from "./create_fornecedores_table.js";

const command = process.argv[2];

if (command === "up") {
  await upProduto();
  await upFornecedor();
  console.log("Migrations executadas com sucesso!");
} else if (command === "down") {
  await downProduto();
  await downFornecedor();
  console.log("Rollback executado com sucesso!");
} else {
  console.log("Use: npm run migrate ou npm run rollback");
}
