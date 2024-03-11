import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class BankBri extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  noLC!: string;

  @Column()
  noPo!: string;

  @Column()
  suplier!: string;

  @Column()
  program!: string;

  @Column()
  nominal_RP!: number;

  @Column()
  nominal_USD!: number;

  @Column()
  nilai_akseptasi_RP!: number;

  @Column()
  nilai_akseptasi_USD!: number;

  @Column()
  tanggal_terbit!: string;

  @Column()
  tanggal_expire!: string;

  @Column()
  rating!: number;
}
