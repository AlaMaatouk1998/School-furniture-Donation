import { AppState } from '../app.state';
import { getFurnitures } from './furniture.selector';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  addFurniture,
  addFurnitureSuccess,
  deleteFurniture,
  deleteFurnitureSuccess,
  loadFurnitures,
  loadFurnituresSuccess,
  updateFurniture,
  updateFurnitureSuccess,
} from './furniture.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { dummyAction } from 'src/app/@core/state/auth/auth.actions';
import { Furniture } from '../../models/furniture.interface';
import { FurnitureService } from '../../services/furniture/furniture.service';

@Injectable()
export class FurnituresEffects {
  constructor(private actions$: Actions, private furnituresService: FurnitureService, private store: Store<AppState>) {}

  loadFurnitures$ = createEffect(() => {
    console.log('1');
    return this.actions$.pipe(
      ofType(loadFurnitures),
      withLatestFrom(this.store.select(getFurnitures)),
      mergeMap(([action, furnitures]) => {
        console.log('2');
        if (!furnitures.length || furnitures.length === 1) {
          return this.furnituresService.indexAll().pipe(
            map((furnitures: Furniture[]) => {
              console.log(furnitures);
              return loadFurnituresSuccess({ furnitures });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });

  addFurniture$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addFurniture),
      mergeMap((action) => {
        return this.furnituresService.addFurniture(action.furniture, action.categoryId).pipe(
          map((data) => {
            const furniture = { ...action.furniture, id: data.title };
            return addFurnitureSuccess({ furniture: data });
          })
        );
      })
    );
  });

  updateFurniture$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateFurniture),
      switchMap((action) => {
        return this.furnituresService.updateFurniture(action.furniture, action.furnitureId, action.categoryId).pipe(
          map((data) => {
            const updatedFurniture: Update<Furniture> = {
              id: action.furniture.id ? action.furniture.id : 0,
              changes: {
                ...action.furniture,
              },
            };
            return updateFurnitureSuccess({ furniture: updatedFurniture });
          })
        );
      })
    );
  });
  // deleteFurniture$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(deleteFurniture),
  //     switchMap((action) => {
  //       return this.furnituresService.deleteFurniture(action.id).pipe(
  //         map((data) => {
  //           return deleteFurnitureSuccess({ id: action.id });
  //         })
  //       );
  //     })
  //   );
  // });

  // getSingleFurniture$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ROUTER_NAVIGATION),
  //     filter((r: RouterNavigatedAction) => {
  //       return r.payload.routerState.url.startsWith('/furnitures/details');
  //     }),
  //     map((r: RouterNavigatedAction) => {
  //       return r.payload.routerState['params']['id'];
  //     }),
  //     withLatestFrom(this.store.select(getFurnitures)),
  //     switchMap(([id, furnitures]) => {
  //       if (!furnitures.length) {
  //         return this.furnituresService.getFurnitureById(id).pipe(
  //           map((furniture: Furniture) => {
  //             const furnitureData = [{ ...furniture, id }];
  //             return loadFurnituresSuccess({ furnitures: furnitureData });
  //           })
  //         );
  //       }
  //       return of(dummyAction());
  //     })
  //   );
  // });
}
