import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("BookingService")
export class BookingService {
  @PrimaryColumn("uuid")
  readonly id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
