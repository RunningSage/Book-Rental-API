<<<<<<< HEAD
import express from "express";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.js";
import transactionRoutes from "./routes/transactions.js";
import authRoutes from "./routes/auth.js";
import errorController from "./controllers/errorController.js";

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Please use this to test the API : https://documenter.getpostman.com/view/38127552/2sAXqmAkTa");
})
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/auth", authRoutes);

app.use(errorController);

=======
import express from "express";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.js";
import transactionRoutes from "./routes/transactions.js";
import authRoutes from "./routes/auth.js";
import errorController from "./controllers/errorController.js";

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Please use this to test the API : https://documenter.getpostman.com/view/38127552/2sAXqmAkTa");
})
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/transactions", transactionRoutes);
app.use("/api/v1/auth", authRoutes);

app.use(errorController);

>>>>>>> 73404a13e8b5f25286daa489696d1c1f84919655
export default app;