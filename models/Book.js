import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  book_name: {
    type: String,
    required: [true, "Book name is required"],
    trim: true,
    minlength: [3, "Book name must be at least 3 characters long"],
    maxlength: [100, "Book name must be less than 100 characters"],
    lowercase: true,
  },
  author: {
    type: String,
    required: [true, "Author name is required"],
    trim: true,
    minlength: [3, "Author name must be at least 3 characters long"],
    maxlength: [100, "Author name must be less than 100 characters"],
    lowercase: true,
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: [
      "fiction",
      "non-fiction",
      "fantasy",
      "biography",
      "science",
      "history",
      "mystery",
      "other",
    ],
    default: "other",
    lowercase: true,
  },
  rent_per_day: {
    type: Number,
    required: [true, "Rent per day is required"],
    min: [1, "Rent per day must be at least 1"],
    max: [1000, "Rent per day must be less than 1000"],
  },
});

bookSchema.path("rent_per_day").validate(function (value) {
  return value > 0 && value <= 1000;
}, "Invalid rent per day amount");

const Book = mongoose.model("Book", bookSchema);
export default Book;
