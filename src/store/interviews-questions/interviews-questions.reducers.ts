import { AppAction } from '../../interfaces/app-action.interface';
import { InterviewQuestion } from '../../interfaces/interviews.interface';
import { INIT_QUESTIONS } from './interviews-questions.actions';

export const interviewsQuestionsReducer = (state:InterviewQuestion[] = [], action: AppAction):InterviewQuestion[] => {
    switch(action.type) {
        case INIT_QUESTIONS:
            return action.payload;
        default:
            return state;
    }
}