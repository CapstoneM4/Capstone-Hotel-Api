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
  service: number;

  @ManyToMany(() => Employees, (employees) => employees.bookingService)
  @JoinTable()
  employee: BookingService;

  @ManyToOne(() => Booking, (booking) => booking.bookingService)
  booking: BookingService;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
