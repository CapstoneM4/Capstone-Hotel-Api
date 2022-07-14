import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

@Entity("Hotel")
export class Hotel {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  qtyBedRooms: number;

  @Column({ length: 20 })
  cnpj: string;

  @Column({ length: 150 })
  address: string;
}
