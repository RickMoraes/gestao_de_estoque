import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/routes/api.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT;
// const dbUser = process.env.DB_USER;
dotenv.config();

const corsOptions = {
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],

  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],

  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(routes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
