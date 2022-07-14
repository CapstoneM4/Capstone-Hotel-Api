import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

@Entity("rooms")
export class Rooms {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "integer", unique: true, nullable: false })
  room_number: number;

  @Column({ type: "integer", nullable: false })
  floor_number: number;

  @Column({ type: "decimal", precision: 8, scale: 2, nullable: false })
  price: number;

  @Column()
  is_clean: boolean;

  @Column()
  is_available: boolean;

  @Column({ type: "integer", nullable: false })
  id_room_type: number;

  @Column({ type: "integer", nullable: false })
  id_hotel: number;
}
