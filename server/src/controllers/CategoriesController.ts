import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.findMany();

    res.json(category);
  } catch (err: any) {
    console.error("Error during creating category:", err);
    res.status(500).json({
      msg: "Error during creating category",
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
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

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.delete({
      where: {
        id: +id,
      },
    });

    res.json(category);
  } catch (err: any) {
    console.error("Error during deleting category:", err);
    res.status(500).json({
      msg: "Error during deleting category",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name } = req.body;

    const category = await prisma.category.update({
      where: {
        id: +id,
      },
      data: {
        name,
      },
    });

    res.json(category);
  } catch (err: any) {
    console.error("Error during deleting category:", err);
    res.status(500).json({
      msg: "Error during deleting category",
    });
  }
};
