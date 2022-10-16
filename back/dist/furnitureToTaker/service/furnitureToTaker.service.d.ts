import { Observable } from 'rxjs';
import { FurnitureToTaker } from '../model/furnitureToTaker.interface';
import { FurnitureToTakerEntity } from '../model/furnitureToTaker.entity';
import { Repository } from 'typeorm';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { FurnitureService } from 'src/furniture/service/furniture.service';
import { UserEntity } from 'src/user/model/user.entity';
export declare class FurnitureToTakerService {
    private readonly furnitureToTakerRepository;
    private furnitureService;
    constructor(furnitureToTakerRepository: Repository<FurnitureToTakerEntity>, furnitureService: FurnitureService);
    create(furniture: number, user: UserEntity): Observable<FurnitureToTaker>;
    findAll(): Observable<FurnitureToTaker[]>;
    paginateAll(options: IPaginationOptions): Observable<Pagination<FurnitureToTaker>>;
    paginateByUser(userId: number): Observable<FurnitureToTaker[]>;
    findOne(id: number): Observable<FurnitureToTaker>;
    findByUser(userId: number): Observable<FurnitureToTaker[]>;
    updateOne(id: number, furnitureToTaker: FurnitureToTaker): Observable<FurnitureToTaker>;
    deleteOne(id: number): Observable<any>;
    generateSlug(title: string): Observable<string>;
}
