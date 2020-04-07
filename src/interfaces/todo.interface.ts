export interface Todo extends BaseTodo{
    creation_date:Date;
    due_date:Date;
}

export interface FormTodo extends BaseTodo {
    creation_date:string;
    due_date:string;
}

interface BaseTodo {
    id?:string;
    header:string;
    description:string;
    is_done:boolean;   
}