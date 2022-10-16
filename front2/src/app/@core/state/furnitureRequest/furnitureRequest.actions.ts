import { User } from 'src/app/@core/models/user.model';
import { createAction, props } from '@ngrx/store';
import { FurnitureRequest } from '../../models/furnitureRequest.interface';
import { Update } from '@ngrx/entity';

export const ADD_FURNITURE_ACTION = '[furnitureRequests page] add furnitureRequest';
export const ADD_FURNITURE_SUCCESS = '[furnitureRequests page] add furnitureRequest success';
export const UPDATE_FURNITURE_ACTION = '[furnitureRequests page] update furnitureRequest';
export const UPDATE_FURNITURE_SUCCESS = '[furnitureRequests page] update furnitureRequest success';
export const DELETE_FURNITURE_ACTION = '[furnitureRequests page] delete furnitureRequest';
export const DELETE_FURNITURE_SUCCESS = '[furnitureRequests page] delete furnitureRequest success';
export const LOAD_FURNITURES = '[furnitureRequests page] load furnitureRequests';
export const LOAD_FURNITURES_SUCCESS = '[furnitureRequests page] load furnitureRequests success';

export const addFurnitureRequest = createAction(ADD_FURNITURE_ACTION, props<{ furnitureRequest: FurnitureRequest }>());
export const addFurnitureRequestSuccess = createAction(ADD_FURNITURE_SUCCESS, props<{ furnitureRequest: FurnitureRequest }>());
export const updateFurnitureRequest = createAction(
  UPDATE_FURNITURE_ACTION,
  props<{ furnitureRequest: FurnitureRequest; furnitureRequestId: number; categoryId: number }>()
);

export const updateFurnitureRequestSuccess = createAction(
  UPDATE_FURNITURE_SUCCESS,
  props<{ furnitureRequest: Update<FurnitureRequest> }>()
);

export const deleteFurnitureRequest = createAction(DELETE_FURNITURE_ACTION, props<{ id: string }>());
export const deleteFurnitureRequestSuccess = createAction(DELETE_FURNITURE_SUCCESS, props<{ id: string }>());

export const loadFurnitureRequests = createAction(LOAD_FURNITURES);
export const loadFurnitureRequestsSuccess = createAction(LOAD_FURNITURES_SUCCESS, props<{ furnitureRequests: FurnitureRequest[] }>());
