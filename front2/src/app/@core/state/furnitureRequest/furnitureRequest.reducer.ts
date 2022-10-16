import { User } from 'src/app/@core/models/user.model';
import {
  deleteFurnitureRequest,
  updateFurnitureRequest,
  loadFurnitureRequestsSuccess,
  addFurnitureRequestSuccess,
  updateFurnitureRequestSuccess,
  deleteFurnitureRequestSuccess,
} from './furnitureRequest.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState, furnitureRequestsAdapter } from './furnitureRequest.state';

export const furnitureRequestReducer = createReducer(
  initialState,
  on(addFurnitureRequestSuccess, (state, action) => {
    return furnitureRequestsAdapter.addOne(action.furnitureRequest, {
      ...state,
      count: state.count + 1,
    });
  }),
  on(updateFurnitureRequestSuccess, (state, action) => {
    return furnitureRequestsAdapter.updateOne(action.furnitureRequest, state);
  }),
  on(deleteFurnitureRequestSuccess, (state, { id }) => {
    return furnitureRequestsAdapter.removeOne(id, state);
  }),
  on(loadFurnitureRequestsSuccess, (state, action) => {
    return furnitureRequestsAdapter.setAll(action.furnitureRequests, {
      ...state,
      count: state.count + 1,
    });
  })
);
