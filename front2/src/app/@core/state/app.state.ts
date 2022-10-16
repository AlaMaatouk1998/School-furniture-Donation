import { AUTH_STATE_NAME } from 'src/app/@core/state/auth/auth.selector';
import { SharedState } from './shared/shared.state';
import { SHARED_STATE_NAME } from './shared/shared.selector';
import { SharedReducer } from './shared/shared.reducer';
import { authReducer } from 'src/app/@core/state/auth/auth.reducer';
import { AuthState } from 'src/app/@core/state/auth/auth.state';
import { FurnitureState } from './furniture/furniture.state';
import { furnitureReducer } from './furniture/furniture.reducer';
import { FURNITURE_STATE_NAME } from './furniture/furniture.selector';
import { studyLevelReducer } from './studyLevel/studyLevel.reducer';
import { furnitureCategoryReducer } from './furnitureCategory/furnitureCategory.reducer';
import { STUDYLEVEL_STATE_NAME } from './studyLevel/studyLevel.selector';
import { FURNITURECATEGORY_STATE_NAME } from './furnitureCategory/furnitureCategoryselector';
import { StudyLevelState } from './studyLevel/studyLevel.state';
import { FurnitureCategoryState } from './furnitureCategory/furnitureCategory.state';
import { FURNITUREREQUEST_STATE_NAME } from './furnitureRequest/furnitureRequest.selector';
import { FurnitureRequestState } from './furnitureRequest/furnitureRequest.state';
import { furnitureRequestReducer } from './furnitureRequest/furnitureRequest.reducer';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  [FURNITURE_STATE_NAME]: FurnitureState;
  [FURNITUREREQUEST_STATE_NAME]: FurnitureRequestState;
  [FURNITURECATEGORY_STATE_NAME]: FurnitureCategoryState;
  [STUDYLEVEL_STATE_NAME]: StudyLevelState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: authReducer,
  [FURNITURE_STATE_NAME]: furnitureReducer,
  [FURNITUREREQUEST_STATE_NAME]: furnitureRequestReducer,
  [FURNITURECATEGORY_STATE_NAME]: furnitureCategoryReducer,
  [STUDYLEVEL_STATE_NAME]: studyLevelReducer,
};
