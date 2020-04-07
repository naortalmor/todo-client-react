import { Todo } from './../../../interfaces/todo.interface';
import { createStyles, withStyles, Theme } from '@material-ui/core';
import { TodoComponent } from './todo.component';

export interface TodoProps {
    todo:Todo;
    toggleTaskStatus:() => void;
    removeTask: () => void;
    editTask: () => void;
    classes:any;
}

const styles = (theme:Theme) => createStyles({
    bad: {
        backgroundColor: '#ffcdd2'
    },
    med: {
        backgroundColor: '#ffecb3'
    },
    ok: {
        backgroundColor: '#c8e6c9'
    }
})

export default withStyles(styles, {withTheme: true})(TodoComponent)