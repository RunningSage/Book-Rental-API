import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  book_name: {
    type: String,
    required: [true, "Book name is required"],
    lowercase: true,
    trim: true,
    minlength: [3, "Book name must be at least 3 characters long"],
    maxlength: [100, "Book name must be less than 100 characters"],
  },
  author: {
    type: String,
    required: [true, "Author name is required"],
    lowercase: true,
    trim: true,
    minlength: [3, "Author name must be at least 3 characters long"],
    maxlength: [100, "Author name must be less than 100 characters"],
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User ID is required"],
    ref: "User",
  },
  issue_date: {
    type: Date,
    required: [true, "Issue date is required"],
    validate: {
      validator: function (v) {
        return v instanceof Date && !isNaN(v.getTime());
      },
      message: "Issue date must be a valid date",
    },
  },
  return_date: {
    type: Date,
    validate: {
      validator: function (v) {
        return !v || (v instanceof Date && !isNaN(v.getTime()));
      },
      message: "Return date must be a valid date",
    },
  },
  rent: {
    type: Number,
    min: [1, "Rent must be at least 1"],
    max: [1000, "Rent must be less than 1000"],
    validate: {
      validator: function (value) {
        return Number.isInteger(value);
      },
      message: "Rent must be an integer",
    },
  },
});

transactionSchema.pre("save", function (next) {
  if (this.return_date && this.issue_date > this.return_date) {
    return next(new Error("Return date cannot be before issue date"));
  }
  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
