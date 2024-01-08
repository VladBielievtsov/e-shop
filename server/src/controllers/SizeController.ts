import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addSizeToProduct = async (req: Request, res: Response) => {
  try {
    // [
    //   {
    //     "productId": 12,
    //     "size": "x",
    //     "quantity": 5
    //   },
    //   {
    //     "productId": 12,
    //     "size": "l",
    //     "quantity": 5
    //   },
    //   {
    //     "productId": 12,
    //     "size": "m",
    //     "quantity": 5
    //   }
    // ]

    await prisma.productSize.createMany({
      data: req.body,
    });

    const productSizes = await prisma.productSize.findMany({
      where: {
        productId: req.body.productId,
      },
    });

    res.json(productSizes);
  } catch (err: any) {
    console.error("Error during adding sizes to product:", err);
    res.status(500).json({
      msg: "Error during adding sizes to product, sizes",
    });
  }
};

export const updateSizes = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.productSize.deleteMany({
      where: {
        productId: +id,
      },
    });

    await prisma.productSize.createMany({
      data: req.body,
    });

    const productSizes = await prisma.productSize.findMany({
      where: {
        productId: req.body.productId,
      },
    });

    res.json(productSizes);
  } catch (err: any) {
    console.error("Error during updating sizes:", err);
    res.status(500).json({
      msg: "Error during updating sizes",
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

export const deleteSizes = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const sizes = await prisma.productSize.deleteMany({
      where: {
        productId: +productId,
      },
    });

    res.json(sizes);
  } catch (err: any) {
    console.error("Error during deleting product:", err);
    res.status(500).json({
      msg: "Error during deleting product",
    });
  }
};
