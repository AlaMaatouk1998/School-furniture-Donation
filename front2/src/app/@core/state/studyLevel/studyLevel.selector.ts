import { createFeatureSelector, createSelector } from '@ngrx/store';
import { studyLevelsAdapter, StudyLevelState } from './studyLevel.state';

import { RouterState } from '@angular/router';

export const STUDYLEVEL_STATE_NAME = 'studyLevels';
const getStudyLevelsState = createFeatureSelector<StudyLevelState>(STUDYLEVEL_STATE_NAME);
export const studyLevelsSelectors = studyLevelsAdapter.getSelectors();

export const getStudyLevels = createSelector(getStudyLevelsState, studyLevelsSelectors.selectAll);
export const getStudyLevelEntities = createSelector(getStudyLevelsState, studyLevelsSelectors.selectEntities);

// export const getStudyLevelById = createSelector(getStudyLevelEntities, getCurrentRoute, (studyLevels, route: RouterStateUrl) => {
//   return studyLevels ? studyLevels[route.params['id']] : null;
// });

export const getCount = createSelector(getStudyLevelsState, (state) => state.count);
