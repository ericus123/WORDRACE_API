import jwt from "jsonwebtoken";

class AuthMiddleware {
  static async checkToken(req, res, next) {
    const token = req.header("AuthToken");
    if (!token) return res.status(401).send({ error: "Please login!" });
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      return res.status(400).send({ error: "Invalid Token" });
    }
  }
}
export default AuthMiddleware;
