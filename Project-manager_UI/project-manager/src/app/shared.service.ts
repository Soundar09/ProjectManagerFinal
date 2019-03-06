import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { User } from '../app/models/user'
import { Task } from '../app/models/task'
import { Project } from '../app/models/project'

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _http: Http) { }

  //Task Table
  GetTask(id : number) : Observable<Task>
  {
    
      return this._http.get("http://localhost:50440/api/TaskTables" +"/"+ id)
      .map((response : Response)=><Task> response.json());
  }

  
  GetAllTasks() : Observable<Task[]>
  {
      return this._http.get("http://localhost:50440/api/TaskTables")
      .map((response : Response)=><Task[]> response.json());
  }

  InsertTask(task : Task) : Observable<string>
  {   
    console.log(task);
     return this._http.post("http://localhost:50440/api/TaskTables",task)
     .map((response : Response)=><string> response.json());
  }

  UpdateTask(_taskID: number,_task : Task) : Observable<string>
  {
    return this._http.put("http://localhost:50440/api/TaskTables" + "/" + _taskID, _task)
    .map((response : Response)=> <string> response.json());    
  }

  DeleteData(_taskID : number) : Observable<string>
  {
    return this._http.delete("http://localhost:50440/api/TaskTables" +"/" + _taskID )
    .map((response : Response)=> <string> response.json());
  }

   //Project Table
  GetAllProjects() : Observable<Project[]>
  {
      return this._http.get("http://localhost:50440/api/ProjectTables")
      .map((response : Response)=><Project[]> response.json());      
  }

  InsertProject(task : Project) : Observable<string>
  {   
    console.log(task) ;
     return this._http.post("http://localhost:50440/api/ProjectTables",task)
     .map((response : Response)=><string> response.json());
  }

  UpdateProject(_taskID: number, _task: Project) : Observable<string>
  {
    console.log(_taskID);
    console.log(_task);
    return this._http.put("http://localhost:50440/api/ProjectTables" + "/" + _taskID, _task)
    .map((response : Response)=> <string> response.json());
  }

  DeleteProject(_taskID : number) : Observable<string>
  {
    return this._http.delete("http://localhost:50440/api/ProjectTables" +"/" + _taskID )
    .map((response : Response)=> <string> response.json());
  }

  // User Table
  GetUsersList(): Observable<User[]> {
    console.log("hello")
    return this._http.get("http://localhost:50440/api/UserTables")
      .map((response: Response) => <User[]>response.json());
  }

  InsertUser(task: User): Observable<string> {
    return this._http.post("http://localhost:50440/api/UserTables", task)
      .map((response: Response) => <string>response.json());
  }

  UpdateUser(_taskID: number, _task: User): Observable<string> {
    return this._http.put("http://localhost:50440/api/UserTables" + "/" + _taskID, _task)
      .map((response: Response) => <string>response.json());
  }

  DeleteUser(_taskID: number): Observable<string> {
    return this._http.delete("http://localhost:50440/api/UserTables" + "/" + _taskID)
      .map((response: Response) => <string>response.json());
  }

  GetUser(id: number): Observable<User> {    
    return this._http.get("http://localhost:50440/api/UserTables" + "/" + id)
      .map((response: Response) => <User>response.json());
  }


}
