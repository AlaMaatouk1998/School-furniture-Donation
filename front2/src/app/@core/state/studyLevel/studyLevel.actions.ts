import { User } from 'src/app/@core/models/user.model';
import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { StudyLevel } from '../../models/studyLevel.interface';

export const ADD_FURNITURE_ACTION = '[studyLevels page] add studyLevel';
export const ADD_FURNITURE_SUCCESS = '[studyLevels page] add studyLevel success';
export const UPDATE_FURNITURE_ACTION = '[studyLevels page] update studyLevel';
export const UPDATE_FURNITURE_SUCCESS = '[studyLevels page] update studyLevel success';
export const DELETE_FURNITURE_ACTION = '[studyLevels page] delete studyLevel';
export const DELETE_FURNITURE_SUCCESS = '[studyLevels page] delete studyLevel success';
export const LOAD_FURNITURES = '[studyLevels page] load studyLevels';
export const LOAD_FURNITURES_SUCCESS = '[studyLevels page] load studyLevels success';

export const addStudyLevel = createAction(ADD_FURNITURE_ACTION, props<{ studyLevel: StudyLevel }>());
export const addStudyLevelSuccess = createAction(ADD_FURNITURE_SUCCESS, props<{ studyLevel: StudyLevel }>());
export const updateStudyLevel = createAction(UPDATE_FURNITURE_ACTION, props<{ studyLevel: StudyLevel }>());

export const updateStudyLevelSuccess = createAction(UPDATE_FURNITURE_SUCCESS, props<{ studyLevel: Update<StudyLevel> }>());

export const deleteStudyLevel = createAction(DELETE_FURNITURE_ACTION, props<{ id: string }>());
export const deleteStudyLevelSuccess = createAction(DELETE_FURNITURE_SUCCESS, props<{ id: string }>());

export const loadStudyLevels = createAction(LOAD_FURNITURES);
export const loadStudyLevelsSuccess = createAction(LOAD_FURNITURES_SUCCESS, props<{ studyLevels: StudyLevel[] }>());
