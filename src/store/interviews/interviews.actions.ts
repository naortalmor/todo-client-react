import { AppAction } from '../../interfaces/app-action.interface';
import { Interview } from '../../interfaces/interviews.interface';

export const INIT_INTERVIEWS = 'INIT_INTERVIEWS';

export const initInterviews = (interviews:Interview[]):AppAction => {
    return {
        type: INIT_INTERVIEWS,
        payload: interviews
    }
}
