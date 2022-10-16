import { AppState } from '../app.state';
import { getFurnitureCategories } from './furnitureCategoryselector';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  addFurnitureCategory,
  addFurnitureCategorySuccess,
  deleteFurnitureCategory,
  deleteFurnitureCategorySuccess,
  loadFurnitureCategories,
  loadFurnitureCategoriesSuccess,
  updateFurnitureCategory,
  updateFurnitureCategorySuccess,
} from './furnitureCategory.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { dummyAction } from 'src/app/@core/state/auth/auth.actions';
import { FurnitureCategoryService } from '../../services/furnitureCategory/furnitureCategory.service';
import { FurnitureCategory } from '../../models/furnitureCategory.interface';

@Injectable()
export class FurnitureCategoriesEffects {
  constructor(private actions$: Actions, private furnitureCategoriesService: FurnitureCategoryService, private store: Store<AppState>) {}

  loadFurnitureCategories$ = createEffect(() => {
    console.log('1');
    return this.actions$.pipe(
      ofType(loadFurnitureCategories),
      withLatestFrom(this.store.select(getFurnitureCategories)),
      mergeMap(([action, furnitureCategories]) => {
        console.log('2');
        if (!furnitureCategories.length || furnitureCategories.length === 1) {
          return this.furnitureCategoriesService.indexAll().pipe(
            map((furnitureCategories: FurnitureCategory[]) => {
              console.log(furnitureCategories);
              return loadFurnitureCategoriesSuccess({ furnitureCategories });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });

  // addFurnitureCategory$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(addFurnitureCategory),
  //     mergeMap((action) => {
  //       return this.furnitureCategoriesService.addFurnitureCategory(action.furnitureCategory).pipe(
  //         map((data) => {
  //           const furnitureCategory = { ...action.furnitureCategory, id: data.name };
  //           return addFurnitureCategorySuccess({ furnitureCategory });
  //         })
  //       );
  //     })
  //   );
  // });

  // updateFurnitureCategory$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(updateFurnitureCategory),
  //     switchMap((action) => {
  //       return this.furnitureCategoriesService.updateFurnitureCategory(action.furnitureCategory).pipe(
  //         map((data) => {
  //           const updatedFurnitureCategory: Update<FurnitureCategory> = {
  //             id: action.furnitureCategory.id ? action.furnitureCategory.id : 0,
  //             changes: {
  //               ...action.furnitureCategory,
  //             },
  //           };
  //           return updateFurnitureCategorySuccess({ furnitureCategory: updatedFurnitureCategory });
  //         })
  //       );
  //     })
  //   );
  // });
  // deleteFurnitureCategory$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(deleteFurnitureCategory),
  //     switchMap((action) => {
  //       return this.furnitureCategoriesService.deleteFurnitureCategory(action.id).pipe(
  //         map((data) => {
  //           return deleteFurnitureCategorySuccess({ id: action.id });
  //         })
  //       );
  //     })
  //   );
  // });

  // getSingleFurnitureCategory$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ROUTER_NAVIGATION),
  //     filter((r: RouterNavigatedAction) => {
  //       return r.payload.routerState.url.startsWith('/furnitureCategories/details');
  //     }),
  //     map((r: RouterNavigatedAction) => {
  //       return r.payload.routerState['params']['id'];
  //     }),
  //     withLatestFrom(this.store.select(getFurnitureCategoryCategories)),
  //     switchMap(([id, furnitureCategories]) => {
  //       if (!furnitureCategories.length) {
  //         return this.furnitureCategoriesService.getFurnitureCategoryById(id).pipe(
  //           map((furniture: FurnitureCategory) => {
  //             const furnitureData = [{ ...furniture, id }];
  //             return loadFurnitureCategoryCategoriesSuccess({ furnitureCategories: furnitureData });
  //           })
  //         );
  //       }
  //       return of(dummyAction());
  //     })
  //   );
  // });
}
