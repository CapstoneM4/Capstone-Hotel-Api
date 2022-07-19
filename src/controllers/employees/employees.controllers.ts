import { Request, Response } from "express";
import EmployeesServices from "../../services/employees/employees.service";

class EmployeesControllers {
  static async createEmployees(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const { id } = req.params;

    const newEmployee = await EmployeesServices.createEmploeeys(id, {
      name,
      email,
      password,
    });

    return res.status(201).json(newEmployee);
  }

  static async listEmployees(req: Request, res: Response) {
    const { id } = req.params;

    const hotelEmployees = await EmployeesServices.listEmployees(id);

    return res.status(200).json(hotelEmployees);
  }
}

export default EmployeesControllers;
