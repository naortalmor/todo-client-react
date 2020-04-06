import React from 'react';
import { Todo } from '../interfaces/todo.interface';
import { initTodos, toggleTodoStatus, addTodo, removeTodo, removeSome, changeSortField } from '../store/actions';
import TodoComponent from './todo.component';
import { connect } from 'react-redux';
import { AppState } from '../store/store';
import axios, { AxiosResponse } from 'axios';
import { urlConfig } from '../consts/config';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddTask from './add-task.component';
import { Dispatch } from 'redux';
import swal from 'sweetalert';
import { IconButton } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import SortIcon from '@material-ui/icons/Sort';
import { getSortedTodos } from '../store/selectors';
import { SortComponent } from './sort.component';

interface ContainerProps {
    todos:Todo[];
    sortField:string;
    insertTodos: (todos:Todo[]) => void;
    addTask: (todo:Todo) => void;
    toggleStatus: (todoId:string) => void,
    removeTodo: (todoId:string) => void,
    removeSome: (todosIds:string[]) => void,
    selectSortField: (sortField:string) => void
}

interface ContainerState {
    add_task: boolean,
    display_sort: boolean
}

export class TodosContainerComponent extends React.Component<ContainerProps, ContainerState> {
    constructor(props:any) {
        super(props);
        this.state = {
            add_task: false,
            display_sort: false
        }

        this.fetchData();
        this.toggleStaus = this.toggleStaus.bind(this);
        this.toggleAddTask = this.toggleAddTask.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
        this.removeAllDone = this.removeAllDone.bind(this);
        this.toggleSort = this.toggleSort.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const todosList = this.props.todos && this.props.todos.map((todo:Todo) => 
            <TodoComponent key={todo.id} 
                           todo={todo}
                           toggleTaskStatus={() => this.toggleStaus(todo.id)} 
                           removeTask={() => this.removeTodoTask(todo.id)}>
            </TodoComponent>)

        return (
            <div className="col half-width ctr">
                <div className="row ctr">
                    <IconButton aria-label="add" onClick={ this.toggleAddTask }>
                        <AddCircleOutlineIcon color="primary" titleAccess="Add task" className="material-icons" />
                    </IconButton>
                    <IconButton aria-label="remove-all-done" onClick={ this.removeAllDone }>
                        <RemoveCircleOutlineIcon color="secondary" titleAccess="Remove all done" className="material-icons" />
                    </IconButton>
                    <IconButton aria-label="remove-all-done" onClick={ this.toggleSort }>
                        <SortIcon color="primary" titleAccess="Sort" className="material-icons" />
                    </IconButton>
                </div>
                {this.state.display_sort &&
                    <SortComponent sortBy={this.props.sortField} selectSortField={this.props.selectSortField}></SortComponent>
                }
                {todosList}
                { this.state.add_task &&
                    <AddTask 
                        addTask={(newTask:Partial<Todo>) => this.addNewTask(newTask)} 
                        closeAddTask={this.toggleAddTask}>
                    </AddTask>
                }
            </div>
        );
    }

    private toggleSort():void {
        this.setState((state, props) => ({
            ...state,
            display_sort: !state.display_sort
        }))
    }

    private fetchData():void {
        axios.get<Todo[]>(`http://${urlConfig.url}:${urlConfig.port}/api/todo/`).then((res:AxiosResponse<Todo[]>) => {
            const allTodos:Todo[] = res.data.map((todo:Todo) => (
                {...todo, 
                    creation_date: new Date(todo.creation_date),
                    due_date: new Date(todo.due_date)
                })
                )
            this.props.insertTodos(allTodos)
        })
    }

    private toggleStaus(taskId:string):void { 
        axios.post<Todo>(`http://${urlConfig.url}:${urlConfig.port}/api/todo/${taskId}/toggle_done/`).then((res:AxiosResponse<Todo>) => (this.props.toggleStatus(taskId)))
    }

    private toggleAddTask():void {
        this.setState((state, props) => ({
            ...state,
            add_task: !state.add_task
        }))
    }

    private addNewTask(newTask: Partial<Todo>):void {
        axios.post<Todo>(`http://${urlConfig.url}:${urlConfig.port}/api/todo/`, newTask).then((newTaskRespose:AxiosResponse<Todo>) => {
            const todo:Todo = {
                ...newTaskRespose.data,
                creation_date: new Date(newTaskRespose.data.creation_date),
                due_date: new Date(newTaskRespose.data.due_date)
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

    private removeAllDone():void {
        const allDone:string[] = this.props.todos.filter((todo:Todo) => todo.is_done).map((todo:Todo) => todo.id)
        swal({
            title: `Are you sure that you want to delete ${allDone.length} tasks ?`,
            text: "Once deleted, you will not be able to recover this task",
            icon: "warning",
            buttons: ['Cancel', true],
            dangerMode: true,
          })
          .then((willDelete:boolean) => {
            if (willDelete) {
                axios.post(`http://${urlConfig.url}:${urlConfig.port}/api/todo/delete_some/`, allDone).then((res:AxiosResponse) => {
                    this.props.removeSome(allDone);
                    swal(`${allDone.length} tasks has been deleted!`, {
                        icon: "success",
                      });
                })
            } else {
              swal("Your tasks are safe");
            }
          });
    }
}

const mapStateToProps = (state:AppState) => ({todos: getSortedTodos(state), sortField:state.todoSortField});
const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        insertTodos: (todos:Todo[]) => dispatch(initTodos(todos)),
        addTask: (todo:Todo) => dispatch(addTodo(todo)),
        toggleStatus: (todoId:string) => dispatch(toggleTodoStatus(todoId)),
        removeTodo: (todoId:string) => dispatch(removeTodo(todoId)),
        removeSome: (todosIds:string[]) => dispatch(removeSome(todosIds)),
        selectSortField: (sortField:string) => dispatch(changeSortField(sortField))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodosContainerComponent);