import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Hotel } from "./systemHotel.entities";
import { RoomType } from "./roomsType.entities";

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

  @ManyToOne(() => Hotel)
  hotel: Hotel;

  @ManyToOne(() => RoomType, { eager: true })
  roomType: RoomType;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
