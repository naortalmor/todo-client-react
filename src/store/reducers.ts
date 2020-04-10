import { combineReducers } from 'redux';
import { todosReducer } from './todos/todos.reducer';
import { modesReducer } from './modes/modes.reducer';
import { sortFieldReducer } from './sort/sort.reducer';
import { editTaskReducer } from './edit-todo/edit-todo.reducer';
import { categoriesReducer } from './categories/categories.reducers';
import { usersReducer } from './login/login.reducer';

const reducer = combineReducers({
    todos: todosReducer,
    user: usersReducer,
    selectedModeIndex: modesReducer,
    todoSortField: sortFieldReducer,
    todoToEditId: editTaskReducer,
    categories: categoriesReducer
})

export default reducer;