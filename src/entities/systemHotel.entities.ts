import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

@Entity("hotel")
export class Hotel {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ nullable: false })
  quantityBedRooms: number;

  @Column({ length: 20, nullable: false })
  cnpj: string;

  @Column({ length: 150, nullable: false })
  address: string;
}
