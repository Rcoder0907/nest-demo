import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserResource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  resourceId: number;

  // @JoinTable()
  // @OneToMany((type) => User)
  @Column()
  userId: number;
}
