import { User } from 'src/app/@core/models/user.model';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { FurnitureCategory } from '../../models/furnitureCategory.interface';

export const ADD_FURNITURECATEGORY_ACTION = '[furniturecategories page] add furniture';
export const ADD_FURNITURECATEGORY_SUCCESS = '[furniturecategories page] add furniture success';
export const UPDATE_FURNITURECATEGORY_ACTION = '[furniturecategories page] update furniture';
export const UPDATE_FURNITURECATEGORY_SUCCESS = '[furniturecategories page] update furniture success';
export const DELETE_FURNITURECATEGORY_ACTION = '[furniturecategories page] delete furniture';
export const DELETE_FURNITURECATEGORY_SUCCESS = '[furniturecategories page] delete furniture success';
export const LOAD_FURNITURECATEGORIES = '[furniturecategories page] load furniturecategories';
export const LOAD_FURNITURECATEGORIES_SUCCESS = '[furniturecategories page] load furniturecategories success';

export const addFurnitureCategory = createAction(ADD_FURNITURECATEGORY_ACTION, props<{ furnitureCategory: FurnitureCategory }>());
export const addFurnitureCategorySuccess = createAction(ADD_FURNITURECATEGORY_SUCCESS, props<{ furnitureCategory: FurnitureCategory }>());
export const updateFurnitureCategory = createAction(UPDATE_FURNITURECATEGORY_ACTION, props<{ furnitureCategory: FurnitureCategory }>());

export const updateFurnitureCategorySuccess = createAction(
  UPDATE_FURNITURECATEGORY_SUCCESS,
  props<{ furnitureCategory: Update<FurnitureCategory> }>()
);

export const deleteFurnitureCategory = createAction(DELETE_FURNITURECATEGORY_ACTION, props<{ id: string }>());
export const deleteFurnitureCategorySuccess = createAction(DELETE_FURNITURECATEGORY_SUCCESS, props<{ id: string }>());

export const loadFurnitureCategories = createAction(LOAD_FURNITURECATEGORIES);
export const loadFurnitureCategoriesSuccess = createAction(
  LOAD_FURNITURECATEGORIES_SUCCESS,
  props<{ furnitureCategories: FurnitureCategory[] }>()
);
