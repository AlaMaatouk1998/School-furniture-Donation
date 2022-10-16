import { Injectable } from '@nestjs/common';
import { Observable, of, from } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/service/user.service';

import { User } from 'src/user/model/user.interface';
import { switchMap, map, tap } from 'rxjs/operators';
import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import { FurnitureCategory } from '../model/furnitureCategory.interface';
import { FurnitureCategoryEntity } from '../model/furnitureCategory.entity';
import { StudyLevelEntity } from 'src/studyLevel/model/studyLevel.entity';
import { StudyLevelService } from 'src/studyLevel/service/studyLevel.service';
const slugify = require('slugify');

@Injectable()
export class FurnitureCategoryService {
  constructor(
    @InjectRepository(FurnitureCategoryEntity)
    private readonly furnitureCategoryRepository: Repository<FurnitureCategoryEntity>,
    private studyLevelService: StudyLevelService, // private furnitureService: FurnitureService,
  ) {}

  create(
    levelSID: number,
    f: FurnitureCategory,
  ): Observable<FurnitureCategory> {
    return from(this.studyLevelService.findOne(levelSID)).pipe(
      switchMap((Fur: StudyLevelEntity) => {
        f.studyLevel = Fur;

        return from(this.furnitureCategoryRepository.save(f));
      }),
    );
  }

  findAll(): Observable<FurnitureCategory[]> {
    return from(this.furnitureCategoryRepository.find());
  }

  // paginateAll(options: IPaginationOptions): Observable<Pagination<FurnitureCategory>> {
  //   return from(
  //     paginate<FurnitureCategory>(this.furnitureCategoryRepository, options, {
  //       relations: ['author'],
  //     }),
  //   ).pipe(map((furnitureCategorys: Pagination<FurnitureCategory>) => furnitureCategorys));
  // }

  // paginateByUser(userId: number): Observable<FurnitureCategory[]> {
  //   {
  //     return from(
  //       this.furnitureCategoryRepository.find({
  //         relations: ['author'],
  //         where: { author: { id: userId } },
  //       }),
  //     ).pipe(map((furnitureCategorys: FurnitureCategory[]) => furnitureCategorys));
  //   }
  // }

  findOne(id: number): Observable<FurnitureCategory> {
    return from(
      this.furnitureCategoryRepository.findOne({
        where: {
          id: id,
        },
      }),
    );
  }

  // findByUser(userId: number): Observable<FurnitureCategory[]> {
  //   return from(
  //     this.furnitureCategoryRepository.find({
  //       where: {
  //         author: { id: userId },
  //       },
  //       relations: ['author'],
  //     }),
  //   ).pipe(map((furnitureCategorys: FurnitureCategory[]) => furnitureCategorys));
  // }

  // updateOne(id: number, furnitureCategory: FurnitureCategory): Observable<FurnitureCategory> {
  //   return from(this.furnitureCategoryRepository.update(id, furnitureCategory)).pipe(
  //     switchMap(() => this.findOne(id)),
  //   );
  // }

  // deleteOne(id: number): Observable<any> {
  //   return from(this.furnitureCategoryRepository.delete(id));
  // }

  // generateSlug(title: string): Observable<string> {
  //   return of(slugify(title));
  // }
}
