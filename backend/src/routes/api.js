import express from "express";
import ProdutoController from "../controllers/ProdutoController.js";
import FornecedorController from "../controllers/FornecedorController.js";

const routes = express.Router();

routes.get("/produtos", ProdutoController.index);
routes.post("/produtos", ProdutoController.store);
routes.get("/produtos/:id", ProdutoController.show);
routes.put("/produtos/:id", ProdutoController.update);
routes.delete("/produtos/:id", ProdutoController.destroy);

routes.get("/fornecedores", FornecedorController.index);
routes.post("/fornecedores", FornecedorController.store);
routes.get("/fornecedores/:id", FornecedorController.show);
routes.put("/fornecedores/:id", FornecedorController.update);
routes.delete("/fornecedores/:id", FornecedorController.destroy);

export default routes;
