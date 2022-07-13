import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";

@Entity("booking")
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
}
