import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./src/routes/api.js";
import "dotenv/config";
import { rateLimit } from "express-rate-limit";

const app = express();
const port = process.env.PORT;
// const dbUser = process.env.DB_USER;
dotenv.config();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutos
  limit: 20, // limite de cada IP para 100 requisições por janela
  standardHeaders: "draft-8",
  legacyHeaders: false, //desabilita o X-RateLimit headers
  ipv6Subnet: 52,
  message: `Você atingiu o número máximo de requisições, volte mais tarde!`,
});

const corsOptions = {
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],

  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],

  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(limiter); // aplica o rate-limit middleware para todos os requests

app.use(routes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
