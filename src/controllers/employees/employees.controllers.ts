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

    const employee = await EmployeesServices.listEmployees(id);

    return res.status(200).json(employee);
  }

  static async listEmployeesByHotel(req: Request, res: Response) {
    const { id } = req.params;
    const list = await EmployeesServices.listEmployeesByHotel(id);

    return res.status(200).json(list);
  }

  static async updateEmployee(req: Request, res: Response) {
    const { id } = req.params;
    const newId = parseInt(id);
    const { name, email, password, isAdm, isActive } = req.body;
    const updated = await EmployeesServices.updateEmployee(newId, {
      name,
      email,
      password,
      isAdm,
      isActive,
    });

    return res.status(200).json({
      message: "Updated with success!",
    });
  }

  // static async deleteEmployee(req: Request, res: Response) {
  //   const { id } = req.params;
  //   const deleted = await EmployeesServices.deleteEmployee(id);
  //   return res.status(200).json({
  //     message: "Deleted with success!",
  //   });
  // }
}

export default EmployeesControllers;
