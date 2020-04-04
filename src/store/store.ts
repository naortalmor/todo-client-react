import { Todo } from './../interfaces/todo.interface';
import { createStore } from 'redux';
import reducer from './reducers';

export interface AppState {
    todos: Todo[]
}

const initialState:AppState = {
    todos: []
}

const store = createStore(reducer, initialState);

export default store;