import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import { IBookingCreate } from "../../interfaces/booking";
import { IHotelSystemCreate } from "../../interfaces/hotel";
import { IClientsCreate } from "../../interfaces/clientsInterface";

describe("Testing Clients routes", () => {
  let connection: DataSource;
  let responsePOST: any;

  const newHotel: IHotelSystemCreate = {
    name: "Hotel Beira Rio",
    qtyBedRooms: 30,
    cnpj: "1298471ajsh91",
    address: "Rua do Joãozinho, 3",
  };

  const newClient: IClientsCreate = {
    name: "Gustavo",
    email: "gusantos1704@gmail.com",
    personalId: "08846610911",
    cell: "41987807038",
    isAlocated: false,
  };
  let newBooking: any;
  let responseHotelPOST: any;
  let responseClientPOST: any;
  const newRoom = {
    roomNumber: 101,
    floorNumber: 1,
    price: 200,
    isClean: true,
    isAvailable: true,
  };
  let responseRoomPost: any;
  let responseNewBooking: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );

    responseHotelPOST = await request(app).post("/hotel").send(newHotel);
    responseClientPOST = await request(app).post("/clients").send(newClient);
    responseRoomPost = await request(app)
      .post(`/hotel/${responseHotelPOST.body.id}/rooms`)
      .send(newRoom);

    newBooking = {
      checkinDate: new Date(),
      checkoutDate: new Date(),
      isPaid: false,
      qtyClients: 4,
      idHotel: responseHotelPOST.body.id,
      idClient: responseClientPOST.body.id,
      idRoom: responseRoomPost.body.id,
    };

    responseNewBooking = await request(app).post(
      `/services/${responseHotelPOST.body.id}/booking`
    );
  });
  afterAll(async () => {
    await connection.destroy();
  });

  test("Should create a new booking", async () => {
    expect(responseNewBooking.status).toBe(201);
    expect(responseNewBooking.body).toHaveProperty("id");
    expect(responseNewBooking.body).toHaveProperty("checkinDate");
    expect(responseNewBooking.body).toHaveProperty("checkoutDate");
    expect(responseNewBooking.body).toHaveProperty("isPaid");
    expect(responseNewBooking.body).toHaveProperty("qtyClients");
    expect(responseNewBooking.body).toHaveProperty("idHotel");
    expect(responseNewBooking.body).toHaveProperty("idClient");
    expect(responseNewBooking.body).toHaveProperty("idRoom");
  });

  test("Should list a booking", async () => {
    const response = await request(app).get(
      `/service/${responsePOST.body.id}/booking/${responseNewBooking.body.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        checkinDate: response.body.checkinDate,
        checkoutDate: response.body.checkoutDate,
        isPaid: response.body.isPaid,
        qtyClients: response.body.qtyClients,
        idHotel: response.body.idHotel,
        idClient: response.body.idClient,
        idRoom: response.body.idRoom,
      })
    );
  });

  test("Should list all bookings", async () => {
    const response = await request(app).get(
      `/services/${responseHotelPOST.body.id}/booking`
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("Should update a booking", async () => {
    expect(responsePOST.status).toBe(201);
    expect(responsePOST.body).toHaveProperty("id");
    expect(responsePOST.body).toHaveProperty("name");
    expect(responsePOST.body).toHaveProperty("email");
    expect(responsePOST.body).toHaveProperty("personalId");
    expect(responsePOST.body).toHaveProperty("cell");
    expect(responsePOST.body).toHaveProperty("isAlocated");
  });

  test("Should delete a booking", async () => {
    expect(responsePOST.status).toBe(201);
    expect(responsePOST.body).toHaveProperty("id");
    expect(responsePOST.body).toHaveProperty("name");
    expect(responsePOST.body).toHaveProperty("email");
    expect(responsePOST.body).toHaveProperty("personalId");
    expect(responsePOST.body).toHaveProperty("cell");
    expect(responsePOST.body).toHaveProperty("isAlocated");
  });

  test("Should create a new booking Service", async () => {
    expect(responsePOST.status).toBe(201);
    expect(responsePOST.body).toHaveProperty("id");
    expect(responsePOST.body).toHaveProperty("name");
    expect(responsePOST.body).toHaveProperty("email");
    expect(responsePOST.body).toHaveProperty("personalId");
    expect(responsePOST.body).toHaveProperty("cell");
    expect(responsePOST.body).toHaveProperty("isAlocated");
  });

  test("Should list a booking Service", async () => {
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

  test("Should list all bookings Services", async () => {
    const response = await request(app).get("/clients");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("Should update a booking service", async () => {
    expect(responsePOST.status).toBe(201);
    expect(responsePOST.body).toHaveProperty("id");
    expect(responsePOST.body).toHaveProperty("name");
    expect(responsePOST.body).toHaveProperty("email");
    expect(responsePOST.body).toHaveProperty("personalId");
    expect(responsePOST.body).toHaveProperty("cell");
    expect(responsePOST.body).toHaveProperty("isAlocated");
  });

  test("Should delete a booking service", async () => {
    expect(responsePOST.status).toBe(201);
    expect(responsePOST.body).toHaveProperty("id");
    expect(responsePOST.body).toHaveProperty("name");
    expect(responsePOST.body).toHaveProperty("email");
    expect(responsePOST.body).toHaveProperty("personalId");
    expect(responsePOST.body).toHaveProperty("cell");
    expect(responsePOST.body).toHaveProperty("isAlocated");
  });

  test("Should create service", async () => {
    expect(responsePOST.status).toBe(201);
    expect(responsePOST.body).toHaveProperty("id");
    expect(responsePOST.body).toHaveProperty("name");
    expect(responsePOST.body).toHaveProperty("email");
    expect(responsePOST.body).toHaveProperty("personalId");
    expect(responsePOST.body).toHaveProperty("cell");
    expect(responsePOST.body).toHaveProperty("isAlocated");
  });

  test("Should list all service", async () => {
    expect(responsePOST.status).toBe(201);
    expect(responsePOST.body).toHaveProperty("id");
    expect(responsePOST.body).toHaveProperty("name");
    expect(responsePOST.body).toHaveProperty("email");
    expect(responsePOST.body).toHaveProperty("personalId");
    expect(responsePOST.body).toHaveProperty("cell");
    expect(responsePOST.body).toHaveProperty("isAlocated");
  });

  test("Should list a service", async () => {
    expect(responsePOST.status).toBe(201);
    expect(responsePOST.body).toHaveProperty("id");
    expect(responsePOST.body).toHaveProperty("name");
    expect(responsePOST.body).toHaveProperty("email");
    expect(responsePOST.body).toHaveProperty("personalId");
    expect(responsePOST.body).toHaveProperty("cell");
    expect(responsePOST.body).toHaveProperty("isAlocated");
  });
});
