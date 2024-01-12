import { Request, Response } from "express";
import EntidadeModel, { IEntidade } from "../models/Entidade";
import UserModel from "../models/User";

class EntidadeController {
    async createEntidade(req: Request, res: Response): Promise<void> {
        try {
            const { nome, proprietario_id, status, telefone } = req.body;

            // Verificar se o usuário proprietário existe
            const proprietario = await UserModel.findById(proprietario_id);
            if (!proprietario) {
                res.status(404).json({ error: "Usuário proprietário não encontrado." });
                return;
            }

            const entidade: IEntidade = new EntidadeModel({
                nome,
                proprietario: {
                    _id: proprietario._id,
                    name: proprietario.name,
                    email: proprietario.email,
                    cpf: proprietario.cpf,
                    // Adicione outros campos do usuário que desejar
                },
                status,
                telefone,
            });

            await entidade.save();

            res.status(201).json(entidade);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao criar a entidade." });
            return;
        }
    }

    async getAllEntidades(req: Request, res: Response): Promise<void> {
        try {
            const entidades = await EntidadeModel.find().populate("proprietario");
            res.status(200).json(entidades);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao obter as entidades." });
        }
    }
}

export default new EntidadeController();
