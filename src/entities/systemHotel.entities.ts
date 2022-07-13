import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

@Entity("hotel")
export class Hotel {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "varchar", length: 50, nullable: false })
  name: string;

  @Column({ type: "integer", nullable: false })
  quantityBedRooms: number;

  @Column({ type: "varchar", length: 20, nullable: false })
  cnpj: string;

  @Column({ type: "varchar", length: 150, nullable: false })
  address: string;
}
