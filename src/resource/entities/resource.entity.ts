import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ResourceTypes } from '../constants';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  resourceType: ResourceTypes;
}
