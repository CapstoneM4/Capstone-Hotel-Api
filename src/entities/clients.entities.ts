import { Entity, Column, PrimaryColumn, OneToMany, Unique } from "typeorm";

@Entity("clients")
export class Clients {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  email: string;

  @Column({ type: "integer", nullable: false })
  personal_id: number;

  @Column({ type: "varchar", length: 11, nullable: false, unique: true })
  cell: string;

  @Column()
  is_alocated: boolean;
}
