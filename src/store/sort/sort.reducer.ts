import { AppAction } from '../../interfaces/app-action.interface';
import { CHANGE_SORT_FIELD } from './sort.actions';

export const sortFieldReducer = (state:string = 'due_date', action:AppAction):string => {
    if(action.type === CHANGE_SORT_FIELD) {
        return action.payload
    } else {
        return state;
    }
}