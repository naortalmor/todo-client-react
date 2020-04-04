import React from 'react';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import { Todo } from '../interfaces/todo.interface';
import TextField from '@material-ui/core/TextField';

interface AddTaskProps {
    addTask: (newTask:Partial<Todo>) => void
    closeAddTask: () => void
}

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
        return (
            <form onSubmit={this.submitTask} className="col half-width form-container">
                <TextField id="header" label="Header" onChange={this.handleChanges} value={this.state.newTask.header}></TextField>
                <TextField id="description" label="Description" onChange={this.handleChanges} value={this.state.newTask.description}></TextField>
                <div className="row ctr m-l">
                    <Button variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<SaveIcon />} 
                            onClick={this.submitTask}>
                        Save
                    </Button>
                    <Button variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<CancelIcon />} onClick={this.onCacnel}>
                        Cancel
                    </Button>
                </div>
            </form>
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