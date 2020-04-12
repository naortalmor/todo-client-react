export interface Company {
    id:string;
    name:string;
    salary:number;
    interviews_ids:string[];
}

export interface Interview {
    id:string;
    company_id:number;
    type:string;
    status:string;
    explanation:string;
    date:Date;
    questions_ids:string[];
}

export interface InterviewQuestion {
    id:string;
    text:string;
    interview_id:string;
}