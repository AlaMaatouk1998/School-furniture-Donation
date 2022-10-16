import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { FurnitureCategory } from '../../models/furnitureCategory.interface';

// kkkkkkkkkkkkkkkkkkkkk
export interface FurnitureCategoryState extends EntityState<FurnitureCategory> {
  count: number;
}

export const furnitureCategoriesAdapter = createEntityAdapter<FurnitureCategory>({
  sortComparer: sortByName,
});

export const initialState: FurnitureCategoryState = furnitureCategoriesAdapter.getInitialState({
  count: 0,
});

export function sortByName(a: FurnitureCategory, b: FurnitureCategory): number {
  if (a.name && b.name) {
    const compare = a.name.localeCompare(b.name);
    if (compare > 0) {
      return -1;
    }

    if (compare < 0) {
      return 1;
    }

    return compare;
  } else return 0;
}
