import { Interview } from './../../../interfaces/interviews.interface';
import { Company, InterviewQuestion } from '../../../interfaces/interviews.interface';

export interface CompanyComponentProps {
    company:Company;
    interviews:Interview[];
    interviewQuestions:InterviewQuestion[]
}