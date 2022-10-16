import { FurnitureCategoryEntity } from 'src/furnitureCategory/model/furnitureCategory.entity';
export declare class StudyLevelEntity {
    id: number;
    school: string;
    level: string;
    createdAt: Date;
    updatedAt: Date;
    categories: FurnitureCategoryEntity[];
}
