import { AppAction } from '../../interfaces/app-action.interface';
export const CHANGE_SORT_FIELD = 'CHANGE_SORT_FIELD';

export const changeSortField = (newSortField:string):AppAction => {
    return {
        type: CHANGE_SORT_FIELD,
        payload: newSortField
    }
}