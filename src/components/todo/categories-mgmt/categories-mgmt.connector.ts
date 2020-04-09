import { Category } from './../../../interfaces/category';

export interface CategoriesMgmtProps {
    categories:Category[];
    addCategory: (newCategoryName:string) => void;
}

export interface CategoriesMgmtState {
    is_adding: boolean;
    newCategoryName:string;
}
