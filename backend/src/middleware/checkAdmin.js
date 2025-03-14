import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

export const checkAdmin = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized user" });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
