import { Todo } from './../interfaces/todo.interface';
import { createStore } from 'redux';
import reducer from './reducers';
import { Modes } from '../consts/enums';

export interface AppState {
    todos: Todo[],
    selectedModeIndex: number,
    todoSortField:string;
    todoToEditId:string;
}

const initialState:AppState = {
    todos: [],
    selectedModeIndex: Modes.TODO,
    todoSortField: 'due_date',
    todoToEditId: ''
}

const store = createStore(reducer, initialState);

export default store;