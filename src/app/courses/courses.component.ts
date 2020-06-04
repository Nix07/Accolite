import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { CoursesService } from '../courses.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  loggedInFlag: boolean;
  courses: any;
  router: any;
  img_source = "./assets/images/courses.jpg";
  course = {
    courseName: '',
    description: '',
    preRequisite: '',
    instructorName: ''
  }
  mySubscription: any;

  constructor(private loginService: LoginService, private coursesService: CoursesService, _router: Router) {
    this.router = _router;
   }

  ngOnInit(): void {
    this.loginService.currentFlag.subscribe( (loggedInFlag: any)  => {
      this.loggedInFlag = loggedInFlag;
    });

    this.coursesService.getAllCourses().subscribe((courses: any) => {
      this.courses = courses;
      console.log(this.courses);
    });
  }

  createCourse(){
    if(this.course.preRequisite.indexOf(",") == -1){
      this.course.preRequisite = this.course.preRequisite + ',';
    }
    console.log(this.course);
    this.coursesService.createCourse(this.course).subscribe((response: any) => {
      console.log(response);
      if(response){
        alert('Creation Successful');
        this.router.navigateByUrl('/courses/'+response.courseName);
      }
      else{
        alert('Creation Unsuccessful');
      }
    });
  }
}
