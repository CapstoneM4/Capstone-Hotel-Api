import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity("Employees")
export class Employees {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 200 })
  password: string;

  @Column({ default: false })
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;
}
