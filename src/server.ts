// server.ts
import express from "express";
import swaggerUI from "swagger-ui-express";
import routes from "./routes";
import dotenv from "dotenv"
import cors from "cors"

import swaggerDocs from "./swagger.json"

dotenv.config();

import databaseConnection from "./database/db";

databaseConnection();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", routes);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
