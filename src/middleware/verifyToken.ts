import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Menerima data token dari request
    const token = req.headers.authorization?.split(" ")[1];
    // 2. Memastikan token tersedia, jika tidak throw error
    if (!token) {
      throw { code: 400, message: "Token not found" };
    }
    // 3. Jalankan fungsi penerjemahan token
    const decript = verify(token, process.env.SECRET_KEY_TKN || "secret");
    // 4. Jika berhasil diterjemahkan, teruskan data ke controller
    res.locals.decript = decript;

    next();
  } catch (error) {
    next(error);
  }
};
