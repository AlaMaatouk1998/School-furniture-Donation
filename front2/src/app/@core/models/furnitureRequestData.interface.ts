import { FurnitureCategory } from './furnitureCategory.interface';
import { User } from './user.model';

export interface FurnitureRequestData {
  id?: number;
  title?: string;
  decription?: string;

  firstname?: string;
  category?: string;
  year?: string;
  username?: string;
}
