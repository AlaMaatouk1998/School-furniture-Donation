import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeUpdate,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from 'src/user/model/user.entity';
import { FurnitureCategoryEntity } from 'src/furnitureCategory/model/furnitureCategory.entity';

@Entity('furniture')
export class FurnitureEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 'slug' })
  slug: string;

  @Column({ default: '' })
  description: string;

  @Column({ nullable: true })
  body: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TimESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TimESTAMP' })
  updatedAt: Date;

  @Column({ default: 0 })
  quantityAvl: number;

  @Column({ nullable: true })
  headerImage: string;

  @Column({ nullable: true })
  publishedDate: Date;

  @Column({ nullable: true })
  isPublished: boolean;

  @ManyToOne((type) => UserEntity, (user) => user.furnitures)
  author: UserEntity;

  @ManyToOne(
    (type) => FurnitureCategoryEntity,
    (furnitureCategory) => furnitureCategory.furnitures,
  )
  furnitureCategory: FurnitureCategoryEntity;
}
