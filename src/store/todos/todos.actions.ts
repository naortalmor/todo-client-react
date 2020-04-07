import { Todo } from './../../interfaces/todo.interface';
import { AppAction } from '../../interfaces/app-action.interface';
export const ADD_TODO = 'ADD_TODO';
export const INIT_TODOS = 'INIT_TODOS';
export const TOGGLE_STATUS = 'TOGGLE_STATUS';
export const REMOVE_TODO = 'REMOVE_TODO';
export const REMOVE_SOME = 'REMOVE_SOME';
export const EDIT_TODO = 'EDIT_TODO';

export const addTodo = (todo:Todo):AppAction => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const initTodos = (todos:Todo[]):AppAction => {
    return {
        type: INIT_TODOS,
        payload: todos
    }
}

export const toggleTodoStatus = (taskId:string):AppAction => {
    return {
        type: TOGGLE_STATUS,
        payload: taskId
    }
}

export const removeTodo = (taskId:string):AppAction => {
    return {
        type: REMOVE_TODO,
        payload: taskId
    }
}

export const removeSome = (tasksIds:string[]):AppAction => {
    return {
        type: REMOVE_SOME,
        payload: tasksIds
    }
}

export const editTodo = (newTodo:Todo):AppAction => {
    return {
        type: EDIT_TODO,
        payload: newTodo
    }
}