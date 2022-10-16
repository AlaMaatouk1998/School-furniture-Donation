import { User } from 'src/app/@core/models/user.model';
import {
  deleteFurnitureCategory,
  updateFurnitureCategory,
  loadFurnitureCategoriesSuccess,
  addFurnitureCategorySuccess,
  updateFurnitureCategorySuccess,
  deleteFurnitureCategorySuccess,
} from './furnitureCategory.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState, furnitureCategoriesAdapter } from './furnitureCategory.state';

export const furnitureCategoryReducer = createReducer(
  initialState,
  on(addFurnitureCategorySuccess, (state, action) => {
    return furnitureCategoriesAdapter.addOne(action.furnitureCategory, {
      ...state,
      count: state.count + 1,
    });
  }),
  on(updateFurnitureCategorySuccess, (state, action) => {
    return furnitureCategoriesAdapter.updateOne(action.furnitureCategory, state);
  }),
  on(deleteFurnitureCategorySuccess, (state, { id }) => {
    return furnitureCategoriesAdapter.removeOne(id, state);
  }),
  on(loadFurnitureCategoriesSuccess, (state, action) => {
    return furnitureCategoriesAdapter.setAll(action.furnitureCategories, {
      ...state,
      count: state.count + 1,
    });
  })
);
