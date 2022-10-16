import { StudyLevelService } from '../service/studyLevel.service';
import { Observable } from 'rxjs';
import { StudyLevel } from '../model/studyLevel.interface';
export declare const BLOG_ENTRIES_URL = "http://localhost:3000/api/studyLevel";
export declare class StudyLevelController {
    private studyLevelService;
    constructor(studyLevelService: StudyLevelService);
    create(studyLevel: StudyLevel): Observable<StudyLevel>;
    index(): Observable<StudyLevel[]>;
}
