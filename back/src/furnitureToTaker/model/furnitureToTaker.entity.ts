import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  ManyToOne,
} from 'typeorm';
import { FurnitureEntity } from 'src/furniture/model/furniture.entity';

import { UserEntity } from 'src/user/model/user.entity';

@Entity('furnitureTotaker')
export class FurnitureToTakerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TimESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TimESTAMP' })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
  @Column({ nullable: true })
  publishedDate: Date;
  @Column({ default: 0 })
  quantity: number;

  @Column({ default: false })
  accepted: boolean;

  @ManyToOne((type) => UserEntity, (taker) => taker.furnitures)
  taker: UserEntity;

  @ManyToOne((type) => FurnitureEntity, (furniture) => furniture.author)
  furniture: FurnitureEntity;
}
