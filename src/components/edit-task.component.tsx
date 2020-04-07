import React from 'react';
import { Todo, FormTodo } from '../interfaces/todo.interface';
import GenericTodoForm from './generic-todo-form.component';

interface EditTaskProps {
    todo:Todo;
    performEdit: (todo:FormTodo) => void;
    closeEditTask: () => void;
}

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