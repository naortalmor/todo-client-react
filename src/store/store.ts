import { User } from './../interfaces/user';
import { Todo } from './../interfaces/todo.interface';
import { createStore } from 'redux';
import reducer from './reducers';
import { Category } from '../interfaces/category';
import { Company, Interview, InterviewQuestion } from '../interfaces/interviews.interface';

export interface AppState {
    todos: Todo[];
    user:User;
    categories:Category[];
    companies:Company[];
    interviews:Interview[];
    interviewQuestions:InterviewQuestion[];
    selectedModeIndex: number;
    todoSortField:string;
    todoToEditId:string;
}

const store = createStore(reducer);

export default store;