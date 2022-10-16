import { Injectable } from '@nestjs/common';
import { Observable, of, from } from 'rxjs';
import { FurnitureToTaker } from '../model/furnitureToTaker.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { FurnitureToTakerEntity } from '../model/furnitureToTaker.entity';
import { FurnitureEntity } from 'src/furniture/model/furniture.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/service/user.service';

import { User } from 'src/user/model/user.interface';
import { switchMap, map, tap } from 'rxjs/operators';
import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Furniture } from 'src/furniture/model/furniture.interface';
import { FurnitureService } from 'src/furniture/service/furniture.service';
import { UserEntity } from 'src/user/model/user.entity';
const slugify = require('slugify');

@Injectable()
export class FurnitureToTakerService {
  constructor(
    @InjectRepository(FurnitureToTakerEntity)
    private readonly furnitureToTakerRepository: Repository<FurnitureToTakerEntity>,
    private furnitureService: FurnitureService, // private furnitureService: FurnitureService,
  ) {}

  create(furniture: number, user: UserEntity): Observable<FurnitureToTaker> {
    return from(this.furnitureService.findOne(furniture)).pipe(
      switchMap((Fur: FurnitureEntity) => {
        const f = new FurnitureToTakerEntity();
        f.taker = user;
        f.furniture = Fur;

        return from(this.furnitureToTakerRepository.save(f));
      }),
    );
  }

  findAll(): Observable<FurnitureToTaker[]> {
    return from(
      this.furnitureToTakerRepository.find({
        relations: [
          'taker',
          'furniture',
          'furniture.furnitureCategory',
          'furniture.furnitureCategory.studyLevel',
        ],
      }),
    );
  }

  paginateAll(
    options: IPaginationOptions,
  ): Observable<Pagination<FurnitureToTaker>> {
    return from(
      paginate<FurnitureToTaker>(this.furnitureToTakerRepository, options, {
        relations: ['author'],
      }),
    ).pipe(
      map(
        (furnitureToTakers: Pagination<FurnitureToTaker>) => furnitureToTakers,
      ),
    );
  }

  paginateByUser(userId: number): Observable<FurnitureToTaker[]> {
    {
      return from(
        this.furnitureToTakerRepository.find({
          relations: ['author'],
          where: { taker: { id: userId } },
        }),
      ).pipe(map((furnitureToTakers: FurnitureToTaker[]) => furnitureToTakers));
    }
  }

  findOne(id: number): Observable<FurnitureToTaker> {
    return from(
      this.furnitureToTakerRepository.findOne({
        where: {
          id: id,
        },
        relations: ['author'],
      }),
    );
  }

  findByUser(userId: number): Observable<FurnitureToTaker[]> {
    return from(
      this.furnitureToTakerRepository.find({
        where: {
          taker: { id: userId },
        },
      }),
    ).pipe(map((furnitureToTakers: FurnitureToTaker[]) => furnitureToTakers));
  }

  updateOne(
    id: number,
    furnitureToTaker: FurnitureToTaker,
  ): Observable<FurnitureToTaker> {
    return from(
      this.furnitureToTakerRepository.update(id, furnitureToTaker),
    ).pipe(switchMap(() => this.findOne(id)));
  }

  deleteOne(id: number): Observable<any> {
    return from(this.furnitureToTakerRepository.delete(id));
  }

  generateSlug(title: string): Observable<string> {
    return of(slugify(title));
  }
}
