import { FurnitureCategoryEntity } from 'src/furnitureCategory/model/furnitureCategory.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn, Column } from 'typeorm';
import { StudyLevel } from './studyLevel.interface';

@Entity('studyLevel')
export class StudyLevelEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  school: string;

  @Column()
  level: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TimESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TimESTAMP' })
  updatedAt: Date;

  @OneToMany(
    (type) => FurnitureCategoryEntity,
    (furnitureCategoryEntity) => furnitureCategoryEntity.studyLevel,
  )
  categories: FurnitureCategoryEntity[];
}
