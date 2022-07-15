import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import { Employees } from "../../entities/employees.entities";
import { hash } from "bcryptjs";
import { IEmployeesRequest } from "../../interfaces/employees";

class EmployeesServices {
  static async createEmploeeys({
    name,
    email,
    password,
  }: IEmployeesRequest): Promise<Employees[]> {
    const employeeRepository = AppDataSource.getRepository(Employees);

    const findUser = await employeeRepository.findOne({
      where: {
        email: email,
      },
    });

    if (findUser) {
      throw new AppError(500, "User already registered!");
    }

    const hashedPassword = await hash(password, 10);

    const employee = employeeRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await employeeRepository.save(employee);

    const employeeResponse = await employeeRepository
      .createQueryBuilder("employee")
      .where("employee.email = :email", { email: email })
      .select("employee.id")
      .addSelect("employee.name")
      .addSelect("employee.email")
      .addSelect("employee.isAdm")
      .addSelect("employee.isActive")
      .getMany();

    return employeeResponse;
  }
}
export default EmployeesServices;
