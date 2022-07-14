import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Employees } from "./employees.entities";

@Entity("Roles")
export class JobTitles {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 200 })
  description: string;

  @OneToMany(() => Employees, (employees) => employees.jobTitles)
  employees: Employees[];
}
