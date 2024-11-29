import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bycrpt from "bcryptjs/dist/bcrypt.js";
import generateToken from "../utils/createToken.js";

export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists"); 
  }

  const salt = await bycrpt.genSalt(10);
  const hashedPassword = await bycrpt.hash(password, salt);
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  try {
    newUser.save();
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);       
    throw new Error(error.message);
  }
})
