import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Observable} from "rxjs/Rx";

@Component({
  selector: 'app-course-project',
  templateUrl: './course-project.component.html',
  styleUrls: ['./course-project.component.css']
})
export class CourseProjectComponent implements OnInit {
  statuses = ['Stable', 'Critical', 'Finished'];
  forbiddenProjectsNames = ['Test'];
  courseForm: FormGroup;

  constructor() {}

  ngOnInit() {
    this.courseForm = new FormGroup({
      'projectname': new FormControl(null, [Validators.required, this.forbiddenProjects.bind(this)]),
      'mail': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmailsCheck),
      'status': new FormControl(null)
    });

    this.courseForm.setValue({
      'projectname': 'My custom project',
      'mail': 'custom@angular.io',
      'status': 'Stable'
    });
  }

  onSubmit() {
    console.log(this.courseForm.value);
    this.courseForm.reset({'projectname': null, 'mail': null, 'status': 'Stable'});
  }

  forbiddenProjects(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenProjectsNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    } else {
      return null;
    }
  }

  forbiddenEmailsCheck(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(()=>{
        if (control.value === 'test@project.com') {
          resolve({'emailIsNotAccepted': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }

}
