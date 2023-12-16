import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string | JwtPayload;
}

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, String(process.env.JWT_SECRET));

      req.userId = decoded;

      next();
    } catch (error: any) {
      return res.status(403).json({
        msg: "No Access",
      });
    }
  } else {
    return res.status(403).json({
      msg: "Unauthorized",
    });
  }
};
