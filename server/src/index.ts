import express from "express";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import cors from "cors";
import {
  getMe,
  login,
  logout,
  register,
  update,
} from "./controllers/UserController";
import {
  addSizeToProduct,
  addToFavorites,
  createProduct,
  getAllSizeById,
  getProductBySlug,
  getProducts,
  isFavorite,
  removeFromFavorites,
} from "./controllers/ProductController";
import checkAuth from "./middleware/checkAuth";

async function main() {
  const app = express();
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(cookieParser("secret key"));

  const PORT = process.env.PORT || 4040;

  app.get("/", (req, res) => {
    res.json("Api for Shop-App");
  });

  // USER
  app.post("/register", register);
  app.post("/login", login);
  app.post("/logout", logout);
  app.get("/getme", checkAuth, getMe);
  app.patch("/update", checkAuth, update);

  // PRODUCTS
  app.post("/product", createProduct);
  app.get("/products", getProducts);
  app.get("/product/:slug", getProductBySlug);
  // Sizes
  app.post("/size", addSizeToProduct);
  app.get("/sizes/:id", getAllSizeById);
  // Favorites
  app.get("/favorites/:id", checkAuth, isFavorite);
  app.post("/favorites/:id", checkAuth, addToFavorites);
  app.delete("/favorites/:id", checkAuth, removeFromFavorites);

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
