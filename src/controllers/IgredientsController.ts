import { Request, Response } from "express";

import IngredientSchema, { IIngredient } from "../models/Igredients";

class IgredientsController {
  async get(req: Request, res: Response): Promise<void> {}
  async post(req: Request, res: Response): Promise<void> {
    const { name, quantity, value } = req.body;

    if (!name) {
      res.status(401).send({ error: "Nome e obrigatória" });
    }
    if (!quantity) {
      res.status(401).send({ error: "Quantidade e obrigatória" });
    }
    if (!value) {
      res.status(401).send({ error: "Valor e obrigatória" });
    }

    const Igredients = new IngredientSchema({
      name,
      quantity,
      value,
    });

    try {
      await Igredients.save();

      res.status(201).json({ message: "Igrediente criado com sucesso!" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Ocorreu um erro no servidor, tente mais tarde!" });
    }
  }
  async patch(req: Request, res: Response) {}
  async delete(req: Request, res: Response) {}
}

export default new IgredientsController();