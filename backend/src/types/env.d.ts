import "dotenv/config";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
    }
  }
}
