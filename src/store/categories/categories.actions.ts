import { Category } from '../../interfaces/category';
import { AppAction } from '../../interfaces/app-action.interface';

export const INIT_CATEGORIES = 'INIT_CATEGORIES';

export const initCatgories = (categories:Category[]):AppAction => {
    return {
        type: INIT_CATEGORIES,
        payload: categories
    }
}