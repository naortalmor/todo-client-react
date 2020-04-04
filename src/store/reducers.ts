import { Todo } from './../interfaces/todo.interface';
import { combineReducers } from 'redux';
import { INIT_TODOS, AppAction, ADD_TODO, TOGGLE_STATUS, REMOVE_TODO } from './actions';

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
        default:
            return state
    }
}

const reducer = combineReducers({
    todos: todoReducer
})

export default reducer;