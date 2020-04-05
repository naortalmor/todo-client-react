export interface Todo {
    id:string;
    header:string;
    description:string;
    is_done:boolean;
    creation_date:Date;
    due_date:Date;
}