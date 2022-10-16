import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { StudyLevel } from '../model/studyLevel.interface';
import { StudyLevelEntity } from '../model/studyLevel.entity';
export declare class StudyLevelService {
    private readonly studyLevelRepository;
    constructor(studyLevelRepository: Repository<StudyLevelEntity>);
    create(studyLevel: StudyLevel): Observable<StudyLevel>;
    findAll(): Observable<StudyLevel[]>;
    paginateAll(options: IPaginationOptions): Observable<Pagination<StudyLevel>>;
    findOne(id: number): Observable<StudyLevel>;
}
