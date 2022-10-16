import { createFeatureSelector, createSelector } from '@ngrx/store';
import { furnitureRequestsAdapter, FurnitureRequestState } from './furnitureRequest.state';

import { RouterState } from '@angular/router';

export const FURNITUREREQUEST_STATE_NAME = 'furnitureRequests';
const getFurnitureRequestsState = createFeatureSelector<FurnitureRequestState>(FURNITUREREQUEST_STATE_NAME);
export const furnitureRequestsSelectors = furnitureRequestsAdapter.getSelectors();

export const getFurnitureRequests = createSelector(getFurnitureRequestsState, furnitureRequestsSelectors.selectAll);
export const getFurnitureRequestEntities = createSelector(getFurnitureRequestsState, furnitureRequestsSelectors.selectEntities);

// export const getRequestById = createSelector(getRequestEntities, getCurrentRoute, (furnitureRequests, route: RouterStateUrl) => {
//   return furnitureRequests ? furnitureRequests[route.params['id']] : null;
// });

export const getCount = createSelector(getFurnitureRequestsState, (state) => state.count);
