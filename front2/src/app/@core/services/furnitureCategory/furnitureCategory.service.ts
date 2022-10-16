import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { FurnitureCategory } from '../../models/furnitureCategory.interface';

@Injectable({
  providedIn: 'root',
})
export class FurnitureCategoryService {
  constructor(private http: HttpClient) {}

  findOne(id: number): Observable<FurnitureCategory> {
    return this.http.get<FurnitureCategory>('http://localhost:3000/api/furnitureCategory/' + id);
  }

  indexAll(): Observable<FurnitureCategory[]> {
    let params = new HttpParams();

    return this.http.get<FurnitureCategory[]>('http://localhost:3000/api/furnitureCategory');
  }

  indexByUser(userId: number, page: number, limit: number): Observable<FurnitureCategory[]> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<FurnitureCategory[]>('http://localhost:3000/api/furnitureCategory/user/' + String(userId), { params });
  }

  addFurnitureCategory(FurnitureCategory: FurnitureCategory): Observable<FurnitureCategory> {
    return this.http.post<FurnitureCategory>('/api/furnitureCategory', FurnitureCategory);
  }
  updateFurnitureCategory(FurnitureCategory: FurnitureCategory): Observable<FurnitureCategory> {
    return this.http.put<FurnitureCategory>('/api/furnitureCategory', FurnitureCategory);
  }
  uploadHeaderImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('/api/furnitureCategory/image/upload', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
