import { AppState } from '../../../store/store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { HomeComponent } from './home.component';
import { changeMode } from '../../../store/modes/modes.actions';

export interface HomeProps {
  changeMode: (newModeIndex:number) => void;
  selectedModeIndex:number;
}

const mapStateToProps = (state:AppState) => ({selectedModeIndex: state.selectedModeIndex});
const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    changeMode: (newModeIndex:number) => dispatch(changeMode(newModeIndex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)