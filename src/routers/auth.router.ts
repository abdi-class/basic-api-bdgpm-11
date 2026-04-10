import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
class AuthRouter {
  private route: Router;
  private authController: AuthController;

  constructor() {
    this.route = Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes = () => {
    this.route.post(
      "/regis",
      upload.single("file"),
      this.authController.register,
    );
  };

  public getRouter = (): Router => {
    return this.route;
  };
}

export default AuthRouter;
