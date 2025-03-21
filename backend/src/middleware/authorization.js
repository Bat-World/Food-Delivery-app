import jwt from "jsonwebtoken";
dotenv.config();
import dotenv from "dotenv";
const SECRET_KEY = process.env.SECRET_KEY;

export const Authorization = (req, res, next) => {
  var token = req.headers.authorization;  
  
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const token1 = token.split(" ")[1];

  jwt.verify(token1, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    console.log("successfully verified");
    req.user = user;
    next();
  });
};
