import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/checkAuth";
const prisma = new PrismaClient();

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.json(user);
  } catch (err: any) {
    console.error("Error during registration:", err);
    res.status(500).json({
      msg: "This email address is already taken",
    });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "User not found!",
      });
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      return res.status(404).json({
        msg: "Wrong login or password!",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      String(process.env.JWT_SECRET),
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    });

    res.json({
      ...user,
      token,
    });
  } catch (error: any) {
    console.error("Error during login:", error);
    res.status(500).json({
      msg: "Error during login",
    });
  }
};

// LOGOUT
export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.json("You have been logged out");
  } catch (error: any) {
    console.error("Error during logout:", error);
    res.status(500).json({
      msg: "Error during logout",
    });
  }
};

// GET MY INFO
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        id: Number(req.userId.id),
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({
      msg: "Unauthorized",
    });
  }
};
