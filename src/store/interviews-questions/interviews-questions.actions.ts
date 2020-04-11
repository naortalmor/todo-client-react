import { AppAction } from '../../interfaces/app-action.interface';
import { InterviewQuestion } from '../../interfaces/interviews.interface';

export const INIT_QUESTIONS = 'INIT_QUESTIONS';

export const initInterviewQuestions = (questions:InterviewQuestion[]):AppAction => {
    return {
        type: INIT_QUESTIONS,
        payload: questions
    }
}
