import { AppAction } from '../../interfaces/app-action.interface';
import { Modes } from '../../consts/enums';
import { CHANGE_MODE } from './modes.actions';

export const modesReducer = (state:number = Modes.TODO, action:AppAction):number => {
    if(action.type === CHANGE_MODE) {
        return action.payload
    } else {
        return state;
    }
}