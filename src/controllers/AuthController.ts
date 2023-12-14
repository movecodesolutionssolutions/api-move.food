import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel, { IUser } from "../models/User";

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email) {
      res.status(401).send({ error: "Email é obrigatório" });
      return;
    }

    if (!password) {
      res.status(401).send({ error: "Senha é obrigatória" });
      return;
    }

    try {
      const user: IUser | null = await UserModel.findOne({ email: email });

      if (!user) {
        res.status(404).send({ error: "Usuário não encontrado" });
        return;
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        res.status(422).send({ error: "Senha inválida!" });
        return;
      }

      const secret = process.env.SECRET as string;

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      res
        .status(200)
        .json({ message: "Autenticação realizada com sucesso!", token, user });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Ocorreu um erro no servidor, tente mais tarde!" });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    const { name, email, password, confirmPassword } = req.body;

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crie usuários
    const user = new UserModel({
      name,
      email,
      password: passwordHash,
    });

    try {
      await user.save();

      res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Ocorreu um erro no servidor, tente mais tarde!" });
    }
  }
  // async getUser(req: Request, res: Response): Promise<void>{
  //   const id = req.params.id


  //   const user = await UserModel.findById(id)

  //   if (!user) {
  //     res.status(404).json({ message: "Usuário não encontrado" })
  //     return;
  //   }
  // }
}

export default new AuthController();
