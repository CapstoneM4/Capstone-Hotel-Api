import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { hash } from "bcryptjs";
import { IEmployeesRequest, IEmployeeUpdate } from "../../interfaces/employee";
import { Hotel } from "../../entities/systemHotel.entities";
import { Employees } from "../../entities/employees.entities";

class EmployeesServices {
  static async createEmploeeys(
    id: string,
    { name, email, password }: IEmployeesRequest
  ): Promise<Employees[]> {
    const employeeRepository = AppDataSource.getRepository(Employees);
    const hotelRepository = AppDataSource.getRepository(Hotel);

    const findUser = await employeeRepository.findOne({
      where: {
        email: email,
      },
    });

    if (findUser) {
      throw new AppError(400, "User already registered!");
    }

    const hotel = await hotelRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!hotel) {
      throw new AppError(404, "Hotel not found");
    }

    const hashedPassword = await hash(password, 10);

    const employee = employeeRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    employee.hotel = hotel;

    await employeeRepository.save(employee);

    const employeeResponse = await employeeRepository
      .createQueryBuilder("employee")
      .where("employee.email = :email", { email: email })
      .select("employee.id")
      .addSelect("employee.name")
      .addSelect("employee.email")
      .addSelect("employee.hotel")
      .addSelect("employee.isAdm")
      .addSelect("employee.isActive")
      .getMany();

    return employeeResponse;
  }

  static async listEmployees(id: string) {
    const employeeRepository = AppDataSource.getRepository(Employees);

    const employee = await employeeRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!employee) {
      throw new AppError(404, "Employee not found!");
    }

    const join = await employeeRepository
      .createQueryBuilder("employee")
      .leftJoinAndSelect("employee.hotel", "hotel")
      .leftJoinAndSelect("employee.jobTitles", "jobTitles")
      .where("employee.id = :id", { id: id })
      .getOne();

    let response = {};

    if (join?.jobTitles == null) {
      response = {
        id: join!.id,
        name: join!.name,
        email: join!.email,
        isAdm: join!.isAdm,
        isActive: join!.isActive,
        hotel: {
          id: join!.hotel.id,
          name: join!.hotel.name,
          qtyBedRooms: join!.hotel.qtyBedRooms,
          cnpj: join!.hotel.cnpj,
          address: join!.hotel.address,
        },
        jobTitle: {
          message: "Job yet not defined!",
        },
      };
    } else if (join?.jobTitles != null) {
      response = {
        id: join!.id,
        name: join!.name,
        email: join!.email,
        isAdm: join!.isAdm,
        isActive: join!.isActive,
        hotel: {
          id: join!.hotel.id,
          name: join!.hotel.name,
          qtyBedRooms: join!.hotel.qtyBedRooms,
          cnpj: join!.hotel.cnpj,
          address: join!.hotel.address,
        },
        jobTitle: {
          name: join!.jobTitles.name,
          description: join!.jobTitles.description,
        },
      };
    }
    return response;
  }

  static async listEmployeesByHotel(id: string): Promise<Employees[]> {
    const hotelRepository = AppDataSource.getRepository(Hotel);

    const hotel = await hotelRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!hotel) {
      throw new AppError(404, "Hotel not found!");
    }

    return hotel.employees;
  }

  static async updateEmployee(
    id: number,
    { name, email, password, isAdm, isActive }: IEmployeeUpdate
  ) {
    const employeeRepository = AppDataSource.getRepository(Employees);

    const employeeList = await employeeRepository.find();

    const employee = employeeList.find((e) => Number(e.id) === id);

    if (!employee) {
      throw new AppError(404, "Employee not found!");
    } else if (employee.name === name) {
      throw new AppError(400, `Employee alredy has ${name} registered!`);
    } else if (employee.email === email) {
      throw new AppError(400, `Employee already has ${email} registered!`);
    } else if (employee.password === password) {
      throw new AppError(400, "Employee already has this password registered!");
    } else if (employee.isAdm === isAdm) {
      throw new AppError(400, `Employee already has ${isAdm} status!`);
    } else if (employee.isActive === isActive) {
      throw new AppError(400, `Employee already has ${isActive}} status!`);
    }

    isAdm != undefined ? (employee.isAdm = isAdm) : isAdm;
    isActive != undefined ? (employee.isActive = isActive) : isActive;
    name ? (employee.name = name) : name;
    email ? (employee.email = email) : email;
    password ? (employee.password = await hash(password, 10)) : password;

    await employeeRepository.update(employee.id, employee);

    return true;
  }

  // static async deleteEmployee(id: string): Promise<boolean> {
  //   const employeeRepository = AppDataSource.getRepository(Employees);
  //   console.log(typeof id);

  //   const employeeList = await employeeRepository.find();

  //   const employee = employeeList.find((e) => console.log(typeof e.id));
  //   // console.log(employee);

  //   if (!employee) {
  //     throw new AppError(404, "Employee not found!");
  //   }

  //   await employeeRepository
  //     .createQueryBuilder()
  //     .delete()
  //     .from(Employees)
  //     .where("id = :id", { id: id })
  //     .execute();

  //   return true;
  // }
}
export default EmployeesServices;
