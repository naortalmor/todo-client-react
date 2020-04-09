import { Todo } from './../../../interfaces/todo.interface';
import { Category } from "../../../interfaces/category";
import { connect } from 'react-redux';
import { CategoryConainerComponent } from './category-container.component';
import { AppState } from '../../../store/store';
import { Dispatch } from 'redux';

export interface CategoryContainerProps {
    todos:Todo[];
    category: Category;
    toggleTaskStatus: (todoId:string) => void;
    removeTask: (todoId:string) => void;
    openEditTask: (todoId:string) => void
}

export interface CategoryContainerState {
    isExpended:boolean;
}

const mapStateToProps = (state:AppState) => ({
});

const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryConainerComponent);
