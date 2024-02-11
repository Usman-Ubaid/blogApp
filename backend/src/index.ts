import express from "express";
import "dotenv/config";
import cors from "cors";
import { db } from "./config/db";
import router from "./routes";
import bodyParser from "body-parser";
import path from "path";

const app = express();

const port = process.env.PORT;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

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
