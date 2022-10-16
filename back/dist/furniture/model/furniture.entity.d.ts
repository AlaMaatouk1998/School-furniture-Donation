import { UserEntity } from 'src/user/model/user.entity';
import { FurnitureCategoryEntity } from 'src/furnitureCategory/model/furnitureCategory.entity';
export declare class FurnitureEntity {
    id: number;
    title: string;
    slug: string;
    description: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    quantityAvl: number;
    headerImage: string;
    publishedDate: Date;
    isPublished: boolean;
    author: UserEntity;
    furnitureCategory: FurnitureCategoryEntity;
}
