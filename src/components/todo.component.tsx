import React from 'react';
import {Todo} from '../interfaces/todo.interface';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, createStyles, withStyles, Theme } from '@material-ui/core';
import swal from 'sweetalert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface TodoProps {
    todo:Todo;
    toggleTaskStatus:() => void;
    removeTask: () => void;
    classes:any;
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
        this.getRemainingdata = this.getRemainingdata.bind(this);
    }

    render() {
        let remainingData:{class:string, text:string} = this.getRemainingdata(this.props.todo.is_done);
        return(
            <div className="col" style={{width: '75%'}}>
                <ExpansionPanel className={this.props.classes[remainingData.class]}>
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
                            <div className="row m-l spc-eve">
                                <div>
                                    <span className="task-prop">Creation Date: </span>
                                    {this.props.todo.creation_date.toLocaleDateString()}
                                </div>
                                <div>
                                    <span className="task-prop">Due Date: </span>
                                    {this.props.todo.due_date.toLocaleDateString()}
                                </div>
                            </div>
                            <div style={{color:'red'}}>{remainingData.text}</div>
                            <IconButton aria-label="delete" onClick={this.removeTodoTask}>
                                <DeleteIcon color="action" titleAccess="Delete task" className="material-icons"></DeleteIcon>
                            </IconButton>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        )
    }

    private getRemainingdata(isTaskDone:boolean):{class:string, text:string} {
        const remaining:number = this.props.todo.due_date.getDate() - (new Date()).getDate();
        if(!isTaskDone) {
            if (remaining > 5) {
                return {
                    class: 'ok',
                    text: `You still have ${remaining} days to complete the task`
                }
            } else if (remaining >= 0) {
                return {
                    class: 'med',
                    text: `Hurry up - ${remaining === 0 ? 
                                    'You have to finish the task today!' : 
                                    `you have only ${remaining} days left to complete the task!`}`
                }
            } else {
                return {
                    class: 'bad',
                    text: `You are late by ${(-1) * remaining} days ...`
                }
            }
        } else {
            return {
                class: 'ok',
                text: ''
            };
        }
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