import { AppAction } from '../../interfaces/app-action.interface';
import { Interview } from '../../interfaces/interviews.interface';
import { INIT_INTERVIEWS } from './interviews.actions';

export const interviewsReducer = (state:Interview[] = [], action: AppAction):Interview[] => {
    switch(action.type) {
        case INIT_INTERVIEWS:
            return action.payload;
        default:
            return state;
    }
}