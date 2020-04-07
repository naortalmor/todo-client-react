import { AppAction } from '../../interfaces/app-action.interface';

export const OPEN_EDIT_TODO = 'OPEN_EDIT_TODO';
export const REMOVE_EDIT_TODO = 'REMOVE_EDIT_TODO';

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
