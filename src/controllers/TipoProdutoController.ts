import { Request, Response } from "express";
import TipoProdutoModel, { ITipoProduto } from "../models/TipoProduto";
import EntidadeModel from "../models/Entidade";
import IngredienteModel, {IIngrediente} from "../models/Igredients";

class TipoProdutoController {
    async createTipoProduto(req: Request, res: Response): Promise<void> {
        try {
            const { nome, entidade_id } = req.body;

            if (!nome || typeof nome !== "string") {
                res.status(400).json({ error: "O campo nome é obrigatório e deve ser uma string." });
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

            const tipoProduto: ITipoProduto = new TipoProdutoModel({
                nome,
                entidade: {
                    _id: entidade._id,
                    nome: entidade.nome,
                    telefone: entidade.telefone,
                },
            });

            await tipoProduto.save();

            res.status(201).json(tipoProduto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao criar o tipo de produto." });
        }
    }

    async getTipoProdutos(req: Request, res: Response): Promise<void> {
        try {
            const tipoProdutos = await TipoProdutoModel.find().populate("entidade");
            res.status(200).json(tipoProdutos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao obter os tipos de produtos." });
        }
    }

    async getTipoProdutoById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const tipoProduto = await TipoProdutoModel.findById(id).populate("entidade");

            if (!tipoProduto) {
                res.status(404).json({ error: "Tipo de produto não encontrado." });
                return;
            }

            res.status(200).json(tipoProduto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao obter o tipo de produto." });
        }
    }

    async updateTipoProduto(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nome, entidade_id } = req.body;

            if (!nome || typeof nome !== "string") {
                res.status(400).json({ error: "O campo nome é obrigatório e deve ser uma string." });
                return;
            }

            const updatedTipoProduto = await TipoProdutoModel.findByIdAndUpdate(
                id,
                {
                    nome
                },
                { new: true }
            );

            if (!updatedTipoProduto) {
                res.status(404).json({ error: "Tipo de produto não encontrado." });
                return;
            }

            res.status(200).json(updatedTipoProduto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao atualizar o tipo de produto." });
        }
    }

    async deleteTipoProduto(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedTipoProduto = await TipoProdutoModel.findByIdAndDelete(id);

            if (!deletedTipoProduto) {
                res.status(404).json({ error: "Tipo de produto não encontrado." });
                return;
            }

            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao excluir o tipo de produto." });
        }
    }
}

export default new TipoProdutoController();
