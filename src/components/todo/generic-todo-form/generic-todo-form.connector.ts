import { Theme, createStyles, withStyles } from '@material-ui/core';
import { GenericTodoForm } from './generic-todo-form.component';
import { Todo, FormTodo } from '../../../interfaces/todo.interface';

export interface GenericTodoFormProps {
    todo:Todo;
    classes:any;
    title:string;
    performAction: (newTask:FormTodo) => void;
    close: () => void;
}

const styles = (theme:Theme) => createStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-conent'
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
      }
})

export default withStyles(styles, {withTheme: true})(GenericTodoForm)