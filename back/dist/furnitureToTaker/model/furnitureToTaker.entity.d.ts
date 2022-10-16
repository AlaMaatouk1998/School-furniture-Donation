import { FurnitureEntity } from 'src/furniture/model/furniture.entity';
import { UserEntity } from 'src/user/model/user.entity';
export declare class FurnitureToTakerEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    updateTimestamp(): void;
    publishedDate: Date;
    quantity: number;
    accepted: boolean;
    taker: UserEntity;
    furniture: FurnitureEntity;
}
