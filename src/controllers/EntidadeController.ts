import { Request, Response } from "express";
import EntidadeModel, { IEntidade } from "../models/Entidade";
import UserModel from "../models/User";
import EnderecoModel from "../models/Endereco";

class EntidadeController {
    async createEntidade(req: Request, res: Response): Promise<void> {
        try {
            const { nome, proprietario_id, endereco_id, status, telefone } = req.body;

            // Validate nome
            if (!nome || typeof nome !== "string") {
                res.status(400).json({ error: "O campo 'nome' é obrigatório e deve ser uma string." });
                return;
            }

            // Validate proprietario_id
            if (!proprietario_id || typeof proprietario_id !== "string") {
                res.status(400).json({ error: "O campo 'proprietario_id' é obrigatório e deve ser uma string." });
                return;
            }

            // Validate endereco_id
            if (!endereco_id || typeof endereco_id !== "string") {
                res.status(400).json({ error: "O campo 'endereco_id' é obrigatório e deve ser uma string." });
                return;
            }

            // Verificar se o usuário proprietário existe
            const proprietario = await UserModel.findById(proprietario_id);
            if (!proprietario) {
                res.status(404).json({ error: "Usuário proprietário não encontrado." });
                return;
            }

            // Verificar se o endereço existe
            const endereco = await EnderecoModel.findById(endereco_id);
            if (!endereco) {
                res.status(404).json({ error: "Endereço não encontrado." });
                return;
            }

            // Validate status
            if (status === undefined || typeof status !== "boolean") {
                res.status(400).json({ error: "O campo 'status' é obrigatório e deve ser um valor booleano." });
                return;
            }

            // Validate telefone
            if (!telefone || typeof telefone !== "string") {
                res.status(400).json({ error: "O campo 'telefone' é obrigatório e deve ser uma string." });
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

                endereco: {
                    _id: endereco._id,
                    uf: endereco.uf,
                    cidade: endereco.cidade,
                    bairro: endereco.bairro,
                    logradouro: endereco.logradouro,
                    numero: endereco.numero,
                    complemento: endereco.complemento,
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

    async getEntidadeById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const entidade = await EntidadeModel.findById(id).populate("proprietario");

            if (!entidade) {
                res.status(404).json({ error: "Entidade não encontrada." });
                return;
            }

            res.status(200).json(entidade);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao obter a entidade." });
        }
    }

    async updateEntidade(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nome, status, telefone, proprietario_id, endereco_id } = req.body;

            // Validate nome
            if (!nome || typeof nome !== "string") {
                res.status(400).json({ error: "O campo 'nome' é obrigatório e deve ser uma string." });
                return;
            }

            // Validate proprietario_id
            if (!proprietario_id || typeof proprietario_id !== "string") {
                res.status(400).json({ error: "O campo 'proprietario_id' é obrigatório e deve ser uma string." });
                return;
            }

            // Validate endereco_id
            if (!endereco_id || typeof endereco_id !== "string") {
                res.status(400).json({ error: "O campo 'endereco_id' é obrigatório e deve ser uma string." });
                return;
            }

            // Verificar se o usuário proprietário existe
            const proprietario = await UserModel.findById(proprietario_id);
            if (!proprietario) {
                res.status(404).json({ error: "Usuário proprietário não encontrado." });
                return;
            }

            // Verificar se o endereço existe
            const endereco = await EnderecoModel.findById(endereco_id);
            if (!endereco) {
                res.status(404).json({ error: "Endereço não encontrado." });
                return;
            }

            // Validate status
            if (status === undefined || typeof status !== "boolean") {
                res.status(400).json({ error: "O campo 'status' é obrigatório e deve ser um valor booleano." });
                return;
            }

            // Validate telefone
            if (!telefone || typeof telefone !== "string") {
                res.status(400).json({ error: "O campo 'telefone' é obrigatório e deve ser uma string." });
                return;
            }
            const updatedEntidade = await EntidadeModel.findByIdAndUpdate(
                id,
                { nome, status, telefone },
                { new: true } // Return the updated document
            );

            if (!updatedEntidade) {
                res.status(404).json({ error: "Entidade não encontrada." });
                return;
            }

            res.status(200).json(updatedEntidade);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao atualizar a entidade." });
        }
    }

    async deleteEntidade(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const deletedEntidade = await EntidadeModel.findByIdAndDelete(id);

            if (!deletedEntidade) {
                res.status(404).json({ error: "Entidade não encontrada." });
                return;
            }

            res.status(204).send(); // No content for successful deletion
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao excluir a entidade." });
        }
    }
}

export default new EntidadeController();
