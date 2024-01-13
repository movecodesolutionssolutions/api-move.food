// authRoutes.ts
import express, { Router } from "express";
import authController from "./controllers/AuthController";
import IgredientsController from "./controllers/IgredientsController";
import UserController from "./controllers/UserController";
import EntidadeController from "./controllers/EntidadeController";
import EnderecoController from "./controllers/EnderecoController";
import TipoProdutoController from "./controllers/TipoProdutoController";
import ProdutoController from "./controllers/ProdutoController";

const Route: Router = express.Router();

Route.post("/auth/login", async (req, res) => {
  await authController.login(req, res);
});

Route.post("/auth/register", async (req, res) => {
  await authController.register(req, res);
});

// Rotas para Entidades
Route.post("/entidades", async (req, res) => {
  await EntidadeController.createEntidade(req, res);
});

Route.get("/entidades", async (req, res) => {
  await EntidadeController.getAllEntidades(req, res);
});

Route.get("/entidades/:id", async (req, res) => {
  await EntidadeController.getEntidadeById(req, res);
});

Route.get("/entidades/proprietario/:proprietarioId", async (req, res) => {
  await EntidadeController.getEntidadesByProprietario(req, res); // rota para obter todas as entidades de um proprietário
});

Route.put("/entidades/:id", async (req, res) => {
  await EntidadeController.updateEntidade(req, res);
});

Route.delete("/entidades/:id", async (req, res) => {
  await EntidadeController.deleteEntidade(req, res);
});

// Rotas para Enderecos
Route.post("/enderecos", async (req, res) => {
  await EnderecoController.createEndereco(req, res);
});

Route.get("/enderecos", async (req, res) => {
  await EnderecoController.getEnderecos(req, res);
});

Route.get("/enderecos/:id", async (req, res) => {
  await EnderecoController.getEnderecoById(req, res);
});

Route.put("/enderecos/:id", async (req, res) => {
  await EnderecoController.updateEndereco(req, res);
});

Route.delete("/enderecos/:id", async (req, res) => {
  await EnderecoController.deleteEndereco(req, res);
});

// Rotas para Ingredientes
Route.post("/ingredientes", async (req, res) => {
  await IgredientsController.createIngrediente(req, res);
});

Route.get("/ingredientes", async (req, res) => {
  await IgredientsController.getAllIngredientes(req, res);
});

Route.get("/ingredientes/:id", async (req, res) => {
  await IgredientsController.getIngredienteById(req, res);
});

Route.get("/ingredientes/entidade/:entidadeId", async (req, res) => {
  await IgredientsController.getIngredientesByEntidade(req, res); // rota para obter todos os ingredientes de uma entidade
});
Route.put("/ingredientes/:id", async (req, res) => {
  await IgredientsController.updateIngrediente(req, res);
});

Route.delete("/ingredientes/:id", async (req, res) => {
  await IgredientsController.deleteIngrediente(req, res);
});

// Rotas para Tipos de Produto
Route.post("/tipos-produto", async (req, res) => {
  await TipoProdutoController.createTipoProduto(req, res);
});

Route.get("/tipos-produto", async (req, res) => {
  await TipoProdutoController.getTipoProdutos(req, res);
});

Route.get("/tipos-produto/:id", async (req, res) => {
  await TipoProdutoController.getTipoProdutoById(req, res);
});

Route.put("/tipos-produto/:id", async (req, res) => {
  await TipoProdutoController.updateTipoProduto(req, res);
});

Route.delete("/tipos-produto/:id", async (req, res) => {
  await TipoProdutoController.deleteTipoProduto(req, res);
});

// Rotas para Produtos
Route.post("/produtos", async (req, res) => {
  await ProdutoController.createProduto(req, res);
});

Route.get("/produtos", async (req, res) => {
  await ProdutoController.getProdutos(req, res);
});

Route.get("/produtos/:id", async (req, res) => {
  await ProdutoController.getProdutoById(req, res);
});

Route.get("/produtos/entidade/:entidadeId", async (req, res) => {
  await ProdutoController.getProdutosByEntidade(req, res); // Rota para obter todos os produtos de uma entidade

});

Route.put("/produtos/:id", async (req, res) => {
  await ProdutoController.updateProduto(req, res);
});

Route.delete("/produtos/:id", async (req, res) => {
  await ProdutoController.deleteProduto(req, res);
});

// Users
Route.get("/users", async (req, res) => {
  await UserController.get(req, res);
});

export default Route;
