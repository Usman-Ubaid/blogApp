import { Request, Response } from "express";
import {
  checkExistingUsername,
  checkExistingEmail,
  insertUserDb,
} from "../utils/queries";
import { comparePassword, generateJWT } from "../module/auth";

const userController = {
  registerUser: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
      }

      const dbEmail = await checkExistingEmail(email);
      if (dbEmail.length > 0) {
        return res.status(400).json({ error: "This email is already in use" });
      }

      const dbUsername = await checkExistingUsername(username);
      if (dbUsername.length > 0) {
        return res.status(400).json({ error: "This username is taken" });
      }

      const user = await insertUserDb(username, email, password);

      return res.status(200).json({
        message: "success",
        data: { id: user.insertId, token: generateJWT(user.insertId) },
      });
    } catch (error) {
      console.log("Error registering user", error);
      return res.status(500).json({ error: "Server error" });
    }
  },

  loginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await checkExistingEmail(email);

      if (user.length > 0) {
        const { id, username, email, password: dbpassword } = user[0];
        const checkPassword = await comparePassword(password, dbpassword);
        if (checkPassword) {
          return res.status(200).json({
            message: "Success",
            data: { id, username, email, token: generateJWT(id) },
          });
        }
      } else {
        return res.status(404).json({ error: "Email not found" });
      }
      return res.status(401).json({ error: "Invalid credentials" });
    } catch (error) {
      return res.status(500).json({ error: "Server Error" });
    }
  },
};

export default userController;
