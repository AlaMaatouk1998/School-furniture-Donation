import { User } from 'src/app/@core/models/user.model';
import { createAction, props } from '@ngrx/store';
import { Furniture } from '../../models/furniture.interface';
import { Update } from '@ngrx/entity';

export const ADD_FURNITURE_ACTION = '[furnitures page] add furniture';
export const ADD_FURNITURE_SUCCESS = '[furnitures page] add furniture success';
export const UPDATE_FURNITURE_ACTION = '[furnitures page] update furniture';
export const UPDATE_FURNITURE_SUCCESS = '[furnitures page] update furniture success';
export const DELETE_FURNITURE_ACTION = '[furnitures page] delete furniture';
export const DELETE_FURNITURE_SUCCESS = '[furnitures page] delete furniture success';
export const LOAD_FURNITURES = '[furnitures page] load furnitures';
export const LOAD_FURNITURES_SUCCESS = '[furnitures page] load furnitures success';

export const addFurniture = createAction(ADD_FURNITURE_ACTION, props<{ furniture: Furniture; categoryId: number }>());
export const addFurnitureSuccess = createAction(ADD_FURNITURE_SUCCESS, props<{ furniture: Furniture }>());
export const updateFurniture = createAction(
  UPDATE_FURNITURE_ACTION,
  props<{ furniture: Furniture; furnitureId: number; categoryId: number }>()
);

export const updateFurnitureSuccess = createAction(UPDATE_FURNITURE_SUCCESS, props<{ furniture: Update<Furniture> }>());

export const deleteFurniture = createAction(DELETE_FURNITURE_ACTION, props<{ id: string }>());
export const deleteFurnitureSuccess = createAction(DELETE_FURNITURE_SUCCESS, props<{ id: string }>());

export const loadFurnitures = createAction(LOAD_FURNITURES);
export const loadFurnituresSuccess = createAction(LOAD_FURNITURES_SUCCESS, props<{ furnitures: Furniture[] }>());
