import { createFeatureSelector, createSelector } from '@ngrx/store';
import { furnituresAdapter, FurnitureState } from './furniture.state';

import { RouterState } from '@angular/router';

export const FURNITURE_STATE_NAME = 'furnitures';
const getFurnituresState = createFeatureSelector<FurnitureState>(FURNITURE_STATE_NAME);
export const furnituresSelectors = furnituresAdapter.getSelectors();

export const getFurnitures = createSelector(getFurnituresState, furnituresSelectors.selectAll);
export const getFurnitureEntities = createSelector(getFurnituresState, furnituresSelectors.selectEntities);

// export const getFurnitureById = createSelector(getFurnitureEntities, getCurrentRoute, (furnitures, route: RouterStateUrl) => {
//   return furnitures ? furnitures[route.params['id']] : null;
// });

export const getCount = createSelector(getFurnituresState, (state) => state.count);
