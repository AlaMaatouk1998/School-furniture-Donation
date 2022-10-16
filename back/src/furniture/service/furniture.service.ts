import { Injectable } from '@nestjs/common';
import { Observable, of, from } from 'rxjs';
import { Furniture } from '../model/furniture.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { FurnitureEntity } from '../model/furniture.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/service/user.service';

import { User } from 'src/user/model/user.interface';
import { switchMap, map, tap } from 'rxjs/operators';
import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import { FurnitureCategoryEntity } from 'src/furnitureCategory/model/furnitureCategory.entity';
import { FurnitureCategoryService } from 'src/furnitureCategory/service/furnitureCategory.service';
const slugify = require('slugify');

@Injectable()
export class FurnitureService {
  constructor(
    @InjectRepository(FurnitureEntity)
    private readonly furnitureRepository: Repository<FurnitureEntity>,
    private furnitureCategoryService: FurnitureCategoryService, // private furnitureService: FurnitureService,
  ) {}

  create(
    user: User,
    furniture: Furniture,
    category: number,
  ): Observable<Furniture> {
    furniture.author = user;
    console.log(furniture);
    return from(this.furnitureCategoryService.findOne(category)).pipe(
      switchMap((Fur: FurnitureCategoryEntity) => {
        furniture.furnitureCategory = Fur;
        return from(this.furnitureRepository.save(furniture));
      }),
    );
  }

  findAll(): Observable<Furniture[]> {
    return from(
      this.furnitureRepository.find({
        relations: [
          'author',
          'furnitureCategory',
          'furnitureCategory.studyLevel',
        ],
      }),
    );
  }

  paginateAll(options: IPaginationOptions): Observable<Pagination<Furniture>> {
    return from(
      paginate<Furniture>(this.furnitureRepository, options, {
        relations: [
          'author',
          'furnitureCategory',
          'furnitureCategory.studyLevel',
        ],
      }),
    ).pipe(map((furnitures: Pagination<Furniture>) => furnitures));
  }

  paginateByUser(userId: number): Observable<Furniture[]> {
    {
      return from(
        this.furnitureRepository.find({
          relations: [
            'auhtor',
            'furnitureCategory',
            'furnitureCategory.studyLevel',
          ],
          where: { author: { id: userId } },
        }),
      ).pipe(map((furnitures: Furniture[]) => furnitures));
    }
  }

  findOne(id: number): Observable<Furniture> {
    return from(
      this.furnitureRepository.findOne({
        where: {
          id: id,
        },
        relations: ['author'],
      }),
    );
  }

  findByUser(userId: number): Observable<Furniture[]> {
    return from(
      this.furnitureRepository.find({
        where: {
          author: { id: userId },
        },
        relations: ['author'],
      }),
    ).pipe(map((furnitures: Furniture[]) => furnitures));
  }

  updateOne(
    id: number,
    furniture: Furniture,
    categoryId: number,
  ): Observable<Furniture> {
    return from(this.furnitureCategoryService.findOne(categoryId)).pipe(
      switchMap((Fur: FurnitureCategoryEntity) => {
        furniture.furnitureCategory = Fur;
        return from(this.furnitureRepository.update(id, furniture)).pipe(
          switchMap(() => this.findOne(id)),
        );
      }),
    );
  }

  deleteOne(id: number): Observable<any> {
    return from(this.furnitureRepository.delete(id));
  }

  generateSlug(title: string): Observable<string> {
    return of(slugify(title));
  }
}
