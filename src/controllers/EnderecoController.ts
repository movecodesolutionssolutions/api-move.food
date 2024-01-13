import { Request, Response } from "express";
import EnderecoModel, { IEndereco } from "../models/Endereco";

class EnderecoController {
    async createEndereco(req: Request, res: Response): Promise<void> {
        try {
            const { uf, cidade, bairro, logradouro, numero, complemento } = req.body;

            // Validate uf
            if (!uf || typeof uf !== "string") {
                res.status(400).json({ error: "O campo 'uf' é obrigatório e deve ser uma string." });
                return;
            }

            // Validate cidade
            if (!cidade || typeof cidade !== "string") {
                res.status(400).json({ error: "O campo 'cidade' é obrigatório e deve ser uma string." });
                return;
            }

            // Validate bairro
            if (!bairro || typeof bairro !== "string") {
                res.status(400).json({ error: "O campo 'bairro' é obrigatório e deve ser uma string." });
                return;
            }

            // Validate logradouro
            if (!logradouro || typeof logradouro !== "string") {
                res.status(400).json({ error: "O campo 'logradouro' é obrigatório e deve ser uma string." });
                return;
            }

            // Create endereco
            const endereco: IEndereco = new EnderecoModel({
                uf,
                cidade,
                bairro,
                logradouro,
                numero,
                complemento,
            });

            await endereco.save();

            res.status(201).json(endereco);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao criar o endereço." });
        }
    }

    async getEnderecos(req: Request, res: Response): Promise<void> {
        try {
            const enderecos = await EnderecoModel.find();
            res.status(200).json(enderecos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao obter os endereços." });
        }
    }

    async getEnderecoById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const endereco = await EnderecoModel.findById(id);

            if (!endereco) {
                res.status(404).json({ error: "Endereço não encontrado." });
                return;
            }

            res.status(200).json(endereco);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao obter o endereço." });
        }
    }

    async updateEndereco(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { uf, cidade, bairro, logradouro, numero, complemento } = req.body;

            // Validate uf
            if (!uf || typeof uf !== "string") {
                res.status(400).json({ error: "O campo 'uf' é obrigatório e deve ser uma string." });
                return;
            }

            // Validate cidade
            if (!cidade || typeof cidade !== "string") {
                res.status(400).json({ error: "O campo 'cidade' é obrigatório e deve ser uma string." });
                return;
            }

            // Validate bairro
            if (!bairro || typeof bairro !== "string") {
                res.status(400).json({ error: "O campo 'bairro' é obrigatório e deve ser uma string." });
                return;
            }

            // Validate logradouro
            if (!logradouro || typeof logradouro !== "string") {
                res.status(400).json({ error: "O campo 'logradouro' é obrigatório e deve ser uma string." });
                return;
            }

            // Update endereco
            const updatedEndereco = await EnderecoModel.findByIdAndUpdate(
                id,
                {
                    uf,
                    cidade,
                    bairro,
                    logradouro,
                    numero,
                    complemento,
                },
                { new: true }
            );

            if (!updatedEndereco) {
                res.status(404).json({ error: "Endereço não encontrado." });
                return;
            }

            res.status(200).json(updatedEndereco);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao atualizar o endereço." });
        }
    }

    async deleteEndereco(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedEndereco = await EnderecoModel.findByIdAndDelete(id);

            if (!deletedEndereco) {
                res.status(404).json({ error: "Endereço não encontrado." });
                return;
            }

            res.status(204).json();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao excluir o endereço." });
        }
    }
}

export default new EnderecoController();
