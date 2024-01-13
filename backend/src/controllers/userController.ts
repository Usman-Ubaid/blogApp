import { Request, Response } from "express";
import {
  checkExistingUsername,
  checkExistingEmail,
  insertUserDb,
} from "../utils/queries";
import { generateJWT } from "../module/auth";

const userController = {
  registerUser: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
      if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }

      const dbEmail = await checkExistingEmail(email);
      if (dbEmail.length > 0) {
        return res
          .status(400)
          .json({ message: "This email is already in use" });
      }

      const dbUsername = await checkExistingUsername(username);
      if (dbUsername.length > 0) {
        return res.status(400).json({ message: "This username is taken" });
      }

      const user = await insertUserDb(username, email, password);

      return res.json({
        message: "success",
        data: { id: user.insertId, token: generateJWT(user.insertId) },
      });
    } catch (error) {
      console.log("Error registering user", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  loginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    return res.status(200).json({ email, password });
  },
};

export default userController;
