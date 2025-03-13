import jwt from "jsonwebtoken";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res
      .status(403)
      .json({ message: "No token provided, access denied." });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = decoded;
    next(); 
  });
};
