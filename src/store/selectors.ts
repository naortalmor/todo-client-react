import { Todo } from './../interfaces/todo.interface';
import { SortFields } from '../consts/enums';

export const getSortedTodos = (todos:Todo[], sortField:string): Todo[] => {
    switch(sortField) {
        case SortFields.DUE_DATE:
            return todos.sort((first:Todo, second:Todo) => first.due_date.getDate() > second.due_date.getDate() ? 1 : -1)
        case SortFields.IS_DONE:
            return todos.sort((first:Todo, second:Todo) => first.is_done && !second.is_done ? -1 : 1)
        default:
            return todos;
    }
}

export const getTodoToEdit = (todos:Todo[], todoToEditId:string) => {
    return todos.find((todo:Todo) => todo.id === todoToEditId);
}