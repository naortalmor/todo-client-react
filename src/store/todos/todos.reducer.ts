import { Todo } from './../../interfaces/todo.interface';
import { INIT_TODOS, ADD_TODO, TOGGLE_STATUS, REMOVE_TODO, REMOVE_SOME, EDIT_TODO } from './todos.actions';
import { AppAction } from '../../interfaces/app-action.interface';

export const todosReducer = (state:Todo[] = [], action: AppAction):Todo[] => {
    switch(action.type) {
        case INIT_TODOS:
            return action.payload;
        case ADD_TODO:
            return [...state, action.payload];
        case TOGGLE_STATUS:
            return state.map((todo:Todo) => todo.id === action.payload ? {...todo, is_done: !todo.is_done} : todo)
        case REMOVE_TODO:
            return state.filter((todo:Todo) => todo.id !== action.payload)
        case REMOVE_SOME:
            return state.filter((todo:Todo) => !(action.payload as string[]).includes(todo.id!))
        case EDIT_TODO:
            return state.map((todo:Todo) => todo.id === action.payload.id ? action.payload : todo);
        default:
            return state
    }
}