// authRoutes.ts
import express, { Router } from "express";
import authController from "./controllers/AuthController";
import IgredientsController from "./controllers/IgredientsController";
import UserController from "./controllers/UserController";

const Route: Router = express.Router();

Route.post("/auth/login", async (req, res) => {
  await authController.login(req, res);
});

Route.post("/auth/register", async (req, res) => {
  await authController.register(req, res);
});

// Route.get("/user/:id", async (req, res) => {
//     await authController.getUser(req, res);
// })

//Igredinets
Route.post("/igredients", async (req, res) => {
  await IgredientsController.post(req, res);
});

Route.get("/users", async (req, res) => {
  await UserController.get(req, res);
});

// Route.get("/users", UserController.get);

export default Route;
