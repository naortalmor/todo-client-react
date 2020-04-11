export interface Company {
    id:number;
    name:string;
    salary:number;
    interviews_ids:number[];
}

export interface Interview {
    id:number;
    company_id:number;
    type:string;
    status:string;
    explanation:string;
    date:Date;
    questions_ids:number[];
}

export interface InterviewQuestion {
    id:number;
    text:string;
    interview_id:number;
}