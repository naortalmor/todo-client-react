import React from 'react';
import { InterviewContainerProps } from './interviews-container.connector';
import axios, { AxiosResponse } from 'axios';
import { Company, Interview, InterviewQuestion } from '../../../interfaces/interviews.interface';
import { urlConfig } from '../../../consts/config';

export class InterviewsContainerComponent extends React.Component<InterviewContainerProps> {
    constructor(props:InterviewContainerProps) {
        super(props);

        this.fetchCompanies = this.fetchCompanies.bind(this);
        this.fetchInterviews = this.fetchInterviews.bind(this);
        this.fetchInterviewQuestion = this.fetchInterviewQuestion.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const companiesids = this.props.companies.map((comp:Company) => (<span>{comp.id}</span>));
        const intIds = this.props.interviews.map((int:Interview) => (<span>{int.id}</span>));
        const intQues = this.props.interviewQuestion.map((intque:InterviewQuestion) => (<span>{intque.id}</span>))
        return (
            <div>
                <div>COMP</div>
                {companiesids}
                <br />
                
                <div>INTER</div>
                {intIds}
                <br />

                <div>QUESTING</div>
                {intQues}
            </div>
        )
    }

    private fetchData() {
        this.fetchCompanies();
        this.fetchInterviews();
        this.fetchInterviewQuestion();
    }

    private fetchCompanies():void {
        axios.get<Company[]>(`http://${urlConfig.url}:${urlConfig.port}/api/companies/?userid=${this.props.user.id}`).then((res:AxiosResponse<Company[]>) => {
            const allCompanies:Company[] = res.data.map((company:Company) => ({
                id: company.id,
                name: company.name,
                salary: company.salary,
                interviews_ids: company.interviews_ids
            }))
            this.props.insertCompanies(allCompanies);
        })
    }

    private fetchInterviews():void {
        axios.get<Interview[]>(`http://${urlConfig.url}:${urlConfig.port}/api/interviews/?userid=${this.props.user.id}`).then((res:AxiosResponse<Interview[]>) => {
            const allInetrviews:Interview[] = res.data.map((interview:Interview) => ({
                id: interview.id,
                company_id: interview.company_id,
                type: interview.type,
                status: interview.status,
                explanation: interview.explanation,
                date: new Date(interview.date),
                questions_ids: interview.questions_ids
            }))
            this.props.insertInterviews(allInetrviews);
        })
    }

    private fetchInterviewQuestion():void {
        axios.get<InterviewQuestion[]>(`http://${urlConfig.url}:${urlConfig.port}/api/questions/?userid=${this.props.user.id}`).then((res:AxiosResponse<InterviewQuestion[]>) => {
            const allInterviewQuestion:InterviewQuestion[] = res.data.map((interviewQuestion:InterviewQuestion) => ({
                id: interviewQuestion.id,
                interview_id: interviewQuestion.interview_id,
                text: interviewQuestion.text
            }))
            this.props.insertInterviewQuestions(allInterviewQuestion);
        })
    }
}