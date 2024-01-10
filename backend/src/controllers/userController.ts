import { Request, Response } from "express";
import { checkExistingUsername, checkExistingEmail } from "../utils/queries";

const userController = {
  registerUser: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const dbEmail = await checkExistingEmail(email);
    if (dbEmail.length > 0) {
      return res.status(400).json({ message: "This email is already in use" });
    }
    const dbUsername = await checkExistingUsername(username);
    if (dbUsername.length > 0) {
      return res.status(400).json({ message: "This username is taken" });
    }

    res.json({ message: "success" });
  },

  loginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    return res.status(200).json({ email, password });
  },
};

export default userController;
