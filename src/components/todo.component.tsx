import React from 'react';
import {Todo} from '../interfaces/todo.interface';
import Radio from '@material-ui/core/Radio'
import ExpandMore from '@material-ui/icons/ExpandMore'
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

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
            <div className="col half-width">
                <div className="row ctr">
                    <Radio className="flx1" checked={this.props.todo.is_done} color="default" onClick={this.toggleTaskStatus}></Radio>
                    <div className={`flx5 ctr-txt ${this.props.todo.is_done ? 'done-task' : ''}`}>{this.props.todo.header}</div>
                    <ExpandMore className="material-icons" onClick={this.toggleTodo}></ExpandMore>
                </div>
                { this.state.toggle_todo &&
                    <div className="col ctr extra-task-data">
                        <div>
                            <span className="task-prop">Description: </span>
                            {this.props.todo.description}
                        </div>
                        <div>
                            <span className="task-prop">Creation Date: </span>
                            {this.props.todo.creation_date.toLocaleDateString()}
                        </div>
                        <IconButton aria-label="delete" onClick={this.removeTodoTask}>
                            <DeleteIcon color="action" titleAccess="Delete task" className="material-icons"></DeleteIcon>
                        </IconButton>
                    </div>
                }
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
        this.props.removeTask();
    }
}
