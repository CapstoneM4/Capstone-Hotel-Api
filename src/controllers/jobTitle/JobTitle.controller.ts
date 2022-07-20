import { Request, Response } from "express";
import JobTitleService from "../../services/jobTitles/JobTitle.service";

class JobTitleController {
  static async create(req: Request, res: Response) {
    const { name, description } = req.body;

    const jobTitle = await JobTitleService.CreateJobTitle({
      name,
      description,
    });

    return res.status(201).send(jobTitle);
  }

  static async listAll(req: Request, res: Response) {
    const jobTitlesList = await JobTitleService.ListJobTitles();
    return res.status(200).send(jobTitlesList);
  }

  static async listOne(req: Request, res: Response) {
    const { id } = req.params;
    const jobTitlesList = await JobTitleService.ListOneJobTitle(id);
    return res.status(200).send(jobTitlesList);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;

    const jobTitle = await JobTitleService.UpdateJobTitle({
      id,
      name,
      description,
    });
    return res.status(200).json(jobTitle);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    const jobTitle = await JobTitleService.DeleteJobTitle(id);

    return res.status(200).json({ message: "Job title deleted" });
  }
}

export default JobTitleController;
