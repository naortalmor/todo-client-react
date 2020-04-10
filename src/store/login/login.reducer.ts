import { User } from './../../interfaces/user';
import { AppAction } from '../../interfaces/app-action.interface';
import { INIT_USER, REMOVE_USER } from './login.actions';

export const usersReducer = (state:User = {}, action:AppAction):User => {
    if(action.type === INIT_USER || action.type === REMOVE_USER) {
        return action.payload
    } else {
        return state
    }
}