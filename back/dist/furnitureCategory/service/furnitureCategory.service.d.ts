import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { FurnitureCategory } from '../model/furnitureCategory.interface';
import { FurnitureCategoryEntity } from '../model/furnitureCategory.entity';
import { StudyLevelService } from 'src/studyLevel/service/studyLevel.service';
export declare class FurnitureCategoryService {
    private readonly furnitureCategoryRepository;
    private studyLevelService;
    constructor(furnitureCategoryRepository: Repository<FurnitureCategoryEntity>, studyLevelService: StudyLevelService);
    create(levelSID: number, f: FurnitureCategory): Observable<FurnitureCategory>;
    findAll(): Observable<FurnitureCategory[]>;
    findOne(id: number): Observable<FurnitureCategory>;
}
