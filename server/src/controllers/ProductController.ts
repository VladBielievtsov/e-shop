import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create Product

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, price, color, discount, categoriesIds } =
      req.body;

    const slug = title.split(" ").join("-").toLowerCase();

    const categories = categoriesIds.map((ids: number) => {
      return { id: +ids };
    });

    const product = await prisma.product.create({
      data: {
        title,
        description,
        slug,
        price,
        color,
        discount,
        categories: {
          connect: categories.map((category: { id: number }) => ({
            id: category.id,
          })),
        },
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

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, price, color, discount, images } = req.body;
    const slug = title.split(" ").join("-").toLowerCase();

    const product = await prisma.product.update({
      where: {
        id: +id,
      },
      data: {
        title,
        description,
        slug,
        price,
        color,
        discount,
      },
    });

    if (images[0]) {
      await prisma.productImages.deleteMany({
        where: {
          productId: +product.id,
        },
      });

      await prisma.productImages.createMany({
        data: images,
      });
    }

    res.json(product);
  } catch (err: any) {
    console.error("Error during updating product:", err);
    res.status(500).json({
      msg: "Error during updating product",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.productSize.deleteMany({
      where: {
        productId: +id,
      },
    });

    await prisma.productImages.deleteMany({
      where: {
        productId: +id,
      },
    });

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

    const images = await prisma.productImages.findMany();

    const mergedProducts = products.map((prod) => {
      const productImages = images.filter((img) => img.productId === prod.id);
      return {
        ...prod,
        images: productImages,
      };
    });

    res.json(mergedProducts);
  } catch (err: any) {
    console.error("Error during getting products:", err);
    res.status(500).json({
      msg: "Error during getting products",
    });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        categories: true,
      },
    });

    const images = await prisma.productImages.findMany({
      where: {
        productId: product?.id,
      },
    });

    res.json({
      ...product,
      images: images,
    });
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

    const images = await prisma.productImages.findMany({
      where: {
        productId: product?.id,
      },
    });

    res.json({
      ...product,
      images: images,
    });
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

export const createProductImages = async (req: Request, res: Response) => {
  try {
    const images = await prisma.productImages.createMany({
      data: req.body,
    });

    res.json(images);
  } catch (err: any) {
    console.error("Error during creating images:", err);
    res.status(500).json({
      msg: "Error during creating images",
    });
  }
};
