// server.ts
import express from "express";
import routes from "./routes";
import dotenv from "dotenv"
import cors from "cors"

dotenv.config();

import databaseConnection from "./database/db";

databaseConnection();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
