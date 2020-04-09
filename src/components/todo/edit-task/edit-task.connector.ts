import { Category } from './../../../interfaces/category';
import { Todo, FormTodo } from '../../../interfaces/todo.interface';

export interface EditTaskProps {
    todo:Todo;
    categories:Category[];
    performEdit: (todo:FormTodo) => void;
    closeEditTask: () => void;
}