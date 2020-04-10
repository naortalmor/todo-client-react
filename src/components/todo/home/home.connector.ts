import { User } from './../../../interfaces/user';
import { AppState } from '../../../store/store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HomeComponent } from './home.component';
import { changeMode } from '../../../store/modes/modes.actions';
import { initUser, removeUser } from '../../../store/login/login.actions';
import { Theme, createStyles, withStyles } from '@material-ui/core';

export interface HomeProps {
  changeMode: (newModeIndex:number) => void;
  initConnectedUser: (user:User) => void;
  logoutUser: () => void;
  selectedModeIndex:number;
  user:User;
  classes:any;
}

const mapStateToProps = (state:AppState) => ({
  selectedModeIndex: state.selectedModeIndex,
  user: state.user
});

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    changeMode: (newModeIndex:number) => dispatch(changeMode(newModeIndex)),
    initConnectedUser: (user:User) => dispatch(initUser(user)),
    logoutUser: () => dispatch(removeUser())
  }
}

const styles = (theme:Theme) => createStyles({
  spcRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  accountBtn: {
    color: 'white',
    marginRight: '1em'
  }
})

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(HomeComponent))