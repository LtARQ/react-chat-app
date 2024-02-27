import Jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Invalid token" });
    }
    const decoded = Jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    const user = await User.findById(decoded.userid).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};
export default protectRoute;
