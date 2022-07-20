import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import { IHotelSystemCreate } from "../../interfaces/hotel";
import { IEmployeeCreate } from "../../interfaces/employee";

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

  test("Should be able to create an employee", async () => {
    const newEmployee: IEmployeeCreate = {
      name: "Joaquim",
      email: "joaquimdasilva@gmail.com",
      password: "password",
      idHotel: responsePOST.body.id,
      idJobTitle: 1,
    };
    const responsePost = await request(app).post(
      `/hotel/${responsePOST.body.id}/employees`
    );

    expect(responsePost.status).toBe(201);
    expect(responsePost.body).toHaveProperty("id");
    expect(responsePost.body).toHaveProperty("name");
    expect(responsePost.body).toHaveProperty("email");
    expect(responsePost.body).toHaveProperty("password");
    expect(responsePost.body).toHaveProperty("idHotel");
    expect(responsePost.body).toHaveProperty("idJobTitle");
  });

  test("Should be able to return a list of employees", async () => {
    const response = await request(app).get(
      `/hotel/${responsePOST.body.id}/employees`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("Should be able to create a room", async () => {
    const newRoom = {
      roomNumber: 101,
      floorNumber: 1,
      price: 200,
      isClean: true,
      isAvailable: true,
    };

    const response = await request(app)
      .post(`/hotel/${responsePOST.body.id}/rooms`)
      .send(newRoom);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("roomNumber");
    expect(response.body).toHaveProperty("floorNumber");
    expect(response.body).toHaveProperty("price");
    expect(response.body).toHaveProperty("isClean");
    expect(response.body).toHaveProperty("isAvailable");
  });

  test("Should be able to return a list of rooms", async () => {
    const newRoom = {
      roomNumber: 101,
      floorNumber: 1,
      price: 200,
      isClean: true,
      isAvailable: true,
    };

    const responsePost = await request(app)
      .post(`/hotel/${responsePOST.body.id}/rooms`)
      .send(newRoom);
    const response = await request(app).get(
      `/hotel/${responsePOST.body.id}/rooms`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("Should be able to update a room", async () => {
    const newRoom = {
      roomNumber: 101,
      floorNumber: 1,
      price: 200,
      isClean: true,
      isAvailable: true,
    };

    const newPrice = { price: 150 };

    const responsePost = await request(app)
      .post(`/hotel/${responsePOST.body.id}/rooms`)
      .send(newRoom);

    const response = await request(app)
      .patch(`/hotel/${responsePOST.body.id}/rooms/${responsePost.body.id}`)
      .send(newPrice);

    const responseGet = await request(app).get(
      `/hotel/${responsePOST.body.id}/rooms/${responsePost.body.id}`
    );
    expect(response.status).toBe(200);
    expect(responseGet).toEqual(
      expect.objectContaining({
        id: responsePost.body.id,
        name: responseGet.body.name,
        cnpj: responseGet.body.cnpj,
        address: responseGet.body.address,
        qtyBedRooms: responseGet.body.qtyBedRooms,
      })
    );
  });

  test("Should be able to delete a room", async () => {
    const newRoom = {
      roomNumber: 101,
      floorNumber: 1,
      price: 200,
      isClean: true,
      isAvailable: true,
    };
    const responsePost = await request(app)
      .post(`/hotel/${responsePOST.body.id}/rooms`)
      .send(newRoom);

    const response = await request(app).delete(
      `/hotel/${responsePOST.body.id}/rooms/${responsePost.body.id}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
