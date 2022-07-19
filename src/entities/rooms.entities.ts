import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { Booking } from "./booking.entities";
import { v4 as uuid } from "uuid";
import { Hotel } from "./systemHotel.entities";
import { RoomType } from "./roomsType.entities";

@Entity("Rooms")
export class Rooms {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "integer" })
  roomNumber: number;

  @Column({ type: "integer" })
  floorNumber: number;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  price: number;

  @Column()
  isClean: boolean;

  @Column()
  isAvailable: boolean;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms)
  hotel: Hotel;

  @OneToMany(() => Booking, (booking) => booking.rooms)
  booking: Booking[];

  @ManyToOne(() => RoomType, (roomType) => roomType.rooms, { eager: true })
  roomType: RoomType;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
