import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("services")
export class Services {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ nullable: false, length: 400 })
  description: string;

  @Column({ type: "decimal", precision: 8, scale: 2, nullable: false })
  price: number;
}
