import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("roomType")
export class RoomType {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: "varchar", length: 50, nullable: false })
  type: string;

  @Column({ type: "integer", nullable: false })
  qty_clients: number;

  @Column({ type: "integer" })
  qty_single_bed: number;

  @Column({ type: "integer" })
  qty_double_bed: number;
}
