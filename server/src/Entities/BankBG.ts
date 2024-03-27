import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class BankBG extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  noRef!: string;

  @Column()
  pekerjaan!: string;

  @Column()
  tipe!: string;

  @Column()
  program!: string;

  @Column()
  kode_program!: string;

  @Column()
  vauta_asli!: string;

  @Column()
  jenis_vauta_asli!: string;

  @Column()
  tgl_terbit!: string;

  @Column()
  tgl_berlaku!: string;

  @Column()
  tgl_jatuh_tempo!: string;

  @Column()
  bank!: string;

  @Column()
  deposito_giro!: string;

  @Column()
  jenis!: string;

  @Column()
  norek!: string;

  @Column()
  tgl_pembukuan!: string;
}
