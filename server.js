import expess from "express";
import mongoose from "mongoose";
import bookRouter from "./routes/book";
import userRouter from "./routes/user";
const app = expess();

app.use(
  expess.urlencoded({
    extended: true,
  })
);
app.use(expess.json());
app.use(bookRouter);
app.use(userRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/db_onthi")
  .then(() => {
    console.log("Connect successfully !");
  })
  .catch((err) => {
    console.log("Connect failed !");
  });

export const viteNodeApp = app;
