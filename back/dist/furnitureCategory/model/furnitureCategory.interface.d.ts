import { Furniture } from 'src/furniture/model/furniture.interface';
import { StudyLevel } from 'src/studyLevel/model/studyLevel.interface';
export interface FurnitureCategory {
    id?: number;
    name?: string;
    createdAt?: Date;
    updatedAt?: Date;
    furnitures?: Furniture[];
    studyLevel?: StudyLevel;
}
