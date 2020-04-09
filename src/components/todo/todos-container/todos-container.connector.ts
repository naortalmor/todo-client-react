import { Category } from './../../../interfaces/category';
import { changeSortField } from './../../../store/sort/sort.actions';
import { TodosContainerComponent } from './todos-container.component';
import { Todo } from './../../../interfaces/todo.interface';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store/store';
import { getSortedTodos, getTodoToEdit } from '../../../store/todos/todos.selectors';
import { openEditTodo, closeEditTodo } from '../../../store/edit-todo/edit-todo.actions';
import { editTodo } from '../../../store/todos/todos.actions';
import { initCatgories, addCategory } from '../../../store/categories/categories.actions';
import { initTodos, 
         addTodo, 
         toggleTodoStatus, 
         removeTodo, 
         removeSome } from '../../../store/todos/todos.actions';

export interface ContainerProps {
    todos:Todo[];
    categories: Category[];
    sortField:string;
    todoToEdit?:Todo;
    insertTodos: (todos:Todo[]) => void;
    addTask: (todo:Todo) => void;
    toggleStatus: (todoId:string) => void,
    removeTodo: (todoId:string) => void,
    removeSome: (todosIds:string[]) => void,
    selectSortField: (sortField:string) => void,
    openEditTask: (taskToEditId:string) => void,
    closeEditTask: () => void,
    editTask: (newTodo:Todo) => void,
    insertCategories: (categories:Category[]) => void,
    addCategory: (categeory:Category) => void
}

export interface ContainerState {
    add_task: boolean,
    display_sort: boolean
}

const mapStateToProps = (state:AppState) => ({
    todos: getSortedTodos(state.todos, state.todoSortField),
    categories: state.categories,
    sortField: state.todoSortField,
    todoToEdit: getTodoToEdit(state.todos, state.todoToEditId)
});

const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        insertTodos: (todos:Todo[]) => dispatch(initTodos(todos)),
        addTask: (todo:Todo) => dispatch(addTodo(todo)),
        toggleStatus: (todoId:string) => dispatch(toggleTodoStatus(todoId)),
        removeTodo: (todoId:string) => dispatch(removeTodo(todoId)),
        removeSome: (todosIds:string[]) => dispatch(removeSome(todosIds)),
        selectSortField: (sortField:string) => dispatch(changeSortField(sortField)),
        openEditTask: (taskToEditId:string) => dispatch(openEditTodo(taskToEditId)),
        closeEditTask: () => dispatch(closeEditTodo()),
        editTask: (newTodo:Todo) => dispatch(editTodo(newTodo)),
        insertCategories: (categories:Category[]) => dispatch(initCatgories(categories)),
        addCategory: (category:Category) => dispatch(addCategory(category))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodosContainerComponent);