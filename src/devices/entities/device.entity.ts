import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: '' })
  address: string;

  @Column()
  energyConsumptionPerHour: number;

  @Column({ nullable: true })
  userId: number;
}
