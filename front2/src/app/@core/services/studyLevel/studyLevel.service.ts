import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { StudyLevel } from '../../models/studyLevel.interface';

@Injectable({
  providedIn: 'root',
})
export class StudyLevelService {
  constructor(private http: HttpClient) {}

  findOne(id: number): Observable<StudyLevel> {
    return this.http.get<StudyLevel>('http://localhost:3000/api/studyLevel/' + id);
  }

  indexAll(): Observable<StudyLevel[]> {
    let params = new HttpParams();

    return this.http.get<StudyLevel[]>('http://localhost:3000/api/studyLevel');
  }

  indexByUser(userId: number, page: number, limit: number): Observable<StudyLevel[]> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<StudyLevel[]>('http://localhost:3000/api/studyLevels/user/' + String(userId), { params });
  }

  addStudyLevel(StudyLevel: StudyLevel): Observable<StudyLevel> {
    return this.http.post<StudyLevel>('/api/studyLevels', StudyLevel);
  }
  updateStudyLevel(StudyLevel: StudyLevel): Observable<StudyLevel> {
    return this.http.put<StudyLevel>('/api/studyLevels', StudyLevel);
  }
  uploadHeaderImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('/api/studyLevels/image/upload', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
