import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  cpf: string; // Adicionando o atributo cpf
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
});

const UserModel: Model<IUser> = mongoose.model("User", UserSchema);

export default UserModel;
