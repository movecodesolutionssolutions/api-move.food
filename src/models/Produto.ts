import mongoose, { Document, Model, Schema, Types } from "mongoose";
import { IEntidade } from "./Entidade";
import { ITipoProduto } from "./TipoProduto";
import { IIngrediente } from "./Igredients";

export interface IProduto extends Document {
    nome: string;
    qtd_estoque: number;
    entidade: IEntidade["_id"];
    descricao: string;
    preco: string;
    status: boolean;
    tipo_produto: ITipoProduto["_id"];
    ingredientes: {
        _id: IIngrediente["_id"];
        nome: string;
    }[];}

const ProdutoSchema = new mongoose.Schema<IProduto>({
    nome: { type: String, required: true },
    qtd_estoque: { type: Number, required: true },
    entidade: {
        type: new mongoose.Schema<IEntidade>({
            _id: { type: Schema.Types.ObjectId, ref: "Entidade", required: true },
            nome: { type: String },
            telefone: { type: String },
        }),
        required: true,
    },
    descricao: { type: String, required: true },
    preco: { type: String, required: true },
    status: { type: Boolean, required: true },
    tipo_produto: {
        type: new mongoose.Schema<ITipoProduto>({
            _id: { type: Schema.Types.ObjectId, ref: "TipoProduto", required: true },
            nome: { type: String },
        }),
        required: true,
    },
    ingredientes: [
        {
            _id: { type: Schema.Types.ObjectId, ref: "Ingrediente" },
            nome: String,
        }
    ],
}, { timestamps: true });

const ProdutoModel: Model<IProduto> = mongoose.model("Produto", ProdutoSchema);

export default ProdutoModel;
