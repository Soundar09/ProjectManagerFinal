export class Task {
    ProjectName : string  
    //Project_id : number  
    TaskId : number
    TaskName : string    
    Priority : number
    ParentTask : string
    IsParent : boolean = false
    StartDate : Date
    EndDate : Date
    //UserId : number
    UserName : string    
    Deleted : boolean = false
    Status : string 
}
