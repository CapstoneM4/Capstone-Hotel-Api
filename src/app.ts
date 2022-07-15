import express from "express";
import "reflect-metadata";
import "express-async-errors";
import isAdmUserMiddleware from "./middlewares/handdleError.middleware";
import routesADM from "./routers/admin/admin.routes";
import routesClients from "./routers/clients/clients.routes";
import routesEmployee from "./routers/employee/employee.routes";

const app = express();
app.use(express.json());

app.use("/hotel", routesADM, routesEmployee);
app.use("/service", routesEmployee);
app.use("/clients", routesClients);
app.use(isAdmUserMiddleware);
app.listen(3000, () => {
  console.log("App runing");
});
export default app;
