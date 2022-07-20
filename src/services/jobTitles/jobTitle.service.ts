import AppDataSource from "../../data-source";
import { Employees } from "../../entities/employees.entities";
import { JobTitles } from "../../entities/jobTitles.entities";
import { AppError } from "../../errors/AppError";

import {
  IJobTitleCreate,
  IJobTitleUpdate,
  IJobTitleUpdateAssign,
} from "../../interfaces/jobTitles";

class JobTitleService {
  static jobTitleRespository = AppDataSource.getRepository(JobTitles);
  static async jobTitle() {
    return await this.jobTitleRespository.find();
  }

  // CREATE
  static async CreateJobTitle(
    id: string,
    { name, description }: IJobTitleCreate
  ): Promise<JobTitles> {
    // const jobTitleRespository = await this.jobTitle();

    const employeeRepository = AppDataSource.getRepository(Employees);

    const employee = await employeeRepository.findOneBy({
      id: id,
    });

    if (!employee) {
      throw new AppError(404, "Employee not found!");
    }

    const jobTitleAlreadyExists = await this.jobTitleRespository.findOneBy({
      name: name,
    });

    if (jobTitleAlreadyExists) {
      throw new AppError(404, "JobTitle already exists on this hotel");
    }

    const jobTitleRespository = AppDataSource.getRepository(JobTitles);

    const job = jobTitleRespository.create({
      name,
      description,
      employees: [employee],
    });

    await this.jobTitleRespository.save(job);

    return job;
  }

  // LIST ALL
  static async ListJobTitles(): Promise<JobTitles[]> {
    const jobTitles = await this.jobTitle();

    return jobTitles;
  }

  // LIST ONE
  static async ListOneJobTitle(id: string): Promise<JobTitles> {
    const jobTitle = await this.jobTitleRespository.findOneBy({ id: id });

    if (!jobTitle) {
      throw new AppError(404, "Job Title not found");
    }

    return jobTitle;
  }

  // UPDATE
  static async UpdateJobTitle({
    id,
    name,
    description,
  }: IJobTitleUpdate): Promise<JobTitles> {
    const jobTitle = await this.jobTitleRespository.findOneBy({ id: id });

    if (!jobTitle) {
      throw new AppError(404, "Employee not found");
    }

    name
      ? (jobTitle!.name = name)
      : description
      ? (jobTitle!.description = description)
      : name;

    await this.jobTitleRespository.update(jobTitle.id, jobTitle);

    return jobTitle;
  }

  // DELETE
  static async DeleteJobTitle(id: string): Promise<JobTitles> {
    const jobTitle = await this.jobTitleRespository.findOneBy({ id: id });

    if (!jobTitle) {
      throw new AppError(404, "Job Title not found");
    }

    await this.jobTitleRespository.delete(jobTitle!.id);

    return jobTitle;
  }
}

export default JobTitleService;
