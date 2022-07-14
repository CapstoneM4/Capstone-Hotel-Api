import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
}
