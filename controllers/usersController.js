import catchAsync from "../utils/catchAsync.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select("-__v");
  res.json(users);
});

export const myInfoHandler = catchAsync(async (req, res, next) => {
  const user_id = req.user._id;

  const user = await User.findById(user_id).select("name email");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
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
    return res.status(404).json({ message: "User not found" });
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
