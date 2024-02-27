import Jwt from "jsonwebtoken";

const generateToken = (userid, res) => {
  const token = Jwt.sign({ userid }, `${process.env.JWT_SECRET}`, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict",
    // secure: true,
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
