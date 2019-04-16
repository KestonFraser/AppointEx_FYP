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

  public appointmentForm: FormGroup;  // Define FormGroup to appointments's form

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
      this.appointmentForm = this.fb.group({
        //firstName: ['', [Validators.required, Validators.minLength(2)]],
        // lastName: [''],
        // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
        // mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        lecturer: [''],
        date: [''],
        time: [''],
        type: ['']
      })  
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
    this.appointmentCrudApi.AddAppointment(this.appointmentForm.value); // Submit student data using CRUD API
    this.toastr.success('successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
    this.router.navigate(['dashboard']);
   };
}
