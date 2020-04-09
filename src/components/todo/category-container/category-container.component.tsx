import React from 'react';
import { CategoryContainerProps } from './category-container.connector';
import TodoComponent from '../todo/todo.connector';
import { Todo } from '../../../interfaces/todo.interface';

export class CategoryConainerComponent extends React.Component<CategoryContainerProps> {
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
                    <span className="category-title">{this.props.category.name}</span>
                    <div className="col ctr">
                        {todosList}
                    </div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}