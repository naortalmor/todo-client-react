import { combineReducers } from 'redux';
import { todosReducer } from './todos/todos.reducer';
import { modesReducer } from './modes/modes.reducer';
import { sortFieldReducer } from './sort/sort.reducer';
import { editTaskReducer } from './edit-todo/edit-todo.reducer';

const reducer = combineReducers({
    todos: todosReducer,
    selectedModeIndex: modesReducer,
    todoSortField: sortFieldReducer,
    todoToEditId: editTaskReducer
})

export default reducer;