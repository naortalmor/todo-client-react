import React from 'react';
import { Radio, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core';
import { SortFields } from '../../../consts/enums';

interface SortProps {
    sortBy:string;
    selectSortField: (sortField:string) => void
}

export class SortComponent extends React.Component<SortProps> {
    constructor(props:SortProps) {
        super(props);

        this.handleChanges = this.handleChanges.bind(this);
    }
    render() {
        return (
            <div className="sort-container"> 
                <FormControl component="fieldset">
                    <FormLabel component="legend"> SORT BY </FormLabel>
                    <RadioGroup aria-label="sort by" name="sort" value={this.props.sortBy} onChange={this.handleChanges}>
                        <FormControlLabel value={SortFields.DUE_DATE} control={<Radio />} label="Due date" />
                        <FormControlLabel value={SortFields.IS_DONE} control={<Radio />} label="Is done" />
                    </RadioGroup>
                </FormControl>
            </div>
        )
    }

    private handleChanges(event: React.ChangeEvent<HTMLInputElement>):void {
        this.props.selectSortField((event.target as HTMLInputElement).value);
    }
}