import { Furniture } from 'src/furniture/model/furniture.interface';

export interface User {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  profileImage?: string;
  furnituresToken?: Furniture[];
  furnitures?: Furniture[];
}

export enum UserRole {
  ADMIN = 'admin',
  TAKER = 'taker',
  GIVER = 'giver',
  USER = 'user',
}
