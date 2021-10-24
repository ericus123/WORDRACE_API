import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { generateToken } from "../helpers/tokens.js";

dotenv.config();

class AuthController {
  static async Login(req, res) {
    const { username, password } = req.body;
    //Check credentials
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Incorrect credentials" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Incorrect credentials" });

    const login = await User.findOne({
      username: user.username,
      password: user.password,
    });

    if (!login)
      return res
        .status(400)
        .json({ err: "not found", error: "Incorrect credentials" });
    //create and assign a token

    const data = {
      username: login.username,
    };

    const token = await generateToken(data, "2h");

    return res.status(200).json({
      msg: "logged in successfuly",
      token,
    });
  }
  static async Signup(req, res) {
    try {
      const { username, password } = req.body;
      const usernameExists = await User.findOne({ username: username });
      if (usernameExists)
        return res.status(400).json({ error: "Username already exists" });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({
        username: username,
        password: hashedPassword,
      });
      await user.save();
      const token = await generateToken({ username }, "2h");
      return res.status(200).json({
        token: token,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ err: error, error: "Something went wrong" });
    }
  }

  static async CheckLogin(req, res) {
    const { username } = req.user;
    const user = await User.findOne({ username }).populate("scores");
    if (!user) {
      return res.status(404).json("User not found");
    }
    return res.status(200).json({ msg: "User is logged in", user });
  }
}

export default AuthController;
