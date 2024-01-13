import { User } from "../user.t";

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}

export {};
