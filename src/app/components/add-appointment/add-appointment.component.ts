import { Component, OnInit } from '@angular/core';
import { AppointmentCrudService } from '../../shared/services/appointment-crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  appointmentForm: FormGroup;  // Define FormGroup to appointments's form
  rushAppointmentForm: FormGroup;

  appointmentTypes: string [] = [
    "Academic Advising",
    "Degree Evaluation",
    "Help Desk",
    "HOD Meeting",
    "Lecturer Meeting"
  ];

  appointmentPersons: string [] = [
    "Dr. Mohan",
    "Dr. Goodridge",
    "Mr. Defraitas",
    "Ms. Cudjoe"
  ];

  appointmentDates: string[] = [
    "Thursday 18th April, 2019",
    "Tuesday 23rd April, 2019",
    "Thursday 25th April, 2019"
  ]

  appointmentTimes: string[] = [
    "10:00 AM",
    "10:10 AM",
    "10:20 AM",
    "10:30 AM",
    "10:40 AM",
    "10:50 AM"
  ]

  constructor(
    public router: Router,
    public authService: AuthService,
    public appointmentCrudApi: AppointmentCrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  ) { }

  ngOnInit() {
    this.appointmentCrudApi.GetAppointmentsList();  // Call GetStudentsList() before main form is being called
    this.appointmenForm();              // Call student form when component is ready
  }

    // Reactive student form
    appointmenForm() {
      this.appointmentForm = new FormGroup({
        lecturer: new FormControl(""),
        date: new FormControl(""),
        time: new FormControl(""),
        type: new FormControl("")
      });
      this.appointmentForm.controls['type'].setValue("Select your appointment type", {onlySelf: true});
      this.appointmentForm.controls['lecturer'].setValue("Select the lecturer", {onlySelf: true});
      this.appointmentForm.controls['date'].setValue("Select from available dates...", {onlySelf: true});
      this.appointmentForm.controls['time'].setValue("Select from available times...", {onlySelf: true});
    }

    //Accessing form control using getters
  // get firstName() {
  //   return this.appointmentForm.get('firstName');
  // }

  // get lastName() {
  //   return this.appointmentForm.get('lastName');
  // }  

  // get email() {
  //   return this.appointmentForm.get('email');
  // }

  // get mobileNumber() {
  //   return this.appointmentForm.get('mobileNumber');
  // }

  get lecturer() {
    return this.appointmentForm.get('lecturer');
  }

  get date() {
    return this.appointmentForm.get('date');
  }

  get time() {
    return this.appointmentForm.get('time');
  }

  get type() {
    return this.appointmentForm.get('type');
  }

  // Reset student form's values
  ResetForm() {
    this.appointmentForm.reset();
  }  
 
  submitAppointmentData() {
    //console.log(this.appointmentForm.value)
    this.appointmentCrudApi.AddAppointment(this.appointmentForm.value); // Submit student data using CRUD API
    this.toastr.success('successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
    this.router.navigate(['dashboard']);
  };

  goBack() {
    this.router.navigate(['dashboard']);
  }
}
