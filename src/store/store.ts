import { Todo } from './../interfaces/todo.interface';
import { createStore } from 'redux';
import reducer from './reducers';
import { Modes } from '../consts/enums';
import { Category } from '../interfaces/category';

export interface AppState {
    todos: Todo[];
    categories:Category[];
    selectedModeIndex: number;
    todoSortField:string;
    todoToEditId:string;
}

const initialState:AppState = {
    todos: [],
    categories: [],
    selectedModeIndex: Modes.TODO,
    todoSortField: 'due_date',
    todoToEditId: ''
}

const store = createStore(reducer, initialState);

export default store;