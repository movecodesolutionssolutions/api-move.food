import mongoose, { Document, Model, Schema } from "mongoose";
import { IEntidade } from "./Entidade";

export interface ITipoProduto extends Document {
    nome: string;
    entidade: IEntidade["_id"];
}

const TipoProdutoSchema = new mongoose.Schema<ITipoProduto>(
    {
        nome: { type: String, required: true },
        entidade: {
            type: new mongoose.Schema<IEntidade>({
                _id: {type: Schema.Types.ObjectId, ref: "Entidade", required: true},
                nome: {type: String},
                telefone: {type: String},
            }),
            required: true,
        },
    },
    { timestamps: true }
);

const TipoProdutoModel: Model<ITipoProduto> = mongoose.model("TipoProduto", TipoProdutoSchema);

export default TipoProdutoModel;
