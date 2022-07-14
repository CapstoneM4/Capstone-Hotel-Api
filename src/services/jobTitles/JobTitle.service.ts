import AppDataSource from "../../data-source";
import { JobTitles } from "../../entities/jobTitles.entities";
import { AppError } from "../../errors/AppError";
import { IJobTitleCreate, IJobTitleUpdate } from "../../interfaces";

class JobTitleService {
  static jobTitleRespository = AppDataSource.getRepository(JobTitles);
  static async jobTitle() {
    return await this.jobTitleRespository.find();
  }

  // CREATE
  static async createJobTitle({ name, description }: IJobTitleCreate) {
    const jobTitles = await this.jobTitle();

    const jobTitleAlreadyExists = jobTitles.find((job) => {
      job.name === name;
    });

    if (jobTitleAlreadyExists) {
      throw new AppError("JobTitle already exists on this hotel", 400);
    }

    const jobTitle = new JobTitles();
    jobTitle.name = name;
    jobTitle.description = description;

    this.jobTitleRespository.create(jobTitle);
    this.jobTitleRespository.save(jobTitle);

    return jobTitle;
  }

  // LIST ALL
  static async ListJobTitles() {
    const jobTitles = await this.jobTitle();

    return jobTitles;
  }

  // LIST ONE
  static async ListOneJobTitle(id: string) {
    const jobTitles = await this.jobTitle();

    const jobTitle = jobTitles.find((job) => {
      job.id === id;
    });

    return jobTitle;
  }

  // UPDATE
  static async UpdateJobTitle({ id, name, description }: IJobTitleUpdate) {
    const jobTitles = await this.jobTitle();

    const jobTitle = jobTitles.find((job) => {
      job.id === id;
    });

    if (!jobTitle) {
      throw new AppError("Job Title not found", 404);
    }

    Object.assign(jobTitle, { name, description });

    await this.jobTitleRespository.update(jobTitle.id, jobTitle);

    return jobTitle;
  }

  // DELETE
  static async DeleteJobTitle(id: string) {
    const jobTitles = await this.jobTitle();

    const jobTitle = jobTitles.find((job) => {
      job.id === id;
    });

    if (!jobTitle) {
      throw new AppError("Job Title not found", 404);
    }

    await this.jobTitleRespository.delete(jobTitle.id);

    return jobTitle;
  }
}

export default JobTitleService;
