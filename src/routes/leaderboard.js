import { Router } from "express";
const leaderboardRoute = new Router();
import LeaderboardController from "../controllers/leaderboard";

leaderboardRoute.get("/", LeaderboardController.getLeaders);

export default leaderboardRoute;
