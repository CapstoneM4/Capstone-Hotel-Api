import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Employees } from "./employees.entities";
import { Rooms } from "./rooms.entities";
import { Booking } from "./booking.entities";

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

  @OneToMany(() => Employees, (employees) => employees.hotel, { eager: true })
  employees: Employees[];

  @OneToMany(() => Rooms, (rooms) => rooms.hotel, { eager: true })
  rooms: Rooms[];

  @OneToMany(() => Booking, (booking) => booking.hotel, { eager: true })
  booking: Booking[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
