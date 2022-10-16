import { AppState } from '../app.state';
import { getFurnitureRequests } from './furnitureRequest.selector';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  addFurnitureRequest,
  addFurnitureRequestSuccess,
  deleteFurnitureRequest,
  deleteFurnitureRequestSuccess,
  loadFurnitureRequests,
  loadFurnitureRequestsSuccess,
  updateFurnitureRequest,
  updateFurnitureRequestSuccess,
} from './furnitureRequest.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { dummyAction } from 'src/app/@core/state/auth/auth.actions';
import { FurnitureRequest } from '../../models/furnitureRequest.interface';
import { FurnitureRequestService } from '../../services/furnitureRequest/furnitureRequest.service';

@Injectable()
export class FurnitureRequestsEffects {
  constructor(private actions$: Actions, private furnitureRequestsService: FurnitureRequestService, private store: Store<AppState>) {}

  loadFurnitureRequests$ = createEffect(() => {
    console.log('1');
    return this.actions$.pipe(
      ofType(loadFurnitureRequests),
      withLatestFrom(this.store.select(getFurnitureRequests)),
      mergeMap(([action, furnitureRequests]) => {
        console.log('2');
        if (!furnitureRequests.length || furnitureRequests.length === 1) {
          return this.furnitureRequestsService.indexAll().pipe(
            map((furnitureRequests: FurnitureRequest[]) => {
              console.log(furnitureRequests);
              return loadFurnitureRequestsSuccess({ furnitureRequests });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });

  addFurnitureRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addFurnitureRequest),
      mergeMap((action) => {
        console.log('this is the sent', action.furnitureRequest);
        return this.furnitureRequestsService.addFurnitureRequest(action.furnitureRequest).pipe(
          map((data) => {
            const furnitureRequest = { ...action.furnitureRequest };
            return addFurnitureRequestSuccess({ furnitureRequest: data });
          })
        );
      })
    );
  });

  updateFurnitureRequest$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateFurnitureRequest),
      switchMap((action) => {
        return this.furnitureRequestsService
          .updateFurnitureRequest(action.furnitureRequest, action.furnitureRequestId, action.categoryId)
          .pipe(
            map((data) => {
              const updatedFurnitureRequest: Update<FurnitureRequest> = {
                id: action.furnitureRequest.id ? action.furnitureRequest.id : 0,
                changes: {
                  ...action.furnitureRequest,
                },
              };
              return updateFurnitureRequestSuccess({ furnitureRequest: updatedFurnitureRequest });
            })
          );
      })
    );
  });
  // deleteFurnitureRequest$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(deleteFurnitureRequest),
  //     switchMap((action) => {
  //       return this.furnitureRequestsService.deleteFurnitureRequest(action.id).pipe(
  //         map((data) => {
  //           return deleteFurnitureRequestSuccess({ id: action.id });
  //         })
  //       );
  //     })
  //   );
  // });

  // getSingleFurnitureRequest$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(ROUTER_NAVIGATION),
  //     filter((r: RouterNavigatedAction) => {
  //       return r.payload.routerState.url.startsWith('/furnitureRequests/details');
  //     }),
  //     map((r: RouterNavigatedAction) => {
  //       return r.payload.routerState['params']['id'];
  //     }),
  //     withLatestFrom(this.store.select(getFurnitureRequests)),
  //     switchMap(([id, furnitureRequests]) => {
  //       if (!furnitureRequests.length) {
  //         return this.furnitureRequestsService.getFurnitureRequestById(id).pipe(
  //           map((furnitureRequest: FurnitureRequest) => {
  //             const furnitureRequestData = [{ ...furnitureRequest, id }];
  //             return loadFurnitureRequestsSuccess({ furnitureRequests: furnitureRequestData });
  //           })
  //         );
  //       }
  //       return of(dummyAction());
  //     })
  //   );
  // });
}
