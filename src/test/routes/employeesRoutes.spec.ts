import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import { IEmployeeCreate } from "../../interfaces/employee";
import { IHotelSystemCreate } from "../../interfaces/hotel";

describe("Testing employees routes", () => {
  let connection: DataSource;
  const newEmployee: IEmployeeCreate = {
    name: "Joaquim",
    email: "joaquimsilva@gmail.com",
    password: "password",
    idHotel: "123",
    idJobTitle: 1,
  };
  const newHotel: IHotelSystemCreate = {
    name: "Hotel Beira Rio",
    qtyBedRooms: 30,
    cnpj: "1298471ajsh91",
    address: "Rua do Joãozinho, 3",
  };
  let responsePOST: any;
  let responseHotel: any;
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );
    responseHotel = await request(app).post("/hotel").send(newHotel);
    responsePOST = await request(app)
      .post(`/hotel/${responseHotel.body.id}/service`)
      .send(newEmployee);
  });
  afterAll(async () => {
    await connection.destroy();
  });
});
