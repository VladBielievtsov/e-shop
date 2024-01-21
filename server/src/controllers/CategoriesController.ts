import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createCotegory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const category = await prisma.category.create({
      data: {
        name,
      },
    });

    res.json(category);
  } catch (err: any) {
    console.error("Error during creating category:", err);
    res.status(500).json({
      msg: "Error during creating category",
    });
  }
};
