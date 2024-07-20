import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent {
  StudentArray: any[] = [];
  isResultLoaded = false;

  name: string = '';
  address: string = '';
  phone: Number = 0;
  currentStudentID = '';

  constructor(private http: HttpClient) {
    this.getAllStudent();
  }
  // get the all student details from backend
  getAllStudent() {
    this.http
      .get('http://127.0.0.1:8000/api/student')
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.StudentArray = resultData;
      });
  }

  // save the new student to the database
  register() {
    let bodyData = {
      name: this.name,
      address: this.address,
      phone: this.phone,
    };

    this.http
      .post('http://127.0.0.1:8000/api/student', bodyData, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student Registered Successfully');
        this.getAllStudent();
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
  // update the student details
  UpdateRecords() {
    let bodyData = {
      id: this.currentStudentID,
      name: this.name,
      address: this.address,
      phone: this.phone,
    };

    this.http
      .put(
        `http://127.0.0.1:8000/api/student/ ${this.currentStudentID}`,
        bodyData
      )
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student Registered Updated');
        this.getAllStudent();
      });
  }
  // save the new student in database
  save() {
    if (this.currentStudentID == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }

  setDelete(data: any) {
    this.http
      .delete(`http://127.0.0.1:8000/api/student/${data.id}`, {
        responseType: 'text',
      })
      .subscribe((resultData: any) => {
        console.log(resultData);
        alert('Student Deleted ');
        this.getAllStudent();
        this.name = '';
        this.address = '';
        this.phone = 0;
      });
  }
}
