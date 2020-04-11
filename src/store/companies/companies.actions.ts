import { AppAction } from '../../interfaces/app-action.interface';
import { Company } from '../../interfaces/interviews.interface';

export const INIT_COMPANIES = 'INIT_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';

export const initCompanies = (companies:Company[]):AppAction => {
    return {
        type: INIT_COMPANIES,
        payload: companies
    }
}
