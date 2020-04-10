import { Category } from '../../interfaces/category';
import { AppAction } from '../../interfaces/app-action.interface';
import { INIT_CATEGORIES, ADD_CATEGORY } from './categories.actions';

export const categoriesReducer = (state:Category[] = [], action: AppAction):Category[] => {
    switch(action.type) {
        case INIT_CATEGORIES:
            return action.payload;
        case ADD_CATEGORY:
            return [...state, action.payload];
        default:
            return state;
    }
}