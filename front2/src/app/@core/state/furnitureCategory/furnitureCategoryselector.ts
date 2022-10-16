import { createFeatureSelector, createSelector } from '@ngrx/store';
import { furnitureCategoriesAdapter, FurnitureCategoryState } from './furnitureCategory.state';

import { RouterState } from '@angular/router';

export const FURNITURECATEGORY_STATE_NAME = 'furnitureCategories';
const getFurnitureCategoriesState = createFeatureSelector<FurnitureCategoryState>(FURNITURECATEGORY_STATE_NAME);
export const furnitureCategoriesSelectors = furnitureCategoriesAdapter.getSelectors();

export const getFurnitureCategories = createSelector(getFurnitureCategoriesState, furnitureCategoriesSelectors.selectAll);
export const getFurnitureCategoryEntities = createSelector(getFurnitureCategoriesState, furnitureCategoriesSelectors.selectEntities);

// export const getFurnitureCategoryById = createSelector(getFurnitureCategoryEntities, getCurrentRoute, (furnitureCategories, route: RouterStateUrl) => {
//   return furnitureCategories ? furnitureCategories[route.params['id']] : null;
// });

export const getCount = createSelector(getFurnitureCategoriesState, (state) => state.count);
