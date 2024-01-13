import mongoose, { Document, Model, Schema } from "mongoose";
import { IEntidade } from "./Entidade";

export interface IIngrediente extends Document {
    nome: string;
    entidade: IEntidade["_id"];
    qtd_estoque: number;
    status: boolean;
}

const IngredienteSchema = new mongoose.Schema<IIngrediente>(
    {
        nome: { type: String, required: true },
        entidade: {
            type: new mongoose.Schema<IEntidade>({
                _id: { type: Schema.Types.ObjectId, ref: "Entidade", required: true },
                nome: { type: String },
                telefone: { type: String },
            }),
            required: true,
        },
        qtd_estoque: { type: Number, required: true },
        status: { type: Boolean, required: true },
    },
    { timestamps: true }
);

const IngredienteModel: Model<IIngrediente> = mongoose.model(
    "Ingrediente",
    IngredienteSchema
);

export default IngredienteModel;
