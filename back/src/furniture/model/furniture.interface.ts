import { CoreCategoryType } from 'prettier';
import { FurnitureCategory } from 'src/furnitureCategory/model/furnitureCategory.interface';
import { User } from 'src/user/model/user.interface';

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
