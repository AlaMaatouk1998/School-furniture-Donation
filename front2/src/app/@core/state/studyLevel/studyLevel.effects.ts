import { AppState } from '../app.state';
import { getStudyLevels } from './studyLevel.selector';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  addStudyLevel,
  addStudyLevelSuccess,
  deleteStudyLevel,
  deleteStudyLevelSuccess,
  loadStudyLevels,
  loadStudyLevelsSuccess,
  updateStudyLevel,
  updateStudyLevelSuccess,
} from './studyLevel.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { dummyAction } from 'src/app/@core/state/auth/auth.actions';
import { StudyLevel } from '../../models/studyLevel.interface';
import { StudyLevelService } from '../../services/studyLevel/studyLevel.service';

@Injectable()
export class StudyLevelsEffects {
  constructor(private actions$: Actions, private studyLevelsService: StudyLevelService, private store: Store<AppState>) {}

  loadStudyLevels$ = createEffect(() => {
    console.log('1');
    return this.actions$.pipe(
      ofType(loadStudyLevels),
      withLatestFrom(this.store.select(getStudyLevels)),
      mergeMap(([action, studyLevels]) => {
        console.log('2');
        if (!studyLevels.length || studyLevels.length === 1) {
          return this.studyLevelsService.indexAll().pipe(
            map((studyLevels: StudyLevel[]) => {
              console.log(studyLevels);
              return loadStudyLevelsSuccess({ studyLevels });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });

  // addStudyLevel$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(addStudyLevel),
  //     mergeMap((action) => {
  //       return this.studyLevelsService.addStudyLevel(action.studyLevel).pipe(
  //         map((data) => {
  //           const studyLevel = { ...action.studyLevel, id: data.name };
  //           return addStudyLevelSuccess({ studyLevel });
  //         })
  //       );
  //     })
  //   );
  // });

  // updateStudyLevel$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(updateStudyLevel),
  //     switchMap((action) => {
  //       return this.studyLevelsService.updateStudyLevel(action.studyLevel).pipe(
  //         map((data) => {
  //           const updatedStudyLevel: Update<StudyLevel> = {
  //             id: action.studyLevel.id ? action.studyLevel.id : 0,
  //             changes: {
  //               ...action.studyLevel,
  //             },
  //           };
  //           return updateStudyLevelSuccess({ studyLevel: updatedStudyLevel });
  //         })
  //       );
  //     })
  //   );
  // });
  // deleteStudyLevel$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(deleteStudyLevel),
  //     switchMap((action) => {
  //       return this.studyLevelsService.deleteStudyLevel(action.id).pipe(
  //         map((data) => {
  //           return deleteStudyLevelSuccess({ id: action.id });
  //         })
  //       );
  //     })
  //   );
  // });

  // getSingleStudyLevel$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ROUTER_NAVIGATION),
  //     filter((r: RouterNavigatedAction) => {
  //       return r.payload.routerState.url.startsWith('/studyLevels/details');
  //     }),
  //     map((r: RouterNavigatedAction) => {
  //       return r.payload.routerState['params']['id'];
  //     }),
  //     withLatestFrom(this.store.select(getStudyLevels)),
  //     switchMap(([id, studyLevels]) => {
  //       if (!studyLevels.length) {
  //         return this.studyLevelsService.getStudyLevelById(id).pipe(
  //           map((studyLevel: StudyLevel) => {
  //             const studyLevelData = [{ ...studyLevel, id }];
  //             return loadStudyLevelsSuccess({ studyLevels: studyLevelData });
  //           })
  //         );
  //       }
  //       return of(dummyAction());
  //     })
  //   );
  // });
}
