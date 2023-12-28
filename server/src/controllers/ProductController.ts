import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create Product

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, slug, price, color, discount } = req.body;

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        price,
        color,
        discount,
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

export const getProductBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
    });

    res.json(product);
  } catch (err: any) {
    console.error("Error during getting product by slug:", err);
    res.status(500).json({
      msg: "Error during getting product by slug",
    });
  }
};

export const addSizeToProduct = async (req: Request, res: Response) => {
  try {
    const { productId, name, value } = req.body;

    const productSizes = await prisma.productSize.create({
      data: {
        productId,
        name,
        value,
      },
    });

    res.json(productSizes);
  } catch (err: any) {
    console.error("Error during adding sizes to product:", err);
    res.status(500).json({
      msg: "Error during adding sizes to product",
    });
  }
};

export const getAllSizeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const sizes = await prisma.productSize.findMany({
      where: {
        productId: +id,
      },
    });

    res.json(sizes);
  } catch (err: any) {
    console.error("Error during getting sizes to product:", err);
    res.status(500).json({
      msg: "Error during getting sizes to product",
    });
  }
};

export const getFavorite = async (req: Request, res: Response) => {
  try {
    const productId = req.body.productId;
    const favorite = await prisma.favorite.findUnique({
      where: {
        productId_userId: {
          productId,
          userId,
        },
      },
    });
  } catch (err: any) {
    console.error("Error during getting favorite:", err);
    res.status(500).json({
      msg: "Error during getting favorite",
    });
  }
};
