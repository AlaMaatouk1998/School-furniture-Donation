import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Furniture } from '../../models/furniture.interface';

// kkkkkkkkkkkkkkkkkkkkk
export interface FurnitureState extends EntityState<Furniture> {
  count: number;
}

export const furnituresAdapter = createEntityAdapter<Furniture>({
  sortComparer: sortByName,
});

export const initialState: FurnitureState = furnituresAdapter.getInitialState({
  count: 0,
});

export function sortByName(a: Furniture, b: Furniture): number {
  if (a.title && b.title) {
    const compare = a.title.localeCompare(b.title);
    if (compare > 0) {
      return -1;
    }

    if (compare < 0) {
      return 1;
    }

    return compare;
  } else return 0;
}
