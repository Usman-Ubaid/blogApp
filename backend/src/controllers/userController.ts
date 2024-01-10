import { Request, Response } from "express";

const userController = {
  registerUser: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    res.status(200).json({ username, email, password });
  },
};

export default userController;
