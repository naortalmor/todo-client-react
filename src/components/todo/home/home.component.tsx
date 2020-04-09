import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Modes } from '../../../consts/enums';
import TodosContainerComponent from '../todos-container/todos-container.connector';
import { InterviewsContainerComponent } from '../../interviews/interviews-container.component';
import { HomeProps } from './home.connector';

export class HomeComponent extends React.Component<HomeProps> {
    constructor(props:HomeProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }
    
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Tabs value={this.props.selectedModeIndex} onChange={this.handleChange} >
                        <Tab label="Todo" {...this.globalTabsProps(Modes.TODO)} />
                        <Tab label="Interviews" {...this.globalTabsProps(Modes.INTERVIEWS)} />
                    </Tabs>
                </AppBar>
                { this.renderAppByMode(this.props.selectedModeIndex) }
            </div>
        )
    }

    private renderAppByMode(selectedModeIndex:number) {
        switch(selectedModeIndex) {
            case Modes.TODO:
                return <TodosContainerComponent></TodosContainerComponent>
            case Modes.INTERVIEWS:
                return <InterviewsContainerComponent></InterviewsContainerComponent>
            default:
                return <div></div>
        }

    }

    private handleChange(event:React.ChangeEvent<{}>, newModeIndex:number) {
        this.props.changeMode(newModeIndex);
    }

    private globalTabsProps(mode:number) {
        return {
          id: `${mode}`,
          'aria-controls': `simple-tabpanel-${mode }`,
        };
      }
}
