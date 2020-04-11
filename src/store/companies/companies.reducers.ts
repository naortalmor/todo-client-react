import { AppAction } from '../../interfaces/app-action.interface';
import { Company } from '../../interfaces/interviews.interface';
import { INIT_COMPANIES } from './companies.actions';

export const companiesReducer = (state:Company[] = [], action: AppAction):Company[] => {
    switch(action.type) {
        case INIT_COMPANIES:
            return action.payload;
        default:
            return state;
    }
}