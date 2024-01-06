import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/checkAuth";
const prisma = new PrismaClient();

// Create Product

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, price, color, discount } = req.body;

    const slug = title.split(" ").join("-").toLowerCase();

    const product = await prisma.product.create({
      data: {
        title,
        description,
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

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.delete({
      where: {
        id: +id,
      },
    });

    res.json(product);
  } catch (err: any) {
    console.error("Error during deleting product:", err);
    res.status(500).json({
      msg: "Error during deleting product",
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

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: +id,
      },
    });

    res.json(product);
  } catch (err: any) {
    console.error("Error during getting product by id:", err);
    res.status(500).json({
      msg: "Error during getting product by id",
    });
  }
};

export const getProductsByIds = async (req: Request, res: Response) => {
  const ids = req.body.indexes;

  try {
    if (req.body.indexes) {
      const products = await prisma.product.findMany({
        where: {
          id: { in: ids },
        },
      });
      res.json(products);
    } else {
      res.json([]);
    }
  } catch (err: any) {
    console.error("Error during getting products by ids:", err);
    res.status(500).json({
      msg: "Error during getting products by ids",
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
