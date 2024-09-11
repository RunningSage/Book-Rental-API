import Transaction from "../models/Transaction.js";
import catchAsync from "../utils/catchAsync.js";
import Book from "../models/Book.js";
import AppError from "../utils/AppError.js";

export const getAllTransactions = catchAsync(async (req, res, next) => {
  const { start_date, end_date } = req.query;

  const query = {};

  if (start_date || end_date) {
    query.issue_date = {};
    if (start_date) query.issue_date.$gte = new Date(start_date);
    if (end_date) query.issue_date.$lte = new Date(end_date);
  }

  const transactions = await Transaction.find(query).select("-__v");

  res.json(transactions);
});

export const issueController = catchAsync(async (req, res, next) => {
  if (req.user.role === "user") {
    req.body.user_id = req.user._id;
    req.body.issue_date = new Date();
  } else {
    req.body.issue_date = req.body.issue_date
      ? new Date(req.body.issue_date)
      : new Date();
  }

  req.body.book_name = req.body.book_name.toLowerCase();

  const { book_name, user_id, issue_date } = req.body;

  const book = await Book.findOne({
    book_name: { $regex: new RegExp(book_name, "i") },
  });

  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  const transaction = new Transaction({
    book_name,
    author: book.author,
    user_id,
    issue_date,
  });

  await transaction.save();

  const transactionObj = await Transaction.findOne({
    book_name,
    author: book.author,
    user_id,
    issue_date,
  }).select('-__v');

  res.status(201).json({ transaction: transactionObj });
});

export const returnController = catchAsync(async (req, res, next) => {
  if (req.user.role === "user") {
    req.body.return_date = new Date();
    req.body.user_id = req.user._id;
  } else {
    req.body.return_date = req.body.return_date
      ? new Date(req.body.return_date)
      : new Date();
  }

  const { book_name, user_id, return_date } = req.body;

  const transaction = await Transaction.findOne({
    book_name: { $regex: new RegExp(book_name, "i") },
    user_id,
    return_date: { $exists: false },
  });

  if (!transaction) {
    return next(new AppError("Transaction not found or already returned", 404));
  }

  const issueDate = new Date(transaction.issue_date);
  const book = await Book.findOne({
    book_name: { $regex: new RegExp(book_name, "i") },
  }).select("rent_per_day author");

  if (!book) {
    return next(new AppError("Book not found", 404));
  }

  const returnDate = new Date(return_date);
  const daysIssued = Math.ceil(
    (returnDate - issueDate) / (1000 * 60 * 60 * 24)
  );

  const totalRent = daysIssued * book.rent_per_day;

  transaction.return_date = returnDate;
  transaction.rent = totalRent;

  await transaction.save();

  const transactionObj = transaction.toObject();
  delete transactionObj.__v;

  res.json({ transaction: transactionObj });
});
