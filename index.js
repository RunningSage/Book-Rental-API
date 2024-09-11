import mongoose from "mongoose";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Connected to Database :)");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
