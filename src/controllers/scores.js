import Scores from "../models/Scores";
import User from "../models/User";

class ScoresController {
  static async createScore(req, res) {
    try {
      const score_saved = await Scores.create(req.body);
      const { username } = req.user;
      const user = await User.findOne({ username: username });
      user.scores = score_saved._id;
      await user.save();

      return res.status(201).json({ msg: "Score save successfuly" });
    } catch (error) {
      return res.status(500).json({ error: error || "Something went wrong" });
    }
  }
}

export default ScoresController;
