import { Todo } from './../interfaces/todo.interface';
import { Action } from 'redux';

export const ADD_TODO = 'ADD_TODO';
export const INIT_TODOS = 'INIT_TODOS';
export const TOGGLE_STATUS = 'TOGGLE_STATUS';
export const REMOVE_TODO = 'REMOVE_TODO';

export function addTodo(todo:Todo):AppAction {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export function initTodos(todos:Todo[]):AppAction {
    return {
        type: INIT_TODOS,
        payload: todos
    }
}

export function toggleTodoStatus(taskId:string):AppAction {
    return {
        type: TOGGLE_STATUS,
        payload: taskId
    }
}

export function removeTodo(taskId:string):AppAction {
    return {
        type: REMOVE_TODO,
        payload: taskId
    }
}

export interface AppAction extends Action {
    payload:any;
}