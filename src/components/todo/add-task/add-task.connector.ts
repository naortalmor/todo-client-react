import { FormTodo } from '../../../interfaces/todo.interface';

export interface AddTaskProps {
    addTask: (newTask:FormTodo) => void;
    closeAddTask: () => void;
}