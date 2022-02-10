import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ResourceTypes } from '../constants';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  resourceId: number;

  @Column()
  resourceType: ResourceTypes;
}
