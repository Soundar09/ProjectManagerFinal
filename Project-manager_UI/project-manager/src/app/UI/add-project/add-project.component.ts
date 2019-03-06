import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';
import { SharedService } from '../../shared.service'

import { User } from '../../models/user';
import { Project } from '../../models/project';
declare var $: any;
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  item: Project;
  _users: User[];
  UserID: number;
  ProjectId: number;
  AllProjectList: Project[];
  public sortStartDateASC: boolean = true;
  public sortEndDateASC: boolean = true;
  public sortPriorityASC: boolean = true;
  public sortCompletedASC: boolean = true;
  public title: string = "Add";
  private msg: string;

  //_ProjectLists: ProjectSummary[];
  //_projectGrid: ProjectSummary[];
  _projectGrid: Project[];

  constructor(private _projectService: SharedService) {
    this.item = new Project();
  }

  ngOnInit() {
    $(document).ready(function () {
      $("#userInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#userTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });


      });

      //Start Date
      var date = new Date();
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      var year = date.getFullYear();
      var mm1;
      var dd1;

      if (mm < 10) mm1 = ('0' + mm);
      else
        mm1 = mm;

      if (dd < 10) dd1 = '0' + dd;
      else
        dd1 = dd;

      var startDate = year + "-" + mm1 + "-" + dd1;
      $("#sdate").val(startDate);

      //End date
      var newdate = new Date();
      newdate.setDate(date.getDate() + 1);

      var mm = newdate.getMonth() + 1;
      var dd = newdate.getDate();
      var year = newdate.getFullYear();
      var mm1;
      var dd1;

      if (mm < 10) mm1 = ('0' + mm);
      else
        mm1 = mm;

      if (dd < 10) dd1 = '0' + dd;
      else
        dd1 = dd;

      var endDate = year + "-" + mm1 + "-" + dd1;
      $("#edate").val(endDate);
      // this.item.start_date = endDate;
      // this.item.end_date = startDate;
    });

    $('form input[type=checkbox]').change(function () {
      //Start Date
      var date = new Date();
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      var year = date.getFullYear();
      var mm1;
      var dd1;

      if (mm < 10) mm1 = ('0' + mm);
      else
        mm1 = mm;

      if (dd < 10) dd1 = '0' + dd;
      else
        dd1 = dd;

      var startDate = year + "-" + mm1 + "-" + dd1;
      $("#sdate").val(startDate);

      //End date
      var newdate = new Date();
      newdate.setDate(date.getDate() + 1);

      var mm = newdate.getMonth() + 1;
      var dd = newdate.getDate();
      var year = newdate.getFullYear();
      var mm1;
      var dd1;

      if (mm < 10) mm1 = ('0' + mm);
      else
        mm1 = mm;

      if (dd < 10) dd1 = '0' + dd;
      else
        dd1 = dd;

      var endDate = year + "-" + mm1 + "-" + dd1;
      //var endDate = dd1 + "-" + mm1 + "-" + year;
      $("#edate").val(endDate);
      //this.item.EndDate = endDate;
      //this.item.StartDate = startDate;

    });

    $(document).ready(function () {
      $('#addpro_btn').click(function () {
        var isChecked = $('#chkDate').is(":checked");
        //Start date and End date validations
        if (isChecked == true) {
          if ($('#sdate').val() < $('#edate').val()) {
            alert('Start Date should be less than End Date');
            return;
          }
        }

        if ($('#pro_txt').val() == "") {
          alert('Project is required');
          return;
        }
        else if ($('#manager').val() == "") {
          alert('Manager is required');
          return;
        }
      });
    });

    this.GetAllProjects();
  }

  GetAllUsers() {
    this._projectService.GetUsersList().subscribe((data: User[]) => { this._users = data });
  }

  GetNames(items: any) {
    this.item.ManagerName = items.FirstName;
    //this.item.UserId = items.user_id;
  }

  GetAllProjects() {
    this._projectService.GetAllProjects().subscribe((data: Project[]) => { this.AllProjectList = data, this._projectGrid = data });
  }

  // Sort the grid values based on the start date

  SortStartDate() {
    if (this.sortStartDateASC) {
      this._projectGrid = this._projectGrid.sort(function (a, b) { return a.StartDate < b.StartDate ? -1 : 1 });
      this.sortStartDateASC = false;
    }
    else {
      this._projectGrid = this._projectGrid.sort(function (a, b) { return b.StartDate < a.StartDate ? -1 : 1 });
      this.sortStartDateASC = true;
    }
  }

  // Sort the grid values based on the end date

  SortEndDate() {
    if (this.sortEndDateASC) {
      this._projectGrid = this._projectGrid.sort(function (a, b) { return a.EndDate < b.EndDate ? -1 : 1 });
      this.sortEndDateASC = false;
    }
    else {
      this._projectGrid = this._projectGrid.sort(function (a, b) { return b.EndDate < a.EndDate ? -1 : 1 });
      this.sortEndDateASC = true;
    }
  }

  // Sort the grid values based on the Priority

  SortPriority() {
    if (this.sortPriorityASC) {
      this._projectGrid = this._projectGrid.sort(function (a, b) { return a.Priority - b.Priority });
      this.sortPriorityASC = false;
    }
    else {
      this._projectGrid = this._projectGrid.sort(function (a, b) { return b.Priority - a.Priority });
      this.sortPriorityASC = true;
    }
  }

  // Sort the grid values based on the Status

  SortCompleted() {
    if (this.sortCompletedASC) {
      this._projectGrid = this._projectGrid.sort(function (a, b) { return a.Priority - b.Priority });
      this.sortCompletedASC = false;
    }
    else {
      this._projectGrid = this._projectGrid.sort(function (a, b) { return b.Priority - a.Priority });
      this.sortCompletedASC = true;
    }
  }

  // Display the Project Summary based on the input values

  set SearchProjectName(value: string) {
    this._projectGrid = this.filteredTask(value);
  }

  // Filter and Display the values based on the input projectname

  filteredTask(searchFilter) {
    return this.AllProjectList.filter(
      e => e.ProjectName.toLowerCase().startsWith(searchFilter.toLowerCase()));
  }

  /*set SearchUserName(value: string) {
    this._users = this.filteredTask(value);
  }

  filteredTask2(searchFilter) {
    return this._users.filter(
      e => e.first_name.toLowerCase().startsWith(searchFilter.toLowerCase()));
  }*/

  //This method add the record into Project table
  Insert(item: Project) {
    if (item.ProjectName) {
      if (item.ManagerName) {  
        console.log(item.StartDate)      
        if (this.title == "Add") {
          this._projectService.InsertProject(item).subscribe((data) => { this.ngOnInit(), alert("Inserted Successfully") });
        }
        else {
          this._projectService.UpdateProject(item.ProjectId, item).subscribe((data) => { this.ngOnInit(), alert("Updated successfully") });
        }
      }
    }
  }

  //Reset the some default value

  Reset() {
    this.title = "Add";
  }

  //THis method is update the values into Project table

  Update(item: any) {
    this.item.ProjectName = item.ProjectName;
    this.item.StartDate = item.StartDate;
    this.item.EndDate = item.EndDate;
    this.item.Priority = item.Priority;
    this.item.ManagerName = item.ManagerName;
    this.item.ProjectId = item.ProjectId;
    this.title = "Update";
  }

  Suspend(ProjectId: number) {
    this._projectService.DeleteProject(ProjectId).subscribe(i => this.msg = i);
    alert("Deleted successfully");
    this.ngOnInit();
  }

}
