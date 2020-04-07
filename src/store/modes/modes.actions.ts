import { AppAction } from '../../interfaces/app-action.interface';
export const CHANGE_MODE = 'CHANGE_MODE';

export function changeMode(newModeId:number):AppAction {
    return {
        type: CHANGE_MODE,
        payload: newModeId
    }
}