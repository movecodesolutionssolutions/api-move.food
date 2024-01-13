// authRoutes.ts
import express, { Router } from "express";
import authController from "./controllers/AuthController";
import IgredientsController from "./controllers/IgredientsController";
import UserController from "./controllers/UserController";
import EntidadeController from "./controllers/EntidadeController";
import EnderecoController from "./controllers/EnderecoController"; // Import the EnderecoController

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

// Igredients
Route.post("/igredients", async (req, res) => {
  await IgredientsController.post(req, res);
});

Route.get("/users", async (req, res) => {
  await UserController.get(req, res);
});

export default Route;
