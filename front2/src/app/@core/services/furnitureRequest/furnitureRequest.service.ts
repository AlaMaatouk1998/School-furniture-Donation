import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { FurnitureRequest } from '../../models/furnitureRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class FurnitureRequestService {
  constructor(private http: HttpClient) {}

  findOne(id: number): Observable<FurnitureRequest> {
    return this.http.get<FurnitureRequest>('http://localhost:3000/api/furnitureToTakers/' + id);
  }

  indexAll(): Observable<FurnitureRequest[]> {
    let params = new HttpParams();

    return this.http.get<FurnitureRequest[]>('http://localhost:3000/api/furnitureToTakers');
  }

  indexByUser(userId: number, page: number, limit: number): Observable<FurnitureRequest[]> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<FurnitureRequest[]>('http://localhost:3000/api/furnitureToTakers/user/' + String(userId), { params });
  }

  addFurnitureRequest(FurnitureRequest: FurnitureRequest): Observable<FurnitureRequest> {
    return this.http.post<FurnitureRequest>('http://localhost:3000/api/furnitureToTakers/' + FurnitureRequest.furniture, null);
  }
  updateFurnitureRequest(FurnitureRequest: FurnitureRequest, requestId: number, categoryId: number): Observable<FurnitureRequest> {
    return this.http.put<FurnitureRequest>('http://localhost:3000/api/furnitureToTakers/' + requestId + '/' + categoryId, FurnitureRequest);
  }
  uploadHeaderImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('/api/furnitureToTakers/image/upload', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
