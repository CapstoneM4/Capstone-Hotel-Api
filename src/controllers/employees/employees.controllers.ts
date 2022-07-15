import { Request, Response } from "express";
import EmployeesServices from "../../services/employees/employees.service";

class EmployeesControllers {
  static async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const newEmployee = await EmployeesServices.createEmploeeys({
      name,
      email,
      password,
    });

    return res.status(201).json(newEmployee);
  }
}

export default EmployeesControllers;
