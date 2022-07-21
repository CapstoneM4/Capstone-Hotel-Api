"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const jobTitles_entities_1 = require("../../entities/jobTitles.entities");
const AppError_1 = require("../../errors/AppError");
const employees_entities_1 = require("../../entities/employees.entities");
class JobTitleService {
    static jobTitle() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.jobTitleRespository.find();
        });
    }
    // CREATE
    static CreateJobTitle(id, { name, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeRepository = data_source_1.default.getRepository(employees_entities_1.Employees);
            const employee = yield employeeRepository.findOneBy({
                id: id,
            });
            if (!employee) {
                throw new AppError_1.AppError(404, "Employee not found!");
            }
            const jobTitleAlreadyExists = yield this.jobTitleRespository.findOneBy({
                name: name,
            });
            if (jobTitleAlreadyExists) {
                throw new AppError_1.AppError(404, "JobTitle already exists on this hotel");
            }
            const jobTitleRespository = data_source_1.default.getRepository(jobTitles_entities_1.JobTitles);
            const job = jobTitleRespository.create({
                name,
                description,
                employees: [employee],
            });
            yield this.jobTitleRespository.save(job);
            return job;
        });
    }
    // LIST ALL
    static ListJobTitles() {
        return __awaiter(this, void 0, void 0, function* () {
            const jobTitles = yield this.jobTitle();
            return jobTitles;
        });
    }
    // LIST ONE
    static ListOneJobTitle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobTitle = yield this.jobTitleRespository.findOneBy({ id: id });
            if (!jobTitle) {
                throw new AppError_1.AppError(404, "Job Title not found");
            }
            return jobTitle;
        });
    }
    // UPDATE
    static UpdateJobTitle({ id, name, description, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobTitle = yield this.jobTitleRespository.findOneBy({ id: id });
            if (!jobTitle) {
                throw new AppError_1.AppError(404, "Job Title not found");
            }
            name ? (jobTitle.name = name) : name;
            description ? (jobTitle.description = description) : description;
            yield this.jobTitleRespository.update(jobTitle.id, jobTitle);
            return jobTitle;
        });
    }
    // DELETE
    static DeleteJobTitle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobTitle = yield this.jobTitleRespository.findOneBy({ id: id });
            if (!jobTitle) {
                throw new AppError_1.AppError(404, "Job Title not found");
            }
            yield this.jobTitleRespository.delete(jobTitle.id);
            return jobTitle;
        });
    }
}
JobTitleService.jobTitleRespository = data_source_1.default.getRepository(jobTitles_entities_1.JobTitles);
exports.default = JobTitleService;
