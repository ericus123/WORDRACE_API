import { Router } from "express";
const scoresRoute = new Router();
import { scoreValidation } from "../middlewares/Validations.js";
import ScoresController from "../controllers/scores.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

scoresRoute.post(
  "/",
  AuthMiddleware.checkToken,
  scoreValidation,
  ScoresController.createScore
);

export default scoresRoute;
