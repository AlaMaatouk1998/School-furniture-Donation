import { Furniture } from './furniture.interface';
import { StudyLevel } from './studyLevel.interface';

export interface FurnitureCategory {
  id?: number;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  furnitures?: Furniture[];
  studyLevel?: StudyLevel;
}
