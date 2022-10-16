import { FurnitureEntity } from 'src/furniture/model/furniture.entity';
import { StudyLevelEntity } from 'src/studyLevel/model/studyLevel.entity';
export declare class FurnitureCategoryEntity {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    furnitures: FurnitureEntity[];
    studyLevel: StudyLevelEntity;
}
