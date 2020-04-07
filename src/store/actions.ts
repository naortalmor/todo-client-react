import { Todo } from './../interfaces/todo.interface';
import { Action } from 'redux';

export const ADD_TODO = 'ADD_TODO';
export const INIT_TODOS = 'INIT_TODOS';
export const TOGGLE_STATUS = 'TOGGLE_STATUS';
export const REMOVE_TODO = 'REMOVE_TODO';
export const REMOVE_SOME = 'REMOVE_SOME';

export const CHANGE_MODE = 'CHANGE_MODE';

export const CHANGE_SORT_FIELD = 'CHANGE_SORT_FIELD';

export const OPEN_EDIT_TODO = 'OPEN_EDIT_TODO';
export const REMOVE_EDIT_TODO = 'REMOVE_EDIT_TODO';
export const EDIT_TODO = 'EDIT_TODO';

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

export function removeSome(tasksIds:string[]):AppAction {
    return {
        type: REMOVE_SOME,
        payload: tasksIds
    }
}

export function changeMode(newModeId:number):AppAction {
    return {
        type: CHANGE_MODE,
        payload: newModeId
    }
}

export function changeSortField(newSortField:string):AppAction {
    return {
        type: CHANGE_SORT_FIELD,
        payload: newSortField
    }
}

export function openEditTodo(taskId:string):AppAction {
    return {
        type: OPEN_EDIT_TODO,
        payload: taskId
    }
}

export function closeEditTodo():AppAction {
    return {
        type: REMOVE_EDIT_TODO,
        payload: ''
    }
}

export function editTodo(newTodo:Todo):AppAction {
    return {
        type: EDIT_TODO,
        payload: newTodo
    }
}

export interface AppAction extends Action {
    payload:any;
}