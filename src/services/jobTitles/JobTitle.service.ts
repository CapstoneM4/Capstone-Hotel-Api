import AppDataSource from "../../data-source";
import { JobTitles } from "../../entities/jobTitles.entities";
import { AppError } from "../../errors/AppError";
import {
  IJobTitleCreate,
  IJobTitleUpdate,
  IJobTitleUpdateAssign,
} from "../../interfaces/employee";

class JobTitleService {
  static jobTitleRespository = AppDataSource.getRepository(JobTitles);
  static async jobTitle() {
    return await this.jobTitleRespository.find();
  }

  // CREATE
  static async CreateJobTitle({
    name,
    description,
  }: IJobTitleCreate): Promise<JobTitles> {
    // const jobTitleRespository = await this.jobTitle();

    const jobTitleAlreadyExists = await this.jobTitleRespository.findOneBy({
      name: name,
    });

    if (jobTitleAlreadyExists) {
      throw new AppError(404, "JobTitle already exists on this hotel");
    }

    const jobTitle = new JobTitles();
    jobTitle.name = name;
    jobTitle.description = description;

    this.jobTitleRespository.create(jobTitle);
    await this.jobTitleRespository.save(jobTitle);

    return jobTitle;
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
      throw new AppError(404, "Job Title not found");
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
