import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Hotel } from "./systemHotel.entities";
import { Clients } from "./clients.entities";
import { BookingService } from "./bookingServices";
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
  qtyClients: number;

  @OneToMany(() => BookingService, (bookingService) => bookingService.booking)
  bookingService: BookingService[];

  @ManyToOne(() => Hotel, (hotel) => hotel.booking)
  hotel: Hotel;

  @ManyToOne(() => Clients, (client) => client.booking)
  client: Clients;

  @ManyToOne(() => Rooms, (room) => room.booking, { eager: true })
  room: Rooms;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
