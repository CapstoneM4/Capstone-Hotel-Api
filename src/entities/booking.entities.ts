import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Hotel } from "./systemHotel.entities";
import { Clients } from "./clients.entities";

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

  @ManyToOne(() => Hotel)
  hotel: Hotel;

  @ManyToOne(() => Clients, { eager: true })
  client: Clients;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
