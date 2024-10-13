import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default auth;