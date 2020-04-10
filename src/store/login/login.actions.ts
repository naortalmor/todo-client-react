import { User } from './../../interfaces/user';
import { AppAction } from '../../interfaces/app-action.interface';

export const INIT_USER = 'INIT_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const initUser = (user:User):AppAction => {
    return {
        type: INIT_USER,
        payload: user
    }
}

export const removeUser = ():AppAction => {
    return {
        type: REMOVE_USER,
        payload: {}
    }
}