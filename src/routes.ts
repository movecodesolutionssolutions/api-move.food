// authRoutes.ts
import express, { Router } from "express";
import authController from "./controllers/AuthController";
import IgredientsController from "./controllers/IgredientsController";
import UserController from "./controllers/UserController";
import EntidadeController from "./controllers/EntidadeController";

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
  // Adicione a lógica para obter todas as entidades
  await EntidadeController.getAllEntidades(req, res);
});

//Igredients
Route.post("/igredients", async (req, res) => {
  await IgredientsController.post(req, res);
});

Route.get("/users", async (req, res) => {
  await UserController.get(req, res);
});

export default Route;
