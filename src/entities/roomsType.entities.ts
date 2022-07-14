import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Rooms } from "./rooms.entities";

@Entity("RoomType")
export class RoomType {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: "varchar", length: 50, unique: true })
  type: string;

  @Column({ type: "integer" })
  qtyClients: number;

  @Column({ type: "integer" })
  qtySingleBed: number;

  @Column({ type: "integer" })
  qtyDoubleBed: number;

  @OneToMany(() => Rooms, (rooms) => rooms.roomType)
  rooms: Rooms[];
}
