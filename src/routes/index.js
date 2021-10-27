import Router from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";
import authRoute from "./auth";
import leaderboardRoute from "./leaderboard";
import scoresRoute from "./scores";

const router = Router();
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));
router.use("/auth", authRoute);
router.use("/scores", scoresRoute);
router.use("/leaderboard", leaderboardRoute);
export default router;
