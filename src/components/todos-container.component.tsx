import React from 'react';
import { Todo } from '../interfaces/todo.interface';
import { initTodos, toggleTodoStatus, addTodo, removeTodo } from '../store/actions';
import { TodoComponent } from './todo.component';
import { connect } from 'react-redux';
import { AppState } from '../store/store';
import axios, { AxiosResponse } from 'axios';
import { urlConfig } from '../consts/config';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddTask from './add-task.component';
import { Dispatch } from 'redux';
import swal from 'sweetalert';
import { IconButton } from '@material-ui/core';

interface ContainerProps {
    todos:Todo[];
    insertTodos: (todos:Todo[]) => void;
    addTask: (todo:Todo) => void;
    toggleStatus: (todoId:string) => void,
    removeTodo: (todoId:string) => void
}

export class TodosContainerComponent extends React.Component<ContainerProps, {add_task: boolean}> {
    constructor(props:any) {
        super(props);
        this.state = {
            add_task: false
        }

        this.fetchData();
        this.toggleStaus = this.toggleStaus.bind(this);
        this.toggleAddTask = this.toggleAddTask.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const todosList = this.props.todos && this.props.todos.map((todo:Todo) => 
            <TodoComponent key={todo.id} 
                           todo={todo}
                           toggleTaskStatus={() => this.toggleStaus(todo)} 
                           removeTask={() => this.removeTodoTask(todo.id)}>
            </TodoComponent>)

        return (
            <div className="col half-width ctr">
                <IconButton aria-label="add" onClick={ this.toggleAddTask }>
                    <AddCircleOutlineIcon color="primary" titleAccess="Add task" className="material-icons"></AddCircleOutlineIcon>
                </IconButton>
                {todosList}
                { this.state.add_task ? 
                    <AddTask 
                        addTask={(newTask:Partial<Todo>) => this.addNewTask(newTask)} 
                        closeAddTask={this.toggleAddTask}>
                    </AddTask> : 
                    ''
                }
            </div>
        );
    }

    private fetchData():void {
        axios.get<Todo[]>(`http://${urlConfig.url}:${urlConfig.port}/api/todo/`).then((res:AxiosResponse<Todo[]>) => {
            const allTodos:Todo[] = res.data.map((todo:Todo) => ({...todo, creation_date: new Date(todo.creation_date)}))
            this.props.insertTodos(allTodos)
        })
    }

    private toggleStaus(todo:Todo):void { 
        axios.put<Todo>(`http://${urlConfig.url}:${urlConfig.port}/api/todo/${todo.id}/`, {
            ...todo,
            is_done: !todo.is_done
        }).then((res:AxiosResponse<Todo>) => (this.props.toggleStatus(todo.id)))
    }

    private toggleAddTask():void {
        this.setState((state, props) => ({
            add_task: !state.add_task
        }))
    }

    private addNewTask(newTask: Partial<Todo>):void {
        axios.post<Todo>(`http://${urlConfig.url}:${urlConfig.port}/api/todo/`, newTask).then((newTaskRespose:AxiosResponse<Todo>) => {
            const todo:Todo = {
                ...newTaskRespose.data,
                creation_date: new Date(newTaskRespose.data.creation_date)
            }
            swal("Your task has been created successfully!", {
                icon: "success",
              });
            this.toggleAddTask();
            this.props.addTask(todo);
        })
    }

    private removeTodoTask(todoId:string):void {
        axios.delete(`http://${urlConfig.url}:${urlConfig.port}/api/todo/${todoId}/`)
            .then((res:AxiosResponse) => {
                swal("Your task has been deleted!", {
                    icon: "success",
                  });
                this.props.removeTodo(todoId)}
            )
    }
}

const mapStateToProps = (state:AppState) => ({todos: state.todos})
const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        insertTodos: (todos:Todo[]) => dispatch(initTodos(todos)),
        addTask: (todo:Todo) => dispatch(addTodo(todo)),
        toggleStatus: (todoId:string) => dispatch(toggleTodoStatus(todoId)),
        removeTodo: (todoId:string) => dispatch(removeTodo(todoId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodosContainerComponent);