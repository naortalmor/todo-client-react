import { User } from './../../../interfaces/user';
import { AppState } from '../../../store/store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HomeComponent } from './home.component';
import { changeMode } from '../../../store/modes/modes.actions';
import { initUser } from '../../../store/login/login.actions';

export interface HomeProps {
  changeMode: (newModeIndex:number) => void;
  initConnectedUser: (user:User) => void;
  selectedModeIndex:number;
  user:User;
}

const mapStateToProps = (state:AppState) => ({
  selectedModeIndex: state.selectedModeIndex,
  user: state.user
});

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    changeMode: (newModeIndex:number) => dispatch(changeMode(newModeIndex)),
    initConnectedUser: (user:User) => dispatch(initUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)