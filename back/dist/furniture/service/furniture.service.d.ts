import { Observable } from 'rxjs';
import { Furniture } from '../model/furniture.interface';
import { FurnitureEntity } from '../model/furniture.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/model/user.interface';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { FurnitureCategoryService } from 'src/furnitureCategory/service/furnitureCategory.service';
export declare class FurnitureService {
    private readonly furnitureRepository;
    private furnitureCategoryService;
    constructor(furnitureRepository: Repository<FurnitureEntity>, furnitureCategoryService: FurnitureCategoryService);
    create(user: User, furniture: Furniture, category: number): Observable<Furniture>;
    findAll(): Observable<Furniture[]>;
    paginateAll(options: IPaginationOptions): Observable<Pagination<Furniture>>;
    paginateByUser(userId: number): Observable<Furniture[]>;
    findOne(id: number): Observable<Furniture>;
    findByUser(userId: number): Observable<Furniture[]>;
    updateOne(id: number, furniture: Furniture, categoryId: number): Observable<Furniture>;
    deleteOne(id: number): Observable<any>;
    generateSlug(title: string): Observable<string>;
}
