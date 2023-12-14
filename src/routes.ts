// authRoutes.ts
import express, { Router } from "express";
import authController from "./controllers/AuthController";

const authRouter: Router = express.Router();

authRouter.post("/auth/login", async (req, res) => {
  await authController.login(req, res);
});

authRouter.post("/auth/register", async (req, res) => {
  await authController.register(req, res);
});

// authRouter.get("/user/:id", async (req, res) => {
//     await authController.getUser(req, res);
// })

export default authRouter;
