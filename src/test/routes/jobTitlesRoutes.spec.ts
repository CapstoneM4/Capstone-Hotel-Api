import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import { IJobTitleCreate } from "../../interfaces/jobInterfaces";
import { IHotelSystemCreate } from "../../interfaces/hotel";

describe("Testing job title routes", () => {
  let connection: DataSource;

  const newJobTitle: any = {
    id: 1,
    name: "Gerente Geral",
    description: "Responsavel por administrar o hotel",
  };

  const newHotel: IHotelSystemCreate = {
    name: "Hotel Beira Rio",
    qtyBedRooms: 30,
    cnpj: "1298471ajsh91",
    address: "Rua do Joãozinho, 3",
  };

  let responseJobTitlePOST: any;
  let responseHotelPost: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during Data Source initialization", err)
      );

    responseHotelPost = await request(app).post("/hotel").send(newHotel);

    responseJobTitlePOST = await request(app)
      .post(`/hotel/${responseHotelPost.body.id}/jobtitles`)
      .send(newJobTitle);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Should create a new Job Title", async () => {
    expect(responseJobTitlePOST.status).toBe(201);
    expect(responseJobTitlePOST.body).toHaveProperty("id");
    expect(responseJobTitlePOST.body).toHaveProperty("name");
    expect(responseJobTitlePOST.body).toHaveProperty("description");
  });

  test("Should be able to return a list of all registered job titles", async () => {
    const response = await request(app).get(
      `/hotel/${responseHotelPost.body.id}/jobtitles`
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("Should be able to return a registered job title", async () => {
    const response = await request(app).get(
      `/hotel/${responseHotelPost.body.id}/jobtitles/${responseJobTitlePOST.body.id}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: responseJobTitlePOST.body.id,
        name: responseJobTitlePOST.body.name,
        description: responseJobTitlePOST.body.description,
      })
    );
  });

  test("Should be able to update info of the job title", async () => {
    const attJobTitle = { name: "Nome novo" };

    const response = await request(app)
      .patch(
        `/hotel/${responseHotelPost.body.id}/jobtitles/${responseJobTitlePOST.body.id}`
      )
      .send(attJobTitle);

    const responseGet = await request(app).get(
      `/hotel/${responseHotelPost.body.id}/jobtitles/${responseJobTitlePOST.body.id}`
    );

    expect(response.status).toBe(200);
    expect(responseGet.body).toEqual(
      expect.objectContaining({
        id: responseJobTitlePOST.body.id,
        name: responseGet.body.name,
        description: responseGet.body.description,
      })
    );
  });
  test("Should be able to delete a job title", async () => {
    const responseDelete = await request(app).delete(
      `/hotel/${responseHotelPost.body.id}/jobtitles/${responseJobTitlePOST.body.id}`
    );
    expect(responseDelete.status).toBe(200);
    expect(responseDelete.body).toHaveProperty("message");
  });
});
