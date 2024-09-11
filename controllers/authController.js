import User from "../models/User.js";
import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";

const signToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signupController = catchAsync(async (req, res, next) => {
  const { name, email, password, contact, passwordConfirm } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  if (password !== passwordConfirm) {
    return res
      .status(400)
      .json({ message: "Password and passwordConfirm do not match" });
  }

  const user = new User({ name, email, contact, password });
  await user.save();

  const token = signToken(user._id);

  res.status(201).json({
    message: "User registered successfully",
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
});

export const loginController = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  const isPasswordCorrect = await user.correctPassword(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    user: { id: user._id, email: user.email },
  });
});
