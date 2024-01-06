import mongoose, { Document, Model } from "mongoose";

export interface IIngredient extends Document {
  name: string;
  quantity: number;
  value: number;
}

const IngredientSchema = new mongoose.Schema<IIngredient>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  value: { type: Number, required: true },
});

const IngredientModel: Model<IIngredient> = mongoose.model(
  "Ingredient",
  IngredientSchema
);

export default IngredientModel;
