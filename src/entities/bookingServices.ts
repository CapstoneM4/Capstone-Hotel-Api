import {
  Entity,
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
  service: Services[];

  @ManyToMany(() => Employees, (employees) => employees.bookingService)
  @JoinTable()
  employee: Employees[];

  @ManyToOne(() => Booking, (booking) => booking.bookingService)
  booking: Booking;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
