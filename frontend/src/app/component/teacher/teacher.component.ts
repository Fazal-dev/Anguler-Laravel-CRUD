import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css',
})
export class TeacherComponent {
  TeacherArray: any[] = [];
  isResultLoaded = false;

  name: string = '';
  address: string = '';
  phone: Number = 0;
  currentStudentID = '';

  constructor(private http: HttpClient) {
    this.getAllTeacher();
  }
  getAllTeacher() {
    return this.http
      .get('http://127.0.0.1:8000/api/teacher')
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.TeacherArray = resultData;
      });
  }

  register() {
    let bodyData = {
      name: this.name,
      address: this.address,
      phone: this.phone,
    };

    this.http
      .post('http://127.0.0.1:8000/api/teacher', bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Teacher Registered Successfully');
        this.getAllTeacher();
        this.name = '';
        this.address = '';
        this.phone = 0;
      });
  }
  setUpdate(data: any) {
    this.name = data.name;
    this.address = data.address;
    this.phone = data.phone;
    this.currentStudentID = data.id;
  }

  UpdateRecords() {
    let bodyData = {
      id: this.currentStudentID,
      name: this.name,
      address: this.address,
      phone: this.phone,
    };

    this.http
      .put(
        `http://127.0.0.1:8000/api/teacher/ ${this.currentStudentID}`,
        bodyData
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Teacher Registered Updated');
        this.getAllTeacher();
      });
  }

  save() {
    if (this.currentStudentID == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }
  setDelete(data: any) {
    this.http
      .delete(`http://127.0.0.1:8000/api/teacher/${data.id}`, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Teacher Deleted ');
        this.getAllTeacher();
        this.name = '';
        this.address = '';
        this.phone = 0;
      });
  }
}
