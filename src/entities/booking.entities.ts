import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Hotel } from "./systemHotel.entities";
import { Clients } from "./clients.entities";
import { BookingService } from "./bookingServices.entities";
import { Rooms } from "./rooms.entities";

@Entity("Booking")
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

  @ManyToOne(() => Hotel)
  hotel: Hotel;

  @ManyToOne(() => Clients, { eager: true })
  client: Clients;

  @ManyToOne(() => Rooms, { eager: true })
  rooms: Rooms;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
