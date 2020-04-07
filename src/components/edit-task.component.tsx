import React from 'react';
import { Todo, EditToDo } from '../interfaces/todo.interface';
import TextField from '@material-ui/core/TextField';
import { Dialog, DialogTitle, DialogContent, DialogActions, Theme, createStyles, withStyles, Button } from '@material-ui/core';

interface EditTaskProps {
    todo:Todo;
    performEdit: (todo:EditToDo) => void;
    closeEditTask: () => void;
    classes:any;
}

interface EditTaskState {
    editedTodo:EditToDo
}

export class EditTaskComponent extends React.Component<EditTaskProps, EditTaskState> {
    constructor(props:EditTaskProps) {
        super(props);
        this.state = {
            editedTodo: {
                ...props.todo,
                due_date: this.props.todo.due_date.toISOString().slice(0,10),
                creation_date: this.props.todo.creation_date.toISOString().slice(0,10),
            }
        }

        this.handleChanges = this.handleChanges.bind(this);
        this.getIfSaveDisabled = this.getIfSaveDisabled.bind(this);
    }

    render() {
        return (
            <Dialog fullWidth={true} maxWidth="xs" open={true} onClose={() => this.props.closeEditTask()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Todo Task</DialogTitle>
                <DialogContent>
                    <form className={this.props.classes.form}>
                        <TextField id="header"
                                label="Header" 
                                onChange={this.handleChanges} 
                                value={this.state.editedTodo.header}>
                        </TextField>
                        <TextField id="description" 
                                label="Description" 
                                onChange={this.handleChanges} 
                                value={this.state.editedTodo.description}>
                        </TextField>
                        <TextField id="due_date" 
                                   label="Due date" 
                                   type="date"
                                   InputLabelProps={{shrink:true}}
                                   value={this.state.editedTodo.due_date} 
                                   onChange={this.handleChanges} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.closeEditTask()} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.props.performEdit(this.state.editedTodo)} color="primary" disabled={this.getIfSaveDisabled()}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    handleChanges(event:any) {
        const target = event.target;
        const id = target.id;
        let value = target.value;

        this.setState((state, props) => ({
            editedTodo: {
                ...state.editedTodo,
                [id]: value
            }
        }))
    }

    private getIfSaveDisabled():boolean {
        return this.state.editedTodo.description === '' || this.state.editedTodo.header === '' || this.state.editedTodo.due_date === '';
    }
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

export default withStyles(styles, {withTheme: true})(EditTaskComponent)