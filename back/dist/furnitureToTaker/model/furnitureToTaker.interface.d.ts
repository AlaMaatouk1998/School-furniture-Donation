import { FurnitureEntity } from 'src/furniture/model/furniture.entity';
import { User } from 'src/user/model/user.interface';
export interface FurnitureToTaker {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    quantity?: number;
    taker?: User;
    furniture?: FurnitureEntity;
    publishedDate?: Date;
    accepted?: boolean;
}
