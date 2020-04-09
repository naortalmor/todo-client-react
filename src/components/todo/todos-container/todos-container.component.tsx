import React from 'react';
import { Todo, FormTodo } from '../../../interfaces/todo.interface';
import axios, { AxiosResponse } from 'axios';
import { urlConfig } from '../../../consts/config';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddTask from '../add-task/add-task.component';
import swal from 'sweetalert';
import { IconButton } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import SortIcon from '@material-ui/icons/Sort';
import { SortComponent } from '../sort/sort.component';
import EditTaskComponent from '../edit-task/edit-task.component';
import { ContainerProps, ContainerState } from './todos-container.connector';
import { Category } from '../../../interfaces/category';
import { CategoryConainerComponent } from '../category-container/category-container.component';
import {CategoriesManagementComponent} from '../categories-mgmt/categories-mgmt.component';

export class TodosContainerComponent extends React.Component<ContainerProps, ContainerState> {
    constructor(props:any) {
        super(props);
        this.state = {
            add_task: false,
            display_sort: false
        }

        this.toggleStaus = this.toggleStaus.bind(this);
        this.toggleAddTask = this.toggleAddTask.bind(this);
        this.addNewTask = this.addNewTask.bind(this);
        this.removeAllDone = this.removeAllDone.bind(this);
        this.toggleSort = this.toggleSort.bind(this);
        this.performEditTask = this.performEditTask.bind(this);
        this.removeTodoTask = this.removeTodoTask.bind(this);
        this.addNewCategory = this.addNewCategory.bind(this);
    }

    componentDidMount() {
        this.fetchTodos();
        this.fetchCategories()
    }

    render() {
        const categoriesList = this.props.categories && this.props.categories.map((category:Category) => 
            <CategoryConainerComponent key={category.id} 
                                       category={category}
                                       todos={this.props.todos.filter((todo:Todo) => todo.category_id === category.id)}
                                       toggleTaskStatus={this.toggleStaus}
                                       removeTask={this.removeTodoTask}
                                       openEditTask={this.props.openEditTask}>
            </CategoryConainerComponent>)

        return (
            <div className="row ctr">
                <div className="flx1">
                    <CategoriesManagementComponent categories={this.props.categories} 
                                                   addCategory={this.addNewCategory}>
                    </CategoriesManagementComponent>
                </div>
                <div className="col half-width ctr flx4">
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
                    {categoriesList}
                    { this.state.add_task &&
                        <AddTask
                            addTask={(newTask:FormTodo) => this.addNewTask(newTask)} 
                            closeAddTask={this.toggleAddTask} 
                            categories={this.props.categories} >
                        </AddTask>
                    }
                    {
                        this.props.todoToEdit && 
                        <EditTaskComponent todo={this.props.todoToEdit} 
                                        categories={this.props.categories}
                                        performEdit={this.performEditTask} 
                                        closeEditTask={() => this.props.closeEditTask()}>
                        </EditTaskComponent>
                    }
                </div>
            </div>
        );
    }

    private addNewCategory(categoryName:string):void {
        axios.post<Category>(`http://${urlConfig.url}:${urlConfig.port}/api/categories/`, {name: categoryName})
            .then((res:AxiosResponse<Category>) => {
                swal(`The category ${categoryName} created successfully`, {
                    icon: "success",
                  });

                this.props.addCategory(res.data);
            })
    }

    private performEditTask(newTask:FormTodo):void {
        axios.put<Todo>(`http://${urlConfig.url}:${urlConfig.port}/api/todo/${newTask.id}/`, newTask)
            .then((res:AxiosResponse<Todo>) => {
                const todo:Todo = {
                    ...res.data,
                    creation_date: new Date(res.data.creation_date),
                    due_date: new Date(res.data.due_date)
                }
                swal("Your task has been created successfully!", {
                    icon: "success",
                  });
                this.props.closeEditTask();
                this.props.editTask(todo);
            })
    }

    private toggleSort():void {
        this.setState((state, props) => ({
            ...state,
            display_sort: !state.display_sort
        }))
    }

    private fetchTodos():void {
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

    private fetchCategories():void {
        axios.get<Category[]>(`http://${urlConfig.url}:${urlConfig.port}/api/categories/`).then((res:AxiosResponse<Category[]>) => {
            this.props.insertCategories(res.data)
        })
    }

    private toggleStaus(taskId:string):void { 
        axios.post<Todo>(`http://${urlConfig.url}:${urlConfig.port}/api/todo/${taskId}/toggle_done/`)
            .then((res:AxiosResponse<Todo>) => (this.props.toggleStatus(taskId)))
    }

    private toggleAddTask():void {
        this.setState((state, props) => ({
            ...state,
            add_task: !state.add_task
        }))
    }

    private addNewTask(newTask: FormTodo):void {
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
        const allDone:string[] = this.props.todos.filter((todo:Todo) => todo.is_done).map((todo:Todo) => todo.id!)
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