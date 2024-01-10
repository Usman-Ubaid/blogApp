import { Request, Response } from "express";
import { checkExistingEmail } from "../utils/queries";

const userController = {
  registerUser: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const checkEmail = await checkExistingEmail(email);
    if (checkEmail.length > 0) {
      return res.status(400).json({ message: "This email is already in use" });
    }
  },

  loginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    return res.status(200).json({ email, password });
  },
};

export default userController;
