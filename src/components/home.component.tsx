import React from 'react';
import { AppState } from '../store/store';
import { Dispatch } from 'redux';
import { changeMode } from '../store/actions';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Modes } from '../consts/enums';
import TodosContainerComponent from './todos-container.component';
import { InterviewsContainerComponent } from './interviews-container.component';


interface HomeProps {
    changeMode: (newModeIndex:number) => void;
    selectedModeIndex:number;
}

class HomeComponent extends React.Component<HomeProps> {
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
                <div className="row ctr">
                    { this.renderAppByMode(this.props.selectedModeIndex) }
                </div>
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

    globalTabsProps(mode:number) {
        return {
          id: `${mode}`,
          'aria-controls': `simple-tabpanel-${mode }`,
        };
      }
}

const mapStateToProps = (state:AppState) => ({selectedModeIndex: state.selectedModeIndex});
const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    changeMode: (newModeIndex:number) => dispatch(changeMode(newModeIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)