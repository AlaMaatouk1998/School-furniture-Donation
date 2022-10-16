import { FurnitureToTakerService } from '../service/furnitureToTaker.service';
import { Observable } from 'rxjs';
import { FurnitureToTaker } from '../model/furnitureToTaker.interface';
export declare const BLOG_ENTRIES_URL = "http://localhost:3000/api/blog-entries";
export declare const storage: {
    storage: any;
};
export declare class FurnitureToTakerController {
    private furnitureToTakerService;
    constructor(furnitureToTakerService: FurnitureToTakerService);
    create(furniture: number, req: any): Observable<FurnitureToTaker>;
    findFurnitureToTakers(): Observable<FurnitureToTaker[]>;
    indexByUser(userId: number): Observable<FurnitureToTaker[]>;
    findOne(id: number): Observable<FurnitureToTaker>;
    updateOne(id: number, furnitureToTaker: FurnitureToTaker): Observable<FurnitureToTaker>;
    deleteOne(id: number): Observable<any>;
}
