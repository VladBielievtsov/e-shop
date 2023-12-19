import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import cors from "cors";
import { getMe, login, logout, register } from "./controllers/UserController";
import { createProduct, getProducts } from "./controllers/ProductController";

async function main() {
  const app = express();
  app.use(express.json());

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const PORT = process.env.PORT || 4040;

  app.get("/", (req, res) => {
    res.json("Api for Shop-App");
  });

  // USER
  app.post("/register", register);
  app.post("/login", login);
  app.post("/logout", logout);
  app.post("/getme", getMe);

  // PRODUCTS
  app.post("/product", createProduct);
  app.get("/products", getProducts);

  app.listen(PORT, () => {
    console.log(`Server is runing http://localhost:${PORT}`);
  });
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
