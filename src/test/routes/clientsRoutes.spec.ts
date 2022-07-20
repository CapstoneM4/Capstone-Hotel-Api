import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import { IClientsCreate } from "../../interfaces/clientsInterface";

describe("Testing Clients routes", () => {
  let connection: DataSource;
  let responsePOST: any;

  const newClient: IClientsCreate = {
    name: "Gustavo",
    email: "gusantos1704@gmail.com",
    personalId: "08846610911",
    cell: "41987807038",
    isAlocated: false,
  };

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );

    responsePOST = await request(app).post("/clients").send(newClient);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("Should create a new client", async () => {
    expect(responsePOST.status).toBe(201);
    expect(responsePOST.body).toHaveProperty("id");
    expect(responsePOST.body).toHaveProperty("name");
    expect(responsePOST.body).toHaveProperty("email");
    expect(responsePOST.body).toHaveProperty("personalId");
    expect(responsePOST.body).toHaveProperty("cell");
    expect(responsePOST.body).toHaveProperty("isAlocated");
  });

  test("Should list a client", async () => {
    const response = await request(app).get(`/hotel/${responsePOST.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: response.body.name,
        email: response.body.email,
        personalId: response.body.personalId,
        cell: response.body.cell,
        isAlocated: response.body.isAlocated,
      })
    );
  });

  test("Should list all clients", async () => {
    const response = await request(app).get("/clients");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });
});
