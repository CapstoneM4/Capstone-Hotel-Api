import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { BookingService } from "./bookingServices.entities";
import { Rooms } from "./rooms.entities";

@Entity("booking")
export class Booking {
  @PrimaryColumn("uuid")
  readonly id: string;

  @CreateDateColumn()
  checkinDate: Date;

  @CreateDateColumn()
  checkoutDate: Date;

  @Column()
  isPaid: boolean;

  @Column({ nullable: false })
  qtyClients: boolean;

  @OneToMany(() => BookingService, (bookingService) => bookingService.booking)
  bookingService: BookingService[];

  @OneToOne(() => Rooms, (rooms) => rooms.booking) // specify inverse side as a second parameter
  @JoinColumn()
  rooms: Rooms;
}
