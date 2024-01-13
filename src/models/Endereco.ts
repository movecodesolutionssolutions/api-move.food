import mongoose, { Document, Model, Schema } from "mongoose";

export interface IEndereco extends Document {
    uf: string;
    cidade: string;
    bairro: string;
    logradouro: string;
    numero?: number;
    complemento?: string;
}

const EnderecoSchema = new mongoose.Schema<IEndereco>({
    uf: { type: String, required: true },
    cidade: { type: String, required: true },
    bairro: { type: String, required: true },
    logradouro: { type: String, required: true },
    numero: { type: Number, required: false },
    complemento: { type: String, required: false },
}, { timestamps: true });

const EnderecoModel: Model<IEndereco> = mongoose.model("Endereco", EnderecoSchema);

export default EnderecoModel;
