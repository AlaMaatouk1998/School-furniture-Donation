import { FurnitureCategory } from './furnitureCategory.interface';
import { User } from './user.model';

export interface FurnitureData {
  id?: number;
  title?: string;
  decription?: string;

  quantity?: number;
  category?: string;
  year?: string;
  createdAt?: Date;
}
