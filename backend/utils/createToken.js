import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ userId }, secret, { expiresIn: "30d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
}

export default generateToken;