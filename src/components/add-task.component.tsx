import React from 'react';
import Button from '@material-ui/core/Button';
import { Todo } from '../interfaces/todo.interface';
import TextField from '@material-ui/core/TextField';
import { Dialog, DialogTitle, DialogContent, DialogActions, Theme, createStyles, withStyles } from '@material-ui/core';

interface AddTaskProps {
    addTask: (newTask:Partial<Todo>) => void;
    closeAddTask: () => void;
    classes:any;
}

const styles =(theme:Theme) => createStyles({
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

export class AddTask extends React.Component<AddTaskProps, {newTask: Partial<Todo>}> {
    constructor(props:AddTaskProps) {
        super(props);
        this.state = {
            newTask: {
                header: '',
                description: ''
            }
        }
        this.submitTask = this.submitTask.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
        this.onCacnel = this.onCacnel.bind(this);
    }

    render() {
        const { classes } = this.props;
        return (
            <Dialog fullWidth={true} maxWidth="xs" open={true} onClose={this.onCacnel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Todo Task</DialogTitle>
                <DialogContent>
                    <form className={classes.form}>
                        <TextField id="header"
                                label="Header" 
                                onChange={this.handleChanges} 
                                value={this.state.newTask.header}>
                        </TextField>
                        <TextField id="description" 
                                label="Description" 
                                onChange={this.handleChanges} 
                                value={this.state.newTask.description}>
                        </TextField>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onCacnel} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.submitTask} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    handleChanges(event:any) {
        const target = event.target;
        const id = target.id;
        const value = target.value;

        this.setState((state, props) => ({
            newTask: {
                ...state.newTask,
                [id]: value
            }
        }))
    }

    onCacnel():void {
        this.props.closeAddTask();
    }

    submitTask() {
        this.props.addTask(this.state.newTask);
    }
}

export default withStyles(styles, {withTheme: true})(AddTask)
