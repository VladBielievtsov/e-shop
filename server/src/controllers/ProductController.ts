import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create Product

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, slug, price } = req.body;

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        price,
      },
    });

    res.json(product);
  } catch (err: any) {
    console.error("Error during creating product:", err);
    res.status(500).json({
      msg: "Error during creating product",
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();

    res.json(products);
  } catch (err: any) {
    console.error("Error during getting products:", err);
    res.status(500).json({
      msg: "Error during getting products",
    });
  }
};
