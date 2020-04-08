import React from 'react';
import { Todo, FormTodo } from '../../../interfaces/todo.interface';
import { AddTaskProps } from './add-task.connector';
import GenericTodoForm from '../generic-todo-form/generic-todo-form.connector';

export class AddTask extends React.Component<AddTaskProps> {
    render() {
        const emptyTodo:Todo = {
            header: '',
            description: '',
            creation_date: new Date(),
            due_date: new Date(),
            is_done: false,
            category_id: 0
        }

        return (
            <GenericTodoForm todo={emptyTodo} 
                             title="Add New Todo Task" 
                             performAction={(newTodoObj:FormTodo) => this.props.addTask(newTodoObj)}
                             close={this.props.closeAddTask}>
            </GenericTodoForm>
        )
    }
}
export default AddTask;