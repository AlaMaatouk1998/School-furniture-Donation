import { FurnitureCategory } from 'src/furnitureCategory/model/furnitureCategory.interface';
export interface StudyLevel {
    school?: string;
    level?: string;
    id?: number;
    categories: FurnitureCategory[];
    createdAt?: Date;
    updatedAt?: Date;
}
