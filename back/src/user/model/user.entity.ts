import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { UserRole } from './user.interface';
import { FurnitureEntity } from 'src/furniture/model/furniture.entity';
import { FurnitureToTakerEntity } from 'src/furnitureToTaker/model/furnitureToTaker.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ nullable: true })
  profileImage: string;

  @OneToMany(
    (type) => FurnitureEntity,
    (furnitureEntity) => furnitureEntity.author,
  )
  furnitures: FurnitureEntity[];

  @OneToMany(
    (type) => FurnitureToTakerEntity,
    (furnitureToTakerEntity) => furnitureToTakerEntity.taker,
  )
  furnituresToken: FurnitureToTakerEntity[];
}
