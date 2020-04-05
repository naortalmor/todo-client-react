import { Todo } from './../interfaces/todo.interface';
import { combineReducers } from 'redux';
import { INIT_TODOS, AppAction, ADD_TODO, TOGGLE_STATUS, REMOVE_TODO, REMOVE_SOME } from './actions';

function todoReducer(state:Todo[] = [], action: AppAction):Todo[] {
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
            return state.filter((todo:Todo) => !(action.payload as string[]).includes(todo.id))
        default:
            return state
    }
}

const reducer = combineReducers({
    todos: todoReducer
})

export default reducer;