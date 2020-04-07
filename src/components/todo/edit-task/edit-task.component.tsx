import React from 'react';
import { FormTodo } from '../../../interfaces/todo.interface';
import GenericTodoForm from '../generic-todo-form/generic-todo-form.connector';
import { EditTaskProps } from './edit-task.connector';

export class EditTaskComponent extends React.Component<EditTaskProps> {
    render() {
        return (
            <GenericTodoForm todo={this.props.todo} 
                             title="Edit task" 
                             performAction={(newTodoObj:FormTodo) => this.props.performEdit(newTodoObj)}
                             close={this.props.closeEditTask}>
            </GenericTodoForm>
        )
    }
}

export default EditTaskComponent;
