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
import { StudyLevel } from '../model/studyLevel.interface';
import { StudyLevelEntity } from '../model/studyLevel.entity';
const slugify = require('slugify');

@Injectable()
export class StudyLevelService {
  constructor(
    @InjectRepository(StudyLevelEntity)
    private readonly studyLevelRepository: Repository<StudyLevelEntity>,
  ) {}

  create(studyLevel: StudyLevel): Observable<StudyLevel> {
    // studyLevel.author = user;
    // console.log(studyLevel);
    // return this.generateSlug(studyLevel.title).pipe(
    //   switchMap((slug: string) => {
    //     studyLevel.slug = slug;
    //     return from(this.studyLevelRepository.save(studyLevel));
    //   }),
    // );
    return from(this.studyLevelRepository.save(studyLevel));
  }

  findAll(): Observable<StudyLevel[]> {
    return from(this.studyLevelRepository.find());
  }

  paginateAll(options: IPaginationOptions): Observable<Pagination<StudyLevel>> {
    return from(paginate<StudyLevel>(this.studyLevelRepository, options)).pipe(
      map((studyLevels: Pagination<StudyLevel>) => studyLevels),
    );
  }

  // paginateByUser(userId: number): Observable<StudyLevel[]> {
  //   {
  //     return from(
  //       this.studyLevelRepository.find({
  //         relations: ['author'],
  //         where: { author: { id: userId } },
  //       }),
  //     ).pipe(map((studyLevels: StudyLevel[]) => studyLevels));
  //   }
  // }

  findOne(id: number): Observable<StudyLevel> {
    return from(
      this.studyLevelRepository.findOne({
        where: {
          id: id,
        },
      }),
    );
  }

  // findByUser(userId: number): Observable<StudyLevel[]> {
  //   return from(
  //     this.studyLevelRepository.find({
  //       where: {
  //         author: { id: userId },
  //       },
  //       relations: ['author'],
  //     }),
  //   ).pipe(map((studyLevels: StudyLevel[]) => studyLevels));
  // }

  // updateOne(id: number, studyLevel: StudyLevel): Observable<StudyLevel> {
  //   return from(this.studyLevelRepository.update(id, studyLevel)).pipe(
  //     switchMap(() => this.findOne(id)),
  //   );
  // }

  // deleteOne(id: number): Observable<any> {
  //   return from(this.studyLevelRepository.delete(id));
  // }

  // generateSlug(title: string): Observable<string> {
  //   return of(slugify(title));
  // }
}
