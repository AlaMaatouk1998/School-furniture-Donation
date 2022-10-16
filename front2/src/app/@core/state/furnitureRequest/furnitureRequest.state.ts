import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { FurnitureRequest } from '../../models/furnitureRequest.interface';

// kkkkkkkkkkkkkkkkkkkkk
export interface FurnitureRequestState extends EntityState<FurnitureRequest> {
  count: number;
}

export const furnitureRequestsAdapter = createEntityAdapter<FurnitureRequest>({
  sortComparer: sortByName,
});

export const initialState: FurnitureRequestState = furnitureRequestsAdapter.getInitialState({
  count: 0,
});

export function sortByName(a: FurnitureRequest, b: FurnitureRequest): number {
  if (a.quantity && b.quantity) {
    const compare = a.quantity > b.quantity;
    if (!compare) {
      return -1;
    }

    if (compare) {
      return 1;
    }

    return compare;
  } else return 0;
}
