import { NextFunction, Request, Response } from "express";
import { hashPassword } from "../utils/hashPassword";
import { regisSchema } from "../config/validationSchema/auth.schema";
import { prisma } from "../config/prisma";
import { transport } from "../config/nodemailer";
import { regisTemplate } from "../templates/regis.template";

class AuthController {
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // code

      // validate req.body
      const validation = regisSchema.safeParse(req.body);
      console.log("LOG REGIS VALIDATION===>", validation);

      if (!validation.success) {
        return res.status(400).send(validation.error);
      }

      // #check existing account
      const checkAccount = await prisma.accounts.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (checkAccount) {
        throw { code: 400, message: "Account exist" };
      }

      const newAccount = await prisma.accounts.create({
        data: { ...req.body, password: await hashPassword(req.body.password) },
      });

      // send email
      await transport.sendMail({
        from: process.env.MAIL_SENDER,
        to: newAccount.email,
        subject: "Registration info",
        html: regisTemplate(newAccount.username),
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
