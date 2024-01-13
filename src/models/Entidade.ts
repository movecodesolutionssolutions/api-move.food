import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./User"; // Importando o modelo de usuário
import { IEndereco } from "./Endereco"; // Importando o modelo de usuário

export interface IEntidade extends Document {
    nome: string;
    proprietario: IUser["_id"];
    endereco: IEndereco["_id"];
    status: Boolean;
    telefone: String;
    // endereco_id: number;
}

const EntidadeSchema = new mongoose.Schema<IEntidade>({
    nome: { type: String, required: true },
    proprietario: {
        type: new mongoose.Schema<IUser>({
            _id: { type: Schema.Types.ObjectId, ref: "User", required: true },
            name: { type: String },
            email: { type: String },
            cpf: { type: String },
        }),
        required: true,
    },
    endereco: {
        type: new mongoose.Schema<IEndereco>({
            _id: { type: Schema.Types.ObjectId, ref: "Endereco", required: true },
            uf: { type: String },
            cidade: { type: String },
            bairro: { type: String },
            logradouro: { type: String },
            numero: { type: Number },
            complemento: { type: String },
        }),
        required: true,
    },
    status: { type: Boolean, required: true },
    telefone: { type: String, required: true },
}, { timestamps: true });

const EntidadeModel: Model<IEntidade> = mongoose.model("Entidade", EntidadeSchema);

export default EntidadeModel;
