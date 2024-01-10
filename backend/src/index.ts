import express, { urlencoded } from "express";
import "dotenv/config";
import { connection } from "./config/db";

const app = express();

const port = process.env.PORT;

app.use(urlencoded({ extended: true }));
app.use(express.json());

connection.connect((error) => {
  if (error) {
    console.log("Error connecting to database", error.message);
  } else {
    console.log("\x1b[36m%s\x1b[0m", "Connected to Database");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
