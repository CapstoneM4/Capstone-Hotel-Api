import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { Booking } from "./booking.entities";

@Entity("Rooms")
export class Rooms {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "integer", unique: true })
  roomNumber: number;

  @Column({ type: "integer" })
  floorNumber: number;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  price: number;

  @Column()
  isClean: boolean;

  @Column()
  isAvailable: boolean;

  @Column({ type: "integer" })
  idRoomType: number; //Foreign Key, fazer relação

  @Column({ type: "integer" })
  idHotel: number; //Foreign Key, fazer relação

  @OneToOne(() => Booking, (booking) => booking.rooms) // specify inverse side as a second parameter
  booking: Booking;
}
