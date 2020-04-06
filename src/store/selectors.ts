import { Todo } from './../interfaces/todo.interface';
import { AppState } from './store';
import { SortFields } from '../consts/enums';

export const getSortedTodos = (store:AppState): Todo[] => {
    const sortField:string = store.todoSortField;

    switch(sortField) {
        case SortFields.DUE_DATE:
            return store.todos.sort((first:Todo, second:Todo) => first.due_date.getDate() > second.due_date.getDate() ? 1 : -1)
        case SortFields.IS_DONE:
            return store.todos.sort((first:Todo, second:Todo) => first.is_done && !second.is_done ? -1 : 1)
        default:
            return store.todos;
    }
}