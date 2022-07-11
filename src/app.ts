import express from "express";
import "reflect-metadata";

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("App runing");
});
export default app;
