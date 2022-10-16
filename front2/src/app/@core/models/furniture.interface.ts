import { FurnitureCategory } from './furnitureCategory.interface';
import { User } from './user.model';

export interface Furniture {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  body?: string;
  createdAt?: Date;
  updatedAt?: Date;
  quantityAvl?: number;
  furnitureCategory?: FurnitureCategory;
  author?: User;
  headerImage?: string;
  publishedDate?: Date;
  isPublished?: boolean;
}
