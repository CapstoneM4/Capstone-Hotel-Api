import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("Job")
export class JobTitles {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 200 })
  description: string;
}
