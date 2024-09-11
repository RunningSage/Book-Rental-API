<<<<<<< HEAD
import Book from "../models/Book.js";
import Transaction from "../models/Transaction.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllBooks = catchAsync(async (req, res, next) => {
  const {
    category,
    name = "",
    author = "",
    minRent = 0,
    maxRent = Infinity,
  } = req.query;
  const query = {};

  if (category) {
    query.category = { $regex: new RegExp(category, "i") };
  }

  if (name) {
    query.book_name = { $regex: new RegExp(name, "i") };
  }

  if (author) {
    query.author = { $regex: new RegExp(author, "i") };
  }

  if (minRent && maxRent) {
    query.rent_per_day = {
      $gte: parseFloat(minRent),
      $lte: parseFloat(maxRent),
    };
  }

  const books = await Book.find(query);
  res.json(books);
});

export const addBook = catchAsync(async (req, res, next) => {
  const { book_name, author, category, rent_per_day } = req.body;

  const newBook = await Book.create({
    book_name,
    author,
    category,
    rent_per_day,
  });

  res.status(201).json({
    status: "success",
    data: {
      book: newBook,
    },
  });
});

export const bookInfoDisplayer = catchAsync(async (req, res, next) => {
  const { book_name } = req.params;

  const transactions = await Transaction.find({
    book_name: { $regex: new RegExp(book_name, "i") },
  });

  const currentTransaction = transactions.find((t) => !t.return_date);
  const issuedBy = transactions.map((t) => t.user_id);

  const book = await Book.findOne({
    book_name: { $regex: new RegExp(book_name, "i") },
  }).select("book_name author");

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (req.user.role === "admin") {
    res.json({
      book_name: book.book_name,
      author: book.author,
      total_count: issuedBy.length,
      issued_by: issuedBy,
      currently_issued_by: currentTransaction
        ? currentTransaction.user_id
        : "Not issued",
    });
  } else {
    res.json({
      book_name: book.book_name,
      author: book.author,
      no_of_times_issued: issuedBy.length,
      currently_issued_by: currentTransaction
        ? currentTransaction.user_id
        : "Not issued",
    });
  }
});

export const bookRentCalculator = catchAsync(async (req, res, next) => {
  const { book_name } = req.params;

  const transactions = await Transaction.find({
    book_name: { $regex: new RegExp(book_name, "i") },
  });

  const totalRent = transactions.reduce((acc, transaction) => {
    return acc + (transaction.rent || 0);
  }, 0);

  const currentTransaction = transactions.find((t) => !t.return_date);
  const issuedBy = transactions.map((t) => t.user_id);

  const book = await Book.findOne({
    book_name: { $regex: new RegExp(book_name, "i") },
  }).select("book_name author");

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json({
    book_name: book.book_name,
    author: book.author,
    no_of_times_issued: issuedBy.length,
    currently_issued_by: currentTransaction
      ? currentTransaction.user_id
      : "Not issued",
    total_rent_generated: totalRent,
  });
});
=======
import Book from "../models/Book.js";
import Transaction from "../models/Transaction.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllBooks = catchAsync(async (req, res, next) => {
  const {
    category,
    name = "",
    author = "",
    minRent = 0,
    maxRent = Infinity,
  } = req.query;
  const query = {};

  if (category) {
    query.category = { $regex: new RegExp(category, "i") };
  }

  if (name) {
    query.book_name = { $regex: new RegExp(name, "i") };
  }

  if (author) {
    query.author = { $regex: new RegExp(author, "i") };
  }

  if (minRent && maxRent) {
    query.rent_per_day = {
      $gte: parseFloat(minRent),
      $lte: parseFloat(maxRent),
    };
  }

  const books = await Book.find(query);
  res.json(books);
});

export const addBook = catchAsync(async (req, res, next) => {
  const { book_name, author, category, rent_per_day } = req.body;

  const newBook = await Book.create({
    book_name,
    author,
    category,
    rent_per_day,
  });

  res.status(201).json({
    status: "success",
    data: {
      book: newBook,
    },
  });
});

export const bookInfoDisplayer = catchAsync(async (req, res, next) => {
  const { book_name } = req.params;

  const transactions = await Transaction.find({
    book_name: { $regex: new RegExp(book_name, "i") },
  });

  const currentTransaction = transactions.find((t) => !t.return_date);
  const issuedBy = transactions.map((t) => t.user_id);

  const book = await Book.findOne({
    book_name: { $regex: new RegExp(book_name, "i") },
  }).select("book_name author");

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (req.user.role === "admin") {
    res.json({
      book_name: book.book_name,
      author: book.author,
      total_count: issuedBy.length,
      issued_by: issuedBy,
      currently_issued_by: currentTransaction
        ? currentTransaction.user_id
        : "Not issued",
    });
  } else {
    res.json({
      book_name: book.book_name,
      author: book.author,
      no_of_times_issued: issuedBy.length,
      currently_issued_by: currentTransaction
        ? currentTransaction.user_id
        : "Not issued",
    });
  }
});

export const bookRentCalculator = catchAsync(async (req, res, next) => {
  const { book_name } = req.params;

  const transactions = await Transaction.find({
    book_name: { $regex: new RegExp(book_name, "i") },
  });

  const totalRent = transactions.reduce((acc, transaction) => {
    return acc + (transaction.rent || 0);
  }, 0);

  const currentTransaction = transactions.find((t) => !t.return_date);
  const issuedBy = transactions.map((t) => t.user_id);

  const book = await Book.findOne({
    book_name: { $regex: new RegExp(book_name, "i") },
  }).select("book_name author");

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json({
    book_name: book.book_name,
    author: book.author,
    no_of_times_issued: issuedBy.length,
    currently_issued_by: currentTransaction
      ? currentTransaction.user_id
      : "Not issued",
    total_rent_generated: totalRent,
  });
});
>>>>>>> 73404a13e8b5f25286daa489696d1c1f84919655
