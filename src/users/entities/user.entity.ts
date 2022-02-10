import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ResourceTypes } from '../../constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: ResourceTypes;
}
