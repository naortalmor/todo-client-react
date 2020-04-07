import { Todo, FormTodo } from '../../../interfaces/todo.interface';

export interface EditTaskProps {
    todo:Todo;
    performEdit: (todo:FormTodo) => void;
    closeEditTask: () => void;
}