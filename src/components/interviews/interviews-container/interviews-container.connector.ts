import { initInterviews } from './../../../store/interviews/interviews.actions';
import { initCompanies } from './../../../store/companies/companies.actions';
import { Interview } from './../../../interfaces/interviews.interface';
import { User } from './../../../interfaces/user';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../../store/store';
import { InterviewsContainerComponent } from './interviews-container.component';
import { Company, InterviewQuestion } from '../../../interfaces/interviews.interface';
import { initInterviewQuestions } from '../../../store/interviews-questions/interviews-questions.actions';

export interface InterviewContainerProps {
  user:User;
  companies:Company[];
  interviews:Interview[];
  interviewQuestion:InterviewQuestion[];
  insertCompanies: (companies:Company[]) => void;
  insertInterviews: (interviews:Interview[]) => void;
  insertInterviewQuestions: (questions:InterviewQuestion[]) => void;
}

const mapStateToProps = (state:AppState) => ({
  companies: state.companies,
  interviews: state.interviews,
  interviewQuestion: state.interviewQuestions
});

const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    insertCompanies: (companies:Company[]) => dispatch(initCompanies(companies)),
    insertInterviews: (interviews:Interview[]) => dispatch(initInterviews(interviews)),
    insertInterviewQuestions: (questions:InterviewQuestion[]) => dispatch(initInterviewQuestions(questions))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(InterviewsContainerComponent)