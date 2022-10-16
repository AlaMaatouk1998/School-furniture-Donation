import { Furniture } from './furniture.interface';
import { User } from './user.model';
export interface FurnitureRequest {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  quantity?: number;
  taker?: User;
  furniture?: Furniture;
  publishedDate?: Date;
  accepted?: boolean;
}
