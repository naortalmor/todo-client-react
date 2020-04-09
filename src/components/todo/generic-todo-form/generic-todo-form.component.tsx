import React from 'react';
import Button from '@material-ui/core/Button';
import { FormTodo } from '../../../interfaces/todo.interface';
import TextField from '@material-ui/core/TextField';
import { Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { GenericTodoFormProps } from './generic-todo-form.connector';
import { Category } from '../../../interfaces/category';

export class GenericTodoForm extends React.Component<GenericTodoFormProps, {newTodoObj: FormTodo}> {
    constructor(props:GenericTodoFormProps) {
        super(props);
        this.state = {
            newTodoObj: {
                ...props.todo,
                due_date: this.props.todo.due_date.toISOString().slice(0,10),
                creation_date: this.props.todo.creation_date.toISOString().slice(0,10),
            }
        }
        
        this.handleChanges = this.handleChanges.bind(this);
        this.getIfSaveDisabled = this.getIfSaveDisabled.bind(this);
    }

    render() {
        const { classes } = this.props;
        const menuItems = this.props.categories && this.props.categories.map((category:Category) => <MenuItem value={category.id}>{category.name}</MenuItem>)
        return (
            <Dialog fullWidth={true} maxWidth="xs" open={true} onClose={() => this.props.close()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {this.props.title}
                </DialogTitle>
                <DialogContent>
                    <form className={classes.form}>
                        <TextField id="header"
                                label="Header" 
                                onChange={this.handleChanges} 
                                value={this.state.newTodoObj.header}>
                        </TextField>
                        <TextField id="description" 
                                label="Description" 
                                onChange={this.handleChanges} 
                                value={this.state.newTodoObj.description}>
                        </TextField>
                        <TextField id="due_date" 
                                   label="Due date" 
                                   type="date"
                                   InputLabelProps={{shrink:true}}
                                   value={this.state.newTodoObj.due_date} 
                                   onChange={this.handleChanges} />
                        <FormControl>
                            <InputLabel>Category</InputLabel>
                            <Select labelId="category"
                                    id="category_id"
                                    name="category_id"
                                    onChange={this.handleChanges}
                                    value={this.state.newTodoObj.category_id} >
                                   {menuItems}
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.close()} 
                            color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.props.performAction(this.state.newTodoObj)} 
                            color="primary" 
                            disabled={this.getIfSaveDisabled()}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    handleChanges(event:any) {
        const target = event.target;
        const id = target.id || target.name;
        let value = target.value;

        this.setState((state, props) => ({
            newTodoObj: {
                ...state.newTodoObj,
                [id]: value
            }
        }))
    }

    private getIfSaveDisabled():boolean {
        return this.state.newTodoObj.description === '' || 
               this.state.newTodoObj.header === '' || 
               this.state.newTodoObj.due_date === '';
    }
}

