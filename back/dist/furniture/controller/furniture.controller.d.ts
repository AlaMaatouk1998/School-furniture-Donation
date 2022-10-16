import { FurnitureService } from '../service/furniture.service';
import { Observable } from 'rxjs';
import { Furniture } from '../model/furniture.interface';
import { Image } from '../model/image.interface';
export declare const BLOG_ENTRIES_URL = "http://localhost:3000/api/furnitures";
export declare const storage: {
    storage: any;
};
export declare class FurnitureController {
    private furnitureService;
    constructor(furnitureService: FurnitureService);
    create(categoryId: number, furniture: Furniture, req: any): Observable<Furniture>;
    index(): Observable<Furniture[]>;
    indexByUser(userId: number): Observable<Furniture[]>;
    findOne(id: number): Observable<Furniture>;
    updateOne(categoryId: number, id: number, furniture: Furniture): Observable<Furniture>;
    deleteOne(id: number): Observable<any>;
    uploadFile(file: any, req: any): Observable<Image>;
    findimage(imagename: any, res: any): Observable<Object>;
}
