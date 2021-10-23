import { Router } from "express";
const authRoute = new Router();
import { userValidation } from "../middlewares/Validations.js";
import AuthController from "../controllers/auth.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

authRoute.post("/register", userValidation, AuthController.Signup);
authRoute.post("/login", userValidation, AuthController.Login);
authRoute.get(
  "/check-login",
  AuthMiddleware.checkToken,
  AuthController.CheckLogin
);

export default authRoute;
