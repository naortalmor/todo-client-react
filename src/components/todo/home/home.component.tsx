import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Modes } from '../../../consts/enums';
import TodosContainerComponent from '../todos-container/todos-container.connector';
import { InterviewsContainerComponent } from '../../interviews/interviews-container.component';
import { HomeProps } from './home.connector';
import { Auth } from '../../../services/auth.service';
import { LoginComponent } from '../../login/login.component';
import { IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { AccountComponent } from '../../account/account.component';

export class HomeComponent extends React.Component<HomeProps> {
    constructor(props:HomeProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.renderAppByMode = this.renderAppByMode.bind(this);
        
        let user = Auth.getConnectedUser();
        user && this.props.initConnectedUser(user);
    }
    
    render() {
        if (this.props.user.id) {
            return (
                <div>
                    <AppBar position="static" className={this.props.classes.spcRow}>
                        <Tabs value={this.props.selectedModeIndex} onChange={this.handleChange} >
                            <Tab label="Todo" {...this.globalTabsProps(Modes.TODO)} />
                            <Tab label="Interviews" {...this.globalTabsProps(Modes.INTERVIEWS)} />
                        </Tabs>
                        <IconButton aria-label="account" onClick={() => this.props.changeMode(Modes.ACCOUNT)}>
                            <AccountCircleIcon className={this.props.classes.accountBtn} titleAccess="account" />
                        </IconButton>
                    </AppBar>
                    { this.renderAppByMode(this.props.selectedModeIndex) }
                </div>
            )
        } else {
            return (
                <LoginComponent initUser={this.props.initConnectedUser}>
                </LoginComponent>
            )
        }
    }

    private renderAppByMode(selectedModeIndex:number) {
        switch(selectedModeIndex) {
            case Modes.TODO:
                return <TodosContainerComponent user={this.props.user}></TodosContainerComponent>
            case Modes.INTERVIEWS:
                return <InterviewsContainerComponent></InterviewsContainerComponent>
            case Modes.ACCOUNT:
                return <AccountComponent user={this.props.user} 
                                         logout={this.props.logoutUser}>
                       </AccountComponent>
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
