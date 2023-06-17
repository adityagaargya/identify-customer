import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Contact')
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  linkedId: number;

  @Column()
  linkPrecedence: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  deletedAt: Date;
}
