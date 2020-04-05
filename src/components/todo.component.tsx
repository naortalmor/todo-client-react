import React from 'react';
import {Todo} from '../interfaces/todo.interface';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import swal from 'sweetalert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface TodoProps {
    todo:Todo;
    toggleTaskStatus:() => void;
    removeTask: () => void
}

export class TodoComponent extends React.Component<TodoProps, {toggle_todo: boolean}> {
    constructor(props:TodoProps) {
        super(props);
        this.state = {
            toggle_todo: false
        }

        this.toggleTodo = this.toggleTodo.bind(this);
        this.toggleTaskStatus = this.toggleTaskStatus.bind(this);
        this.removeTodoTask = this.removeTodoTask.bind(this);
    }

    render() {
        return(
            <div className="col" style={{width: '75%'}}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}
                                           aria-label="Expand"
                                           aria-controls="additional-actions1-content"
                                           id={this.props.todo.id}>
                        <FormControlLabel
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={
                                <Checkbox checked={this.props.todo.is_done} onClick={this.toggleTaskStatus} />
                            }
                            label={this.props.todo.header}>
                        </FormControlLabel>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="extra-task-data">
                            <div> {this.props.todo.description} </div>
                            <div>
                                <span className="task-prop">Creation Date: </span>
                                {this.props.todo.creation_date.toLocaleDateString()}
                            </div>
                            <IconButton aria-label="delete" onClick={this.removeTodoTask}>
                                <DeleteIcon color="action" titleAccess="Delete task" className="material-icons"></DeleteIcon>
                            </IconButton>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }

    toggleTodo() {
        this.setState((state, props) => ({
            toggle_todo: !state.toggle_todo
        }))
    }

    toggleTaskStatus() {
        this.props.toggleTaskStatus();
    }

    removeTodoTask():void {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this task",
            icon: "warning",
            buttons: ['Cancel', true],
            dangerMode: true,
          })
          .then((willDelete:boolean) => {
            if (willDelete) {
                this.props.removeTask();
            } else {
              swal("Your task is safe");
            }
          });
    }
}
