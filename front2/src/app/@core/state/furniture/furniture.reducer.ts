import { User } from 'src/app/@core/models/user.model';
import {
  deleteFurniture,
  updateFurniture,
  loadFurnituresSuccess,
  addFurnitureSuccess,
  updateFurnitureSuccess,
  deleteFurnitureSuccess,
} from './furniture.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState, furnituresAdapter } from './furniture.state';

export const furnitureReducer = createReducer(
  initialState,
  on(addFurnitureSuccess, (state, action) => {
    return furnituresAdapter.addOne(action.furniture, {
      ...state,
      count: state.count + 1,
    });
  }),
  on(updateFurnitureSuccess, (state, action) => {
    return furnituresAdapter.updateOne(action.furniture, state);
  }),
  on(deleteFurnitureSuccess, (state, { id }) => {
    return furnituresAdapter.removeOne(id, state);
  }),
  on(loadFurnituresSuccess, (state, action) => {
    return furnituresAdapter.setAll(action.furnitures, {
      ...state,
      count: state.count + 1,
    });
  })
);
