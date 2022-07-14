import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("booking_Service")
export class Booking_Service {
  @PrimaryColumn("uuid")
  readonly id: string;
}
