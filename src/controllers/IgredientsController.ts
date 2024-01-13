import { Request, Response } from "express";
import IngredienteModel, { IIngrediente } from "../models/Igredients";
import EntidadeModel from "../models/Entidade";

class IngredientesController {
  async createIngrediente(req: Request, res: Response): Promise<void> {
    try {
      const { nome, entidade_id, qtd_estoque, status } = req.body;

      // Validate nome
      if (!nome || typeof nome !== "string") {
        res.status(400).json({ error: "O campo 'nome' é obrigatório e deve ser uma string." });
        return;
      }

      // Validate entidade_id
      if (!entidade_id || typeof entidade_id !== "string") {
        res.status(400).json({ error: "O campo 'entidade_id' é obrigatório e deve ser uma string." });
        return;
      }

      // Verificar se a entidade existe
      const entidade = await EntidadeModel.findById(entidade_id);
      if (!entidade) {
        res.status(404).json({ error: "Entidade não encontrada." });
        return;
      }

      // Validate qtd_estoque
      if (!qtd_estoque || typeof qtd_estoque !== "number") {
        res.status(400).json({ error: "O campo 'qtd_estoque' é obrigatório e deve ser um número." });
        return;
      }

      // Validate status
      if (status === undefined || typeof status !== "boolean") {
        res.status(400).json({ error: "O campo 'status' é obrigatório e deve ser um boolean." });
        return;
      }

      const ingrediente: IIngrediente = new IngredienteModel({
        nome,
        entidade: {
          _id: entidade._id,
          nome: entidade.nome,
          telefone: entidade.telefone,
        },
        qtd_estoque,
        status,
      });

      await ingrediente.save();

      res.status(201).json(ingrediente);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar o ingrediente." });
    }
  }

  async getAllIngredientes(req: Request, res: Response): Promise<void> {
    try {
      const ingredientes = await IngredienteModel.find();
      res.status(200).json(ingredientes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao obter os ingredientes." });
    }
  }

  async getIngredienteById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const ingrediente = await IngredienteModel.findById(id).populate("entidade");

      if (!ingrediente) {
        res.status(404).json({ error: "Ingrediente não encontrado." });
        return;
      }
      res.status(200).json(ingrediente);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao obter ingrediente." });
    }
  }

  async updateIngrediente(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nome, qtd_estoque, status } = req.body;

      // Validate nome
      if (!nome || typeof nome !== "string") {
        res.status(400).json({ error: "O campo 'nome' é obrigatório e deve ser uma string." });
        return;
      }

      // Validate qtd_estoque
      if (!qtd_estoque || typeof qtd_estoque !== "number") {
        res.status(400).json({ error: "O campo 'qtd_estoque' é obrigatório e deve ser um número." });
        return;
      }

      // Validate status
      if (status === undefined || typeof status !== "boolean") {
        res.status(400).json({ error: "O campo 'status' é obrigatório e deve ser um boolean." });
        return;
      }

      const updatedIngrediente = await IngredienteModel.findByIdAndUpdate(
          id,
          { nome, qtd_estoque, status },
          { new: true } // Return the updated document
      );

      if (!updatedIngrediente) {
        res.status(404).json({ error: "Ingrediente não encontrado." });
        return;
      }

      res.status(200).json(updatedIngrediente);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atualizar o ingrediente." });
    }
  }

  async deleteIngrediente(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedIngrediente = await IngredienteModel.findByIdAndDelete(id);

      if (!deletedIngrediente) {
        res.status(404).json({ error: "Ingrediente não encontrado." });
        return;
      }

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao excluir o ingrediente." });
    }
  }
}

export default new IngredientesController();
