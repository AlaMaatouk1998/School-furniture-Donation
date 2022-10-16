import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { StudyLevel } from '../../models/studyLevel.interface';

// kkkkkkkkkkkkkkkkkkkkk
export interface StudyLevelState extends EntityState<StudyLevel> {
  count: number;
}

export const studyLevelsAdapter = createEntityAdapter<StudyLevel>({
  sortComparer: sortByName,
});

export const initialState: StudyLevelState = studyLevelsAdapter.getInitialState({
  count: 0,
});

export function sortByName(a: StudyLevel, b: StudyLevel): number {
  if (a.school && b.school) {
    const compare = a.school.localeCompare(b.school);
    if (compare > 0) {
      return -1;
    }

    if (compare < 0) {
      return 1;
    }

    return compare;
  } else return 0;
}
