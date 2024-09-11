import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  book_name: { type: String, required: true, lowercase: true },
  author: { type: String, required: true, lowercase: true },
  user_id: { type: String, required: true },
  issue_date: { type: Date, required: true },
  return_date: { type: Date },
  rent: { type: Number },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
