import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Services } from "./services.entities";
import { Employees } from "./employees.entities";
import { Booking } from "./booking.entities";

@Entity("BookingService")
export class BookingService {
  @PrimaryColumn("uuid")
  readonly id: string;

  @ManyToMany(() => Services, (services) => services.bookingService)
  @JoinTable()
  services: Services[];

  @ManyToMany(() => Employees, (employees) => employees.bookingService)
  @JoinTable()
  employees: Employees[];

  @ManyToOne(() => Booking, (booking) => booking.bookingService)
  booking: Booking;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
