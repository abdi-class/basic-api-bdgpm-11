import { NextFunction, Request, Response } from "express";
import prisma from "../prisma";
import { regisTemplate } from "../templates/regis.template";
import { hashPassword } from "../utils/hashPassword";

class AuthController {
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // code
      // #check existing account
      const checkAccount = await prisma.accounts.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (checkAccount) {
        throw { code: 400, message: "Account exist" };
      }

      const newwAccount = await prisma.accounts.create({
        data: { ...req.body, password: await hashPassword(req.body.password) },
      });

      res.status(200).send({
        message: "Registration Success",
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
