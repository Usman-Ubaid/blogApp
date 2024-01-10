import { Request, Response } from "express";

const userController = {
  registerUser: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    return res.status(200).json({ username, email, password });
  },
  loginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    return res.status(200).json({ email, password });
  },
};

export default userController;
