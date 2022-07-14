import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("employees")
export class Employees {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 200, nullable: false })
  password: string;

  @Column({ default: false })
  is_adm: boolean;

  @Column({ nullable: false, default: true })
  is_active: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
