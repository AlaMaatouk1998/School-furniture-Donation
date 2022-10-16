import { FurnitureEntity } from 'src/furniture/model/furniture.entity';
import { StudyLevelEntity } from 'src/studyLevel/model/studyLevel.entity';
import { StudyLevel } from 'src/studyLevel/model/studyLevel.interface';
import {
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('furnitureCategory')
export class FurnitureCategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TimESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TimESTAMP' })
  updatedAt: Date;

  @OneToMany(
    (type) => FurnitureEntity,
    (furnitureEntity) => furnitureEntity.furnitureCategory,
  )
  furnitures: FurnitureEntity[];
  @ManyToOne((type) => StudyLevelEntity, (studyLevel) => studyLevel.categories)
  studyLevel: StudyLevelEntity;
}
