import { User } from 'src/app/@core/models/user.model';
import {
  deleteStudyLevel,
  updateStudyLevel,
  loadStudyLevelsSuccess,
  addStudyLevelSuccess,
  updateStudyLevelSuccess,
  deleteStudyLevelSuccess,
} from './studyLevel.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState, studyLevelsAdapter } from './studyLevel.state';

export const studyLevelReducer = createReducer(
  initialState,
  on(addStudyLevelSuccess, (state, action) => {
    return studyLevelsAdapter.addOne(action.studyLevel, {
      ...state,
      count: state.count + 1,
    });
  }),
  on(updateStudyLevelSuccess, (state, action) => {
    return studyLevelsAdapter.updateOne(action.studyLevel, state);
  }),
  on(deleteStudyLevelSuccess, (state, { id }) => {
    return studyLevelsAdapter.removeOne(id, state);
  }),
  on(loadStudyLevelsSuccess, (state, action) => {
    return studyLevelsAdapter.setAll(action.studyLevels, {
      ...state,
      count: state.count + 1,
    });
  })
);
