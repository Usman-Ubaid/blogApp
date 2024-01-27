import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

type User = {
  id: number;
  email: string;
};

const saltRounds = 5;

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = (password: string, dbpassword: string) => {
  return bcrypt.compare(password, dbpassword);
};

export const generateJWT = (user: User) => {
  if (process.env.JWT_SECRET) {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );
    return token;
  }
};

export const verifyJWT = (token: string) => {
  if (process.env.JWT_SECRET) {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return decode as JwtPayload;
  }
};
