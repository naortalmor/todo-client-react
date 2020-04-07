import React from 'react';
import Button from '@material-ui/core/Button';
import { Todo, FormTodo } from '../interfaces/todo.interface';
import TextField from '@material-ui/core/TextField';
import { Dialog, DialogTitle, DialogContent, DialogActions, Theme, createStyles, withStyles } from '@material-ui/core';

interface GenericTodoFormProps {
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

export class GenericTodoForm extends React.Component<GenericTodoFormProps, {newTodoObj: FormTodo}> {
    constructor(props:GenericTodoFormProps) {
        super(props);
        this.state = {
            newTodoObj: {
                ...props.todo,
                due_date: this.props.todo.due_date.toISOString().slice(0,10),
                creation_date: this.props.todo.creation_date.toISOString().slice(0,10),
            }
        }
        this.submitTask = this.submitTask.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.getIfSaveDisabled = this.getIfSaveDisabled.bind(this);
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog fullWidth={true} maxWidth="xs" open={true} onClose={() => this.props.close()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <form className={classes.form}>
                        <TextField id="header"
                                label="Header" 
                                onChange={this.handleChanges} 
                                value={this.state.newTodoObj.header}>
                        </TextField>
                        <TextField id="description" 
                                label="Description" 
                                onChange={this.handleChanges} 
                                value={this.state.newTodoObj.description}>
                        </TextField>
                        <TextField id="due_date" 
                                   label="Due date" 
                                   type="date"
                                   InputLabelProps={{shrink:true}}
                                   value={this.state.newTodoObj.due_date} 
                                   onChange={this.handleChanges} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.close()} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.submitTask} color="primary" disabled={this.getIfSaveDisabled()}>
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
            newTodoObj: {
                ...state.newTodoObj,
                [id]: value
            }
        }))
    }

    submitTask() {
        this.props.performAction(this.state.newTodoObj);
    }

    private getIfSaveDisabled():boolean {
        return this.state.newTodoObj.description === '' || 
               this.state.newTodoObj.header === '' || 
               this.state.newTodoObj.due_date === '';
    }
}

export default withStyles(styles, {withTheme: true})(GenericTodoForm)
