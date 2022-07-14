import express from "express";
import "reflect-metadata";
import routesADM from "./routers/admin";
import routesClients from "./routers/clients";
import routesEmployee from "./routers/employee";

const app = express();
app.use(express.json());

app.use("/hotel", routesADM, routesEmployee);
app.use("/service", routesEmployee);
app.use("/clients", routesClients);

app.listen(3000, () => {
  console.log("App runing");
});
export default app;
