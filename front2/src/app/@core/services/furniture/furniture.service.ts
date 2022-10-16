import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Furniture } from '../../models/furniture.interface';

@Injectable({
  providedIn: 'root',
})
export class FurnitureService {
  constructor(private http: HttpClient) {}

  findOne(id: number): Observable<Furniture> {
    return this.http.get<Furniture>('http://localhost:3000/api/furnitures/' + id);
  }

  indexAll(): Observable<Furniture[]> {
    let params = new HttpParams();

    return this.http.get<Furniture[]>('http://localhost:3000/api/furnitures');
  }

  indexByUser(userId: number, page: number, limit: number): Observable<Furniture[]> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<Furniture[]>('http://localhost:3000/api/furnitures/user/' + String(userId), { params });
  }

  addFurniture(Furniture: Furniture, categoryId: number): Observable<Furniture> {
    return this.http.post<Furniture>('http://localhost:3000/api/furnitures/' + categoryId, Furniture);
  }
  updateFurniture(Furniture: Furniture, furnitureId: number, categoryId: number): Observable<Furniture> {
    return this.http.put<Furniture>('http://localhost:3000/api/furnitures/' + furnitureId + '/' + categoryId, Furniture);
  }
  uploadHeaderImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('/api/furnitures/image/upload', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
