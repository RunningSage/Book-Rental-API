import catchAsync from "../utils/catchAsync.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import AppError from "../utils/AppError.js";
import bcrypt from "bcryptjs";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select("-__v");
  res.json(users);
});

export const addUser = catchAsync(async (req, res, next) => {
  const { name, email, contact, role, password } = req.body;

  const newUser = await User.create({
    name,
    email,
    contact,
    role,
    password,
  });

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 12);
  }

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.json({
    status: "success",
    data: {
      user,
    },
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }
  res.json({
    status: "success",
    message: "User deleted successfully",
  });
});

export const myInfoHandler = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;

  const user = await User.findById(user_id).select("name email");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const currentlyIssuedTransactions = await Transaction.find({
    user_id,
    return_date: { $exists: false },
  });

  const pastTransactions = await Transaction.find({
    user_id,
    return_date: { $exists: true },
  });

  const totalTransactions = await Transaction.find({ user_id });

  const currentlyIssuedBooks = currentlyIssuedTransactions.map((t) => ({
    book_name: t.book_name,
    author: t.author,
  }));

  const pastIssuedBooks = pastTransactions.map((t) => ({
    book_name: t.book_name,
    author: t.author,
  }));

  const totalBooksIssued = totalTransactions.length;

  res.json({
    user: {
      name: user.name,
      email: user.email,
    },
    currently_issued_books: currentlyIssuedBooks,
    past_issued_books: pastIssuedBooks,
    total_books_issued_lifetime: totalBooksIssued,
  });
});

export const userInfoHandler = catchAsync(async (req, res, next) => {
  const { user_id } = req.params;

  const user = await User.findById(user_id).select("name email");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const currentlyIssuedTransactions = await Transaction.find({
    user_id,
    return_date: { $exists: false },
  });

  const pastTransactions = await Transaction.find({
    user_id,
    return_date: { $exists: true },
  });

  const totalTransactions = await Transaction.find({ user_id });

  const currentlyIssuedBooks = currentlyIssuedTransactions.map((t) => ({
    book_name: t.book_name,
    author: t.author,
  }));

  const pastIssuedBooks = pastTransactions.map((t) => ({
    book_name: t.book_name,
    author: t.author,
  }));

  const totalBooksIssued = totalTransactions.length;

  res.json({
    user: {
      name: user.name,
      email: user.email,
    },
    currently_issued_books: currentlyIssuedBooks,
    past_issued_books: pastIssuedBooks,
    total_books_issued_lifetime: totalBooksIssued,
  });
});
