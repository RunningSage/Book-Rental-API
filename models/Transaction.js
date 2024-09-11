<<<<<<< HEAD
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  book_name: { type: String, required: true },
  author : { type: String, required: true },
  user_id: { type: String, required: true },
  issue_date: { type: Date, required: true },
  return_date: { type: Date },
  rent: { type: Number },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
=======
import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  book_name: { type: String, required: true },
  author : { type: String, required: true },
  user_id: { type: String, required: true },
  issue_date: { type: Date, required: true },
  return_date: { type: Date },
  rent: { type: Number },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
>>>>>>> 73404a13e8b5f25286daa489696d1c1f84919655
