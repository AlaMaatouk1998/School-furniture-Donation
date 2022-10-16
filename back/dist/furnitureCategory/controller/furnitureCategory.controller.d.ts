import { FurnitureCategoryService } from '../service/furnitureCategory.service';
import { Observable } from 'rxjs';
import { FurnitureCategory } from '../model/furnitureCategory.interface';
export declare class FurnitureCategoryController {
    private furnitureCategoryService;
    constructor(furnitureCategoryService: FurnitureCategoryService);
    create(studylevelId: number, furnitureCategory: FurnitureCategory): Observable<FurnitureCategory>;
    index(): Observable<FurnitureCategory[]>;
}
