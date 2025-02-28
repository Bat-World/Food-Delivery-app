import jwt from 'jsonwebtoken';

dotenv.config(); 

const secretKey = process.env.SECRET_KEY;

export const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: "No token provided, access denied." });
  }

  // Verify the token using the secret key
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Attach decoded user information to the request object (like user email, role, etc.)
    req.user = decoded;
    next(); // Proceed to the next middleware/route handler
  });
};
