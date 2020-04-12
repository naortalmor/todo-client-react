import { Interview } from './../../../interfaces/interviews.interface';
import { InterviewQuestion } from '../../../interfaces/interviews.interface';

export interface InterviewProps {
  interview:Interview;
  questions:InterviewQuestion[];
}