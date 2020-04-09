import { Category } from './../../../interfaces/category';
import { FormTodo } from '../../../interfaces/todo.interface';

export interface AddTaskProps {
    categories: Category[];
    addTask: (newTask:FormTodo) => void;
    closeAddTask: () => void;
}