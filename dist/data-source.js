"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("dotenv/config");
// ------config heroku
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false }
        : false,
    logging: true,
    synchronize: false,
    entities: process.env.NODE_ENV === "production"
        ? ["dist/entities/*.js"]
        : ["src/entities/*.ts"],
    migrations: process.env.NODE_ENV === "production"
        ? ["dist/migrations/*.js"]
        : ["src/migrations/*.ts"],
});
AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
exports.default = AppDataSource;
//========config docker
// const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST,
//   port: 5432,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB,
//   logging: true,
//   synchronize: false,
//   entities: ["src/entities/*.ts"],
//   migrations: ["src/migrations/*.ts"],
// });
// AppDataSource.initialize()
//   .then(() => {
//     console.log("Data Source has been initialized!");
//   })
//   .catch((err) => {
//     console.error("Error during Data Source initialization", err);
//   });
// export default AppDataSource;
