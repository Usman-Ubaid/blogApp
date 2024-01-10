import express from "express";
import "dotenv/config";
import { db } from "./config/db";
import router from "./routes";

const app = express();

const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connect((error) => {
  if (error) {
    console.log("Error connecting to database", error.message);
  } else {
    console.log("\x1b[36m%s\x1b[0m", "Connected to Database");
  }
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
