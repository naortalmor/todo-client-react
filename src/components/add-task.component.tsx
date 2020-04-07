import React from 'react';
import { Todo, FormTodo } from '../interfaces/todo.interface';
import GenericTodoForm from './generic-todo-form.component';

interface AddTaskProps {
    addTask: (newTask:FormTodo) => void;
    closeAddTask: () => void;
}

export class AddTask extends React.Component<AddTaskProps> {
    render() {
        const emptyTodo:Todo = {
            header: '',
            description: '',
            creation_date: new Date(),
            due_date: new Date(),
            is_done: false
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