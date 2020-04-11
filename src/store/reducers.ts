import { interviewsReducer } from './interviews/interviews.reducers';
import { combineReducers } from 'redux';
import { todosReducer } from './todos/todos.reducer';
import { modesReducer } from './modes/modes.reducer';
import { sortFieldReducer } from './sort/sort.reducer';
import { editTaskReducer } from './edit-todo/edit-todo.reducer';
import { categoriesReducer } from './categories/categories.reducers';
import { usersReducer } from './login/login.reducer';
import { companiesReducer } from './companies/companies.reducers';
import { interviewsQuestionsReducer } from './interviews-questions/interviews-questions.reducers';

const reducer = combineReducers({
    todos: todosReducer,
    user: usersReducer,
    selectedModeIndex: modesReducer,
    todoSortField: sortFieldReducer,
    todoToEditId: editTaskReducer,
    categories: categoriesReducer,
    companies: companiesReducer,
    interviews: interviewsReducer,
    interviewQuestions: interviewsQuestionsReducer
})

export default reducer;