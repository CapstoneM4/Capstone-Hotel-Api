import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { hash } from "bcryptjs";
import { IEmployeesRequest } from "../../interfaces/employees";
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

  static async listEmployees(id: string): Promise<Employees[]> {
    const hotelRepository = AppDataSource.getRepository(Hotel);

    const findHotel = await hotelRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!findHotel) {
      throw new AppError(404, "Hotel not found!");
    }

    return findHotel.employees;
  }
}
export default EmployeesServices;
