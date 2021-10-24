import User from "../models/User";

class LeaderboardController {
  static async getLeaders(req, res) {
    const leaders = await User.find({})
      .limit(10)
      .sort({ scores: -1 })
      .populate("scores");
    return res.status(200).json({ leaders: leaders });
  }
}

export default LeaderboardController;
