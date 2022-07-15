import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { BookingService } from "./bookingServices.entities";

@Entity("Services")
export class Services {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ nullable: false, length: 400 })
  description: string;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  price: number;

  @ManyToMany(() => BookingService, (bookingService) => bookingService.services)
  @JoinTable()
  bookingService: BookingService[];
}
