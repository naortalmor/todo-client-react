import React from 'react';
import { CategoriesMgmtProps, CategoriesMgmtState } from './categories-mgmt.connector';
import { Category } from '../../../interfaces/category';
import { IconButton, TextField } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';

export class CategoriesManagementComponent extends React.Component<CategoriesMgmtProps, CategoriesMgmtState> {

    constructor(props:CategoriesMgmtProps) {
        super(props);

        this.state = {
            is_adding: false,
            newCategoryName: ''
        }

        this.toggleAddMode = this.toggleAddMode.bind(this);
        this.saveNewCategory = this.saveNewCategory.bind(this);
        this.handleChanges = this.handleChanges.bind(this);
    }

    render() {
        const catSpans = this.props.categories.map((category:Category) => <span key={category.id}>{category.name}</span>)
        return (
            <div className="col ctr category-mgmt-container">
            <span className="category-mgmt-header">Categories Management</span>
            {
                this.state.is_adding ? 
                <div className="row ctr">
                    <TextField id="new-category" 
                               label="Category Name" 
                               onChange={this.handleChanges}
                               value={this.state.newCategoryName} />
                    <IconButton aria-label="save" onClick={this.saveNewCategory}>
                        <SaveAltIcon color="primary" titleAccess="Save" className="material-icons" />
                    </IconButton>
                    <IconButton aria-label="add" onClick={this.toggleAddMode}>
                        <CancelIcon color="primary" titleAccess="Cancel" className="material-icons" />
                    </IconButton>
                </div> : 
                <IconButton aria-label="add" onClick={this.toggleAddMode}>
                    <AddCircleOutlineIcon color="primary" titleAccess="Add Category" className="material-icons" />
                </IconButton>
            }
            <div className="col m-l">
                {catSpans}
            </div>
            </div>
        )
    }

    private handleChanges(event:any) {
        const target = event.target;
        let value = target.value;
        this.setState((state, props) => ({
            ...state,
            newCategoryName: value
        }))
    }

    private toggleAddMode():void {
        this.setState((state, props) => ({is_adding: !state.is_adding}))
    }
    
    private saveNewCategory():void {
        this.toggleAddMode();
        this.props.addCategory(this.state.newCategoryName);
    }
}