import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import { IHotelSystemCreate } from "../../interfaces/hotel";

describe("Testing hotel routes", () => {
  let connection: DataSource;

  const newHotel: IHotelSystemCreate = {
    name: "Hotel Beira Rio",
    qtyBedRooms: 30,
    cnpj: "1298471ajsh91",
    address: "Rua do Joãozinho, 3",
  };
  let responsePOST: any;
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );

    responsePOST = await request(app).post("/hotel").send(newHotel);
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("Should create a new Hotel", async () => {
    expect(responsePOST.status).toBe(201);
    expect(responsePOST.body).toHaveProperty("id");
    expect(responsePOST.body).toHaveProperty("name");
    expect(responsePOST.body).toHaveProperty("cnpj");
    expect(responsePOST.body).toHaveProperty("address");
    expect(responsePOST.body).toHaveProperty("qtyBedRooms");
  });

  test("Should be able to return a list of all registered hotel", async () => {
    const response = await request(app).get("/hotel");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("Should be able to update info of the hotel", async () => {
    const attHotel = { name: "Nome novo" };

    const response = await request(app)
      .patch(`/hotel/${responsePOST.body.id}`)
      .send(attHotel);

    const responseGet = await request(app).get(
      `/hotel/${responsePOST.body.id}`
    );

    expect(response.status).toBe(200);
    expect(responseGet.body).toEqual(
      expect.objectContaining({
        id: responsePOST.body.id,
        name: responseGet.body.name,
        cnpj: responseGet.body.cnpj,
        address: responseGet.body.address,
        qtyBedRooms: responseGet.body.qtyBedRooms,
      })
    );
  });

  test("Should be able to return a registered hotel", async () => {
    const response = await request(app).get(`/hotel/${responsePOST.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: responsePOST.body.id,
        name: response.body.name,
        qtyBedRooms: response.body.qtyBedRooms,
        cnpj: response.body.cnpj,
        address: response.body.address,
      })
    );
  });

  test("Should be able to delete a hotel", async () => {
    const responseDelete = await request(app).delete(
      `/hotel/${responsePOST.body.id}`
    );
    expect(responseDelete.status).toBe(200);
    expect(responseDelete.body).toHaveProperty("message");
  });
});
