import { Request, Response } from "express";
import UserModel, { IUser } from "../models/User";

class UserController {
    async get(req: Request, res: Response): Promise<void> {
        try {
            const users: IUser[] = await UserModel.find();
            res.status(200).json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Ocorreu um erro no servidor, tente mais tarde!" });
        }
    }
}

export default new UserController();
