import { AppAction } from '../../interfaces/app-action.interface';
import { OPEN_EDIT_TODO, REMOVE_EDIT_TODO } from './edit-todo.actions';

export const editTaskReducer = (state:string = '', action:AppAction):string => {
    switch(action.type) {
        case OPEN_EDIT_TODO:
            return action.payload
        case REMOVE_EDIT_TODO:
            return action.payload;
        default:
            return state;

    }
}