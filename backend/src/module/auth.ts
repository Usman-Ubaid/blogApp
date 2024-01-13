import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = (password: string, dbpassword: string) => {
  return bcrypt.compare(password, dbpassword);
};

export const generateJWT = (id: number) => {
  if (process.env.JWT_SECRET) {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  }
};

export const verifyJWT = (token: string) => {
  if (process.env.JWT_SECRET) {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    return decode;
  }
};
