import React from 'react';
import { CategoryContainerProps, CategoryContainerState } from './category-container.connector';
import TodoComponent from '../todo/todo.connector';
import { Todo } from '../../../interfaces/todo.interface';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { IconButton } from '@material-ui/core';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

export class CategoryConainerComponent extends React.Component<CategoryContainerProps, CategoryContainerState> {

    constructor(props:CategoryContainerProps) {
        super(props);

        this.state = {
            isExpended: true
        }

        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    render() {
        const todosList = this.props.todos && this.props.todos.map((todo:Todo) => 
            <TodoComponent key={todo.id} 
                           todo={todo}
                           toggleTaskStatus={() => this.props.toggleTaskStatus(todo.id!)} 
                           removeTask={() => this.props.removeTask(todo.id!)}
                           editTask={() => this.props.openEditTask(todo.id!)}>
            </TodoComponent>)

        if (todosList.length) {
            return (
                <div className="col" style={{width: '100%'}}>
                    <div className="cat-header">
                    {   this.state.isExpended ?
                        <IconButton aria-label="save" onClick={this.toggleVisibility}>
                            <VisibilityIcon color="primary" titleAccess="Toggle" className="material-icons" />
                        </IconButton> :
                        <IconButton aria-label="save" onClick={this.toggleVisibility}>
                            <VisibilityOffIcon color="primary" titleAccess="Toggle" className="material-icons" />
                        </IconButton>
                    }
                        <span className="category-title">{this.props.category.name}</span>
                    </div>
                    {
                        this.state.isExpended &&
                            <div className="col ctr">
                                {todosList}
                            </div>
                    }
                </div>
            )
        } else {
            return (<div></div>)
        }
    }

    toggleVisibility() {
        this.setState((state, props) => ({isExpended: !state.isExpended}))
    }
}