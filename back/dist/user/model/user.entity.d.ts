import { UserRole } from './user.interface';
import { FurnitureEntity } from 'src/furniture/model/furniture.entity';
import { FurnitureToTakerEntity } from 'src/furnitureToTaker/model/furnitureToTaker.entity';
export declare class UserEntity {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    profileImage: string;
    furnitures: FurnitureEntity[];
    furnituresToken: FurnitureToTakerEntity[];
}
