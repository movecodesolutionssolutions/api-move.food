import { Request, Response } from "express";
import ProdutoModel, { IProduto } from "../models/Produto";
import EntidadeModel from "../models/Entidade";
import TipoProdutoModel from "../models/TipoProduto";
import IngredienteModel, { IIngrediente } from "../models/Igredients";

class ProdutoController {
    async createProduto(req: Request, res: Response): Promise<void> {
        try {
            const { nome, qtd_estoque, entidade_id, descricao, preco, status, tipo_produto_id } = req.body;

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

            // Validate descricao
            if (!descricao || typeof descricao !== "string") {
                res.status(400).json({ error: "O campo 'descricao' é obrigatório e deve ser uma string." });
                return;
            }

            // Validate preco
            if (!preco || typeof preco !== "string") {
                res.status(400).json({ error: "O campo 'preco' é obrigatório e deve ser uma string." });
                return;
            }

            // Validate status
            if (status === undefined || typeof status !== "boolean") {
                res.status(400).json({ error: "O campo 'status' é obrigatório e deve ser um boolean." });
                return;
            }

            // Validate tipo_produto_id
            if (!tipo_produto_id || typeof tipo_produto_id !== "string") {
                res.status(400).json({ error: "O campo 'tipo_produto_id' é obrigatório e deve ser uma string." });
                return;
            }

            // Verificar se o tipo de produto existe
            const tipoProduto = await TipoProdutoModel.findById(tipo_produto_id);
            if (!tipoProduto) {
                res.status(404).json({ error: "Tipo de produto não encontrado." });
                return;
            }

            const produto: IProduto = new ProdutoModel({
                nome,
                qtd_estoque,
                entidade: {
                    _id: entidade._id,
                    nome: entidade.nome,
                    telefone: entidade.telefone,
                },
                descricao,
                preco,
                status,
                tipo_produto: {
                    _id: tipoProduto._id,
                    nome: tipoProduto.nome,
                },
            });

            await produto.save();

            res.status(201).json(produto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao criar o produto." });
        }
    }

    async getProdutos(req: Request, res: Response): Promise<void> {
        try {
            const produtos = await ProdutoModel.find().populate("entidade").populate("tipo_produto");
            res.status(200).json(produtos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao obter os produtos." });
        }
    }

    async getProdutoById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const produto = await ProdutoModel.findById(id).populate("entidade").populate("tipo_produto");

            if (!produto) {
                res.status(404).json({ error: "Produto não encontrado." });
                return;
            }

            res.status(200).json(produto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao obter o produto." });
        }
    }

    async getProdutosByEntidade(req: Request, res: Response): Promise<void> {
        try {
            const { entidadeId } = req.params;

            // Verificar se a entidade existe
            const entidade = await EntidadeModel.findById(entidadeId);
            if (!entidade) {
                res.status(404).json({ error: "Entidade não encontrada." });
                return;
            }

            // Obter todos os produtos da entidade
            const produtos = await ProdutoModel.find({ "entidade._id": entidadeId }).populate("entidade").populate("tipo_produto");

            res.status(200).json(produtos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao obter os produtos da entidade." });
        }
    }

    async adicionarIngredientes(req: Request, res: Response): Promise<void> {
        try {
            const { id: produtoId } = req.params;
            const { ingredientes } = req.body;

            // Verificar se o produto existe
            const produto = await ProdutoModel.findById(produtoId);
            if (!produto) {
                res.status(404).json({ error: "Produto não encontrado." });
                return;
            }

            // Verificar se os ingredientes existem
            const ingredientesExistentes = await IngredienteModel.find({ _id: { $in: ingredientes } });
            if (ingredientesExistentes.length !== ingredientes.length) {
                res.status(404).json({ error: "Um ou mais ingredientes não encontrados." });
                return;
            }

            // Mapear os IDs dos ingredientes para objetos com as propriedades necessárias
            const ingredientesParaAdicionar: Array<{ _id: any; nome: string }> = ingredientesExistentes.map(ingrediente => ({
                _id: ingrediente._id,
                nome: ingrediente.nome,
            }));

            // Verificar se os ingredientes já existem no produto
            ingredientesParaAdicionar.forEach((ingredienteAdicionar) => {
                const ingredienteExistente = produto.ingredientes.find((ingrediente) => ingrediente._id.toString() === ingredienteAdicionar._id.toString());

                if (ingredienteExistente) {
                    // Se o ingrediente já existe, remova-o da lista para evitar duplicatas
                    const index = produto.ingredientes.indexOf(ingredienteExistente);
                    produto.ingredientes.splice(index, 1);
                }

                // Adicionar ingredientes ao produto
                produto.ingredientes.push(ingredienteAdicionar);
            });

            await produto.save();

            res.status(200).json(produto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao adicionar ingredientes ao produto." });
        }
    }

    async removerIngrediente(req: Request, res: Response): Promise<void> {
        try {
            const { id: produtoId } = req.params;
            const { ingredienteId } = req.body;

            // Verificar se o produto existe
            const produto = await ProdutoModel.findById(produtoId);
            if (!produto) {
                res.status(404).json({ error: "Produto não encontrado." });
                return;
            }

            // Verificar se o ingrediente existe no produto
            const indexIngrediente = produto.ingredientes.findIndex(ingrediente => ingrediente._id.toString() === ingredienteId);
            if (indexIngrediente === -1) {
                res.status(404).json({ error: "Ingrediente não encontrado no produto." });
                return;
            }

            // Remover o ingrediente do array
            produto.ingredientes.splice(indexIngrediente, 1);
            await produto.save();

            res.status(200).json(produto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao remover ingrediente do produto." });
        }
    }

    async updateProduto(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { nome, qtd_estoque, entidade_id, descricao, preco, status, tipo_produto_id } = req.body;

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

            // Validate descricao
            if (!descricao || typeof descricao !== "string") {
                res.status(400).json({ error: "O campo 'descricao' é obrigatório e deve ser uma string." });
                return;
            }

            // Validate preco
            if (!preco || typeof preco !== "string") {
                res.status(400).json({ error: "O campo 'preco' é obrigatório e deve ser uma string." });
                return;
            }

            // Validate status
            if (status === undefined || typeof status !== "boolean") {
                res.status(400).json({ error: "O campo 'status' é obrigatório e deve ser um booleano." });
                return;
            }

            // Validate tipo_produto_id
            if (!tipo_produto_id || typeof tipo_produto_id !== "string") {
                res.status(400).json({ error: "O campo 'tipo_produto_id' é obrigatório e deve ser uma string." });
                return;
            }

            // Verificar se o tipo de produto existe
            const tipoProduto = await TipoProdutoModel.findById(tipo_produto_id);
            if (!tipoProduto) {
                res.status(404).json({ error: "Tipo de produto não encontrado." });
                return;
            }

            // Update produto
            const updatedProduto = await ProdutoModel.findByIdAndUpdate(
                id,
                {
                    nome,
                    qtd_estoque,
                    entidade: {
                        _id: entidade._id,
                        nome: entidade.nome,
                        telefone: entidade.telefone,
                    },
                    descricao,
                    preco,
                    status,
                    tipo_produto: {
                        _id: tipoProduto._id,
                        nome: tipoProduto.nome,
                    },
                },
                { new: true }
            ).populate("entidade").populate("tipo_produto");

            if (!updatedProduto) {
                res.status(404).json({ error: "Produto não encontrado." });
                return;
            }

            res.status(200).json(updatedProduto);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao atualizar o produto." });
        }
    }

    async deleteProduto(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedProduto = await ProdutoModel.findByIdAndDelete(id);

            if (!deletedProduto) {
                res.status(404).json({ error: "Produto não encontrado." });
                return;
            }

            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao excluir o produto." });
        }
    }
}

export default new ProdutoController();
