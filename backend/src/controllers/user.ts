import { Request, Response } from "express";
import {
  checkExistingUsername,
  checkExistingEmail,
  insertUserDb,
} from "../utils/authQueries";
import { comparePassword, generateJWT } from "../module/auth";
import { isValidEmail } from "../utils/emailValidation";

const userController = {
  registerUser: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
      }

      if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      const dbUser = await checkExistingEmail(email);

      if (dbUser && dbUser.length > 0) {
        return res.status(400).json({ error: "This email is already in use" });
      }

      const dbUsername = await checkExistingUsername(username);
      if (dbUsername.length > 0) {
        return res.status(400).json({ error: "This username is taken" });
      }

      const user = await insertUserDb(username, email, password);

      const payload = {
        id: user.insertId,
        email,
      };

      return res.status(200).json({
        message: "success",
        data: { id: user.insertId, token: generateJWT(payload) },
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

      if (user && user.length > 0) {
        const payload = {
          id: user[0].id,
          email: user[0].email,
        };
        const checkPassword = await comparePassword(password, user[0].password);
        if (!checkPassword) {
          return res.status(401).json({ error: "Invalid credentials" });
        } else {
          const token = generateJWT(payload);
          return res.status(200).json({
            message: "Success",
            data: { id: user[0].id, email, token },
          });
        }
      } else {
        return res.status(404).json({ error: "Email not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Server Error" });
    }
  },
};

export default userController;
