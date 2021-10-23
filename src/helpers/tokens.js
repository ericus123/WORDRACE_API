import jwt from "jsonwebtoken";

export const generateToken = async (data, time) => {
  try {
    const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: time });
    console.log(token);
    return token;
  } catch (error) {
    console.log(error + "error");
    return error;
  }
};
